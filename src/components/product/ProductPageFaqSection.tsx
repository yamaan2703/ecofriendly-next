"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ProductFaqItem } from "@/data/toothbrush-page-content";

interface ProductPageFaqSectionProps {
  title: string;
  description?: string;
  items: ProductFaqItem[];
}

export function ProductPageFaqSection({
  title,
  description,
  items,
}: ProductPageFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="mb-10 text-center sm:mb-12"
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </motion.div>

        <div className="divide-y divide-primary/10 border-y border-primary/10">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ y: 8 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-primary sm:py-6"
                >
                  <span
                    className={`text-sm font-semibold leading-snug sm:text-base ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground sm:pb-6 sm:text-[15px]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
