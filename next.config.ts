import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Static export configuration for Hostinger
  output: 'export',

  // SEO Optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization - unoptimized for static export
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // No trailing slash on URLs (e.g. /blog/slug instead of /blog/slug/)
  trailingSlash: false,

  // Note: Headers are not supported in static export
  // They need to be configured on the hosting server (Hostinger)
};

export default nextConfig;
