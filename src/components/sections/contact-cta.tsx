import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { CursorGlow } from "@/components/site/cursor-glow";
import { siteConfig, whatsappLink, fullAddress } from "@/lib/site-config";

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-brand-green-deeper text-white bg-grain py-20 md:py-28">
      <AuroraGlow variant="dark-converge" />
      <CursorGlow />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light md:text-sm">
                <span className="h-px w-6 bg-brand-green-light/60" aria-hidden="true" />
                Get started
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance text-white md:text-[2.75rem]">
                Let&apos;s plan your <span className="text-gradient-brand">irrigation</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">
                Products, design, installation or APMIP subsidy — message us on WhatsApp, or request a callback and our team will reach out.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ContactActions onDark size="xl" className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="glass-panel overflow-hidden rounded-3xl">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5">
                <MessageCircle className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white">WhatsApp us</span>
                  <span className="text-sm text-white/60">Fastest way to get a quote</span>
                </span>
              </a>
              <Link href="/contact" className="flex items-center gap-4 border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5">
                <PhoneCall className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white">Request a callback</span>
                  <span className="text-sm text-white/60">We&apos;ll call you back</span>
                </span>
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5">
                <Mail className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white">Email</span>
                  <span className="text-sm text-white/60">{siteConfig.email}</span>
                </span>
              </a>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white/5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white">Visit us <span aria-hidden="true" className="opacity-70">↗</span></span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-white/60">{fullAddress}</span>
                </span>
              </a>
              <div className="flex items-center gap-3 border-t border-white/10 bg-white/[0.03] px-6 py-3.5">
                <Clock className="h-4 w-4 shrink-0 text-brand-green-light" aria-hidden="true" />
                <p className="text-sm font-semibold tracking-wide text-white">
                  {siteConfig.hoursSummary.days} <span className="mx-1 text-brand-green-light">·</span> {siteConfig.hoursSummary.time}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
