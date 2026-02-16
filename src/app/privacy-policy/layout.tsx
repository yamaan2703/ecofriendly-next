import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Eco-friendly Shop",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information when you shop with us.",
  alternates: {
    canonical: "https://ecofriendlyshop.us/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

