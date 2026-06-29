import type { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
    google: "ZLH3FbOu6mqLMQaQzSP3QSpI6FLYF1jOVEp8RM-qLSU",
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
        <meta name="theme-color" content="#ffffff" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${openSans.variable} ${openSans.className} antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "q28sc66yxa");`,
          }}
        />
        {/* Ensure content is visible when JavaScript is disabled (crawlers, Network preview) */}
        <noscript dangerouslySetInnerHTML={{ __html: '<style>body *{opacity:1!important;transform:none!important;animation:none!important}</style>' }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
