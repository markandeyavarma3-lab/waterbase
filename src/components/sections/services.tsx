import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";
import { whatsappLink } from "@/lib/site-config";

const services = [
  "Survey & Planning",
  "System Design",
  "Installation",
  "Farm Irrigation Projects",
  "Corporate & Industrial Landscaping",
  "Nursery Irrigation Systems",
  "Commercial Irrigation Projects",
  "Water Management Solutions",
  "APMIP Subsidy Assistance",
  "Maintenance & Support",
];

export function Services() {
  return (
    <section className="relative overflow-hidden bg-brand-green-darker text-white">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-green-light/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green-light">Our services</p>
            <h2 className="mt-2 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight">End-to-end irrigation services, handled by experts</h2>
            <p className="mt-4 text-white/80">With a 20+ member team, 15+ field technicians and 5+ installation teams, we take projects from concept to commissioning — and keep them running.</p>
          </Reveal>
          <Reveal delay={150}>
            <Button asChild size="lg" className="mt-8 bg-white font-semibold text-brand-green-dark shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-white/90">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" /> Talk to our team</a>
            </Button>
          </Reveal>
        </div>
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {services.map((s, i) => (
            <li key={s}>
              <Reveal delay={i * 60}>
                <div className="flex items-start gap-2.5 text-white/90 transition-colors hover:text-white">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-light" />
                  <span>{s}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}