import React, { useState, useEffect } from "react";
import { X, ShoppingCart, ArrowRight, MapPin, LogIn, User, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/contexts/CartContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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
    const { user, isAuthenticated } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
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

    const handlePlaceOrder = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);

      try {
        const productIds = cartItems.map((item) => item.id);
        const quantities = cartItems.map((item) => item.quantity);

        // Create order in database
        console.log("📦 Creating order...");
        const orderData: any = {
          user_id: user?.id || null,
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

        // If user is not logged in (guest checkout), save guest email and name
        if (!user || !user.id) {
          orderData.guest_email = formData.email;
          orderData.guest_name = formData.fullName;
          console.log("👤 Guest checkout - saving guest info:", {
            guest_email: formData.email,
            guest_name: formData.fullName,
          });
        }

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
          title: "Order Placed Successfully! 🎉",
          description: `Your order #${orderDataResult[0].id} has been placed. We'll contact you soon!`,
          duration: 5000,
        });

        setIsProcessing(false);
        onCheckoutSuccess();
        onClose();
      } catch (error: any) {
        console.error("❌ Order creation failed:", error);
        toast({
          title: "Order Failed",
          description: error.message || "Failed to place order. Please try again.",
          variant: "destructive",
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

    // Show login/guest prompt if user is not authenticated
    if (!isAuthenticated && step === 0) {
      return (
        <>
          <div className="sticky top-0 bg-gradient-to-r from-[#005655] to-[#004544] text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Continue Checkout</h2>
                <p className="text-white/80 text-sm">
                  Choose how you'd like to proceed
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

          <div className="p-8 space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#005655] mb-2">
                How would you like to continue?
              </h3>
              <p className="text-gray-600">
                You can login to save your order or continue as a guest
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Login Option */}
              <button
                onClick={() => {
                  router.push("/login");
                  onClose();
                }}
                className="p-6 border-2 border-primary rounded-xl hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-[#005655]">
                    Login to Account
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Access your order history, save addresses, and track your orders
                </p>
              </button>

              {/* Guest Option */}
              <button
                onClick={() => setStep(1)}
                className="p-6 border-2 border-primary rounded-xl hover:bg-primary/5 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-[#005655]">
                    Continue as Guest
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Complete your purchase without creating an account
                </p>
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="sticky top-0 bg-gradient-to-r from-[#005655] to-[#004544] text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Shipping Address</h2>
              <p className="text-white/80 text-sm">
                Enter your delivery details
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
                  readOnly={isAuthenticated}
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
                  readOnly={isAuthenticated}
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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-semibold mb-1">
                  Order Confirmation
                </p>
                <p className="text-xs text-blue-700">
                  After placing your order, we'll contact you to confirm payment and shipping details.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing}
              className="flex-1 h-14 text-base font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-[#005655] to-[#004544] hover:from-[#004544] hover:to-[#003433] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </>
    );
  };

// Main modal component
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  onCheckoutSuccess,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
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
        isAuthenticated,
      });
      // If user is authenticated, go directly to step 1, otherwise show login/guest prompt
      setStep(isAuthenticated ? 1 : 0);
    }
  }, [isOpen, cartItems.length, totalPrice, isAuthenticated]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
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
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
