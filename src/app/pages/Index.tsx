import { useEffect } from "react";
import ProductSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductDetailingSection from "@/components/ProductDetailSection";
import HeroSection from "@/components/HeroSection";
import ProductSpecSection from "@/components/SpecificationSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";
import StickyBottomBar from "@/components/StickyBottomBar";
import { useContent } from "@/contexts/ContentContext";

const Index = () => {
  const { switchToHome1, switchToHome2 } = useContent();

  useEffect(() => {
    // Check URL parameters to determine which product view to show
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");

    console.log("Current URL:", window.location.href);
    console.log("View parameter:", view);

    if (view === "toothbrush") {
      console.log("Switching to toothbrush view");
      switchToHome1();
      // Clear the URL parameter after switching
      window.history.replaceState({}, document.title, "/");
    } else if (view === "dishwasher") {
      console.log("Switching to dishwasher view");
      switchToHome2();
      // Clear the URL parameter after switching
      window.history.replaceState({}, document.title, "/");
    }
  }, [switchToHome1, switchToHome2]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* <main>
        <HeroSection />
        <ProductSection />
        <BenefitsSection />
        <FeaturesSection />
        <ProductDetailingSection />
        <ProductSpecSection />
        <ProductShowcaseSection />
        <NewsLetter />
      </main> */}
      {/* <Footer /> */}
      {/* <StickyBottomBar /> */}
    </div>
  );
};

export default Index;
