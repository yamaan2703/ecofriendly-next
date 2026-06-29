"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductSection from "@/components/ProductsSection";
import StickyBottomBar from "@/components/StickyBottomBar";
import { ToothbrushDetailsContent } from "@/components/product/ToothbrushDetailsContent";
import { toothbrushPageContent } from "@/data/toothbrush-page-content";
import { useContent } from "@/contexts/ContentContext";

export default function ToothbrushPage() {
  const { switchToHome1 } = useContent();

  useEffect(() => {
    // Set content to toothbrush (home1) when page loads
    switchToHome1();
  }, [switchToHome1]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Update meta tags for SEO
    document.title = toothbrushPageContent.title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      toothbrushPageContent.shortDescription
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
      "https://ecofriendlyshop.us/product/bamboo-toothbrush-10-pack"
    );

    // Add Schema Markup (JSON-LD) - only if not already present
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
      name: toothbrushPageContent.title,
      url: "https://ecofriendlyshop.us/product/bamboo-toothbrush-10-pack",
      image: [
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1761213979281-imxyk5nmey.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1761213979283-fqkreszgrhd.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1761213979284-yxdkk40kcb.png",
        "https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/product-images/1761213979284-c70lvh18mam.png",
      ],
      description: toothbrushPageContent.longDescription,
      brand: {
        "@type": "Brand",
        name: "EcoFriendly Shop",
      },
      offers: [
        {
          "@type": "Offer",
          availability: "http://schema.org/InStock",
          price: 14.99,
          priceCurrency: "USD",
          url: "https://ecofriendlyshop.us/product/bamboo-toothbrush-10-pack",
          priceValidUntil: "2026-12-31",
          itemCondition: "http://schema.org/NewCondition",
          inventoryLevel: {
            "@type": "QuantitativeValue",
            value: 35,
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
          price: 19.97,
          priceCurrency: "USD",
          url: "https://ecofriendlyshop.us/product/bamboo-toothbrush-10-pack",
          itemCondition: "http://schema.org/NewCondition",
          inventoryLevel: {
            "@type": "QuantitativeValue",
            value: 35,
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
        },
      ],
    });


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
      <main className="pt-[4.25rem]">
        <ProductSection
          productCopy={{
            title: toothbrushPageContent.title,
            shortDescription: toothbrushPageContent.shortDescription,
          }}
          productDetails={{
            whatYouGet: toothbrushPageContent.whatYouGet,
            benefits: toothbrushPageContent.benefits,
            instructions: toothbrushPageContent.instructions,
            materials: toothbrushPageContent.materials,
          }}
        />
        <ToothbrushDetailsContent />
      </main>
      <Footer />
      <StickyBottomBar />
    </div>
  );
}

