import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: `output: "standalone"` intentionally removed — it breaks Vercel's
  // node file tracing on Next.js 16 (ENOENT .next/next-server.js.nft.json).
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
