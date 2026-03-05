import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "quiz.pcosplan.app",
      },
    ],
  },
};

export default nextConfig;
