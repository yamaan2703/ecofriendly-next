import React, { useState, useEffect } from "react";
import { X, ShoppingCart, ArrowRight, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/contexts/CartContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone_Number: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  onCheckoutSuccess: () => void;
}

// Helper function to create payment record
async function createPaymentRecord(userId: string | number, amount: number) {
  if (!supabase || !isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from("payment")
    .insert([
      {
        user_id: userId,
        amount: amount,
        payment_status: "completed",
        payment_method: "card",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Inner component that uses Stripe hooks
const CheckoutForm: React.FC<{
  formData: CheckoutFormData;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  cartItems: CartItem[];
  totalPrice: number;
  onCheckoutSuccess: () => void;
  onClose: () => void;
}> = ({
  formData,
  setFormData,
  step,
  setStep,
  cartItems,
  totalPrice,
  onCheckoutSuccess,
  onClose,
}) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const deliveryFee = 5.99;
    const freeDeliveryThreshold = 50;
    const subtotal = totalPrice;
    const isFreeDelivery = subtotal >= freeDeliveryThreshold;
    const finalTotal = isFreeDelivery ? subtotal : subtotal + deliveryFee;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
      e.preventDefault();

      setStep(2);
    };

    const handlePayment = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!user) {
        console.log("❌ No user");
        toast({
          title: "Login Required",
          description: "Please login to complete payment.",
          duration: 3000,
        });
        return;
      }

      if (!stripe || !elements) {
        console.log("❌ Stripe not ready");
        toast({
          title: "Payment System Loading",
          description: "Please wait a moment and try again.",
          duration: 3000,
        });
        return;
      }

      setIsProcessing(true);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("💳 Starting payment process...");
      console.log("💰 Amount:", finalTotal);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      try {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error("Card element not found");
        }

        // STEP 1: Create Payment Method with card details
        console.log("🔐 Step 1: Creating payment method...");
        const { error: paymentMethodError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone_Number,
              address: {
                line1: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: "US",
              },
            },
          });

        if (paymentMethodError) {
          console.error("❌ Payment method error:", paymentMethodError.message);
          throw paymentMethodError;
        }

        console.log("✅ Payment method created:", paymentMethod?.id);

        // STEP 2: Create Payment Intent via API route (server-side)
        console.log("💳 Step 2: Creating payment intent...");

        const productIds = cartItems.map((item) => item.id);
        const quantities = cartItems.map((item) => item.quantity);
        const productNames = cartItems
          .map((item) => item.product_name)
          .join(", ");

        // Prepare metadata
        const metadata = {
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phone_Number,
          user_id: user.id.toString(),
          products: productNames,
          product_ids: productIds.join(","),
          quantities: quantities.join(","),
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        };

        console.log("💰 Payment Amount:", finalTotal, "USD");

        // Call our server-side API route
        const paymentIntentResponse = await fetch(
          "/api/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: finalTotal,
              currency: "usd",
              payment_method: paymentMethod.id,
              metadata: {
                ...metadata,
                description: `Order for ${formData.fullName}`,
              },
            }),
          }
        );

        console.log("📡 Response Status:", paymentIntentResponse.status);
        const paymentIntentData = await paymentIntentResponse.json();
        console.log("📦 Response Data:", paymentIntentData);

        if (!paymentIntentResponse.ok) {
          console.error("❌ Payment Intent Error:", paymentIntentData);
          throw new Error(paymentIntentData.error || "Payment failed");
        }

        console.log("✅ Payment Intent created:", paymentIntentData.id);
        console.log("📊 Payment Status:", paymentIntentData.status);
        console.log("💰 Amount Charged:", finalTotal, "USD");

        // STEP 3: Handle payment result
        if (paymentIntentData.status === "succeeded") {
          console.log("🎉 Payment succeeded!");

          // STEP 4: Save payment record to database
          console.log("💾 Step 3: Saving payment to database...");
          const paymentRecord = await createPaymentRecord(user.id, finalTotal);
          console.log("💳 Payment Record ID:", paymentRecord.id);

          // STEP 5: Create order in database
          console.log("📦 Step 4: Creating order...");
          const orderData = {
            user_id: user.id,
            product_id: productIds,
            quantity: quantities,
            status: "pending",
            country: formData.country,
            state: formData.state,
            city: formData.city,
            street_address: formData.address,
            phone_Number: formData.phone_Number,
            total_price: finalTotal,
          };

          if (!supabase || !isSupabaseConfigured()) {
            throw new Error("Supabase is not configured");
          }

          const { data: orderDataResult, error: orderError } = await supabase
            .from("order")
            .insert([orderData])
            .select();

          if (orderError) {
            console.error("❌ Order error:", orderError);
            throw orderError;
          }



          toast({
            title: "Payment Successful! 🎉",
            description: `Payment of $${finalTotal.toFixed(
              2
            )} completed. Order #${orderDataResult[0].id}`,
            duration: 5000,
          });

          setIsProcessing(false);
          onCheckoutSuccess();
          setStep(1);
          // Close modal after successful payment
          setTimeout(() => {
            onClose();
          }, 500);
        } else if (paymentIntentData.status === "requires_action") {
          // Handle 3D Secure authentication if needed
          console.log("🔐 Requires additional authentication...");
          const { error: confirmError } = await stripe.confirmCardPayment(
            paymentIntentData.client_secret
          );

          if (confirmError) {
            throw confirmError;
          }

          // If authentication succeeds, save to database
          console.log("✅ Authentication successful!");
          const paymentRecord = await createPaymentRecord(user.id, finalTotal);

          const orderData = {
            user_id: user.id,
            product_id: productIds,
            quantity: quantities,
            status: "pending",
            country: formData.country,
            state: formData.state,
            city: formData.city,
            street_address: formData.address,
            phone_Number: formData.phone_Number,
            total_price: finalTotal,
          };

          if (!supabase || !isSupabaseConfigured()) {
            throw new Error("Supabase is not configured");
          }

          const { data: orderDataResult } = await supabase
            .from("order")
            .insert([orderData])
            .select();

          toast({
            title: "Payment Successful! 🎉",
            description: `Payment of $${finalTotal.toFixed(2)} completed.`,
            duration: 5000,
          });

          setIsProcessing(false);
          onCheckoutSuccess();
          setStep(1);
          // Close modal after successful payment
          setTimeout(() => {
            onClose();
          }, 500);
        } else {
          throw new Error(`Payment status: ${paymentIntentData.status}`);
        }
      } catch (error: any) {
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ PAYMENT FAILED");
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("Error:", error);
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        toast({
          title: "Payment Failed",
          description:
            error.message || "Please try again or use a different card.",
          duration: 5000,
        });
        setIsProcessing(false);
      }
    };

    const handleClose = () => {
      if (!isProcessing) {
        setStep(1);
        onClose();
      }
    };

    const handleBack = () => {
      console.log("⬅️ Back to address");
      setStep(1);
    };

    return (
      <>
        <div className="sticky top-0 bg-gradient-to-r from-[#005655] to-[#004544] text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {step === 1 ? (
                <MapPin className="w-6 h-6" />
              ) : (
                <CreditCard className="w-6 h-6" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {step === 1 ? "Shipping Address" : "Payment"}
              </h2>
              <p className="text-white/80 text-sm">
                {step === 1
                  ? "Enter your delivery details"
                  : "Complete your payment"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#005655] mb-4">
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_Number"
                    value={formData.phone_Number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#005655] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Delivery:</span>
                <span className="font-semibold">
                  {isFreeDelivery ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 border-gray-200">
                <span className="text-lg font-bold text-[#005655]">Total:</span>
                <span className="text-lg font-bold text-[#005655]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-14 text-base font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-[#005655] to-[#004544] hover:from-[#004544] hover:to-[#003433]"
              >
                Place Order
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePayment} className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#005655] mb-4">
                Payment Information
              </h3>
              <div className="p-6 border-2 border-[#005655] rounded-xl bg-white">
                {!stripe || !elements ? (
                  <div className="text-center py-4">
                    <div className="w-8 h-8 border-4 border-[#005655]/30 border-t-[#005655] rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading payment form...</p>
                  </div>
                ) : (
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "18px",
                          color: "#1a1a1a",
                          fontFamily: "system-ui, sans-serif",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          padding: "12px",
                        },
                        invalid: {
                          color: "#e53e3e",
                          iconColor: "#e53e3e",
                        },
                        complete: {
                          color: "#38a169",
                        },
                      },
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                <span className="font-semibold">Test card:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  4242 4242 4242 4242
                </code>
                <span className="text-gray-500">| Expiry: 12/34 | CVC: 123</span>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-[#005655]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isProcessing}
                className="flex-1 h-14 text-base font-semibold"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isProcessing || !stripe}
                className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-[#005655] to-[#004544] hover:from-[#004544] hover:to-[#003433]"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </>
    );
  };

// Main modal component that wraps everything with Elements provider
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  onCheckoutSuccess,
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone_Number: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });

  useEffect(() => {
    if (user) {
      console.log("👤 User loaded:", user.email);
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (isOpen) {
      console.log("🛒 Checkout opened:", {
        items: cartItems.length,
        total: totalPrice,
      });
      setStep(1);
    }
  }, [isOpen, cartItems.length, totalPrice]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current overflow value
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Cleanup: restore original overflow when modal closes or component unmounts
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              formData={formData}
              setFormData={setFormData}
              step={step}
              setStep={setStep}
              cartItems={cartItems}
              totalPrice={totalPrice}
              onCheckoutSuccess={onCheckoutSuccess}
              onClose={onClose}
            />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
