import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Eco-friendly Shop",
  description: "Review our terms and conditions to understand the rules and regulations for using our eco-friendly shop website and services.",
  alternates: {
    canonical: "https://ecofriendlyshop.us/terms-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

