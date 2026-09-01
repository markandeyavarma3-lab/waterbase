import Link from "next/link";
import { siteConfig, whatsappLink, formatPhone, fullAddress, callNowTelLink } from "@/lib/site-config";
import { NAV_LINKS } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="relative sink-panel living-mesh-c border-t border-transparent text-water-deep/80">
      <div className="h-px w-full bg-gradient-to-r from-brand-green/40 via-brand-blue/50 to-brand-green/40" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-12 md:py-14">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-water-deep">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-water-deep/65">
            {siteConfig.tagline}. Eluru, Andhra Pradesh — since {siteConfig.since}.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-water-deep/50">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="tap-target-y link-underline text-water-deep/75 hover:text-water-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-water-deep/50">Visit &amp; call</p>
          <p className="mt-4 text-sm leading-relaxed text-water-deep/70">{fullAddress}</p>
          <p className="mt-3 space-y-1 text-sm font-medium text-water-deep">
            <a href={callNowTelLink()} className="block hover:text-brand-green">
              Call {formatPhone(siteConfig.callNowNumber)}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="block hover:text-brand-green">
              WhatsApp {formatPhone(siteConfig.whatsappNumber)}
            </a>
          </p>
          <p className="mt-3 text-xs text-water-deep/55">
            {siteConfig.hoursSummary.days} · {siteConfig.hoursSummary.time}
          </p>
          <p className="mt-3 text-sm">
            <a href={siteConfig.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">
              Google reviews
            </a>
            {" · "}
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">
              Find us on Maps
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-water-deep/8 px-4 py-5 text-xs text-water-deep/55 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}</p>
        <nav aria-label="Legal" className="-my-2 flex items-center gap-4 sm:gap-5">
          <Link href="/privacy" className="tap-target-y link-underline flex items-center px-1 transition-colors hover:text-water-deep">Privacy Policy</Link>
          <Link href="/terms" className="tap-target-y link-underline flex items-center px-1 transition-colors hover:text-water-deep">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}
