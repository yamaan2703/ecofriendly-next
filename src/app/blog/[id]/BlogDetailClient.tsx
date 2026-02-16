"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    FiClock,
    FiUser,
    FiArrowLeft,
    FiCalendar,
} from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BiBookReader } from "react-icons/bi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuillDisplay from "@/components/QuillDisplay";

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

interface BlogDetailClientProps {
    blogPost: BlogPost;
}

export default function BlogDetailClient({ blogPost }: BlogDetailClientProps) {
    const router = useRouter();

    const getImageUrl = (filename: string) => {
        return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${filename}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

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
            <div className="absolute left-0 bottom-32 w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 z-0 pointer-events-none rotate-180">
                <img
                    src="/images/leaf_2.png"
                    alt="Decorative leaves"
                    className="w-full h-full object-contain object-right"
                />
            </div>

            <Navbar />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-eurotypo mb-8 leading-tight">
                        {blogPost.blog_title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <FiUser className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Written by</p>
                                <p className="font-bold text-foreground">
                                    {blogPost.author_name}
                                </p>
                            </div>
                        </div>

                        <div className="w-px h-12 bg-border"></div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <FiCalendar className="w-5 h-5 text-primary" />
                            <span className="font-medium">
                                {formatDate(blogPost.created_at)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <FiClock className="w-5 h-5 text-primary" />
                            <span className="font-medium">{blogPost.read_time} min read</span>
                        </div>
                    </div>

                    {/* Featured Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <HiOutlineSparkles className="w-5 h-5 text-primary" />
                        <span className="text-primary font-bold text-sm">
                            Featured Article
                        </span>
                    </motion.div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {blogPost.featured_image ? (
                        <img
                            src={getImageUrl(blogPost.featured_image)}
                            alt={blogPost.blog_title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const nextElement = e.currentTarget
                                    .nextElementSibling as HTMLElement;
                                if (nextElement) {
                                    nextElement.style.display = "flex";
                                }
                            }}
                        />
                    ) : null}
                    <div
                        className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 ${blogPost.featured_image ? "hidden" : "flex"
                            }`}
                    >
                        <div className="text-center">
                            <BiBookReader className="w-24 h-24 text-primary mx-auto mb-4" />
                            <p className="text-primary font-bold text-xl">Eco Story</p>
                        </div>
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.article
                    className=""
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <div className="prose prose-lg max-w-none">
                        <QuillDisplay
                            content={blogPost.content}
                            className="text-foreground leading-relaxed"
                        />
                    </div>
                </motion.article>

                {/* Bottom Actions */}
                <motion.div
                    className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#DCE7C8] rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="flex items-center gap-4">
                        <BsBookmarkHeart className="w-8 h-8 text-primary" />
                        <div>
                            <p className="font-bold text-foreground text-lg">
                                Enjoyed this article?
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Share it with your friends!
                            </p>
                        </div>
                    </div>
                    <motion.button
                        onClick={() => router.push("/blog")}
                        className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Read More Articles</span>
                        <FiArrowLeft className="w-5 h-5 rotate-180" />
                    </motion.button>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

