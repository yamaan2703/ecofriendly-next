"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Share2,
  Package,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

// Product interface based on actual Supabase data structure
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

const ProductSection = () => {
  const { content, currentPage } = useContent();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = currentPage === "home1" ? "Toothbrush" : "Dishwasher";

  const productImages =
    products.length > 0 && products[0].product_images
      ? products[0].product_images
      : content.productImages;

  const getImageUrl = (filename: string) => {
    const cleanFilename = filename
      .replace(/^\/+/, "")
      .replace(/^product-images\//, "");
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/${cleanFilename}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", currentCategory)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("❌ Error fetching products:", error.message);
          return;
        }

        setProducts((data as Product[]) || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory]);

  const product = products.length > 0 ? products[0] : null;
  const discountPercentage = product
    ? Math.round(
        ((product.actual_price - product.discounted_price) /
          product.actual_price) *
          100
      )
    : 0;

  const incrementQuantity = () => {
    if (!product) return;

    const newQuantity = quantity + 1;

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

  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const handleAddToCart = async () => {
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

      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-cream/30 to-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-cream/30 to-background py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No product found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left - Image */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Image */}
            <div className="border-2 border-primary rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg">
              <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center p-4">
                <img
                  src={getImageUrl(productImages[selectedImageIndex])}
                  alt={product.product_name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-3 sm:space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                {product.product_name}
              </h1>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                  ${product.discounted_price}
                </span>
                {product.actual_price > product.discounted_price && (
                  <span className="text-xl sm:text-2xl text-muted-foreground line-through">
                    ${product.actual_price}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              {product.quantity === 0 && (
                <div className="rounded-lg p-2 text-xs sm:text-sm">
                  <p className="text-red-600 font-semibold text-start">
                    Out of Stock
                  </p>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-foreground font-medium text-sm sm:text-base mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || product.quantity === 0}
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-primary rounded-lg flex items-center justify-center hover:bg-primary-lighter disabled:opacity-50"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="w-10 sm:w-12 text-center font-semibold text-base sm:text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={
                      product.quantity === 0 || quantity >= product.quantity
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 border border-primary rounded-lg flex items-center justify-center hover:bg-primary-lighter disabled:opacity-50"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <div className="flex-1 min-w-[200px]">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    {product.quantity === 0
                      ? "Out of Stock"
                      : isAuthenticated
                      ? "Add to Cart"
                      : "Login to Add to Cart"}
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-xs sm:text-sm">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-xs sm:text-sm">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-xs sm:text-sm">
                  Easy Returns
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                {product.product_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
