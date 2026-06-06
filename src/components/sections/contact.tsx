import { MessageCircle, Mail, MapPin, Clock, Sprout } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig, whatsappLink, fullAddress } from "@/lib/site-config";

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
              <p className="mt-4 max-w-md text-muted-foreground">Tell us what you need and our team will call you back — usually within a few working hours. From product supply to full project execution and APMIP subsidy assistance, we&apos;ve got you covered.</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 space-y-4">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">WhatsApp</span>
                    <span className="block font-semibold text-foreground group-hover:text-brand-green">Message us on WhatsApp</span>
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
                      {siteConfig.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-6">
                          <span>{h.day}</span>
                          <span className="text-muted-foreground">{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                        </li>
                      ))}
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
      </div>
    </section>
  );
}