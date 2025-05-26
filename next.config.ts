import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.PRODUCT_IMAGE_HOST || 'localhost',
      },
    ],
  },
};

export default nextConfig;
