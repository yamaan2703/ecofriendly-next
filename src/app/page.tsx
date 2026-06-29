"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { ShopByCategorySection } from "@/components/home/ShopByCategorySection";
import { ProductBenefitsSection } from "@/components/home/ProductBenefitsSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { homePageContent } from "@/data/home-page-content";

export default function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash === "#products") {
      const productsSection = document.getElementById("products");
      productsSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HomeHeroSection />
      <ShopByCategorySection />
      <ProductBenefitsSection
        title={homePageContent.toothbrushBenefits.title}
        description={homePageContent.toothbrushBenefits.description}
        left={homePageContent.toothbrushBenefits.left}
        right={homePageContent.toothbrushBenefits.right}
        image="/images/Toothbrush Featured image.png"
        imageAlt="Bamboo toothbrush benefits"
      />
      <ProductBenefitsSection
        title={homePageContent.dishBrushBenefits.title}
        description={homePageContent.dishBrushBenefits.description}
        left={homePageContent.dishBrushBenefits.left}
        right={homePageContent.dishBrushBenefits.right}
        image="/images/DIsh Brush Featured Image.png"
        imageAlt="Bamboo dish brush benefits"
      />
      <HomeFaqSection />
      <Footer />
    </div>
  );
}
