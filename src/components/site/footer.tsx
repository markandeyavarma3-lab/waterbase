import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative sink-panel living-mesh-c border-t border-transparent text-water-deep/80">
      <div className="h-1 w-full bg-gradient-to-r from-brand-green to-brand-blue" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:px-6 text-water-deep/60 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}</p>
        <nav aria-label="Legal" className="-my-2 flex items-center gap-4 sm:gap-5">
          <Link href="/privacy" className="tap-target-y link-underline flex items-center px-1 transition-colors hover:text-water-deep">Privacy Policy</Link>
          <Link href="/terms" className="tap-target-y link-underline flex items-center px-1 transition-colors hover:text-water-deep">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}
