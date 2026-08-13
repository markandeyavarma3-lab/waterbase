"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, MessageCircle, FileText, Package, Wrench, Sprout, ArrowRight } from "lucide-react";
import { trackFormSubmit } from "@/lib/analytics";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";
import { AuroraGlow } from "@/components/site/aurora-glow";

const nextSteps = [
  {
    icon: FileText,
    title: "We review your request",
    body: "Our team reads your requirement and pulls together the right person to call you back — usually within minutes during working hours.",
  },
  {
    icon: Phone,
    title: "We call or WhatsApp you",
    body: "Expect a callback within a few working hours. We'll discuss your crop, area, water source and budget to scope the right solution.",
  },
  {
    icon: Sprout,
    title: "We plan the next step",
    body: "Depending on your need, that's a quotation, a site visit, an APMIP subsidy briefing, or a full design proposal.",
  },
];

const exploreCards = [
  {
    href: "/products",
    icon: Package,
    title: "Browse products",
    body: "Drip lines, sprinklers, pumps, HDPE pipes, filters and more — from Jain, KSB, Netafim and 20+ brands.",
  },
  {
    href: "/services",
    icon: Wrench,
    title: "Our services",
    body: "Survey, design, installation, project execution and APMIP subsidy assistance across South India.",
  },
  {
    href: "/projects",
    icon: Sprout,
    title: "See past projects",
    body: "Banana drip, micro-irrigation under APMIP, campus landscape and more — real installations from our team.",
  },
];

export function ThankYou() {
  const searchParams = useSearchParams();
  const isFromForm = searchParams.get("ref") === "lead";
  const token = searchParams.get("s");

  // Count the form conversion once per submission, not once per page view.
  // Reloading this page, navigating back to it, or opening a shared link used to
  // re-fire the event and inflate the figure Google Ads bids against.
  useEffect(() => {
    if (!isFromForm) return;

    // A link without a token predates this change (or was hand-edited); still
    // worth counting, but only the first time it is seen in this session.
    const key = `wb:conversion:form:${token ?? "untokenized"}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private browsing or storage disabled — fall through and count it rather
      // than losing a real conversion.
    }

    trackFormSubmit();
  }, [isFromForm, token]);

  const waLink = whatsappLink(
    "Hi Waterbase, I just submitted a callback request through your website.",
    siteConfig.phones.sales.primary
  );

  return (
    <div className="theme-warm">
      {/* Hero confirmation */}
      <section className="relative isolate overflow-hidden tint-wash-darker text-white">
        <AuroraGlow variant="hero" />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 sm:px-6 sm:py-20 text-center sm:py-24">
          <Reveal>
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="motion-ripple absolute inset-0 rounded-full border-2 border-white/40" style={{ animation: "ripple-ping 1.8s ease-out infinite" }} aria-hidden="true" />
              <span className="motion-ripple absolute inset-0 rounded-full border-2 border-white/40" style={{ animation: "ripple-ping 1.8s ease-out 0.6s infinite" }} aria-hidden="true" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-2 ring-white/30">
                <motion.svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    d="M20 6 9 17l-5-5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/70">Request received</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Thank you — we&apos;ll be in touch soon.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-white/80">
              Your callback request has reached our team. We usually get back within a few working hours.
              If you&apos;d like to talk to us right away, ping us on WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-brand-green-deep hover:bg-white/90">
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message us on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">What happens next</p>
          <h2 className="mt-2 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight">Here&apos;s how we&apos;ll handle it</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-6">
                  <span className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-8 w-8 text-brand-green" />
                  <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* While you wait */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-24">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">While you wait</p>
            <h2 className="mt-2 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight">Have a look around</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {exploreCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.href} delay={i * 80}>
                  <Link
                    href={card.href}
                    className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-md"
                  >
                    <Icon className="h-8 w-8 text-brand-green" />
                    <h3 className="mt-4 font-display text-lg font-bold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green">
                      Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}