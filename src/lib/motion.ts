/**
 * The single source of truth for motion, mirroring the CSS tokens in globals.css.
 *
 * The site previously had ~12 effects each on their own curve and duration,
 * which is what made the motion feel arbitrary rather than designed. Import
 * from here rather than typing a duration inline, so everything shares one rhythm.
 */

/** Entrances and reveals — decelerating, calm. Matches CSS `--ease-out-expo`. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
/** Layout/size changes — slightly softer landing. Matches `--ease-out-soft`. */
export const EASE_OUT_SOFT = [0.22, 0.8, 0.3, 1] as const;

/** Seconds. Mirrors `--dur-snap` / `--dur-quick` / `--dur-settle`. */
export const DUR = {
  snap: 0.12,
  quick: 0.22,
  settle: 0.62,
} as const;

/**
 * Distance an element travels on entrance. Small on purpose: long travel reads
 * as a slideshow. ~10px registers as motion without announcing itself.
 */
export const REVEAL_Y = 10;

/** Gap between staggered siblings. Past ~90ms a grid feels like it is loading slowly. */
export const STAGGER_STEP = 0.06;
