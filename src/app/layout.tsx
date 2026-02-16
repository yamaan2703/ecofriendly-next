import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EcoFriendly - Sustainable Living Solutions",
    template: "%s | EcoFriendly",
  },
  description: "Discover eco-friendly products and sustainable living solutions. Join us in making the world a better place through environmentally conscious choices.",
  keywords: ["eco-friendly", "sustainable", "green living", "environment", "renewable energy", "eco products"],
  authors: [{ name: "EcoFriendly Team" }],
  creator: "EcoFriendly",
  publisher: "EcoFriendly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "EcoFriendly",
    title: "EcoFriendly - Sustainable Living Solutions",
    description: "Discover eco-friendly products and sustainable living solutions. Join us in making the world a better place through environmentally conscious choices.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EcoFriendly - Sustainable Living Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoFriendly - Sustainable Living Solutions",
    description: "Discover eco-friendly products and sustainable living solutions.",
    images: ["/og-image.jpg"],
    creator: "@ecofriendly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
