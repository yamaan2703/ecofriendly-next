import React from "react";
import { useContent } from "@/contexts/ContentContext";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ProductDetailingSection: React.FC = () => {
  const { content, currentPage } = useContent();

  // Choose the appropriate image based on the current product
  const productImage =
    currentPage === "home1" ? "/images/brush_rock.png" : "/images/dish-set.png";

  const leftFeatures = content.features2.slice(
    0,
    Math.ceil(content.features2.length / 2)
  );
  const rightFeatures = content.features2.slice(
    Math.ceil(content.features2.length / 2)
  );

  return (
    <section
      id="products"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute left-0 top-0 w-64 h-64 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_1.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-left"
        />
      </div>
      <div className="absolute right-0 bottom-0 w-64 h-64 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 z-0 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground font-eurotypo">
            {content.features.title}{" "}
            <span className="text-primary italic">
              {content.features.subtitle}
            </span>
          </h2>
        </div>

        {/* Custom Flex Layout instead of equal grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-0">
          {/* Left Features */}
          <div className="flex-1 max-w-xs sm:max-w-sm w-full space-y-2 sm:space-y-3 text-left lg:text-right order-1 lg:order-1">
            {leftFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center lg:justify-end gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div className="block lg:hidden text-primary rounded-full p-1.5 sm:p-2 group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                  <FaArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1 text-left lg:text-right">
                  <h3 className="text-xs sm:text-sm font-semibold text-primary mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-[10px] sm:text-xs leading-relaxed">
                    {feature.description ||
                      "Eco-friendly, reliable, and designed for your comfort."}
                  </p>
                </div>
                <div className="hidden lg:block text-primary rounded-full p-1.5 sm:p-2 group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                  <FaArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Center Image (Larger Width) */}
          <div className="flex-[1.6] flex justify-center relative order-2 lg:order-2 my-4 lg:my-0">
            <img
              src={productImage}
              alt={
                currentPage === "home1" ? "Bamboo Toothbrush" : "Dish Brush Set"
              }
              className="relative z-10 w-full max-w-[250px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[950px] h-auto object-contain drop-shadow-xl sm:drop-shadow-2xl"
            />
          </div>

          {/* Right Features */}
          <div className="flex-1 max-w-xs sm:max-w-sm w-full space-y-2 sm:space-y-3 text-left order-3 lg:order-3">
            {rightFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div className="text-primary rounded-full p-1.5 sm:p-2 group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                  <FaArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-primary mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-[10px] sm:text-xs leading-relaxed">
                    {feature.description ||
                      "Experience the best build quality and sustainability."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailingSection;
