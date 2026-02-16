import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

// Product interface based on Supabase data structure
interface Product {
  id: number;
  product_name: string;
  product_description: string;
  actual_price: number;
  discounted_price: number;
  product_images: string[];
  category: string;
  quantity: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

const StickyBottomBar: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { content, currentPage } = useContent();
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const currentCategory = currentPage === "home1" ? "Toothbrush" : "Dishwasher";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!supabase || !isSupabaseConfigured()) {
          console.error("Supabase is not configured");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("status", true)
          .eq("category", currentCategory)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error(
            "Error fetching product for sticky bar:",
            error.message
          );
          return;
        }

        if (data && data.length > 0) {
          setProduct(data[0] as Product);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [currentCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Show the bar when user starts scrolling (any scroll amount)
      setIsVisible(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuantityChange = (change: number) => {
    if (!product) return;

    const newQuantity = quantity + change;

    // Prevent going below 1
    if (newQuantity < 1) return;

    // Check if new quantity exceeds available stock
    if (newQuantity > product.quantity) {
      toast({
        title: "Stock Limit Reached",
        description: `Only ${product.quantity} items available in stock.`,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setQuantity(newQuantity);
  };

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  const getShortProductName = (fullName: string) => {
    const words = fullName.split(" ");
    return words.slice(0, 2).join(" ");
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login first to add products to cart.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    if (product) {
      // Check if product is out of stock (UI-level check)
      if (product.quantity === 0) {
        toast({
          title: "Out of Stock",
          description: "This product is currently out of stock.",
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      // Check if requested quantity exceeds available stock (UI-level check)
      if (quantity > product.quantity) {
        toast({
          title: "Insufficient Stock",
          description: `Only ${product.quantity} items available in stock. Please reduce the quantity.`,
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      // CartContext will validate stock again from database and show success toast
      await addToCart(
        {
          id: product.id,
          product_name: product.product_name,
          product_description: product.product_description,
          price: product.discounted_price,
          product_images: product.product_images,
          category: product.category,
        },
        quantity
      );

      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !loading && product && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#005655] shadow-2xl border-t border-[#A0C474]/20"
        >
          <div className="max-w-7xl mx-auto px-4 py-1">
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              {/* Product Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#E7F0CE] rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.product_images &&
                    product.product_images.length > 0 ? (
                    <img
                      src={getImageUrl(product.product_images[0])}
                      alt={product.product_name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/images/brush.png";
                      }}
                    />
                  ) : (
                    <img
                      src="/images/brush.png"
                      alt={product.product_name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-white font-semibold text-base leading-tight">
                    {getShortProductName(product.product_name)}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-white">
                      ${product.discounted_price}
                    </span>
                    {product.actual_price > product.discounted_price && (
                      <span className="text-white/60 line-through text-sm">
                        ${product.actual_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {/* Stock indicator */}
                {product.quantity === 0 ? (
                  <span className="text-red-400 font-semibold px-3 py-2 bg-red-500/20 rounded-lg">
                    Out of Stock
                  </span>
                ) : product.quantity <= 5 ? (
                  <span className="text-yellow-300 text-sm">
                    Only {product.quantity} left
                  </span>
                ) : null}

                <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    disabled={quantity <= 1 || product.quantity === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>

                  <span className="px-3 py-2 text-white font-semibold min-w-[2rem] text-center">
                    {quantity}
                  </span>

                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    disabled={
                      product.quantity === 0 || quantity >= product.quantity
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-white text-[#005655] hover:bg-gray-100"
                  onClick={handleBuyNow}
                  disabled={product.quantity === 0}
                >
                  {product.quantity === 0
                    ? "Out of Stock"
                    : isAuthenticated
                      ? content.stickyBar.buyNowText
                      : "Login to Buy"}
                </Button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden">
              {/* Product Info Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#E7F0CE] rounded-lg flex items-center justify-center flex-shrink-0">
                    {product.product_images &&
                      product.product_images.length > 0 ? (
                      <img
                        src={getImageUrl(product.product_images[0])}
                        alt={product.product_name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/images/brush.png";
                        }}
                      />
                    ) : (
                      <img
                        src="/images/brush.png"
                        alt={product.product_name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {getShortProductName(product.product_name)}
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-lg font-bold text-white">
                        ${product.discounted_price}
                      </span>
                      {product.actual_price > product.discounted_price && (
                        <span className="text-white/60 line-through text-xs">
                          ${product.actual_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-between">
                {/* Stock indicator */}
                {product.quantity === 0 ? (
                  <span className="text-red-400 font-semibold px-2 py-1 bg-red-500/20 rounded-lg text-xs">
                    Out of Stock
                  </span>
                ) : product.quantity <= 5 ? (
                  <span className="text-yellow-300 text-xs">
                    Only {product.quantity} left
                  </span>
                ) : null}

                <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    disabled={quantity <= 1 || product.quantity === 0}
                  >
                    <Minus className="w-3 h-3" />
                  </motion.button>

                  <span className="px-3 py-2 text-white font-semibold min-w-[2rem] text-center text-sm">
                    {quantity}
                  </span>

                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-white hover:text-[#A0C474] transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.95 }}
                    disabled={
                      product.quantity === 0 || quantity >= product.quantity
                    }
                  >
                    <Plus className="w-3 h-3" />
                  </motion.button>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  className="ml-4 bg-white text-[#005655] hover:bg-gray-100"
                  onClick={handleBuyNow}
                  disabled={product.quantity === 0}
                >
                  {product.quantity === 0
                    ? "Out of Stock"
                    : isAuthenticated
                      ? content.stickyBar.buyNowText
                      : "Login to Buy"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;
