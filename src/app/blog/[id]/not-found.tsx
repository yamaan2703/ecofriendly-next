"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BsBookmarkHeart } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute right-0 top-32 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 z-0 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="absolute left-0 bottom-32 w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 z-0 pointer-events-none rotate-180">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <Navbar />
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BsBookmarkHeart className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground font-eurotypo mb-4">
          Article Not Found
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <motion.button
          onClick={() => router.push("/blog")}
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Blog
        </motion.button>
      </motion.div>
      <Footer />
    </div>
  );
}

