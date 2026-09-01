import Link from "next/link";
import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";
import { Container } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig, whatsappLink, fullAddress, formatPhone } from "@/lib/site-config";

export function ContactCTA() {
  return (
    <section id="contact" className="relative isolate overflow-hidden tint-wash-darker bg-grain py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-green md:text-sm">
                <span className="h-px w-6 bg-brand-green/60" aria-hidden="true" />
                Get started
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4.6vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em] text-balance text-water-deep">
                Let&apos;s specify your <span className="text-brand-green">system</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-water-deep/70">
                Commercial landscape, estate or large farm — WhatsApp, call, or request a callback. One team from survey to after-sales.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ContactActions size="xl" className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="sink-panel overflow-hidden rounded-3xl">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 border-b border-water-deep/10 px-6 py-4 transition-colors hover:bg-white/40">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-water-deep">WhatsApp us</span>
                  <span className="text-sm text-water-deep/60">{formatPhone(siteConfig.whatsappNumber)}</span>
                </span>
              </a>
              <Link href="/contact" className="flex items-center gap-4 border-b border-water-deep/10 px-6 py-4 transition-colors hover:bg-white/40">
                <PhoneCall className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-water-deep">Request a callback</span>
                  <span className="text-sm text-water-deep/60">We&apos;ll call you back</span>
                </span>
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 border-b border-water-deep/10 px-6 py-4 transition-colors hover:bg-white/40">
                <Mail className="h-4 w-4 shrink-0 text-water-deep/50" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-water-deep">Email</span>
                  <span className="text-sm text-water-deep/60">{siteConfig.email}</span>
                </span>
              </a>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white/40">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-water-deep/50" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-water-deep">Visit us <span aria-hidden="true" className="opacity-70">↗</span></span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-water-deep/60">{fullAddress}</span>
                </span>
              </a>
              <div className="flex items-center gap-3 border-t border-water-deep/10 px-6 py-3.5">
                <Clock className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                <p className="text-sm font-semibold tracking-wide text-water-deep">
                  {siteConfig.hoursSummary.days} <span className="mx-1 text-brand-green">·</span> {siteConfig.hoursSummary.time}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
