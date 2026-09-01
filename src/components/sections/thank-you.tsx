"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, FileText, Package, Wrench, Sprout, ArrowRight, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { trackFormSubmit } from "@/lib/analytics";
import { siteConfig, whatsappLink, fullAddress } from "@/lib/site-config";
import { Reveal } from "@/components/sections/reveal";
import { WaterCaustics } from "@/components/site/water-caustics";
import { ContactActions } from "@/components/site/contact-actions";

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

  useEffect(() => {
    if (!isFromForm) return;

    const key = `wb:conversion:form:${token ?? "untokenized"}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private browsing — still count rather than lose a real conversion.
    }

    trackFormSubmit();
  }, [isFromForm, token]);

  const waLink = whatsappLink(
    "Hi Waterbase, I just submitted a callback request through your website.",
    siteConfig.whatsappNumber
  );

  return (
    <div className="theme-warm">
      <section className="relative isolate overflow-hidden bg-sunrise text-water-deep bg-grain">
        <div className="absolute inset-0 z-0">
          <WaterCaustics />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 md:pt-32">
          <Reveal>
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="motion-ripple absolute inset-0 rounded-full border-2 border-[#5BB8E8]/50" style={{ animation: "ripple-ping 1.8s ease-out infinite" }} aria-hidden="true" />
              <span className="motion-ripple absolute inset-0 rounded-full border-2 border-[#5BB8E8]/40" style={{ animation: "ripple-ping 1.8s ease-out 0.6s infinite" }} aria-hidden="true" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full sink-panel text-[#3FA3DA]">
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
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-water-deep/12 bg-white/70 px-4 py-1.5 text-sm font-medium text-water-deep/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_0_3px_rgba(46,148,102,0.18)]" />
              Request received
            </p>
            <h1 className="mt-5 font-display text-[clamp(1.875rem,5vw,3rem)] font-extrabold leading-[1.08] tracking-tight">
              Thank you — we&apos;ll be in touch soon.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-water-deep/70 sm:text-lg">
              Your callback request has reached our team. We usually get back within a few working hours.
              Need us sooner? Message on WhatsApp and we&apos;ll reply as soon as we can.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-sink-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message us on WhatsApp
              </a>
              <Link
                href="/"
                className="cta-sink-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold"
              >
                Back to home
              </Link>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-water-deep/55">
              <Clock className="h-4 w-4 text-brand-green" aria-hidden="true" />
              {siteConfig.hoursSummary.days} · {siteConfig.hoursSummary.time}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="tint-wash-sky relative isolate overflow-hidden py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">What happens next</p>
            <h2 className="mt-2 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight text-water-deep">
              Here&apos;s how we&apos;ll handle it
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {nextSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 80}>
                  <div
                    className={`process-step-card relative h-full rounded-2xl p-6 ${
                      i % 3 === 0 ? "living-mesh-a" : i % 3 === 1 ? "living-mesh-b" : "living-mesh-c"
                    }`}
                  >
                    <span className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#5BB8E8] text-xs font-bold text-white shadow-soft">
                      {i + 1}
                    </span>
                    <Icon className="h-8 w-8 text-[#3FA3DA]" />
                    <h3 className="mt-4 font-display text-lg font-bold text-water-deep">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-water-deep/70">{step.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tint-wash-field relative isolate overflow-hidden py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">While you wait</p>
            <h2 className="mt-2 font-display text-[clamp(1.625rem,4.4vw,2.25rem)] font-extrabold tracking-tight text-water-deep">
              Have a look around
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {exploreCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.href} delay={i * 80}>
                  <Link
                    href={card.href}
                    className={`group process-step-card block h-full rounded-2xl p-6 transition-transform hover:-translate-y-0.5 ${
                      i % 3 === 0 ? "living-mesh-a" : i % 3 === 1 ? "living-mesh-b" : "living-mesh-c"
                    }`}
                  >
                    <Icon className="h-8 w-8 text-brand-green" />
                    <h3 className="mt-4 font-display text-lg font-bold text-water-deep">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-water-deep/70">{card.body}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-green">
                      Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="sink-panel living-mesh-c mx-auto mt-14 max-w-3xl rounded-3xl p-6 text-center sm:p-8">
              <p className="font-display text-lg font-bold text-water-deep">Still want to talk now?</p>
              <p className="mt-2 text-sm text-water-deep/70">
                WhatsApp is fastest. Or request another callback — we&apos;re at {fullAddress.split(",")[0]}.
              </p>
              <ContactActions className="mt-6 justify-center" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
