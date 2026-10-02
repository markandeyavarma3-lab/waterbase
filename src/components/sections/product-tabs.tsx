"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tab buttons + one panel. Panels arrive pre-rendered from the server, so no icons or data cross into client props. */

export function ProductTabs({ labels, panels }: { labels: string[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = labels.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Product groups"
        onKeyDown={onKeyDown}
        className="scroll-touch -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {labels.map((label, i) => {
          const selected = i === active;
          return (
            <button
              key={label}
              ref={(el) => { tabs.current[i] = el; }}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "tap-target-y shrink-0 rounded-full border px-5 py-2.5 font-display text-sm font-semibold transition-colors",
                selected
                  ? "border-brand-green bg-brand-green text-white shadow-soft"
                  : "border-brand-blue-light/60 bg-white text-water-deep hover:border-brand-green/50 hover:bg-brand-green-soft"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="tab-fade mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {panels[active]}
      </div>
    </div>
  );
}
