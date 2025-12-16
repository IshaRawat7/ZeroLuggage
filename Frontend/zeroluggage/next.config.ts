import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*", // or 3001 depending on backend port
      },
    ];
  },
};

export default nextConfig;
