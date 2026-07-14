import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev site on your phone over Wi-Fi.
  // Add your laptop's actual LAN IP here too if it differs.
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    // Serve AVIF/WebP automatically — source images stay JPG, Next.js
    // transcodes on request so mobile ad traffic gets a lighter LCP image.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;