import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev site on your phone over Wi-Fi.
  // Add your laptop's actual LAN IP here too if it differs.
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;