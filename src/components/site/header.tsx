"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/site/wordmark";
import { NAV_LINKS, SOLUTION_LINKS } from "@/lib/nav";

/** Scroll distance over which the bar settles from its "at top" to "scrolled" state. */
const SETTLE_PX = 120;

/**
 * The site header — without framer-motion.
 *
 * The bar still responds to scroll CONTINUOUSLY rather than flipping between
 * two states: height 62→54px, rail padding 12→6px, the frosted veil and the
 * shadow all resolve together over the first 120px, and a hairline at the top
 * tracks reading progress. What changed is how.
 *
 * It used to be five framer-motion springs and transforms (useScroll, useSpring
 * ×2, useTransform ×4, useMotionTemplate). The header renders in the root
 * layout, so that put the whole animation library on the critical path of
 * every page on the site — including the paid landing pages, whose only job is
 * to load fast on a phone.
 *
 * Now: one passive scroll listener, throttled to one write per animation frame,
 * sets two CSS custom properties on <header> (`--hdr-p` 0→1 and
 * `--hdr-progress` 0→1). Every visual is a `calc()` of those in globals.css
 * (`.hdr-*`), and a short CSS transition stands in for the spring's smoothing.
 * Scrolling causes ZERO React re-renders; state changes only at the two
 * thresholds that genuinely change markup (hide/show, and the wordmark loop).
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [logoRun, setLogoRun] = useState(0);
  // Drives the wordmark loop. Deliberately a larger threshold than the visual
  // settle, so small jitter at the top does not kill the logo mid-drop.
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const apply = () => {
      frame = 0;
      const el = headerRef.current;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (el) {
        el.style.setProperty("--hdr-p", Math.min(1, Math.max(0, y / SETTLE_PX)).toFixed(3));
        el.style.setProperty("--hdr-progress", (max > 0 ? Math.min(1, y / max) : 0).toFixed(4));
      }

      const delta = y - lastY.current;
      setAtTop(y < 90);
      // Never hide the bar while the mobile menu is open.
      if (!open) {
        if (y <= 140) setHidden(false);
        else if (delta > 10) setHidden(true);
        else if (delta < -10) setHidden(false);
      }
      lastY.current = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Initial sync (e.g. a reload halfway down the page), also via rAF so it
    // happens outside the effect body.
    frame = requestAnimationFrame(apply);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  // Mobile menu items enter one after another; `--i` feeds the CSS delay.
  let menuIndex = 0;
  const stagger = (): CSSProperties => ({ ["--i" as string]: menuIndex++ });

  return (
    <header
      ref={headerRef}
      className={cn(
        // FIXED, not sticky. A sticky header still occupies space in the flow,
        // so the pill would float over the page background rather than over the
        // hero. Fixed takes it out of flow and lets the hero run up behind it.
        // The hero and page heroes carry matching top padding to clear it.
        "site-header fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out-expo",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* Reading progress — a hairline at the very top edge of the viewport. */}
      <div
        className="hdr-progress absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-brand-green to-brand-blue"
        aria-hidden="true"
      />

      {/* ── FLOATING PILL ───────────────────────────────────────
          Detached from the edges with its own translucent surface, so it sits
          over the page rather than dividing it. It gains veil and shadow as you
          scroll, which keeps it legible once light content passes beneath. */}
      <div className="hdr-rail px-3 sm:px-4 md:px-6">
        <div className="hdr-bar nav-bar-sink relative isolate mx-auto flex max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-full px-4 sm:gap-4 sm:px-5">
          {/* Frosted veil — no own mesh layer; the page background bleeds through.
              -z-10 inside the `isolate` bar: behind every piece of bar content,
              but still above the bar's own background. Without it the veil (an
              absolutely positioned layer) painted OVER anything in the bar that
              is not itself positioned — the Call button and the mobile menu
              button washed out to grey as the veil strengthened on scroll. */}
          <div
            className="hdr-veil pointer-events-none absolute inset-0 -z-10 rounded-full bg-white/60 backdrop-blur-md"
            aria-hidden="true"
          />
          {/* water current along the pill's lower edge */}
          <div className="header-water pointer-events-none absolute inset-x-6 bottom-0 h-px" aria-hidden="true" />

          {/* Logo — left */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-1 size-10 shrink-0 rounded-full border border-water-deep/15 bg-water-deep/[0.04] text-water-deep hover:bg-water-deep/10 hover:text-water-deep lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              {/* Never wider than the screen — w-72 alone overflowed a 320px phone */}
              <SheetContent side="left" className="w-[min(18rem,85vw)]">
                <SheetHeader>
                  <SheetTitle className="font-display">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </SheetHeader>
                {/* Radix unmounts closed sheet content, so these CSS entrance
                    animations replay on every open — the same behaviour the
                    AnimatePresence stagger had. */}
                <nav aria-label="Mobile navigation" className="mt-2 flex flex-col gap-1 px-2">
                  {NAV_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      style={stagger()}
                      className={cn(
                        "hdr-menu-item flex min-h-11 items-center rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent",
                        isActive(l.href) && "bg-accent text-brand-green"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}

                  {/* The six solution pages. Before this group (and the footer
                      column) existed, five of them had no internal links at all. */}
                  <p
                    style={stagger()}
                    className="hdr-menu-item mt-4 border-t border-border px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    Solutions
                  </p>
                  {SOLUTION_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      style={stagger()}
                      className={cn(
                        "hdr-menu-item flex min-h-11 items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
                        isActive(l.href) && "bg-accent text-brand-green"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Remounting via `logoRun` is what restarts the CSS animation — a
                CSS animation will not replay merely because you hover. */}
            <Link
              href="/"
              className="tap-target-y flex min-w-0 items-center"
              onMouseEnter={() => setLogoRun((n) => n + 1)}
            >
              <Wordmark
                key={logoRun}
                animate={atTop}
                className="font-[family-name:var(--font-logo)] text-[clamp(1.3rem,5.4vw,1.9rem)] font-bold uppercase tracking-[0.042em] text-heading lg:text-[clamp(1.2rem,2.25vw,1.85rem)]"
              />
            </Link>
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex xl:gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="nav-link tap-target-y flex items-center px-3 py-2 font-display text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-water-deep/80 transition-colors hover:text-water-deep aria-[current=page]:text-brand-green"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
