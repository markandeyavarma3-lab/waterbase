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

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoRun, setLogoRun] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
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
  // Near-solid, not translucent. The hero is now a LIGHT gradient, and a
  // half-transparent dark tint over a light ground just reads as grey smear.
  // Kept a touch of transparency so content still shows movement behind it.
  const pillAlpha = useTransform(settle, [0, 120], [0.93, 0.97], { clamp: true });
  const pillShadow = useTransform(settle, [0, 120], [0.18, 0.34], { clamp: true });
  const pillBg = useMotionTemplate`rgba(18, 60, 70, ${pillAlpha})`;
  const pillGlow = useMotionTemplate`0 10px 30px rgba(4, 14, 20, ${pillShadow})`;

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
          className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 overflow-hidden rounded-full border border-white/10 px-4 backdrop-blur-xl sm:gap-4 sm:px-5"
          style={{ height: barHeight, background: pillBg, boxShadow: pillGlow }}
        >
          {/* water current along the pill's lower edge */}
          <div className="header-water pointer-events-none absolute inset-x-6 bottom-0 h-px" aria-hidden="true" />

          {/* Logo — left */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-1 size-10 shrink-0 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/15 hover:text-white lg:hidden"
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
                className="font-[family-name:var(--font-logo)] text-[clamp(1rem,4.2vw,1.35rem)] font-bold uppercase tracking-[0.042em] text-white"
              />
            </Link>
          </div>

          {/* Nav — centre.
              ONE pill, shared across every item via layoutId, so it GLIDES from
              item to item instead of each one lighting up independently. It
              follows the cursor while hovering and returns to the active page
              when the pointer leaves. */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              // While hovering anywhere in the nav the pill belongs to the
              // hovered item; otherwise it marks the current page.
              const showPill = hovered ? hovered === l.href : active;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  className={cn(
                    // tap-target-y: an iPad Pro is wide enough for the desktop nav
                    // but is still finger-driven, so these need the 44px height.
                    "tap-target-y relative flex items-center rounded-full px-3 py-2 font-display text-[0.8rem] font-semibold uppercase tracking-wide transition-colors duration-200",
                    active || showPill ? "text-white" : "text-white/55"
                  )}
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.13] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </nav>

        </motion.div>
      </motion.div>
    </header>
  );
}
