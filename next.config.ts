import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (!config.resolve) config.resolve = { alias: {} };

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@/convex': path.resolve(__dirname, 'convex'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/api': path.resolve(__dirname, 'src/api'),
    };

    return config;
  },
};

export default nextConfig;
