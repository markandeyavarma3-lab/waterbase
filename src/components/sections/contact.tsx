import { Mail, MapPin, Clock, Sprout, Phone } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { Reveal } from "@/components/sections/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig, whatsappLink, fullAddress, formatPhone, callNowTelLink } from "@/lib/site-config";

export function Contact() {
  const waMessage = "Hi Waterbase, I'd like to know more about your irrigation solutions.";

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-sunrise pt-28 pb-20 sm:pt-32 md:pt-36 md:pb-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-green">
                <Sprout className="h-4 w-4" />
                Get in touch
              </p>
              <h1 className="font-display text-[clamp(2.25rem,5.6vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">Let&apos;s plan your irrigation project</h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">Leave your name and number — we call back, usually within a few working hours, with a clear next step.</p>
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
                    <WhatsAppIcon className="h-5 w-5" />
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
            <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-lift sm:p-8">
              <h2 className="font-display text-2xl font-extrabold tracking-tight">Request a callback</h2>
              <p className="mb-6 mt-1 text-sm text-muted-foreground">Only your name and number are needed.</p>
              <LeadForm />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}