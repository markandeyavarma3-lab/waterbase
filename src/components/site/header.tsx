"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  motion, useScroll, useSpring, useTransform, useMotionTemplate, AnimatePresence,
} from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/site/wordmark";
import { NAV_LINKS } from "@/lib/nav";

// Fixed pill colour per nav-link tone — always visible, not just on
// hover/active, so the bar itself carries colour rather than being plain
// text until you touch it. Translucent fill + border + blur, same recipe as
// the WhatsApp/callback buttons on the "Planning a project" CTA panel
// (bg-brand-*/15, border-brand-*/25, backdrop-blur-sm) — a faded wash, not a
// flat block.
const NAV_TONE = {
  blue: { bg: "bg-brand-blue/12", border: "border-brand-blue/25", text: "text-brand-blue-dark", hover: "hover:bg-brand-blue/20" },
  green: { bg: "bg-brand-green/12", border: "border-brand-green/25", text: "text-brand-green-dark", hover: "hover:bg-brand-green/20" },
  soil: { bg: "bg-brand-soil/12", border: "border-brand-soil/25", text: "text-brand-soil-dark", hover: "hover:bg-brand-soil/20" },
  sun: { bg: "bg-brand-sun/16", border: "border-brand-sun/28", text: "text-brand-sun-dark", hover: "hover:bg-brand-sun/24" },
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoRun, setLogoRun] = useState(0);
  // Drives the wordmark loop. Deliberately a larger threshold than the visual
  // scroll response below, so small jitter at the top does not kill the logo
  // animation mid-drop.
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.3 });

  // The bar responds to scroll CONTINUOUSLY rather than flipping between two
  // states at a threshold. Everything below is driven off one 0-120px range so
  // the changes resolve together, which is what reads as engineered rather than
  // switched. A light spring smooths the raw value without adding lag.
  const settle = useSpring(scrollY, { stiffness: 260, damping: 40, mass: 0.35 });
  const barHeight = useTransform(settle, [0, 120], [62, 54], { clamp: true });
  const railPad = useTransform(settle, [0, 120], [12, 6], { clamp: true });
  // Frosted WHITE, not a dark slab. The hero is a light gradient, so the bar
  // belongs to it rather than sitting on top of it. Separation comes from a soft
  // shadow and a faint border, not from a colour jump — which is what keeps it
  // findable without turning it into a block. This white layer is a VEIL over
  // the .header-wash gradient beneath it (see globals.css), not the pill's only
  // colour — capped at 0.9 so the wash is never fully hidden, even scrolled.
  const pillAlpha = useTransform(settle, [0, 120], [0.5, 0.9], { clamp: true });
  const pillShadow = useTransform(settle, [0, 120], [0.07, 0.13], { clamp: true });
  const pillGlow = useMotionTemplate`0 10px 30px rgba(18, 60, 70, ${pillShadow})`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setAtTop(y < 90);
      if (!open) {
        if (y <= 140) setHidden(false);
        else if (delta > 10) setHidden(true);
        else if (delta < -10) setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header
      className={cn(
        // FIXED, not sticky. A sticky header still occupies space in the flow,
        // so the pill would float over the page background rather than over the
        // hero. Fixed takes it out of flow and lets the dark hero run up behind
        // it — which is the whole point of a floating bar. The hero and page
        // heroes carry matching top padding so their content clears it.
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out-expo",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* Reading progress — a hairline at the very top edge of the viewport. */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-gradient-to-r from-brand-green to-brand-blue"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* ── FLOATING PILL ───────────────────────────────────────
          Detached from the edges with its own translucent surface, so it sits
          over the page rather than dividing it. It gains opacity and shadow as
          you scroll, which is what keeps it legible once light content passes
          beneath it. */}
      <motion.div className="px-3 sm:px-4 md:px-6" style={{ paddingTop: railPad, paddingBottom: railPad }}>
        <motion.div
          className="relative isolate mx-auto flex max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-full border border-water-deep/8 px-4 backdrop-blur-xl sm:gap-4 sm:px-5"
          style={{ height: barHeight, boxShadow: pillGlow }}
        >
          {/* Colour wash — the same four section hues as the rest of the site,
              fading into each other and drifting slowly, so the pill is never
              a flat colour underneath the frost. */}
          <div className="header-wash pointer-events-none absolute inset-0 -z-20" aria-hidden="true" />
          {/* Scroll-driven white veil on top of the wash — this is what makes
              the bar read as "frosted white", but it caps below full opacity
              so the wash always shows through, even scrolled. */}
          <motion.div className="pointer-events-none absolute inset-0 -z-10 bg-white" style={{ opacity: pillAlpha }} aria-hidden="true" />

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
                <AnimatePresence>
                  {open && (
                    <motion.nav
                      aria-label="Mobile navigation"
                      className="mt-2 flex flex-col gap-1 px-2"
                      initial="hidden"
                      animate="show"
                      variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                    >
                      {NAV_LINKS.map((l) => (
                        <motion.div
                          key={l.href}
                          variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex min-h-11 items-center rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent",
                              isActive(l.href) && "bg-accent text-brand-green"
                            )}
                          >
                            {l.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.nav>
                  )}
                </AnimatePresence>
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
                className="font-[family-name:var(--font-logo)] text-[clamp(1rem,4.2vw,1.35rem)] font-bold uppercase tracking-[0.042em] text-water-deep"
              />
            </Link>
          </div>

          {/* Nav — centre. Each link carries its own fixed-colour pill, an
              even rotation through the site's four section hues, so the bar
              itself is never a flat row of plain text — same idea as the
              coloured WhatsApp / callback pills on the "Planning a project"
              CTA panel, applied to navigation. */}
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              const tone = NAV_TONE[l.tone];
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    // tap-target-y: an iPad Pro is wide enough for the desktop nav
                    // but is still finger-driven, so these need the 44px height.
                    "tap-target-y flex items-center rounded-full border px-3.5 py-2 font-display text-[0.8rem] font-semibold uppercase tracking-wide backdrop-blur-sm transition-all duration-200",
                    tone.bg, tone.border, tone.text, tone.hover,
                    active && "shadow-sm"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

        </motion.div>
      </motion.div>
    </header>
  );
}
