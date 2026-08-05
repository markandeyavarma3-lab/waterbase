"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Container } from "@/components/site/section";
import { AuroraGlow } from "@/components/site/aurora-glow";
import { WaveDivider } from "@/components/site/wave-divider";
import { siteConfig } from "@/lib/site-config";

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  const pathname = usePathname();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: title, item: `${siteConfig.url}${pathname}` },
    ],
  };

  return (
    <section className="relative overflow-hidden bg-brand-green-deeper text-white bg-grain">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <AuroraGlow variant="dark-teal" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/10" aria-hidden="true" />
      <Container className="relative z-10 py-10 sm:py-14 md:py-20">
        <Reveal>
          {/* min-w-0 + truncate: a long page title in the trail would otherwise
              push the breadcrumb row past the edge of a narrow phone. */}
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1 text-sm text-white/55">
            <Link href="/" className="shrink-0 transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="min-w-0 truncate font-medium text-white/90">{title}</span>
          </nav>
          {eyebrow ? <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-green-light md:text-sm"><span className="h-px w-6 bg-brand-green-light/60" aria-hidden="true" />{eyebrow}</p> : null}
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.875rem,5.6vw,3.25rem)] font-extrabold leading-[1.07] tracking-tight">{title}</h1>
          {description ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">{description}</p> : null}
        </Reveal>
      </Container>
      <WaveDivider fill="var(--background)" />
    </section>
  );
}
