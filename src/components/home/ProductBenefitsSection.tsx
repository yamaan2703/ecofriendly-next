"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Globe,
  Hand,
  Leaf,
  Luggage,
  Package,
  Recycle,
  Shield,
  Sparkles,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { BenefitItem } from "@/data/home-page-content";

interface ProductBenefitsSectionProps {
  title: string;
  description: string;
  left: BenefitItem[];
  right: BenefitItem[];
  image: string;
  imageAlt: string;
}

const benefitIcons: Record<string, LucideIcon> = {
  "SOFT FOR GUMS": Hand,
  "NATURAL WHITENING": Sparkles,
  "COMFORTABLE GRIP": Hand,
  "TRAVEL-SAFE": Luggage,
  "NATURAL MATERIALS": Leaf,
  "MINIMAL PACKAGING MATERIAL": Package,
  "A LOT LESS WASTE": Recycle,
  "SAFE FOR COOKWARE": Shield,
  "QUICK-DRYING": Wind,
  "ROBUST HANDLE": Leaf,
  "GOOD FOR THE PLANET": Globe,
  "EASY TO HANG": Droplets,
};

function BenefitCard({ benefit, index }: { benefit: BenefitItem; index: number }) {
  const Icon = benefitIcons[benefit.title] ?? Leaf;

  return (
    <motion.div
      className="flex flex-col items-center px-3 py-6 text-center sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Icon className="mb-3 h-5 w-5 stroke-[1.25] text-foreground sm:h-6 sm:w-6" />

      <h3 className="max-w-[220px] text-xs font-bold uppercase leading-snug tracking-[0.08em] text-foreground sm:text-sm">
        {benefit.title}
      </h3>

      <p className="mt-1 max-w-[240px] text-xs font-normal leading-relaxed text-muted-foreground">
        {benefit.description}
      </p>
    </motion.div>
  );
}

export function ProductBenefitsSection({
  title,
  description,
  left,
  right,
  image,
  imageAlt,
}: ProductBenefitsSectionProps) {
  return (
    <section className="relative bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-sm font-normal leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="space-y-2 lg:col-span-3 lg:space-y-0">
            {left.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center bg-transparent px-2 py-2 sm:px-4">
              <img
                src={image}
                alt={imageAlt}
                className="mx-auto h-auto w-full max-h-[420px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] sm:max-h-[480px] lg:max-h-[540px] xl:max-h-[580px]"
              />
            </div>
          </motion.div>

          <div className="space-y-2 lg:col-span-3 lg:space-y-0">
            {right.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                index={index + left.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
