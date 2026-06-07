import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "212.24.107.88",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "budgetwise-s3.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  reactStrictMode: false,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
