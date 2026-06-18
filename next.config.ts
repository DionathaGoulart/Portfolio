import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  allowedDevOrigins: ['192.168.0.6', 'localhost'],
};

export default nextConfig;
