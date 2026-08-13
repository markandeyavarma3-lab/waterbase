import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * `updated` is the date that page's CONTENT last changed — bump it by hand when
 * you meaningfully edit a page. It used to be one hardcoded string shared by all
 * 18 URLs, which meant every page claimed the same modification date and the
 * date never advanced past the day it was typed. Crawlers learned nothing from
 * it. Pages left undated fall back to the build date, which is at least true.
 */
type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  updated?: string;
};

const routes: Route[] = [
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
  // Legal pages genuinely have not changed since launch, so they say so.
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", updated: "2026-06-01" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", updated: "2026-06-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  return routes.map(({ path, priority, changeFrequency, updated }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: updated ? new Date(updated) : buildDate,
    changeFrequency,
    priority,
  }));
}
