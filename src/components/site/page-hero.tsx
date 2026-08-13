"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Container } from "@/components/site/section";
import { WaterCaustics } from "@/components/site/water-caustics";
import { WaveDivider } from "@/components/site/wave-divider";
import { siteConfig } from "@/lib/site-config";

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: title, item: `${siteConfig.url}${pathname}` },
    ],
  };

  return (
    <section className="relative isolate overflow-hidden bg-sunrise text-water-deep bg-grain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Same living ground + caustic language as the home hero so inner pages
          open as part of one site, not a different theme. */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <WaterCaustics />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />

      <Container className="relative z-10 pt-32 pb-10 sm:pt-36 sm:pb-14 md:pt-40 md:pb-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="-mt-2 mb-3 flex items-center gap-1 text-sm text-water-deep/60">
            <Link href="/" className="tap-target-y flex shrink-0 items-center pr-1 transition-colors hover:text-water-deep">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate font-medium text-water-deep/90">{title}</span>
          </nav>
          {eyebrow ? (
            <p className="inline-flex items-center gap-2.5 rounded-full border border-water-deep/12 bg-white/70 px-4 py-1.5 text-sm font-medium tracking-[-0.01em] text-water-deep/80 backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green shadow-[0_0_0_3px_rgba(46,148,102,0.18)]" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(1.875rem,5.6vw,3.25rem)] font-extrabold leading-[1.07] tracking-tight">{title}</h1>
          {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-water-deep/70 sm:text-lg md:text-xl">{description}</p> : null}
        </Reveal>
      </Container>
      <WaveDivider fill="var(--background)" />
    </section>
  );
}
