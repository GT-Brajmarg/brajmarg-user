import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "queccehgtycwfrzmocyl.supabase.co",
      },
    ],
  },
};

export default nextConfig;
