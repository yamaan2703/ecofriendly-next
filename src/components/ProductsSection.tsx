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
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  ProductDetailsAccordion,
  type ProductDetailsAccordionData,
} from "@/components/product/ProductDetailsAccordion";

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

interface ProductPageCopy {
  title: string;
  shortDescription: string;
}

interface ProductSectionProps {
  productCopy?: ProductPageCopy;
  productDetails?: ProductDetailsAccordionData;
}

const ProductSection = ({ productCopy, productDetails }: ProductSectionProps) => {
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
        if (!supabase || !isSupabaseConfigured()) {
          console.error("Supabase is not configured");
          setLoading(false);
          return;
        }

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
      <div
        className={`container mx-auto ${productCopy ? "max-w-7xl" : "max-w-5xl"}`}
      >
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left - Image */}
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2.5 flex-shrink-0 sm:gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 overflow-hidden rounded-lg border-2 flex-shrink-0 transition-colors ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-gray-200 hover:border-primary/40"
                  }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`View ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex flex-1 items-start">
              <div className="flex h-72 w-full items-start justify-center rounded-xl border border-primary/15 bg-background/50 p-3 sm:h-96 md:h-[28rem] lg:h-[32rem]">
                <img
                  src={getImageUrl(productImages[selectedImageIndex])}
                  alt={product.product_name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-3 sm:space-y-4">
            {/* Title */}
            <div>
              <h1
                className={`mb-2 font-bold text-foreground ${
                  productCopy
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-xl sm:text-2xl md:text-3xl"
                }`}
              >
                {productCopy?.title ?? product.product_name}
              </h1>
              {productCopy?.shortDescription && (
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {productCopy.shortDescription}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span
                  className={`font-bold text-primary ${
                    productCopy
                      ? "text-2xl sm:text-3xl"
                      : "text-3xl sm:text-4xl md:text-5xl"
                  }`}
                >
                  ${product.discounted_price}
                </span>
                {product.actual_price > product.discounted_price && (
                  <span
                    className={`text-muted-foreground line-through ${
                      productCopy
                        ? "text-base sm:text-lg"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
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
              <label
                className={`mb-2 block font-medium text-foreground ${
                  productCopy ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                }`}
              >
                Quantity
              </label>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || product.quantity === 0}
                    className={`flex items-center justify-center rounded-md border border-primary hover:bg-primary-lighter disabled:opacity-50 ${
                      productCopy
                        ? "h-8 w-8"
                        : "h-8 w-8 sm:h-10 sm:w-10 rounded-lg"
                    }`}
                  >
                    <Minus
                      className={
                        productCopy ? "h-3.5 w-3.5" : "h-3 w-3 sm:h-4 sm:w-4"
                      }
                    />
                  </button>
                  <span
                    className={`text-center font-semibold ${
                      productCopy
                        ? "w-8 text-sm"
                        : "w-10 text-base sm:w-12 sm:text-lg"
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={
                      product.quantity === 0 || quantity >= product.quantity
                    }
                    className={`flex items-center justify-center rounded-md border border-primary hover:bg-primary-lighter disabled:opacity-50 ${
                      productCopy
                        ? "h-8 w-8"
                        : "h-8 w-8 sm:h-10 sm:w-10 rounded-lg"
                    }`}
                  >
                    <Plus
                      className={
                        productCopy ? "h-3.5 w-3.5" : "h-3 w-3 sm:h-4 sm:w-4"
                      }
                    />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className={`flex items-center justify-center gap-1.5 rounded-md bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50 ${
                    productCopy
                      ? "px-4 py-2 text-xs sm:text-sm"
                      : "min-w-[200px] flex-1 gap-2 rounded-lg px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base"
                  }`}
                >
                  <ShoppingCart
                    className={
                      productCopy ? "h-3.5 w-3.5" : "h-4 w-4 sm:h-5 sm:w-5"
                    }
                  />
                  {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>

            {productDetails && (
              <ProductDetailsAccordion data={productDetails} />
            )}

            {!productCopy && (
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
            )}

            {/* Description */}
            {!productCopy && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                  {product.product_description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
