import Link from "next/link";
import { siteConfig, fullAddress, whatsappLink } from "@/lib/site-config";
import { NAV_LINKS, SOLUTION_LINKS } from "@/lib/nav";

/**
 * The footer carries the site's internal link graph.
 *
 * It used to hold only Privacy and Terms. That left the six ad landing pages
 * ORPHANED: `SOLUTION_LINKS` existed but its only consumer was site-chrome,
 * which used it to *detect* landing pages so it could suppress the sticky CTA —
 * it was never rendered as links. Five of the six had zero internal inbound
 * links anywhere on the site, so they accumulated no internal PageRank and
 * organic search could only ever reach them via the sitemap. They were pages we
 * paid to send traffic to and that our own site never pointed at.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-border tint-wash-dark text-white/80">
      <div className="h-1 w-full bg-gradient-to-r from-brand-green to-brand-blue" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="lg:col-span-1">
            <p className="font-display text-base font-extrabold uppercase tracking-[0.042em] text-white">
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Complete irrigation &amp; agricultural water management — supply, design,
              installation and APMIP subsidy assistance.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">{fullAddress}</p>
            <p className="mt-3 text-sm text-white/60">
              {siteConfig.hoursSummary.days} · {siteConfig.hoursSummary.time}
            </p>
          </div>

          <FooterNav title="Explore" links={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))} />
          <FooterNav title="Solutions" links={SOLUTION_LINKS} />

          <div>
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target-y link-underline flex items-center text-sm text-white/70 transition-colors hover:text-white"
                >
                  WhatsApp us
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="tap-target-y link-underline flex items-center text-sm text-white/70 transition-colors hover:text-white"
                >
                  Request a callback
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="tap-target-y link-underline flex items-center break-all text-sm text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target-y link-underline flex items-center text-sm text-white/70 transition-colors hover:text-white"
                >
                  Find us on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}
          </p>
          {/* tap-target-y: these were 16px tall — fine for a mouse, too small to hit
              reliably with a thumb. Negative margin keeps the visual spacing identical
              on desktop while the hit area grows to 44px on touch devices. */}
          <nav aria-label="Legal" className="-my-2 flex items-center gap-4 sm:gap-5">
            <Link href="/privacy" className="tap-target-y link-underline flex items-center px-1 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="tap-target-y link-underline flex items-center px-1 transition-colors hover:text-white">
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="tap-target-y link-underline flex items-center text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
