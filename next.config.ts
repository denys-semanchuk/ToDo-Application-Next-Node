import type { Configuration as WebpackConfig } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["geist"],
  poweredByHeader: false,
  pageExtensions: ['tsx', 'ts'],
  optimizeFonts: true,
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
      if (typeof config.cache === 'object') {
        config.cache = {
          type: 'filesystem',
          buildDependencies: {
            config: [__filename]
          }
        };
      }

      config.optimization = {
        ...config.optimization,
        runtimeChunk: {
          name: 'runtime',
        },
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: 'lib',
              chunks: 'all'
            }
          }
        }
      };
    }
    return config;
  },
};

export default nextConfig;