import { cn } from "@/lib/utils";

const WAVE_PATH = "M0,40 C150,90 350,0 600,40 C850,80 1050,10 1200,40 L1200,120 L0,120 Z";
// Back layer: higher crests, shifted phase, so two distinct waves show.
const WAVE_PATH_BACK = "M0,30 C200,0 400,70 600,30 C800,-5 1000,70 1200,30 L1200,120 L0,120 Z";

function WaveLayers({ fill }: { fill: string }) {
  return (
    <>
      {/* The viewBox spans 2400 units: each svg holds two copies of the wave
          (x=0 and x=1200) so the -50% drift tiles without a seam. */}
      <svg
        className="absolute inset-y-0 left-0 h-full"
        style={{ width: "200%", animation: "wave-drift-1 16s linear infinite" }}
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATH_BACK} fill={fill} fillOpacity={0.45} />
        <path d={WAVE_PATH_BACK} fill={fill} fillOpacity={0.45} transform="translate(1200,0)" />
      </svg>
      <svg
        className="absolute inset-y-0 left-0 h-full"
        style={{ width: "200%", animation: "wave-drift-2 21s linear infinite" }}
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATH} fill={fill} />
        <path d={WAVE_PATH} fill={fill} transform="translate(1200,0)" />
      </svg>
    </>
  );
}

/** Drifting wave at the bottom of a section (`relative overflow-hidden`), filled with the next section's colour. */
export function WaveDivider({ fill, className }: { fill: string; className?: string }) {
  return (
    <div className={cn("motion-wave pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-14 md:h-20", className)} aria-hidden="true">
      <WaveLayers fill={fill} />
    </div>
  );
}

/**
 * Wave that rises out of the section above. Goes inside an element with the
 * `wave-top` class, which pulls the section up by --wave-h and leaves that band
 * unpainted, so the previous section shows behind the wave crests.
 */
export function WaveTop() {
  return (
    <div className="motion-wave pointer-events-none absolute inset-x-0 top-0 -z-10 h-[var(--wave-h)]" aria-hidden="true">
      <WaveLayers fill="var(--section-bg)" />
    </div>
  );
}
