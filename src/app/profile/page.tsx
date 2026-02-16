"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiEdit2,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
  FiClock,
  FiCheck,
  FiTruck,
  FiDownload,
  FiX,
  FiSave,
  FiCalendar,
  FiMail,
} from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { pdf } from "@react-pdf/renderer";
import OrderPDF from "@/components/OrderPDF";
import toast from "react-hot-toast";

interface Order {
  id: number;
  created_at: string;
  product_id: number[];
  quantity: number[];
  status: string;
  country: string;
  state: string;
  city: string;
  street_address: string;
  phone_Number: string;
  total_price: number;
  user_id?: number;
  updated_at?: string | null;
}

interface ProductDetails {
  id: number;
  product_name: string;
  actual_price: number;
  discounted_price: number;
  product_images: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsMap, setProductsMap] = useState<Map<number, ProductDetails>>(
    new Map()
  );
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Update editName when user changes
  useEffect(() => {
    setEditName(user?.name || "");
  }, [user?.name]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditName(user?.name || "");
  };

  const handleSaveName = async () => {
    setIsLoading(true);

    try {
      const result = await updateProfile({ name: editName });

      if (result.success) {
        setIsEditModalOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setIsLogoutModalOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleNewsletterToggle = async () => {
    if (!user?.id) return;

    setIsNewsletterLoading(true);

    try {
      if (!supabase || !isSupabaseConfigured()) {
        toast.error("Database connection not available");
        return;
      }

      const newStatus = !isNewsletterSubscribed;

      const { error } = await supabase
        .from("users")
        .update({ is_newsletter: newStatus })
        .eq("id", user.id);

      if (error) {
        toast.error("Failed to update newsletter subscription");
        return;
      }

      setIsNewsletterSubscribed(newStatus);
      toast.success(
        newStatus
          ? "Successfully subscribed to newsletter!"
          : "Successfully unsubscribed from newsletter"
      );
    } catch (error) {
      console.error("Newsletter update error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  // Fetch newsletter subscription status
  useEffect(() => {
    const fetchNewsletterStatus = async () => {
      if (!user?.id) return;

      try {
        if (!supabase || !isSupabaseConfigured()) {
          console.error("Supabase is not configured");
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("is_newsletter")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching newsletter status:", error);
          return;
        }

        setIsNewsletterSubscribed(data?.is_newsletter || false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNewsletterStatus();
  }, [user?.id]);

  const handleDownloadInvoice = async (order: Order) => {
    try {
      // Prepare order data for PDF
      const orderForPDF = {
        ...order,
        user_id: order.user_id || user?.id || 0,
        updated_at: order.updated_at || null,
        customer_name: user?.name || "N/A",
        customer_email: user?.email || "N/A",
        products: order.product_id.map((productId, index) => {
          const product = productsMap.get(productId);
          return {
            id: productId,
            product_name: product?.product_name || `Product #${productId}`,
            discounted_price: product?.discounted_price || 0,
          };
        }),
      };

      // Generate PDF
      const blob = await pdf(<OrderPDF order={orderForPDF} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-order-${order.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Fetch orders and product details
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;

      try {
        setLoadingOrders(true);

        if (!supabase || !isSupabaseConfigured()) {
          console.error("Supabase is not configured");
          setLoadingOrders(false);
          return;
        }

        // Fetch orders for the logged-in user
        const { data: ordersData, error: ordersError } = await supabase
          .from("order")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (ordersError) {
          console.error("Error fetching orders:", ordersError);
          return;
        }

        setOrders(ordersData || []);

        // Collect all unique product IDs
        const allProductIds = new Set<number>();
        ordersData?.forEach((order) => {
          if (Array.isArray(order.product_id)) {
            order.product_id.forEach((id: number) => allProductIds.add(id));
          }
        });

        // Fetch product details for all products
        if (allProductIds.size > 0) {
          if (!supabase || !isSupabaseConfigured()) {
            console.error("Supabase is not configured");
            setLoadingOrders(false);
            return;
          }

          const { data: productsData, error: productsError } = await supabase
            .from("products")
            .select(
              "id, product_name, actual_price, discounted_price, product_images"
            )
            .in("id", Array.from(allProductIds));

          if (productsError) {
            console.error("Error fetching products:", productsError);
            return;
          }

          // Create a map for quick product lookup
          const newProductsMap = new Map<number, ProductDetails>();
          productsData?.forEach((product) => {
            newProductsMap.set(product.id, product);
          });
          setProductsMap(newProductsMap);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FiCheck className="w-4 h-4 text-white" />;
      case "shipped":
        return <FiTruck className="w-4 h-4 text-white" />;
      case "processing":
        return <FiPackage className="w-4 h-4 text-white" />;
      case "pending":
        return <FiClock className="w-4 h-4 text-white" />;
      default:
        return <FiClock className="w-4 h-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "pending":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute right-0 top-20 w-64 h-64 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 z-50 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="absolute left-0 bottom-20 w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 z-50 pointer-events-none rotate-180">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>

      <Navbar />

      <div className="max-w-6xl mx-auto py-20 px-6 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-eurotypo mb-2">
            My <span className="text-[#005655] italic">Profile</span>
          </h1>
          <p className="text-gray-600">
            Manage your account and track your orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Order History Section - 70% */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Orders List */}
            {loadingOrders ? (
              <div className="flex items-center justify-center py-20 bg-[#DCE7C8] rounded-2xl border border-primary">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#005655] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 font-medium">Loading orders...</p>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 bg-[#DCE7C8] rounded-2xl border border-dashed border-primary">
                <BsBoxSeam className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start shopping to see your orders here!
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-[#005655] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#004444] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={order.id}
                    className="bg-[#DCE7C8] rounded-2xl shadow-sm border border-primary overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Order Header */}
                    <div className="bg-[#DCE7C8] px-6 py-4 border-b border-primary">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#005655] rounded-lg flex items-center justify-center">
                            <FiPackage className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-800">
                              Order #{order.id}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <FiCalendar className="w-3 h-3" />
                              <span>
                                {new Date(order.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center gap-2 ${getStatusColor(
                              order.status
                            )} text-white px-3 py-1.5 rounded-lg font-medium text-xs`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </div>
                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="bg-[#005655] hover:bg-[#004444] text-white p-2 rounded-lg transition-colors"
                            title="Download Invoice"
                          >
                            <FiDownload className="w-4 h-4" />
                          </button>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Total</p>
                            <p className="text-lg font-bold text-[#005655]">
                              ${order.total_price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Products */}
                    <div className="p-6 space-y-3">
                      {Array.isArray(order.product_id) &&
                        order.product_id.map((productId, idx) => {
                          const product = productsMap.get(productId);
                          const quantity = Array.isArray(order.quantity)
                            ? order.quantity[idx]
                            : 1;

                          return (
                            <div
                              key={`${order.id}-${productId}-${idx}`}
                              className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                            >
                              {/* Product Image */}
                              <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                {product?.product_images?.[0] ? (
                                  <img
                                    src={getImageUrl(product.product_images[0])}
                                    alt={product.product_name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = "/placeholder.svg";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <BsBoxSeam className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 mb-1 truncate">
                                  {product?.product_name ||
                                    `Product #${productId}`}
                                </h4>
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-600">Qty:</span>
                                    <span className="font-semibold text-gray-800">
                                      {quantity}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-600">
                                      Price:
                                    </span>
                                    {product?.actual_price &&
                                      product?.discounted_price &&
                                      product.actual_price >
                                      product.discounted_price ? (
                                      <>
                                        <span className="text-gray-500 line-through text-xs">
                                          ${product.actual_price}
                                        </span>
                                        <span className="font-semibold text-[#005655]">
                                          ${product.discounted_price}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="font-semibold text-gray-800">
                                        ${product?.discounted_price || 0}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 ml-auto">
                                    <span className="text-gray-600">
                                      Subtotal:
                                    </span>
                                    <span className="font-bold text-[#005655]">
                                      $
                                      {(
                                        (product?.discounted_price || 0) *
                                        quantity
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {/* Shipping Address */}
                      <div className="mt-4 pt-4 border-t border-primary">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-[#DCE7C8] rounded-lg flex items-center justify-center flex-shrink-0">
                            <FiTruck className="w-4 h-4 text-[#005655]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 mb-1 text-sm">
                              Shipping Address
                            </p>
                            <p className="text-gray-600 text-sm">
                              {order.street_address}, {order.city},{" "}
                              {order.state}, {order.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile & Newsletter Card - 30% */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-[#DCE7C8] rounded-2xl shadow-sm p-6 border border-primary sticky top-24">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-[#005655] rounded-full flex items-center justify-center mb-4">
                  <FiUser className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 text-center">
                  {user?.name || "Loading..."}
                </h2>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {user?.email || "Loading..."}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 px-4 bg-[#DCE7C8] border border-primary rounded-xl">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-[#005655]" />
                    <span className="text-sm text-gray-700">Member Since</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                      : "..."}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-[#DCE7C8] border border-primary rounded-xl">
                  <div className="flex items-center gap-2">
                    <FiShoppingBag className="w-4 h-4 text-[#005655]" />
                    <span className="text-sm text-gray-700">Total Orders</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {orders.length}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">Status</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    Active
                  </span>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="mb-6 pb-6 border-b border-primary">
                <div className="flex items-start gap-3 mb-4 border border-primary rounded-lg p-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800 mb-1">
                      Newsletter
                    </h3>
                    <p className="text-xs text-gray-600">
                      {isNewsletterSubscribed
                        ? "You're subscribed"
                        : "Get exclusive deals"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNewsletterToggle}
                  disabled={isNewsletterLoading}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${isNewsletterSubscribed
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-[#005655] text-white hover:bg-[#004444]"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isNewsletterLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : isNewsletterSubscribed ? (
                    <>
                      <FiX className="w-4 h-4" />
                      <span>Unsubscribe</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEditClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#005655] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#004444] transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#005655] rounded-lg flex items-center justify-center">
                      <FiEdit2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Edit Profile
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#005655] focus:border-[#005655] transition-all outline-none"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveName}
                      disabled={isLoading}
                      className="flex-1 bg-[#005655] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#004444] disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FiSave className="w-5 h-5" />
                      )}
                      <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {isLogoutModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100">
                    <FiLogOut className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Confirm Logout
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Are you sure you want to logout? You will need to sign in
                    again to access your account.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleLogoutConfirm}
                    className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Yes, Logout</span>
                  </button>
                  <button
                    onClick={handleLogoutCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

