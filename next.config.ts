import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * Deliberately NOT a Content-Security-Policy. The site loads Google Analytics
 * (two properties), the Google Ads tag and Vercel Analytics, all of which inject
 * scripts at runtime; a CSP tight enough to be worth having would need careful
 * per-domain allowances and would break conversion tracking silently — failing
 * in exactly the way that is hardest to notice. Worth adding later, with the tag
 * behaviour verified in a preview deploy first.
 *
 * These four are unconditionally safe and cost nothing.
 */
const securityHeaders = [
  // /admin renders customer names and mobile numbers — never let it be framed.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the full URL to our own origin, only the bare origin to third parties,
  // and nothing at all when downgrading to http.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing on this site uses these, so decline them up front.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  // Lets you open the dev site on your phone over Wi-Fi.
  // Add your laptop's actual LAN IP here too if it differs.
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    // Serve AVIF/WebP automatically — source images stay JPG, Next.js
    // transcodes on request so mobile ad traffic gets a lighter LCP image.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
