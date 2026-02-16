import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Eco-friendly Tips & Sustainable Living",
  description: "Discover eco-friendly tips, sustainable living guides, and green product reviews. Join our community in making the world a better place through environmentally conscious choices.",
  keywords: ["eco-friendly blog", "sustainable living", "green tips", "environmental blog", "eco products"],
  alternates: {
    canonical: "https://ecofriendlyshop.us/blog",
  },
  openGraph: {
    title: "Blog - Eco-friendly Tips & Sustainable Living",
    description: "Discover eco-friendly tips, sustainable living guides, and green product reviews.",
    url: "https://ecofriendlyshop.us/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Eco-friendly Tips & Sustainable Living",
    description: "Discover eco-friendly tips, sustainable living guides, and green product reviews.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

