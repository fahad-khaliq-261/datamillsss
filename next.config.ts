import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from any HTTPS source (useful for admin-uploaded content)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS hosts
      },
    ],
  },
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize package imports
  experimental: {
    optimizePackageImports: ["@supabase/supabase-js"],
  },
};

export default nextConfig;
