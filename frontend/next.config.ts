import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack inside this app even when a parent directory has a lockfile.
  turbopack: { root: __dirname },
};

export default nextConfig;
