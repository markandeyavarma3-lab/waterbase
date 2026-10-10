import Link from "next/link";
import { Clock } from "lucide-react";
import { siteConfig, whatsappLink, formatPhone, fullAddress, callNowTelLink } from "@/lib/site-config";
import { NAV_LINKS, SOLUTION_LINKS } from "@/lib/nav";
import { WaveTop } from "@/components/site/wave-divider";
import { MapPreview } from "@/components/site/map-preview";
import { OpenNowBadge } from "@/components/site/open-now-badge";

/** Rendered by the root layout and handed to the client SiteChrome as a prop. */
export function Footer() {
  return (
    <footer className="wave-top relative isolate overflow-hidden tint-wash-dark pt-[var(--wave-h)] text-water-deep/80">
      <WaveTop />

      {/* ── Visit band: map + hours ── */}
      <div className="mx-auto grid max-w-6xl gap-5 px-4 pt-12 sm:px-6 md:grid-cols-[1.4fr_1fr] md:pt-14">
        <MapPreview />
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-soft">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
              <Clock className="h-4 w-4" aria-hidden="true" /> Shop hours
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li className="flex justify-between gap-4 font-medium text-water-deep">
                <span>{siteConfig.hoursSummary.days}</span>
                <span>{siteConfig.hoursSummary.time}</span>
              </li>
              <li className="flex justify-between gap-4 text-water-deep/60">
                <span>{siteConfig.hoursSummary.closedDay}</span>
                <span>Closed</span>
              </li>
            </ul>
            <OpenNowBadge className="mt-4" />
          </div>
          <p className="text-sm leading-relaxed text-water-deep/70">{fullAddress}</p>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-green-dark"
          >
            Get directions
          </a>
        </div>
      </div>

      {/* ── Links ── */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-14 lg:grid-cols-4">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-water-deep">{siteConfig.name}</p>
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
        {/* The solution pages — the footer is what links them internally. */}
        <nav aria-label="Solutions">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-water-deep/50">Solutions</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SOLUTION_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="tap-target-y link-underline text-water-deep/75 hover:text-water-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-water-deep/50">Call &amp; chat</p>
          <p className="mt-4 space-y-1 text-sm font-medium text-water-deep">
            <a href={callNowTelLink()} className="block hover:text-brand-green">
              Call {formatPhone(siteConfig.callNowNumber)}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="block hover:text-brand-green">
              WhatsApp {formatPhone(siteConfig.whatsappNumber)}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="block break-all hover:text-brand-green">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-3 text-sm">
            <a href={siteConfig.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">
              Google reviews
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
