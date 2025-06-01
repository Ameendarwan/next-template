/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["212.24.107.88", "res.cloudinary.com","budgetwise-s3.s3.us-east-2.amazonaws.com"],
  },
  reactStrictMode: false,
  webpack(config, options) {
    if (options.dev) {
      // Disable Fast Refresh
      config.resolve.alias["react-refresh/runtime"] = false;
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
