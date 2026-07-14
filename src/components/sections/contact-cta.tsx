import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { siteConfig, whatsappLink, fullAddress } from "@/lib/site-config";

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-brand-green-deeper text-white bg-grain py-20 md:py-28">
      <AuroraGlow variant="dark-converge" />
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
            <div className="glass-panel card-shine grid gap-3 rounded-3xl p-6 md:p-8">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-glow/30 hover:bg-white/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white"><MessageCircle className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-semibold text-white">WhatsApp us</span>
                  <span className="text-sm text-white/65">Fastest way to get a quote</span>
                </span>
              </a>
              <Link href="/contact" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-glow/30 hover:bg-white/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white"><PhoneCall className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-semibold text-white">Request a callback</span>
                  <span className="text-sm text-white/65">We&apos;ll call you back</span>
                </span>
              </Link>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-glow/30 hover:bg-white/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-sun text-white"><Mail className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-semibold text-white">Email</span>
                  <span className="text-sm text-white/65">{siteConfig.email}</span>
                </span>
              </a>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-glow/30 hover:bg-white/8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white"><MapPin className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-semibold text-white">Visit us <span aria-hidden="true" className="ml-1 opacity-70">↗</span></span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/65">{fullAddress}</span>
                </span>
              </a>
              <div className="mt-2 flex items-center gap-3 px-2 py-3 rounded-xl bg-brand-green-deep/50 border border-brand-green-light/20 shadow-[0_0_15px_rgba(79,224,196,0.15)]">
                <Clock className="h-5 w-5 text-brand-green-light" />
                <p className="text-base font-bold tracking-wide text-white drop-shadow-md">
                  {siteConfig.hoursSummary.days} <span className="text-brand-green-light font-black mx-1">·</span> {siteConfig.hoursSummary.time}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
