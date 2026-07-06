import { cn } from "@/lib/utils";

type Blob = {
  gradient: string;
  className: string;
  animation: string;
};

const variants = {
  /** Hero — full sunrise: green, sky blue, sun orange */
  hero: [
    { gradient: "radial-gradient(circle,rgba(107,192,151,0.22),transparent_65%)", className: "-right-[10%] -top-[20%] h-[55vw] w-[55vw]", animation: "aurora-1 24s ease-in-out infinite" },
    { gradient: "radial-gradient(circle,rgba(63,163,218,0.16),transparent_65%)", className: "-left-[12%] top-[8%] h-[45vw] w-[45vw]", animation: "aurora-2 28s ease-in-out infinite" },
    { gradient: "radial-gradient(circle,rgba(244,162,76,0.18),transparent_60%)", className: "-bottom-[30%] left-[18%] h-[55vw] w-[55vw]", animation: "aurora-1 26s ease-in-out infinite" },
  ],
  /** Light muted sections — cool green/blue, kept faint for readability on a light background */
  cool: [
    { gradient: "radial-gradient(circle,rgba(46,148,102,0.10),transparent_65%)", className: "-right-[15%] -top-[25%] h-[48vw] w-[48vw]", animation: "aurora-2 30s ease-in-out infinite" },
    { gradient: "radial-gradient(circle,rgba(63,163,218,0.09),transparent_65%)", className: "-left-[18%] bottom-[-20%] h-[42vw] w-[42vw]", animation: "aurora-3 34s ease-in-out infinite" },
  ],
  /** Dark sections — deep teal + glow accent (APMIP) */
  "dark-teal": [
    { gradient: "radial-gradient(circle,rgba(20,135,196,0.20),transparent_60%)", className: "-left-[10%] bottom-[-25%] h-[52vw] w-[52vw]", animation: "aurora-2 27s ease-in-out infinite" },
    { gradient: "radial-gradient(circle,rgba(79,224,196,0.14),transparent_65%)", className: "-right-[12%] -top-[20%] h-[46vw] w-[46vw]", animation: "aurora-3 32s ease-in-out infinite" },
  ],
  /** Dark sections — converging green glow (final CTA) */
  "dark-converge": [
    { gradient: "radial-gradient(circle,rgba(63,160,108,0.22),transparent_60%)", className: "left-1/2 top-[-30%] h-[60vw] w-[60vw] -translate-x-1/2", animation: "aurora-1 22s ease-in-out infinite" },
    { gradient: "radial-gradient(circle,rgba(79,224,196,0.12),transparent_65%)", className: "-right-[10%] bottom-[-25%] h-[40vw] w-[40vw]", animation: "aurora-2 30s ease-in-out infinite" },
  ],
} satisfies Record<string, Blob[]>;

export function AuroraGlow({ variant, className }: { variant: keyof typeof variants; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      {variants[variant].map((blob, i) => (
        <div
          key={i}
          className={cn("motion-aurora absolute rounded-full blur-3xl", blob.className)}
          style={{ backgroundImage: blob.gradient, animation: blob.animation }}
        />
      ))}
    </div>
  );
}
