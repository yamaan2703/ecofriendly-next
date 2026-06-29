"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, User } from "lucide-react";

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
  slug?: string | null;
  url?: string | null;
}

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({
  post,
  index,
}) => {
  const slug = post.id;

  const getImageUrl = (filename: string) =>
    `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${filename}`;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/blog/${slug}`}
        className="group flex h-full flex-col overflow-hidden border border-primary/15 bg-background transition-shadow hover:shadow-md"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-[#DCE7C8]">
          {post.featured_image ? (
            <img
              src={getImageUrl(post.featured_image)}
              alt={post.blog_title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl">🌿</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {post.primary_keyword && (
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
              {post.primary_keyword}
            </p>
          )}

          <h3 className="mb-3 line-clamp-2 text-base font-bold leading-snug text-foreground sm:text-lg">
            {post.blog_title}
          </h3>

          <div className="mt-auto border-t border-primary/10 pt-3">
            <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                {post.author_name}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {post.read_time} min read
              </span>
              <span className="ml-auto text-[11px]">
                {formatDate(post.created_at)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
              <span>Read Article</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogCardSkeleton: React.FC = () => (
  <div className="flex h-full flex-col overflow-hidden border border-primary/15 bg-background">
    <div className="h-52 animate-pulse bg-primary/8"></div>
    <div className="flex-1 p-5">
      <div className="mb-2 h-3 w-20 animate-pulse rounded bg-primary/10"></div>
      <div className="mb-1 h-5 animate-pulse rounded bg-primary/10"></div>
      <div className="mb-4 h-5 w-3/4 animate-pulse rounded bg-primary/10"></div>
      <div className="mt-auto border-t border-primary/10 pt-3">
        <div className="mb-3 flex gap-4">
          <div className="h-3 w-20 animate-pulse rounded bg-primary/10"></div>
          <div className="h-3 w-16 animate-pulse rounded bg-primary/10"></div>
        </div>
        <div className="h-4 w-28 animate-pulse rounded bg-primary/10"></div>
      </div>
    </div>
  </div>
);

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", "https://ecofriendlyshop.us/blog");

    return () => {
      const linkToRemove = document.querySelector('link[rel="canonical"]');
      if (
        linkToRemove &&
        linkToRemove.getAttribute("href") === "https://ecofriendlyshop.us/blog"
      ) {
        linkToRemove.remove();
      }
    };
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", true)
        .order("created_at", { ascending: false });

      if (!error) setBlogPosts((data as BlogPost[]) || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-background px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              From Our Journal
            </p>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Eco Insights
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore stories, tips, and insights on sustainable living. Join
              thousands discovering how small changes create big impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <motion.div
              className="py-20 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Coming Soon
              </p>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                No Articles Yet
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                We're crafting amazing eco-friendly content for you. Check back
                soon!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
