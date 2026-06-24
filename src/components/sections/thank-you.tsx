"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Phone, MessageCircle, FileText, Package, Wrench, Sprout, ArrowRight } from "lucide-react";
import { trackFormSubmit } from "@/lib/analytics";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";

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

  useEffect(() => {
    if (isFromForm) {
      trackFormSubmit();
    }
  }, [isFromForm]);

  const waLink = whatsappLink(
    "Hi Waterbase, I just submitted a callback request through your website.",
    siteConfig.phones.sales.primary
  );

  return (
    <main>
      {/* Hero confirmation */}
      <section className="relative isolate overflow-hidden bg-brand-green-deep text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-24">
          <Reveal>
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-2 ring-white/30">
              <CheckCircle2 className="h-9 w-9" />
            </span>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 md:text-[0.8125rem]">Request received</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">Thank you — we&apos;ll be in touch soon.</h1>
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
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green md:text-[0.8125rem]"><span className="h-px w-6 bg-brand-green/50" aria-hidden="true" />What happens next</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Here&apos;s how we&apos;ll handle it</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
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
      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green md:text-[0.8125rem]"><span className="h-px w-6 bg-brand-green/50" aria-hidden="true" />While you wait</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Have a look around</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {exploreCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.href} delay={i * 80}>
                  <Link
                    href={card.href}
                    className="sheen group block h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-lift"
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
    </main>
  );
}