"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "wb:consent";

type Choice = "granted" | "denied";

/**
 * A one-key store over localStorage.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: localStorage
 * cannot be read while rendering on the server, and reading it in an effect
 * then calling setState is exactly the cascading-render pattern React 19 warns
 * about. This models it honestly — localStorage IS an external store — and the
 * server snapshot renders nothing, so there is no hydration mismatch and no
 * flash of a banner for someone who already answered.
 */
let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

/** null = no answer yet · "granted"/"denied" = answered · "unavailable" = no storage */
function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode, browser setting). We cannot remember an
    // answer, so asking on every single page view would be pure nuisance.
    return "unavailable";
  }
}

function getServerSnapshot(): string {
  return "ssr";
}

function apply(choice: Choice) {
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  const granted = choice === "granted";
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

/**
 * Consent gate for the Google tags.
 *
 * Analytics and Ads cookies previously dropped on first paint with no notice
 * and no way to decline — the Privacy Policy's only remedy was "disable cookies
 * in your browser", which is not consent. India's DPDP Act 2023 requires notice
 * and consent before processing personal data, and the site is served globally,
 * so an EU visitor also brings GDPR/ePrivacy into scope.
 *
 * The default state is set in AnalyticsTags BEFORE gtag.js loads (denied), so
 * this component only ever *upgrades* consent. It renders nothing once a choice
 * is stored, and it never blocks the page — it is a bar at the bottom, not a
 * modal, because a modal on a paid landing page costs conversions outright.
 *
 * Storage failures (private browsing, storage disabled) are swallowed: the
 * banner reappears next visit, which is the safe direction to fail.
 */
export function ConsentBanner() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function choose(choice: Choice) {
    apply(choice);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Can't persist. The choice still applies for this page view.
    }
    listeners.forEach((l) => l());
  }

  // Only `null` — storage works and holds no answer — shows the banner.
  if (stored !== null) return null;

  // Deliberately NOT framer-motion. This is a one-shot entrance on a component
  // that renders on every page; pulling the animation library in for it would
  // undo part of what the bundle work bought. A CSS keyframe does the same job
  // for nothing, and motion-reduce turns it off.
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      // bottom-[4.5rem] on small screens so it never covers the sticky
      // Call/WhatsApp bar — that bar is the conversion path and must stay
      // reachable while this is on screen.
      className="fixed inset-x-0 bottom-[4.5rem] z-[90] animate-[consent-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both] px-3 pb-2 motion-reduce:animate-none md:bottom-0 md:px-4 md:pb-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          We use cookies to measure how the site is used and how well our ads work. You can
          accept or decline — declining does not affect any part of the site.{" "}
          <Link href="/privacy" className="font-medium text-brand-green hover:underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => choose("denied")}>
            Decline
          </Button>
          <Button size="sm" onClick={() => choose("granted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
