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
      <svg className="absolute inset-y-0 left-0 h-full w-[200%]" style={{ animation: "wave-drift-1 26s linear infinite" }} viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d={WAVE_PATH} fill={fill} fillOpacity={0.5} />
        <path d={WAVE_PATH} fill={fill} fillOpacity={0.5} transform="translate(1200,0)" />
      </svg>
      <svg className="absolute inset-y-0 left-0 h-full w-[200%]" style={{ animation: "wave-drift-2 34s linear infinite" }} viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d={WAVE_PATH} fill={fill} />
        <path d={WAVE_PATH} fill={fill} transform="translate(1200,0)" />
      </svg>
    </div>
  );
}
