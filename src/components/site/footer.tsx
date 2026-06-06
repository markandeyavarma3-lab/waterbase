import Link from "next/link";
import { MapPin, MessageCircle, Mail, Sprout, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig, whatsappLink, fullAddress } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-brand-green-deep text-white/80">
      <div className="h-1 w-full bg-brand-green" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <Reveal>
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">Waterbase Technologies</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {siteConfig.tagline}. Authorized dealer of Jain Irrigation, KSB &amp; Netafim — serving South India since {siteConfig.since}.
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
              <span>{fullAddress}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={240}>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Hours</h4>
          <ul className="mt-4 space-y-1.5 text-sm">
            {siteConfig.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-white/70">{h.day}</span>
                <span>{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {siteConfig.legalName}. {siteConfig.businessType} · Est. {siteConfig.established}
        </div>
      </div>
    </footer>
  );
}