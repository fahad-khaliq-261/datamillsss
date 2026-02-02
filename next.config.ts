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
};

export default nextConfig;
