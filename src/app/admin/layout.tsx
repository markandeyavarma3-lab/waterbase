import type { Metadata } from "next";

/**
 * Applies to every route under /admin, including the login page — which is a
 * client component and so cannot export metadata of its own. robots.txt already
 * disallows this path, but that is a request rather than a guarantee: a search
 * engine that reaches the page by following a link elsewhere honours the noindex
 * header, not the crawl directive it never fetched.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="living-mesh min-h-screen">
      {children}
    </div>
  );
}
