import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // The Lab moved out to its own project and deployment; keep the old path alive.
  async redirects() {
    return [
      {
        source: "/lab",
        destination: "https://lab.vandansheth.in",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
