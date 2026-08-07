import { cn } from "@/lib/utils";

const WAVE_PATH = "M0,40 C150,90 350,0 600,40 C850,80 1050,10 1200,40 L1200,120 L0,120 Z";

/**
 * A drifting double-layered wave, meant to sit at the bottom of a section
 * (which must be `relative overflow-hidden`) so its color reads as the
 * "shoreline" into whatever comes next.
 */
export function WaveDivider({ fill, className }: { fill: string; className?: string }) {
  return (
    <div className={cn("motion-wave pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-14 md:h-20", className)} aria-hidden="true">
      {/* The viewBox spans 2400 units, not 1200. Each svg holds two copies of the
          wave (at x=0 and x=1200) so the -50% drift tiles seamlessly. With the
          old 1200-wide viewBox the second copy sat OUTSIDE the visible area and
          never rendered, so as soon as a layer drifted left it left bare section
          showing — a hard vertical seam partway across the divider. */}
      <svg
        className="absolute inset-y-0 left-0 h-full"
        style={{ width: "200%", animation: "wave-drift-1 26s linear infinite" }}
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATH} fill={fill} fillOpacity={0.5} />
        <path d={WAVE_PATH} fill={fill} fillOpacity={0.5} transform="translate(1200,0)" />
      </svg>
      <svg
        className="absolute inset-y-0 left-0 h-full"
        style={{ width: "200%", animation: "wave-drift-2 34s linear infinite" }}
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATH} fill={fill} />
        <path d={WAVE_PATH} fill={fill} transform="translate(1200,0)" />
      </svg>
    </div>
  );
}
