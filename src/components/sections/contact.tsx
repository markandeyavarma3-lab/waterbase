import { MessageCircle, Mail, MapPin, Clock, Sprout, ArrowUpRight, Phone } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig, whatsappLink, fullAddress, telLink, formatPhone, callNowTelLink } from "@/lib/site-config";

export function Contact() {
  const waMessage = "Hi Waterbase, I'd like to know more about your irrigation solutions.";

  return (
    <section id="contact" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-green">
                <Sprout className="h-4 w-4" />
                Get in touch
              </p>
              <h2 className="font-display text-3xl font-bold text-brand-green-darker sm:text-4xl">Request a callback</h2>
              <p className="mt-4 max-w-md text-muted-foreground">Share acreage, crop or landscape brief. We call back — usually within a few working hours — with a clear next step.</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Call now</span>
                    <a href={callNowTelLink()} className="block font-semibold text-foreground hover:text-brand-green">{formatPhone(siteConfig.callNowNumber)}</a>
                  </span>
                </div>

                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">WhatsApp</span>
                    <span className="block font-semibold text-foreground group-hover:text-brand-green">{formatPhone(siteConfig.whatsappNumber)}</span>
                  </span>
                </a>

                <a href={`mailto:${siteConfig.email}`} className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Email</span>
                    <span className="block font-semibold text-foreground group-hover:text-brand-green">{siteConfig.email}</span>
                  </span>
                </a>

                <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Visit us</span>
                    <span className="block font-medium text-foreground group-hover:text-brand-green">{fullAddress}</span>
                  </span>
                </a>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-sm text-muted-foreground">Working hours</span>
                    <ul className="mt-1 space-y-0.5 text-sm font-medium text-foreground">
                      <li className="flex justify-between gap-6"><span>{siteConfig.hoursSummary.days}</span><span className="text-muted-foreground">{siteConfig.hoursSummary.time}</span></li>
                      <li className="flex justify-between gap-6"><span>{siteConfig.hoursSummary.closedDay}</span><span className="text-muted-foreground">Closed</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-lift sm:p-6"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                <MapPin className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-display font-semibold text-foreground">Find us on Google Maps</span>
                <span className="block text-sm text-muted-foreground">{siteConfig.address.city}, {siteConfig.address.state} — tap for directions</span>
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-green" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}