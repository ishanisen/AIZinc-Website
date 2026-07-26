import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aizinc.tech",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
