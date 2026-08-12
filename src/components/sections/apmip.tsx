import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Section, Container, Eyebrow } from "@/components/site/section";
import { Reveal } from "@/components/sections/reveal";
import { ContactActions } from "@/components/site/contact-actions";

// APMIP flow — placeholder labels. Confirm or replace with the official steps.
const flow = [
  { title: "Eligibility check", desc: "We confirm your land, crop and category qualify for the scheme." },
  { title: "Application & documents", desc: "We prepare and file the subsidy paperwork on your behalf." },
  { title: "Subsidy approval", desc: "We track the sanction through the department." },
  { title: "System installation", desc: "We design and install the approved micro-irrigation system." },
  { title: "Inspection & release", desc: "We assist with field inspection and subsidy release." },
];

const apmipMessage =
  "Hello Waterbase Technologies, I would like help with the APMIP drip/sprinkler subsidy.\n\nMy land details: \n\nPlease guide me on eligibility.";

export function Apmip() {
  return (
    <Section tone="brand-deep" id="apmip">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow onDark>Government subsidy · APMIP</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance text-white md:text-[2.5rem]">Drip &amp; sprinkler subsidies, handled for you</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">Under the Andhra Pradesh Micro Irrigation Project, farmers can access government subsidy on micro-irrigation systems. We handle the entire process — from eligibility and paperwork to installation and inspection — so you get your system with minimal hassle.</p>
            </Reveal>
            <Reveal delay={240}>
              <ContactActions onDark size="xl" waMessage={apmipMessage} className="mt-8" />
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p className="text-sm text-white/55">APMIP assistance for West Godavari and across Andhra Pradesh.</p>
                <Link href="/apmip-subsidy" className="tap-target-y inline-flex items-center gap-1.5 text-sm font-semibold text-brand-sun-light transition-colors hover:text-white">
                  Full APMIP guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue-light"><BadgeCheck className="h-4 w-4" /> How the subsidy process works</p>
              <ol className="mt-5 space-y-5">
                {flow.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-bold text-white">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">{step.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/70">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}