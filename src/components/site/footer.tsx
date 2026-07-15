import Link from "next/link";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig } from "@/lib/site-config";

import { NAV_LINKS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-brand-green-deep text-white/80">
      <div className="pointer-events-none absolute -top-24 right-0 -z-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(63,160,108,0.18),transparent_65%)] blur-2xl" aria-hidden="true" />
      <div className="h-1 w-full bg-gradient-to-r from-brand-green to-brand-blue" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-6 py-14 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <span className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-white">
            <span className="h-2 w-2 shrink-0 rounded-[2px] bg-brand-green" aria-hidden="true" />
            Waterbase Technologies
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {siteConfig.tagline}. Authorized Distributor &amp; Dealer of Jain Irrigation, KSB Pumps &amp; Motors, Netafim Flexnet and 20+ leading brands.
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/55">
            Serving Andhra Pradesh, Telangana, Karnataka &amp; Odisha · Pan-India for bulk orders.
          </p>
        </Reveal>

        <Reveal delay={60} className="md:col-span-5">
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.filter(l => l.label !== "Home").map((x) => (
              <li key={x.label}>
                <Link href={x.href} className="inline-block text-white/70 transition-all hover:translate-x-1 hover:text-white">
                  {x.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}</p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
