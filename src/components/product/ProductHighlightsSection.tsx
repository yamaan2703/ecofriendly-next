"use client";

import { motion } from "framer-motion";
import { Globe, Leaf, Package, Recycle, type LucideIcon } from "lucide-react";
import type { ProductHighlight } from "@/data/toothbrush-page-content";

const highlightIcons: LucideIcon[] = [Leaf, Package, Recycle, Globe];

interface ProductHighlightsSectionProps {
  items: ProductHighlight[];
}

export function ProductHighlightsSection({
  items,
}: ProductHighlightsSectionProps) {
  return (
    <section className="bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-primary/15 bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((highlight, index) => {
            const Icon = highlightIcons[index] ?? Leaf;

            return (
              <motion.article
                key={highlight.title}
                className="flex h-full flex-col bg-[#FFFFDD] px-6 py-8 sm:px-7 sm:py-9"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                  <Icon
                    className="h-[18px] w-[18px] text-primary"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-primary sm:text-[13px]">
                  {highlight.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-[15px]">
                  {highlight.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
