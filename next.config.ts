import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/reform-consulting",
  images: { unoptimized: true },
};

export default nextConfig;
