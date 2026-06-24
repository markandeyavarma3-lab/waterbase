import { Reveal } from "@/components/sections/reveal";
import { Container, Eyebrow } from "@/components/site/section";
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
    <section className="relative overflow-hidden bg-brand-green-deep text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Aurora — green + water-blue */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="motion-aurora absolute -right-[8%] -top-[30%] h-[42vw] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(70,184,136,0.24),transparent_65%)] blur-3xl" style={{ animation: "aurora-1 24s ease-in-out infinite" }} />
        <div className="motion-aurora absolute -left-[10%] top-[10%] h-[38vw] w-[38vw] rounded-full bg-[radial-gradient(circle,rgba(20,136,194,0.2),transparent_65%)] blur-3xl" style={{ animation: "aurora-2 28s ease-in-out infinite" }} />
      </div>
      {/* Slow-spinning decorative ring */}
      <div className="motion-spin-slow pointer-events-none absolute -right-[14%] -top-[40%] -z-10 hidden h-[34vw] w-[34vw] rounded-full border border-white/[0.06] [mask-image:radial-gradient(circle,transparent_55%,black_56%)] lg:block" aria-hidden="true" />
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <Container className="py-20 md:py-24">
        <Reveal>
          {eyebrow ? <Eyebrow onDark className="mb-4">{eyebrow}</Eyebrow> : null}
          <h1 className="max-w-3xl font-display text-[2.4rem] font-bold leading-[1.06] tracking-[-0.03em] md:text-5xl">{title}</h1>
          {description ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}
