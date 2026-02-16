import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Eco-friendly Shop",
  description: "Manage your account, view order history, and update your preferences for a personalized eco-friendly shopping experience.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

