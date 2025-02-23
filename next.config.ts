import type { Configuration as WebpackConfig } from "webpack";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  optimizeFonts: true,
  
  // Add proper routing configuration
  async rewrites() {
    return [
      {
        source: '/tasks/:id',
        destination: '/tasks/[id]',
      },
    ];
  },

  // Remove redirects as they might interfere
  async redirects() {
    return [];
  },

  // Keep your optimization configs
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        // Configure Turbopack rules here
      },
    },
  },

  webpack: (config: WebpackConfig, { dev, isServer }) => {
    if (!dev && !isServer) {
      if (typeof config.cache === "object") {
        config.cache = {
          type: "filesystem",
          buildDependencies: {
            config: [__filename],
          },
        };
      }

      config.optimization = {
        ...config.optimization,
        runtimeChunk: {
          name: "runtime",
        },
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: "lib",
              chunks: "all",
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
