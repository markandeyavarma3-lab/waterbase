import Link from "next/link";
import { MapPin, MessageCircle, Mail, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { BrandMark } from "@/components/site/brand-mark";
import { siteConfig, whatsappLink, fullAddress } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-brand-green-deep text-white/80">
      {/* Soft brand glow */}
      <div className="pointer-events-none absolute -top-24 right-0 -z-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(63,160,108,0.18),transparent_65%)] blur-2xl" aria-hidden="true" />
      <div className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-sun to-brand-blue" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-9 w-9" />
            <span className="whitespace-nowrap font-[family-name:var(--font-logo)] text-lg font-extrabold text-white">Waterbase Technologies</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {siteConfig.tagline}. Authorized Distributor & Dealer of Jain Irrigation, KSB Pumps & Motors, Netafim Flexnet and 20 + leading brands.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/55">
            Serving Andhra Pradesh, Telangana, Karnataka &amp; Odisha · Pan-India for bulk orders.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {["Products", "Services", "Crops", "Projects", "About", "Contact"].map((x) => (
              <li key={x}>
                <Link href={`/${x.toLowerCase()}`} className="inline-block text-white/70 transition-all hover:translate-x-1 hover:text-white">
                  {x}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0" /> Message us on WhatsApp
              </a>
            </li>
            <li>
              <Link href="/contact" className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                <PhoneCall className="h-4 w-4 shrink-0" /> Request a callback
              </Link>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white">{siteConfig.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">{fullAddress}</a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={240}>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Hours</h4>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li className="whitespace-nowrap">
              <span className="text-white/70">{siteConfig.hoursSummary.days}:</span> {siteConfig.hoursSummary.time}
            </li>
            <li className="whitespace-nowrap">
              <span className="text-white/70">{siteConfig.hoursSummary.closedDay}:</span> Closed
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType}</p>
          <nav className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}