import { cn } from "@/lib/utils";

/**
 * Wave paths are built from symmetric cubic segments whose tangents match at
 * every join — including the 1200 → 2400 tile join — so the crest has no kinks
 * and the -50% drift loops without a visible seam.
 */
function wavePath(mid: number, amp: number, periods: number) {
  const seg = 1200 / periods / 2;
  const k = seg / 2;
  let d = `M0,${mid}`;
  for (let i = 0; i < periods * 2; i++) {
    const x0 = i * seg;
    const up = i % 2 === 0;
    d += ` C${x0 + k},${up ? mid - amp : mid + amp} ${x0 + seg - k},${up ? mid - amp : mid + amp} ${x0 + seg},${mid}`;
  }
  return d;
}
const FRONT = wavePath(62, 22, 2);
const BACK = wavePath(48, 28, 3);
const close = (d: string) => `${d} L1200,120 L0,120 Z`;

function Tile({ d, fill, opacity, stroke }: { d: string; fill: string; opacity?: number; stroke?: string }) {
  return (
    <>
      {[0, 1200].map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d={close(d)} fill={fill} fillOpacity={opacity} />
          {stroke ? <path d={d} fill="none" stroke={stroke} strokeWidth={1.5} vectorEffect="non-scaling-stroke" /> : null}
        </g>
      ))}
    </>
  );
}

function WaveLayers({ fill }: { fill: string }) {
  return (
    <>
      {/* Sky-tinted back swell: the contrast that makes the wave read against a pale neighbour. */}
      <svg className="wave-svg wave-back absolute inset-y-0 left-0 h-full" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <Tile d={BACK} fill="#3FA3DA" opacity={0.14} />
      </svg>
      <svg className="wave-svg wave-mid absolute inset-y-0 left-0 h-full" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <Tile d={wavePath(54, 24, 2)} fill={fill} opacity={0.6} />
      </svg>
      {/* Front: the section colour itself, with a soft white highlight along the crest. */}
      <svg className="wave-svg wave-front absolute inset-y-0 left-0 h-full" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <Tile d={FRONT} fill={fill} stroke="rgba(255,255,255,0.85)" />
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

/** Translucent waves drifting across a banner or bar, for movement behind content. */
export function WaveBackdrop({ className, tone = "sky" }: { className?: string; tone?: "sky" | "light" }) {
  const a = tone === "sky" ? "#3FA3DA" : "#FFFFFF";
  const b = tone === "sky" ? "#2E9466" : "#FFFFFF";
  return (
    <div className={cn("motion-wave pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <svg className="wave-svg wave-back absolute bottom-0 left-0 h-[38%]" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <Tile d={BACK} fill={a} opacity={tone === "sky" ? 0.07 : 0.35} />
      </svg>
      <svg className="wave-svg wave-mid absolute bottom-0 left-0 h-[26%]" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <Tile d={wavePath(54, 24, 2)} fill={b} opacity={tone === "sky" ? 0.06 : 0.3} />
      </svg>
      <svg className="wave-svg wave-front absolute bottom-0 left-0 h-[16%]" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <Tile d={FRONT} fill={a} opacity={tone === "sky" ? 0.09 : 0.4} />
      </svg>
    </div>
  );
}
