import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { Section, Container, SectionHeading } from "@/components/site/section";
import { siteConfig, fullAddress } from "@/lib/site-config";

const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

export function GoogleReviews() {
  return (
    <Section tone="sun" id="reviews">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Google"
          title="Rated where it matters — on Google"
          lead="Read reviews on our Google Business pages, or leave one after a project. Honest public feedback is how we stay accountable."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-stretch">
          <div className="grid gap-4 sm:grid-cols-2">
            {siteConfig.googleListings.map((listing) => (
              <a
                key={listing.id}
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-water-deep/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/35 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4285F4]/10 text-[#4285F4]">
                    <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-water-deep/30 transition-colors group-hover:text-brand-green" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-water-deep">{listing.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{listing.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                  Open on Google
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-water-deep/10 bg-white/60 shadow-soft">
            <iframe
              title="Waterbase Technologies on Google Maps"
              src={mapsEmbedSrc}
              className="h-56 w-full border-0 sm:h-64 lg:h-full lg:min-h-[280px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 border-t border-water-deep/10 px-5 py-4 text-sm transition-colors hover:bg-white/50"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-water-deep">Get directions</span>
                <span className="mt-0.5 block text-muted-foreground">{fullAddress}</span>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Kept so existing imports keep working. */
export { GoogleReviews as Testimonials };
