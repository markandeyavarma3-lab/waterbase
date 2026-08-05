import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-brand-green-deep text-white/80">
      <div className="h-1 w-full bg-gradient-to-r from-brand-green to-brand-blue" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:px-6 text-white/60 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}</p>
        {/* tap-target-y: these were 16px tall — fine for a mouse, too small to hit
            reliably with a thumb. Negative margin keeps the visual spacing identical
            on desktop while the hit area grows to 44px on touch devices. */}
        <nav aria-label="Legal" className="-my-2 flex items-center gap-4 sm:gap-5">
          <Link href="/privacy" className="tap-target-y flex items-center px-1 transition-colors hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="tap-target-y flex items-center px-1 transition-colors hover:text-white">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}
