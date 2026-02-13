import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";

// BlogPost Type
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

// BlogCard Component
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const navigate = useNavigate();
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getImageUrl = (filename: string) => {
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${filename}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group h-full">
      <div className="h-full bg-[#DCE7C8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-primary">
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden bg-white">
          {post.featured_image ? (
            <img
              src={getImageUrl(post.featured_image)}
              alt={post.blog_title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#DCE7C8]">
              <div className="text-center">
                <BsBookmarkHeart className="w-16 h-16 text-[#005655] mx-auto mb-3" />
                <p className="text-[#005655] font-bold text-lg">Eco Story</p>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          <div className="absolute top-3 right-3 bg-[#005655] px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-bold text-white">Featured</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs mb-3 pb-3 border-b border-primary">
            <div className="flex items-center gap-1.5 text-gray-700">
              <FiUser className="w-3.5 h-3.5 text-[#005655]" />
              <span className="font-medium">{post.author_name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <FiClock className="w-3.5 h-3.5 text-[#005655]" />
              <span className="font-medium">{post.read_time} min</span>
            </div>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-600 mb-2">
            {formatDate(post.created_at)}
          </p>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 font-eurotypo mb-3 line-clamp-2 leading-tight">
            {post.blog_title}
          </h3>

          {/* Read More Button */}
          <button
            onClick={() => navigate(`/blog/${post.id}`)}
            className="inline-flex items-center gap-2 text-[#005655] font-bold text-sm hover:gap-3 transition-all"
          >
            <span>Read Article</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader
const BlogCardSkeleton: React.FC = () => (
  <div className="h-full bg-white rounded-3xl overflow-hidden shadow-md border-2 border-gray-100">
    <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse"></div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
      <div className="space-y-3 mb-5">
        <div className="h-7 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-7 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
    </div>
  </div>
);

// Blog Page
const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", "https://ecofriendlyshop.us/blog");

    // Cleanup on unmount
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
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogPosts(data as BlogPost[]);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Leaves */}
      <div className="absolute right-0 top-32 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 z-0 pointer-events-none">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>
      <div className="absolute left-0 top-32 w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 z-0 pointer-events-none rotate-180">
        <img
          src="/images/leaf_2.png"
          alt="Decorative leaves"
          className="w-full h-full object-contain object-right"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-4 border-primary rotate-12"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-primary/30 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-6 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HiOutlineSparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold text-sm">
                Latest Articles
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground font-eurotypo mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Eco
              <span className="text-primary italic"> Insights</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore stories, tips, and insights on sustainable living. Join
              thousands discovering how small changes create big impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BsBookmarkHeart className="w-20 h-20 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-3">
                No Articles Yet
              </h3>
              <p className="text-muted-foreground text-lg">
                We're crafting amazing eco-friendly content for you. Check back
                soon!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
