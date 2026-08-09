/**
 * The hero's signature: a real drip-irrigation network, drawn to scale-ish and
 * running. Mainline across the top and bottom, laterals dropping off them,
 * emitters along each lateral opening in sequence with a droplet falling.
 *
 * Why this rather than decoration:
 *  - It is the actual thing this company installs. A visitor who knows drip
 *    recognises the layout immediately; one who doesn't still reads "pipes,
 *    water, system" rather than "abstract swooshes".
 *  - Nothing else in the market will have it, which was the brief.
 *
 * Restraint, deliberately:
 *  - Everything is low-contrast line work. It must sit BEHIND the headline
 *    without ever competing with it — hence the vertical mask that fades the
 *    network right down through the middle band where the text lives, while
 *    keeping it present across the top and bottom.
 *  - Flow is slow (12s+). Fast motion here would read as a loading spinner.
 *
 * Pure CSS + SVG, so this is a server component and ships no JavaScript.
 */

// x positions of the laterals dropping off the mainline
const LATERALS = [80, 250, 420, 590, 760, 930, 1100, 1270, 1400];
// y positions of emitters along each lateral
const EMITTERS = [250, 330, 410, 490];

export function IrrigationSchematic({ className }: { className?: string }) {
  return (
    <div
      className={"motion-schematic pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Fades the network out behind the headline so it never competes with
              the text, while staying strong across the top and bottom bands.
              WHITE stops, not black: an SVG mask is luminance-based, so black
              masks everything out no matter what its opacity is. */}
          <linearGradient id="schematic-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="20%" stopColor="white" stopOpacity="0.95" />
            <stop offset="34%" stopColor="white" stopOpacity="0.14" />
            <stop offset="62%" stopColor="white" stopOpacity="0.14" />
            <stop offset="76%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          {/* Softens the left/right extremes so the pipes don't hard-stop at the edge */}
          <linearGradient id="schematic-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="12%" stopColor="white" stopOpacity="1" />
            <stop offset="88%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.25" />
          </linearGradient>
          <mask id="schematic-mask">
            <rect width="1440" height="760" fill="url(#schematic-fade)" />
            <rect width="1440" height="760" fill="url(#schematic-edge)" style={{ mixBlendMode: "multiply" }} />
          </mask>
          <linearGradient id="pipe-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6BC097" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#4FE0C4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#93CEEE" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        <g mask="url(#schematic-mask)">
          {/* ── static pipe work ─────────────────────────────── */}
          <g stroke="#8FD9B6" strokeOpacity="0.30" strokeWidth="1.75" strokeLinecap="round">
            <line x1="0" y1="150" x2="1440" y2="150" />
            <line x1="0" y1="610" x2="1440" y2="610" />
            {LATERALS.map((x) => (
              <line key={`lat-${x}`} x1={x} y1="150" x2={x} y2="610" />
            ))}
          </g>

          {/* ── flowing water in the mainlines ───────────────── */}
          <g
            stroke="url(#pipe-stroke)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeDasharray="40 190"
          >
            <line x1="0" y1="150" x2="1440" y2="150" style={{ animation: "pipe-flow 13s linear infinite" }} />
            <line
              x1="1440"
              y1="610"
              x2="0"
              y2="610"
              style={{ animation: "pipe-flow 17s linear infinite" }}
            />
          </g>

          {/* ── flowing water down each lateral, staggered ───── */}
          <g stroke="#4FE0C4" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" strokeDasharray="18 130">
            {LATERALS.map((x, i) => (
              <line
                key={`flow-${x}`}
                x1={x}
                y1="150"
                x2={x}
                y2="610"
                style={{ animation: `pipe-flow ${9 + (i % 4) * 1.6}s linear ${i * 0.55}s infinite` }}
              />
            ))}
          </g>

          {/* ── junction collars where laterals meet the mains ── */}
          <g fill="#6BC097" fillOpacity="0.55">
            {LATERALS.map((x) => (
              <g key={`joint-${x}`}>
                <rect x={x - 3} y={146} width={6} height={8} rx={1.5} />
                <rect x={x - 3} y={606} width={6} height={8} rx={1.5} />
              </g>
            ))}
          </g>

          {/* ── emitters, opening in sequence with a droplet ──── */}
          {LATERALS.map((x, li) =>
            EMITTERS.map((y, ei) => {
              const delay = (li * 0.7 + ei * 1.15) % 9;
              return (
                <g key={`em-${x}-${y}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={3}
                    fill="#4FE0C4"
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      animation: `emitter-pulse 9s var(--ease-in-out-soft) ${delay}s infinite`,
                    }}
                  />
                  <circle
                    cx={x}
                    cy={y + 6}
                    r={1.5}
                    fill="#93CEEE"
                    style={{ animation: `emitter-drop 9s ease-in ${delay}s infinite` }}
                  />
                </g>
              );
            })
          )}
        </g>
      </svg>
    </div>
  );
}
