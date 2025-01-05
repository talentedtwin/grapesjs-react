/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
        encoding: false,
      };
    }
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: ["style-loader", "css-loader"],
    // });
    return config;
  },
};

module.exports = nextConfig;
