"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuillDisplay from "@/components/QuillDisplay";

interface BlogPost {
  id: string;
  blog_title: string;
  content: string;
  author_name: string;
  created_at: string;
  read_time: number;
  featured_image: string;
  meta_description: string;
  primary_keyword: string;
  status: boolean;
  updated_at: string | null;
}

interface BlogDetailClientProps {
  blogPost: BlogPost;
}

export default function BlogDetailClient({ blogPost }: BlogDetailClientProps) {
  const router = useRouter();

  const getImageUrl = (filename: string) =>
    `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${filename}`;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back link */}
          <motion.button
            onClick={() => router.push("/blog")}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            initial={{ x: -6 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {blogPost.primary_keyword && (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {blogPost.primary_keyword}
              </p>
            )}

            <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {blogPost.blog_title}
            </h1>

            {/* Meta row */}
            <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-primary/10 pb-8">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Written by</p>
                  <p className="text-sm font-bold text-foreground">
                    {blogPost.author_name}
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-border" />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(blogPost.created_at)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>{blogPost.read_time} min read</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          {blogPost.featured_image && (
            <motion.div
              className="mb-12 overflow-hidden border border-primary/15"
              initial={{ y: 14 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={getImageUrl(blogPost.featured_image)}
                alt={blogPost.blog_title}
                className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display =
                    "none";
                }}
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.article
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="prose prose-lg max-w-none">
              <QuillDisplay
                content={blogPost.content}
                className="text-foreground leading-relaxed"
              />
            </div>
          </motion.article>

          {/* Bottom CTA */}
          <motion.div
            className="mt-14 flex flex-col items-center justify-between gap-5 bg-[#DCE7C8] p-7 sm:flex-row sm:p-8"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <p className="mb-1 font-bold text-foreground">
                Enjoyed this article?
              </p>
              <p className="text-sm text-muted-foreground">
                Explore more eco-friendly insights from our journal.
              </p>
            </div>
            <button
              onClick={() => router.push("/blog")}
              className="inline-flex shrink-0 items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-light"
            >
              <ArrowLeft className="h-4 w-4" />
              More Articles
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
