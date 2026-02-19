import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/Warframe-Affinity-Tracker/' : '',
  basePath: isProd ? '/Warframe-Affinity-Tracker' : '',
};


export default nextConfig;
