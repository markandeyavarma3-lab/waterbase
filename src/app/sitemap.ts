import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/agri-farms", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/commercial", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/product-supply", priority: 0.7, changeFrequency: "monthly" },
  { path: "/crops", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/apmip-subsidy", priority: 0.95, changeFrequency: "weekly" },
  { path: "/jain-systems", priority: 0.85, changeFrequency: "monthly" },
  { path: "/ksb-pumps", priority: 0.85, changeFrequency: "monthly" },
  { path: "/heavy-pipes", priority: 0.85, changeFrequency: "monthly" },
  { path: "/farm-shop", priority: 0.85, changeFrequency: "monthly" },
  { path: "/commercial-irrigation", priority: 0.85, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = "2026-07-01";
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
