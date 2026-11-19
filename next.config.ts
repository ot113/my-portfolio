import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Back from a project page returns to where you were in the list instead of the top
  experimental: { scrollRestoration: true },
};

export default nextConfig;
