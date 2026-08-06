/**
 * The hero's one signature motion: light refracting through a moving water
 * surface, for an irrigation company.
 *
 * Why it is built this way:
 *  - Two counter-drifting layers of soft light pools. Where they overlap they
 *    brighten, and because they move at different speeds and directions the
 *    bright regions wander — that interference is what reads as "water", not
 *    any single moving shape.
 *  - `screen` blending so it only ever adds light to the dark section beneath,
 *    never muddies it.
 *  - Animation is transform + opacity only, so it stays on the compositor. The
 *    blur is applied once as a static filter, never animated.
 *  - It replaces three effects that were each nearly invisible (an aurora at
 *    0.08 alpha behind blur-3xl, a canvas ripple, and a cursor glow).
 *
 * Server component — it is pure CSS, so it ships no JavaScript.
 */
export function WaterCaustics({ className }: { className?: string }) {
  return (
    <div
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
      aria-hidden="true"
    >
      {/* Layer A — the primary light pools */}
      <div
        className="motion-caustic absolute -inset-[25%] opacity-70 will-change-transform"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 38% 20% at 22% 28%, rgba(79,224,196,0.34), transparent 62%)",
            "radial-gradient(ellipse 30% 16% at 68% 18%, rgba(147,206,238,0.26), transparent 62%)",
            "radial-gradient(ellipse 34% 19% at 46% 72%, rgba(107,192,151,0.30), transparent 62%)",
            "radial-gradient(ellipse 26% 14% at 84% 62%, rgba(79,224,196,0.22), transparent 62%)",
          ].join(","),
          filter: "blur(44px)",
          mixBlendMode: "screen",
          animation: "caustic-a var(--dur-drift, 26s) var(--ease-in-out-soft) infinite",
        }}
      />
      {/* Layer B — counter-drift; the overlap with A is what wanders */}
      <div
        className="motion-caustic absolute -inset-[25%] opacity-60 will-change-transform"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 32% 17% at 62% 40%, rgba(107,192,151,0.30), transparent 62%)",
            "radial-gradient(ellipse 28% 15% at 30% 62%, rgba(79,224,196,0.24), transparent 62%)",
            "radial-gradient(ellipse 36% 18% at 78% 84%, rgba(147,206,238,0.20), transparent 62%)",
          ].join(","),
          filter: "blur(52px)",
          mixBlendMode: "screen",
          animation: "caustic-b calc(var(--dur-drift, 26s) * 1.45) var(--ease-in-out-soft) infinite",
        }}
      />
      {/* Fine horizontal banding — the surface line pattern, kept very faint */}
      <div
        className="motion-caustic absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            "repeating-linear-gradient(178deg, rgba(255,255,255,0.030) 0px, rgba(255,255,255,0.030) 1px, transparent 1px, transparent 9px)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 75%)",
          animation: "caustic-sheen calc(var(--dur-drift, 26s) * 0.85) var(--ease-in-out-soft) infinite",
        }}
      />
    </div>
  );
}
