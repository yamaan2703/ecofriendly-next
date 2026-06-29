"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductSection from "@/components/ProductsSection";
import StickyBottomBar from "@/components/StickyBottomBar";
import { DishBrushDetailsContent } from "@/components/product/DishBrushDetailsContent";
import { dishbrushPageContent } from "@/data/dishbrush-page-content";
import { useContent } from "@/contexts/ContentContext";

export default function DishwasherPage() {
  const { switchToHome2 } = useContent();

  useEffect(() => {
    switchToHome2();
  }, [switchToHome2]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.title = dishbrushPageContent.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", dishbrushPageContent.shortDescription);

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

    let schemaScript = document.getElementById("product-schema") as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.id = "product-schema";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "http://schema.org/",
      "@type": "Product",
      name: dishbrushPageContent.title,
      url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
      image: [
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957301-7huidefvctj.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957306-6sty5s1bwaf.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1759395957307-z4zfwjkkr.png",
      ],
      description: dishbrushPageContent.longDescription,
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
          url: "https://ecofriendlyshop.us/product/bamboo-dish-brush-with-2-replaceable-head",
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
      <main className="pt-[4.25rem]">
        <ProductSection
          productCopy={{
            title: dishbrushPageContent.title,
            shortDescription: dishbrushPageContent.shortDescription,
          }}
          productDetails={{
            whatYouGet: dishbrushPageContent.whatYouGet,
            benefits: dishbrushPageContent.benefits,
            instructions: dishbrushPageContent.instructions,
            materials: dishbrushPageContent.materials,
          }}
        />
        <DishBrushDetailsContent />
      </main>
      <Footer />
      <StickyBottomBar />
    </div>
  );
}
