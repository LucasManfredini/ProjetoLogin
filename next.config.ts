import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript:{
    ignoreBuildErros: true,
  },
};

export default nextConfig;
