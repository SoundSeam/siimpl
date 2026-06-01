import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "soundseam-origin.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/misc/**",
        search: "",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
