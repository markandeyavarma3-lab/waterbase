"use client";

import { cn } from "@/lib/utils";

/**
 * The Waterbase mark + wordmark lockup.
 *
 * MARK — a droplet that fills with water on the same clock as the letters.
 * Deliberately one clean silhouette with no interior detail: anything finer
 * turns to mush at favicon size (16-32px), and this same shape is meant to work
 * as favicon, WhatsApp display picture and invoice header.
 *
 * ANIMATION — the droplet's water level and the letters' fill run on one 2.2s
 * timeline, then a light sweep crosses the finished wordmark and a ring leaves
 * the droplet. It plays once on load and replays on hover; it never loops,
 * because this sits in a header that is present on every page.
 */
export function Wordmark({
  compact = false,
  className,
}: {
  /** Hides the second word — used on narrow screens. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      {/* ── MARK ─────────────────────────────────────────────── */}
      <span className="relative inline-flex shrink-0" aria-hidden="true">
        {/* ring that leaves the droplet once it is full */}
        <span
          className="logo-ripple absolute inset-0 rounded-full border border-brand-glow/70"
          style={{ animation: "drop-ripple 2.2s ease-out forwards" }}
        />
        <svg
          viewBox="0 0 32 32"
          className="relative h-[1.35em] w-[1.35em]"
          fill="none"
        >
          <defs>
            {/* The droplet silhouette, with a leaf notch on its right flank */}
            <clipPath id="wb-drop">
              <path d="M16 2.5c0 0 9.5 9.6 9.5 16.1A9.5 9.5 0 0 1 16 28.1a9.5 9.5 0 0 1-9.5-9.5C6.5 12.1 16 2.5 16 2.5Z" />
            </clipPath>
          </defs>

          {/* body: dim shell, then the rising water clipped inside it */}
          <g clipPath="url(#wb-drop)">
            <rect width="32" height="32" fill="currentColor" opacity="0.18" />
            <g className="logo-drop-water" style={{ animation: "drop-fill 2.2s linear forwards" }}>
              <rect y="0" width="32" height="32" fill="currentColor" />
              {/* the waterline itself */}
              <rect y="0" width="32" height="1.4" className="text-brand-glow" fill="currentColor" />
            </g>
          </g>

          {/* outline drawn over the fill so the silhouette stays crisp */}
          <path
            d="M16 2.5c0 0 9.5 9.6 9.5 16.1A9.5 9.5 0 0 1 16 28.1a9.5 9.5 0 0 1-9.5-9.5C6.5 12.1 16 2.5 16 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            className="logo-drop-glow"
            style={{ animation: "drop-glow 2.2s ease-out forwards" }}
          />
        </svg>
      </span>

      {/* ── WORDMARK ─────────────────────────────────────────── */}
      {/* The shine is a second copy stacked exactly on top; two background-clip
          treatments cannot share one element. It is aria-hidden so the name is
          not announced twice. */}
      <span className="relative min-w-0">
        <span className="logo-fill block min-w-0 truncate">
          Waterbase{!compact && <span className="hidden sm:inline"> Technologies</span>}
        </span>
        <span
          aria-hidden="true"
          className="logo-shine pointer-events-none absolute inset-0 block truncate"
        >
          Waterbase{!compact && <span className="hidden sm:inline"> Technologies</span>}
        </span>
      </span>
    </span>
  );
}
