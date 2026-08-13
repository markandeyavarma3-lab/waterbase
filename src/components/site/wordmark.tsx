"use client";

import { cn } from "@/lib/utils";

/**
 * The Waterbase wordmark and its water loop.
 *
 * Every 4s a droplet falls onto the first letter, lands, and its water washes
 * rightwards through the letterforms while a caustic shimmer drifts inside
 * them. The droplet is absorbed and gone before the next one forms.
 *
 * Three decisions worth keeping:
 *
 * 1. The letters are SOLID WHITE at every frame. The water is a coloured
 *    highlight passing over them, never a fill, so the logo is legible
 *    throughout and cannot be left half-drawn.
 *
 * 2. Every decorative layer is INVISIBLE in its base state and only revealed by
 *    its animation. Stopping the loop is therefore just removing `.logo-anim` —
 *    it can never strand a droplet frozen on the W.
 *
 * 3. The droplet is absolutely positioned, so it takes no layout space and can
 *    appear and vanish without ever shifting the wordmark.
 *
 * `animate` is driven by scroll position: the loop runs while the visitor is at
 * the top of the page and stops once they scroll, because this header is sticky
 * on every page and permanent motion there competes with whatever they are
 * actually reading.
 */
export function Wordmark({
  animate = true,
  className,
}: {
  animate?: boolean;
  className?: string;
}) {
  const text = (
    <>
      Waterbase<span className="hidden sm:inline"> Technologies</span>
    </>
  );

  return (
    <span
      className={cn(
        "relative inline-flex min-w-0 items-center",
        animate && "logo-anim",
        className
      )}
    >
      {/* ── DROPLET ────────────────────────────────────────────── */}
      <span
        className="pointer-events-none absolute -top-[0.15em] left-[0.06em] z-10 inline-flex h-[0.74em] w-[0.74em] items-center justify-center"
        aria-hidden="true"
      >
        <span className="logo-ripple absolute inset-[-0.18em] rounded-full border border-[#5BB8E8]/80" />
        {/* origin-bottom so the squash reads as landing, not shrinking */}
        <svg viewBox="0 0 24 24" className="logo-drop h-full w-full origin-bottom" fill="none">
          <path
            d="M12 1.8c0 0 7.4 7.6 7.4 12.6A7.4 7.4 0 0 1 12 21.8a7.4 7.4 0 0 1-7.4-7.4C4.6 9.4 12 1.8 12 1.8Z"
            fill="#5BB8E8"
          />
          {/* specular dot so it reads as liquid rather than a flat blob */}
          <ellipse cx="9.4" cy="14.6" rx="1.5" ry="2.1" fill="#fff" fillOpacity="0.75" />
        </svg>
      </span>

      {/* ── WORDMARK ───────────────────────────────────────────────
          Base layer is the real, always-solid text. The caustic and wash are
          aria-hidden duplicates stacked on top, so the name is announced once. */}
      <span className="relative min-w-0">
        <span className="logo-word block min-w-0 truncate">{text}</span>
        <span aria-hidden="true" className="logo-caustic pointer-events-none absolute inset-0 block truncate">
          {text}
        </span>
        <span aria-hidden="true" className="logo-wash pointer-events-none absolute inset-0 block truncate">
          {text}
        </span>
      </span>
    </span>
  );
}
