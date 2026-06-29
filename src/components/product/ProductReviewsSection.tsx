"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { ProductReview } from "@/data/toothbrush-page-content";

interface ProductReviewsSectionProps {
  title: string;
  description?: string;
  items: ProductReview[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
            index < rating
              ? "fill-[#DCE7C8] text-[#DCE7C8]"
              : "fill-transparent text-primary-foreground/25"
          }`}
        />
      ))}
    </div>
  );
}

export function ProductReviewsSection({
  title,
  description,
  items,
}: ProductReviewsSectionProps) {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-10 text-center sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {title.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((review, index) => (
            <motion.article
              key={review.title}
              className="flex flex-col overflow-hidden bg-primary shadow-[2px_6px_16px_rgba(0,64,63,0.22)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
                <p className="line-clamp-2 text-sm font-bold leading-snug text-primary-foreground sm:text-[15px]">
                  &ldquo;{review.title}&rdquo;
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-primary-foreground/90 sm:text-[15px]">
                  {review.description}
                </p>
              </div>

              <div className="mt-auto border-t border-primary-foreground/20 px-5 py-4 sm:px-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground sm:text-sm">
                  {review.author}
                </p>
                <div className="mt-2">
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
