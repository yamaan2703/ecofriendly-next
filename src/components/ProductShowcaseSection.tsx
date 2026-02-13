import React from "react";
import {
  Star,
  CheckCircle,
  Globe,
  Feather,
  ShieldOff,
  RotateCcw,
  Sparkles,
  Shield,
  Zap,
  Droplets,
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

// Icon mapping for features
const featureIconMap: Record<string, React.ElementType> = {
  "Eco Friendly": Globe,
  "Super Soft": Feather,
  "Plastic Free": ShieldOff,
  "30 Days Return": RotateCcw,
  "Premium Quality": Star,
  "Ultra Gentle": Feather,
  "Whitening Effect": Star,
  "Luxury Guarantee": CheckCircle,
  "Soft Bristles": Feather,
  "Safe on All Surfaces": Shield,
  "Naturally Powerful": Zap,
  "Keeps Dishes Spotless": Droplets,
};

const ProductShowcaseSection: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden px-4 sm:px-6 lg:px-8">
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
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-6 sm:mb-8">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg">
              {/* Multiple Decorative Backgrounds */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-6 md:-left-6 w-full h-full bg-[#84B350] rounded-[2rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] opacity-20"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-2.5 sm:-left-2.5 md:-bottom-3 md:-left-3 w-full h-full bg-[#DCE7C8] rounded-[1.75rem] sm:rounded-[1.875rem] md:rounded-[2rem] opacity-40"></div>

              {/* Main Image Container */}
              <div className="relative bg-[#DCE7C8] rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-lg sm:shadow-xl border border-primary/20">
                <img
                  src={content.productShowcase.image}
                  alt={content.productShowcase.imageAlt}
                  width={800}
                  height={800}
                  className="w-full h-auto object-contain"
                />

                {/* Floating Badge */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 bg-primary text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-md sm:shadow-lg">
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-bold">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-eurotypo leading-tight">
              {content.productShowcase.title}{" "}
              <span className="text-primary italic">
                {content.productShowcase.subtitle}
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              {
                content.productShowcase.description.split(
                  content.productShowcase.highlightText
                )[0]
              }
              <span className="text-primary font-semibold">
                {content.productShowcase.highlightText}
              </span>
              {
                content.productShowcase.description.split(
                  content.productShowcase.highlightText
                )[1]
              }
            </p>

            {/* Guarantees */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4 sm:mt-6">
              {content.productShowcase.guarantees.map((guarantee, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs bg-[#DCE7C8]/70 text-muted-foreground px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span className="whitespace-nowrap">{guarantee.text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {content.features3.map((feature, index) => (
            <div
              key={index}
              className="bg-[#DCE7C8] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all border border-transparent hover:border-primary/50"
            >
              <div className="space-y-2">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center shadow-md sm:shadow-lg mx-auto lg:mx-0">
                  {featureIconMap[feature.label] ? (
                    // Use mapped icon component
                    React.createElement(featureIconMap[feature.label], {
                      className: "w-4 h-4 sm:w-5 sm:h-5 text-white",
                    })
                  ) : (
                    // Fallback icon
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary font-eurotypo text-center lg:text-left">
                  {feature.label}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed text-center lg:text-left">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#84B350]/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ProductShowcaseSection;
