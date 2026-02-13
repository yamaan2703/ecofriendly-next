import React from "react";
import { Check, Leaf, Shield, Heart, Users, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

const BenefitsSection: React.FC = () => {
  const { content, currentPage } = useContent();

  // Choose the appropriate image based on the current product
  const productImage =
    currentPage === "home1" ? "/images/teeth.png" : "/images/dish-benefits.png";

  return (
    <section
      id="benefits"
      className="py-12 sm:py-16 md:py-20 bg-background relative px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute left-0 top-0 w-64  h-64 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 z-0 pointer-events-none">
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
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-eurotypo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {content.benefits.title}
            </motion.span>
            <motion.div
              // className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
              className="rounded-full"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={productImage}
                alt={currentPage === "home1" ? "Teeth" : "Dish Brush"}
                className="w-full h-full rounded-full object-contain"
              />
            </motion.div>
            <motion.span
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-eurotypo italic"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {content.benefits.subtitle}
            </motion.span>
          </motion.div>
          {content.benefits.description && (
            <motion.p
              className="text-sm sm:text-base md:text-lg text-muted-foreground mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content.benefits.description}
            </motion.p>
          )}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {content.benefits.items.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-[#DCE7C8] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md sm:shadow-lg hover:shadow-xl transition-shadow hover:border border-primary"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <div className="space-y-2">
                {/* Icon */}
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary font-eurotypo">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Modern Gradient Style */}
        <motion.div
          className="relative bg-[#DCE7C8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-lg sm:shadow-2xl overflow-hidden backdrop-blur-md border border-primary/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Subtle background decorative blur */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-70 pointer-events-none" />

          {/* Heading */}
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-dark mb-3 sm:mb-4 font-eurotypo italic drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {content.benefits.ctaTitle ||
              "Take the Step Toward a Greener Smile 🌱"}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {content.benefits.ctaDescription ||
              "Switch to sustainable oral care and join thousands who've made the planet-friendly choice."}
          </motion.p>

          {/* Features List */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              "30-day money back guarantee",
              "Free worldwide shipping",
              "Eco-certified materials",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full shadow-sm border border-primary/20 backdrop-blur-sm transition-all hover:bg-primary-light/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.4 + 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-primary flex items-center justify-center rounded-full shadow-md"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.div>
                <span className="font-medium text-gray-700 text-xs sm:text-sm">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="group relative bg-primary text-white font-semibold py-3 px-6 sm:py-3.5 sm:px-8 md:py-4 md:px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.8 }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
              >
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </motion.div>
              <span className="whitespace-nowrap">Start Your Eco Journey</span>
            </span>
            {/* Gradient glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-light to-primary-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
