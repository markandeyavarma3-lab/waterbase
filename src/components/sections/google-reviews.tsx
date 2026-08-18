"use client";

import { ArrowUpRight, Building2, Car, MapPin, Store, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { siteConfig, fullAddress } from "@/lib/site-config";

const listingIcons: Record<string, LucideIcon> = {
  office: Building2,
  shop: Store,
  godown: Warehouse,
};

export function GoogleReviews() {
  return (
    <Section tone="sun" id="reviews">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Google"
          title="One location — office, shop, godown"
          lead="All three sit together in Eluru. Read reviews on Google, or tap for directions."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-water-deep/10 bg-white/70 shadow-soft backdrop-blur-sm">
            <div className="border-b border-water-deep/8 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Eluru campus</p>
              <p className="mt-1 text-sm text-muted-foreground">{fullAddress}</p>
            </div>
            <div className="grid sm:grid-cols-3">
              {siteConfig.googleListings.map((listing, i) => {
                const Icon = listingIcons[listing.id] ?? MapPin;
                return (
                  <a
                    key={listing.id}
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col p-6 transition-colors hover:bg-white/55 ${
                      i < siteConfig.googleListings.length - 1 ? "border-b border-water-deep/8 sm:border-b-0 sm:border-r" : ""
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-soft text-brand-green">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-[0.06em] text-water-deep">
                      {listing.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{listing.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green">
                      Reviews
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-pill group relative inline-flex items-center overflow-hidden rounded-full border border-water-deep/12 bg-white/80 py-2.5 pl-4 pr-5 shadow-lift backdrop-blur-md"
            >
              <span className="maps-pill-road pointer-events-none absolute inset-x-3 bottom-1.5 h-px" aria-hidden="true" />
              <span className="maps-pill-car pointer-events-none absolute bottom-0.5" aria-hidden="true">
                <Car className="h-3.5 w-3.5 text-water-deep/70" />
              </span>
              <MapPin className="relative h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
              <span className="relative ml-2 font-display text-sm font-semibold text-water-deep">
                Open in Google Maps
              </span>
              <ArrowUpRight className="relative ml-1.5 h-3.5 w-3.5 text-water-deep/40 transition-colors group-hover:text-brand-green" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { GoogleReviews as Testimonials };
