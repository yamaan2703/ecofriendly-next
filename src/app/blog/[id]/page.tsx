import React from "react";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import BlogDetailClient from "./BlogDetailClient";

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
  slug?: string | null; // Database se slug field (optional)
  url?: string | null; // Database se URL field (optional)
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  try {
    // Database id field is already a slug, query directly by id
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .eq("status", true)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }

    return data as BlogPost | null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Required for static export (output: 'export') – must be on the page that owns [id]
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const supabase = createServerClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("id")
      .eq("status", true);

    if (error || !data) {
      console.error("Error fetching blog IDs for static generation:", error);
      return [];
    }

    return data.map((blog) => ({ id: blog.id }));
  } catch {
    return [];
  }
}

export const dynamicParams = false;

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogPost = await getBlogPost(id);

  if (!blogPost) {
    notFound();
  }

  // Database id field is already a slug, use it directly
  const slug = blogPost.id;
  const imageUrl = blogPost.featured_image
    ? `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${blogPost.featured_image}`
    : "/og-image.jpg";

  // Create JSON-LD schema for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogPost.blog_title,
    description: blogPost.meta_description || blogPost.blog_title,
    image: imageUrl,
    datePublished: blogPost.created_at,
    dateModified: blogPost.updated_at || blogPost.created_at,
    author: {
      "@type": "Person",
      name: blogPost.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "Ecofriendly Shop",
      logo: {
        "@type": "ImageObject",
        url: "https://ecofriendlyshop.us/images/ecofriendly_dark.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ecofriendlyshop.us/blog/${slug}`,
    },
    articleBody: blogPost.content,
    timeRequired: `PT${blogPost.read_time}M`,
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hidden content for SEO - visible in view source */}
      <div style={{ display: "none" }}>
        <h1>{blogPost.blog_title}</h1>
        <p>{blogPost.meta_description || blogPost.blog_title}</p>
        <p>Author: {blogPost.author_name}</p>
        <p>Published: {new Date(blogPost.created_at).toLocaleDateString()}</p>
        <p>Read Time: {blogPost.read_time} minutes</p>
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </div>
      <BlogDetailClient blogPost={blogPost} />
    </>
  );
}
