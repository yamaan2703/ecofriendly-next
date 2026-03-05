import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase-server";

// Required for static export (output: 'export') – pre-generate all blog paths
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

interface BlogPost {
  id: string;
  blog_title: string;
  meta_description: string;
  featured_image: string;
  slug?: string | null; // Database se slug field (optional)
  url?: string | null; // Database se URL field (optional)
}

const titleToSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const supabase = createServerClient();
  if (!supabase) return null;
  
  try {
    // Database id field is already a slug, query directly by id
    const { data, error } = await supabase
      .from("blogs")
      .select("id, blog_title, meta_description, featured_image")
      .eq("id", id)
      .eq("status", true)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blogPost = await getBlogPost(id);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found - Eco-friendly Shop",
      description: "The blog post you are looking for could not be found.",
    };
  }

  // Database id field is already a slug, use it directly
  const slug = blogPost.id;
  const imageUrl = blogPost.featured_image
    ? `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${blogPost.featured_image}`
    : "/og-image.jpg";

  return {
    title: `${blogPost.blog_title} | Ecofriendly Shop`,
    description: blogPost.meta_description || blogPost.blog_title,
    keywords: ["eco-friendly blog", "sustainable living", blogPost.blog_title],
    alternates: {
      canonical: `https://ecofriendlyshop.us/blog/${slug}`,
    },
    openGraph: {
      title: `${blogPost.blog_title} | Ecofriendly Shop`,
      description: blogPost.meta_description || blogPost.blog_title,
      url: `https://ecofriendlyshop.us/blog/${slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blogPost.blog_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogPost.blog_title} | Ecofriendly Shop`,
      description: blogPost.meta_description || blogPost.blog_title,
      images: [imageUrl],
    },
  };
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

