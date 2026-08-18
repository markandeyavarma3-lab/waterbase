"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
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
    a: "Yes. Commercial campuses, industrial sites, nurseries and large estates are a core part of the work — specified, installed and maintained as a single project.",
  },
  {
    q: "Can you work with our farm manager or next generation?",
    a: "Yes. Briefs often come from owners, estate managers, or sons and daughters running the farm. We work in English, share a clear specification, and keep one point of contact through delivery.",
  },
  {
    q: "How do I get a quote or callback?",
    a: "Use the callback form, call, or WhatsApp. Share crop or landscape type, acreage and what you need — we typically respond within a few working hours.",
  },
];

function FaqItem({ id, q, a, open, onToggle }: { id: string; q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={cn("rounded-2xl border bg-card shadow-soft transition-colors", open ? "border-brand-green/40" : "border-border hover:border-brand-green/30")}>
      <button
        id={`${id}-trigger`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold md:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green"
          aria-hidden="true"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Reveal className="text-center">
        {/* `flex`, not `inline-flex`. The h2 below carries .heading-accent, which
            is display:inline-block — so an inline-level eyebrow sat on the SAME
            line as the heading and the two overlapped. */}
        <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-green">
          <span className="h-px w-6 bg-brand-green/40" aria-hidden="true" />
          FAQ
        </p>
        <h2 className="heading-accent heading-accent-center mt-4 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight">Frequently asked questions</h2>
        <p className="mt-3 text-muted-foreground">Everything you need to know before starting your irrigation project.</p>
      </Reveal>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <FaqItem id={`faq-${i}`} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
