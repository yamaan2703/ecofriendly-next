import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - Eco-friendly Shop",
  description: "Review your eco-friendly products in your shopping cart. Complete your sustainable shopping experience with our plastic-free products.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

