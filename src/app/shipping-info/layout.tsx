import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Exchange Information - Eco-friendly Shop",
  description: "Learn about our shipping policies, delivery times, and exchange procedures for eco-friendly products.",
  alternates: {
    canonical: "https://ecofriendlyshop.us/shipping-info",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShippingInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

