"use client";

import { motion } from "framer-motion";
import { ProductBenefitsSection } from "@/components/home/ProductBenefitsSection";
import { ProductHighlightsSection } from "@/components/product/ProductHighlightsSection";
import { ProductPageFaqSection } from "@/components/product/ProductPageFaqSection";
import { ProductReviewsSection } from "@/components/product/ProductReviewsSection";
import { dishbrushPageContent } from "@/data/dishbrush-page-content";

export function DishBrushDetailsContent() {
  const { longDescription, highlights, brushBetter, reviews, faq } =
    dishbrushPageContent;

  return (
    <>
      <section className="border-t border-primary/10 bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {longDescription.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-4 text-sm leading-relaxed text-muted-foreground last:mb-0 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductHighlightsSection items={highlights} />

      <ProductBenefitsSection
        title={brushBetter.title}
        description=""
        left={brushBetter.left}
        right={brushBetter.right}
        image={brushBetter.image}
        imageAlt={brushBetter.imageAlt}
      />

      <ProductReviewsSection
        title={reviews.title}
        description={reviews.description}
        items={reviews.items}
      />

      <ProductPageFaqSection
        title={faq.title}
        description={faq.description}
        items={faq.items}
      />
    </>
  );
}
