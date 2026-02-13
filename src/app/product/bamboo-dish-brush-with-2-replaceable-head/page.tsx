"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductDetailingSection from "@/components/ProductDetailSection";
import ProductSpecSection from "@/components/SpecificationSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import NewsLetter from "@/components/NewsLetter";
import StickyBottomBar from "@/components/StickyBottomBar";
import { useContent } from "@/contexts/ContentContext";

export default function DishwasherPage() {
  const { switchToHome2 } = useContent();

  useEffect(() => {
    // Set content to dishwasher (home2) when page loads
    switchToHome2();
  }, [switchToHome2]);

  useEffect(() => {
    // Update meta tags for SEO
    document.title = "Bamboo Dish Brush – Durable, Eco-Friendly & Sustainable";

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Bamboo dish brush with 2 replaceable heads – durable, eco-friendly, and ideal for dishes. Make your kitchen zero-waste today!"
    );

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute(
      "href",
      "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head"
    );

    // Add Schema Markup (JSON-LD)
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "product-schema";
    schemaScript.textContent = JSON.stringify({
      "@context": "http://schema.org/",
      "@type": "Product",
      name: "Bamboo Dish Brush with 2 Replacement Heads | Eco-Friendly, Biodegradable",
      url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
      image: [
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957301-7huidefvctj.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957306-6sty5s1bwaf.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957307-z4zfwjkkr.png",
      ],
      description:
        "Our Bamboo Dish Brush is a sustainable kitchen essential, featuring natural sisal bristles and a durable FSC-certified bamboo handle. Safe for all surfaces, including non-stick cookware, it comes with 2 replacement heads for long-lasting, eco-friendly cleaning.",
      brand: {
        "@type": "Brand",
        name: "EcoFriendly Shop",
      },
      offers: [
        {
          "@type": "Offer",
          availability: "http://schema.org/InStock",
          price: 19.99,
          priceCurrency: "USD",
          url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
          priceValidUntil: "2026-12-31",
          itemCondition: "http://schema.org/NewCondition",
          inventoryLevel: {
            "@type": "QuantitativeValue",
            value: 352,
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: 0,
              currency: "USD",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
          },
          seller: {
            "@type": "Organization",
            name: "EcoFriendly Shop",
          },
        },
        {
          "@type": "Offer",
          availability: "http://schema.org/InStock",
          price: 25.99,
          priceCurrency: "USD",
          url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head?variant=default",
          itemCondition: "http://schema.org/NewCondition",
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: 0,
              currency: "USD",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
          },
        },
      ],
    });

    // Remove existing schema if present
    const existingSchema = document.getElementById("product-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    document.head.appendChild(schemaScript);

    // Cleanup on unmount
    return () => {
      const schemaToRemove = document.getElementById("product-schema");
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />
        <ProductSection />
        <BenefitsSection />
        <FeaturesSection />
        <ProductDetailingSection />
        <ProductSpecSection />
        <ProductShowcaseSection />
        <NewsLetter />
      </main>

      <Footer />
      <StickyBottomBar />
    </div>
  );
}

