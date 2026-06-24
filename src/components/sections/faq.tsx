"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Eyebrow } from "@/components/site/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do you provide APMIP subsidy assistance?",
    a: "Yes. We provide end-to-end help with APMIP (Andhra Pradesh Micro Irrigation Project) subsidy work — from paperwork to installation — focused on the West Godavari and Eluru region. Message us on WhatsApp or request a callback and our APMIP team will walk you through eligibility and the next steps.",
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
    a: "Fill in the callback form on our contact page or message us on WhatsApp. Share your crop, area and requirement and our team will get back to you — usually within a few working hours.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={cn("rounded-2xl border bg-card shadow-soft transition-colors", open ? "border-brand-green/40" : "border-border hover:border-brand-green/30")}>
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-display text-base font-semibold md:text-lg">{q}</span>
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition-transform duration-300", open && "rotate-45")}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div className={cn("grid transition-all duration-300 ease-out-expo", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

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
    <section className="mx-auto max-w-3xl px-6 py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Reveal className="text-center">
        <Eyebrow align="center">FAQ</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
        <p className="mt-3 text-muted-foreground">Everything you need to know before starting your irrigation project.</p>
      </Reveal>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <FaqItem q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
