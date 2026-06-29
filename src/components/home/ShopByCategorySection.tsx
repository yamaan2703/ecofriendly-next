"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homePageContent } from "@/data/home-page-content";

export function ShopByCategorySection() {
  const { categories } = homePageContent;

  return (
    <section id="products" className="relative bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {categories.title}
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {categories.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {categories.items.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full w-full max-w-[280px] sm:w-[calc(50%-0.625rem)] sm:max-w-[300px] lg:w-[calc(25%-0.9375rem)]"
            >
              <Link
                href={category.href}
                className="group flex h-full flex-col overflow-hidden border border-primary/15 bg-transparent transition-shadow hover:shadow-md"
              >
                <div className="bg-transparent px-3 pb-1 pt-4 sm:px-4 sm:pt-5">
                  <h3 className="text-[10px] font-semibold uppercase leading-snug tracking-[0.1em] text-foreground sm:text-xs">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-1 items-center justify-center bg-transparent px-3 py-6 sm:px-4 sm:py-8">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="max-h-32 w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-[1.03] sm:max-h-36 lg:max-h-40"
                  />
                </div>

                <div className="bg-primary py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors group-hover:bg-primary-light sm:py-3.5 sm:text-xs">
                  Shop Now
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
