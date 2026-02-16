import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Eco-friendly Shop",
  description: "Find answers to common questions about our eco-friendly products, shipping, returns, and sustainable living practices.",
  keywords: ["FAQ", "eco-friendly questions", "sustainable products FAQ", "shipping info", "returns policy"],
  alternates: {
    canonical: "https://ecofriendlyshop.us/faq",
  },
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Eco-friendly Shop",
    description: "Find answers to common questions about our eco-friendly products, shipping, returns, and sustainable living practices.",
    url: "https://ecofriendlyshop.us/faq",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

