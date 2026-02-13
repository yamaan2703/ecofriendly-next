"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  Truck,
  Tag,
  Leaf,
  ShoppingBag,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { toast } = useToast();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [productStocks, setProductStocks] = useState<Record<number, number>>(
    {}
  );

  // Add canonical tag
  useEffect(() => {
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", "https://ecofriendlyshop.us/cart");

    // Cleanup on unmount
    return () => {
      const linkToRemove = document.querySelector('link[rel="canonical"]');
      if (
        linkToRemove &&
        linkToRemove.getAttribute("href") === "https://ecofriendlyshop.us/cart"
      ) {
        linkToRemove.remove();
      }
    };
  }, []);

  // Fetch stock data for all cart items
  useEffect(() => {
    const fetchStockData = async () => {
      if (cartItems.length === 0) return;

      try {
        const productIds = cartItems.map((item) => item.id);
        const { data, error } = await supabase
          .from("products")
          .select("id, quantity")
          .in("id", productIds);

        if (error) {
          console.error("Error fetching stock data:", error);
          return;
        }

        if (data) {
          const stockMap: Record<number, number> = {};
          data.forEach((product) => {
            stockMap[product.id] = product.quantity;
          });
          setProductStocks(stockMap);
        }
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchStockData();
  }, [cartItems]);

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Removed from Cart",
      description: `${productName} has been removed from your cart.`,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      clearCart();
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
        duration: 2000,
      });
    }
  };

  const handleIncrementQuantity = (
    productId: number,
    currentQuantity: number,
    productName: string
  ) => {
    const availableStock = productStocks[productId];

    // Check if we have stock data
    if (availableStock === undefined) {
      toast({
        title: "Loading...",
        description: "Please wait while we check stock availability.",
        duration: 2000,
      });
      return;
    }

    // Check if product is out of stock
    if (availableStock === 0) {
      toast({
        title: "Out of Stock",
        description: `${productName} is currently out of stock.`,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Check if current quantity already at max stock
    if (currentQuantity >= availableStock) {
      toast({
        title: "Stock Limit Reached",
        description: `Only ${availableStock} ${
          availableStock === 1 ? "item is" : "items are"
        } available in stock.`,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // All checks passed, increment quantity
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleCheckoutSuccess = () => {
    clearCart();
    setShowCheckoutModal(false);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const deliveryFee = 5.99;
  const freeDeliveryThreshold = 50;
  const subtotal = getTotalPrice();
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const finalTotal = isFreeDelivery ? subtotal : subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute right-0 top-32 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 z-50 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="absolute left-0 bottom-32 w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 z-0 pointer-events-none rotate-180">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#DCE7C8] py-16 px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground font-eurotypo">
                    Shopping Cart
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {cartItems.length > 0
                      ? `${totalItems} ${
                          totalItems === 1 ? "item" : "items"
                        } in your cart`
                      : "Your cart is empty"}
                  </p>
                </div>
              </div>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="size-4" />
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-20 bg-[#DCE7C8] rounded-2xl border border-primary">
              <div className="max-w-md mx-auto px-6">
                <div className="w-24 h-24 bg-[#005655] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 font-eurotypo mb-4">
                  Your Cart is Empty
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Start shopping for eco-friendly products and make a difference
                  for our planet!
                </p>
                <div className="bg-white border border-primary rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-6 h-6 text-[#005655] flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800 mb-2">
                        Why Choose Eco-Friendly?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Every purchase helps reduce plastic waste and supports
                        sustainable practices. Join us in making the world a
                        greener place!
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#005655] text-white font-semibold rounded-xl hover:bg-[#004444] transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#DCE7C8] border border-primary rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 p-6">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                        {item.product_images &&
                        item.product_images.length > 0 ? (
                          <img
                            src={getImageUrl(item.product_images[0])}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-primary" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <div className="px-3 py-1 bg-[#005655] text-white text-xs font-bold rounded-lg flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            <span>{item.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-gray-800 font-eurotypo">
                              {item.product_name}
                            </h3>
                            <button
                              onClick={() =>
                                handleRemoveItem(item.id, item.product_name)
                              }
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {item.product_description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Price */}
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-[#005655]">
                                ${item.price}
                              </span>
                              <span className="text-gray-600 text-sm">
                                each
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Subtotal:{" "}
                              <span className="font-bold text-[#005655]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                            {/* Stock Status */}
                            {productStocks[item.id] !== undefined && (
                              <div className="mt-2">
                                {productStocks[item.id] === 0 ? (
                                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                                    Out of Stock
                                  </span>
                                ) : productStocks[item.id] <= 5 ? (
                                  <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                                    Only {productStocks[item.id]} left
                                  </span>
                                ) : item.quantity >= productStocks[item.id] ? (
                                  <span className="text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-1 rounded">
                                    Max stock in cart
                                  </span>
                                ) : (
                                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                                    {productStocks[item.id]} available
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-700">
                              Qty:
                            </span>
                            <div className="flex items-center bg-white rounded-lg border border-primary">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-2 text-[#005655] hover:bg-[#005655] hover:text-white rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-6 py-2 font-bold text-gray-800 min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleIncrementQuantity(
                                    item.id,
                                    item.quantity,
                                    item.product_name
                                  )
                                }
                                className="p-2 text-[#005655] hover:bg-[#005655] hover:text-white rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                  productStocks[item.id] === 0 ||
                                  item.quantity >= productStocks[item.id]
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#DCE7C8] border border-primary rounded-2xl p-6 shadow-sm sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#005655] rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 font-eurotypo">
                      Order Summary
                    </h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between py-3 border-b border-primary">
                      <span className="text-gray-600">
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="font-bold text-gray-800">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center justify-between py-3 border-b border-primary">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#005655]" />
                        <span className="text-gray-600">Shipping</span>
                      </div>
                      <span className="font-bold text-gray-800">
                        {isFreeDelivery ? (
                          <span className="text-[#005655]">FREE</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {/* Free Delivery Progress */}
                    {!isFreeDelivery && (
                      <div className="bg-[#DCE7C8] rounded-xl p-4 border border-primary">
                        <div className="flex items-start gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-[#005655] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">
                            Add{" "}
                            <strong className="text-[#005655]">
                              ${(freeDeliveryThreshold - subtotal).toFixed(2)}
                            </strong>{" "}
                            more to get <strong>FREE shipping!</strong>
                          </p>
                        </div>
                        <div className="w-full bg-gray-50 rounded-full h-2 mt-2">
                          <div
                            className="bg-[#005655] h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                (subtotal / freeDeliveryThreshold) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {isFreeDelivery && (
                      <div className="bg-[#DCE7C8] border border-primary rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-[#005655]" />
                          <p className="text-sm font-bold text-gray-800">
                            You've qualified for FREE shipping! 🎉
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-primary">
                      <span className="text-xl font-bold text-gray-800">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-[#005655]">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-[#DCE7C8] rounded-xl p-4 mt-4 border border-primary">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-[#005655]" />
                        <span className="text-gray-800 font-bold text-sm">
                          Estimated Delivery
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Your order will arrive in{" "}
                        <strong className="text-[#005655]">
                          4-5 business days
                        </strong>
                      </p>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full py-3 text-md bg-[#005655] text-white rounded-xl font-bold hover:bg-[#004444] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Security Badge */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="size-8 bg-[#005655] rounded-full flex items-center justify-center">
                      <Leaf className="size-4 text-white" />
                    </div>
                    <span>Secure & Eco-Friendly Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <Footer />
    </div>
  );
};

export default CartPage;
