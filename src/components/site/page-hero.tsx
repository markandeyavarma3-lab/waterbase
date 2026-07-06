"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/sections/reveal";
import { Container } from "@/components/site/section";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { siteConfig } from "@/lib/site-config";

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: title },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-brand-green-deeper text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <AuroraGlow variant="dark-teal" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />
      <Container className="py-16 md:py-20">
        <Reveal>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light md:text-sm">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">{title}</h1>
          {description ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{description}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}