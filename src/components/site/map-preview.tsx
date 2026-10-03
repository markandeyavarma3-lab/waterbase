"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// Coordinates match the LocalBusiness structured data (lib/seo.ts).
const EMBED = "https://www.google.com/maps?q=16.7107,81.0952&z=16&output=embed";

/**
 * Click-to-load map. Google's embed is heavy and sets its own cookies, so it
 * only loads when the visitor asks for it; until then a light placeholder shows.
 */
export function MapPreview() {
  const [load, setLoad] = useState(false);

  return (
    <div className="relative h-56 overflow-hidden rounded-3xl border border-white/80 bg-brand-blue-soft shadow-soft sm:h-64">
      {load ? (
        <iframe
          src={EMBED}
          title={`Map: ${siteConfig.name}, ${siteConfig.address.city}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoad(true)}
          className="map-placeholder group flex h-full w-full flex-col items-center justify-center gap-3 text-water-deep"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-green shadow-lift transition-transform duration-300 group-hover:-translate-y-1">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-green/20" aria-hidden="true" />
            <MapPin className="relative h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-bold">{siteConfig.address.city}, {siteConfig.address.state}</span>
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-brand-green">Tap to load map</span>
        </button>
      )}
    </div>
  );
}
