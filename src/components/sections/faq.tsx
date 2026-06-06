import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    q: "Do you provide APMIP subsidy assistance?",
    a: `Yes. We provide end-to-end help with APMIP (Andhra Pradesh Micro Irrigation Project) subsidy work — from paperwork to installation — focused on the West Godavari and Eluru region. Call our APMIP line on ${siteConfig.phones.apmip.primary} for details.`,
  },
  {
    q: "Which brands do you supply?",
    a: "We are an authorized dealer and distributor of Jain Irrigation, KSB Pumps and Netafim, along with 20+ other leading brands — all genuine products with full warranty support.",
  },
  {
    q: "Which areas do you serve?",
    a: "We supply products across Andhra Pradesh, Telangana, Karnataka and Odisha, and pan-India for larger orders. Survey, design, installation and project execution cover South India, with APMIP subsidy work focused on West Godavari.",
  },
  {
    q: "Do you only sell products, or handle installation too?",
    a: "Both. We're a complete irrigation partner — product supply, field survey and system design, professional installation, full turnkey project execution, and ongoing maintenance and support.",
  },
  {
    q: "Do you take on commercial and corporate projects?",
    a: "Yes. Alongside farm irrigation we handle nursery, corporate, industrial and commercial landscape projects — from a few acres to large developments.",
  },
  {
    q: "How do I get a quote or callback?",
    a: `Fill in the callback form on our contact page, message us on WhatsApp, or call sales on ${siteConfig.phones.sales.primary}. Share your crop, area and requirement and our team will get back to you — usually within a few working hours.`,
  },
];

export function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">FAQ</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">Frequently asked questions</h2>
      </Reveal>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60}>
            <details className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand-green/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-green transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}