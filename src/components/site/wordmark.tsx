"use client";

import { cn } from "@/lib/utils";

/**
 * The Waterbase wordmark and its intro sequence.
 *
 * A droplet forms above the name, falls onto the first letter, squashes on
 * impact, throws a ring, jolts the letters — and its water then washes left to
 * right through the letterforms while the droplet itself drains to nothing,
 * absorbed into the name. A clean highlight finishes it.
 *
 * Two decisions worth keeping:
 *
 * 1. The letters are SOLID WHITE at every frame. The water is a coloured
 *    highlight passing over them, never a fill. That means the logo is legible
 *    the whole way through and cannot be left invisible or half-drawn if a
 *    layer fails to render.
 *
 * 2. The droplet is absolutely positioned, so it takes no space in the layout.
 *    It can therefore disappear at the end without the wordmark shifting.
 *
 * Plays once on load; the header remounts this component to replay it on hover.
 * It never loops — the header is on every page.
 */
export function Wordmark({ className }: { className?: string }) {
  const text = (
    <>
      Waterbase<span className="hidden sm:inline"> Technologies</span>
    </>
  );

  return (
    <span className={cn("relative inline-flex min-w-0 items-center", className)}>
      {/* ── DROPLET ──────────────────────────────────────────────
          Absolutely positioned above the first letter so it contributes no
          width; it falls, lands, and drains away without moving the text. */}
      <span
        className="pointer-events-none absolute -top-[0.15em] left-[0.06em] z-10 inline-flex h-[0.74em] w-[0.74em] items-center justify-center"
        aria-hidden="true"
      >
        {/* ring thrown out on impact */}
        <span className="logo-ripple absolute inset-[-0.18em] rounded-full border border-brand-glow/80" />
        {/* the droplet — origin at its base so the squash reads as landing */}
        <svg viewBox="0 0 24 24" className="logo-drop h-full w-full origin-bottom" fill="none">
          <path
            d="M12 1.8c0 0 7.4 7.6 7.4 12.6A7.4 7.4 0 0 1 12 21.8a7.4 7.4 0 0 1-7.4-7.4C4.6 9.4 12 1.8 12 1.8Z"
            fill="var(--color-brand-glow)"
          />
          {/* a small specular dot so it reads as liquid rather than a flat blob */}
          <ellipse cx="9.4" cy="14.6" rx="1.5" ry="2.1" fill="#fff" fillOpacity="0.55" />
        </svg>
      </span>

      {/* ── WORDMARK ─────────────────────────────────────────────
          The base layer is the real, always-solid text. The wash and shine are
          aria-hidden duplicates stacked on top, so the name is announced once. */}
      <span className="relative min-w-0">
        <span className="logo-word block min-w-0 truncate">{text}</span>
        <span aria-hidden="true" className="logo-wash pointer-events-none absolute inset-0 block truncate">
          {text}
        </span>
        <span aria-hidden="true" className="logo-shine pointer-events-none absolute inset-0 block truncate">
          {text}
        </span>
      </span>
    </span>
  );
}
