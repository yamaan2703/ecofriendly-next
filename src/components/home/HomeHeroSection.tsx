"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { homePageContent } from "@/data/home-page-content";

export function HomeHeroSection() {
  const { hero } = homePageContent;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src={hero.bannerImage}
        alt="Eco-friendly bamboo toothbrush and dish brush products"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%] sm:object-center"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pt-36">
        <motion.div
          className="max-w-lg sm:max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:text-xs">
            Planet-positive essentials
          </p>

          <h1 className="text-3xl font-semibold leading-[1.12] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-4xl lg:text-6xl">
            {hero.subheading}
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] sm:mt-4 sm:text-[15px]">
            {hero.description}
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap">
            {hero.ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="group inline-flex w-fit items-center justify-center gap-1.5 rounded-md bg-[#DCE7C8] px-4 py-2 text-xs font-semibold text-primary shadow-sm transition-all hover:bg-white sm:px-4 sm:py-2.5 sm:text-sm"
              >
                {cta.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
