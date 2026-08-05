import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-brand-green-deep text-white/80">
      <div className="h-1 w-full bg-gradient-to-r from-brand-green to-brand-blue" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:px-6 text-white/60 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}</p>
        <nav aria-label="Legal" className="flex items-center gap-5">
          <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="transition-colors hover:text-white">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}
