"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const RETURN_KEY = "wb:return-after-thanks";
const SECONDS = 5;

/**
 * "Taking you back in 5 seconds…" — then returns the visitor to the page they
 * submitted the form from (lead-form.tsx stores it), or back, or home.
 *
 * Its own component for one reason: it reads search params, and a component
 * that reads search params opts its whole Suspense boundary out of static
 * prerendering. When this logic lived inside <ThankYou>, the entire
 * confirmation page prerendered to nothing — a visitor who had just converted
 * saw a blank screen until the JS arrived. Isolated here, only this one line of
 * text waits; the rest of the page is in the HTML.
 *
 * The form conversion is NOT fired here. FormConversionTracker owns that, once
 * per submission token; firing it from two places is how conversions get
 * double-counted.
 */
export function ThankYouReturn() {
  const router = useRouter();
  const isFromForm = useSearchParams().get("ref") === "lead";
  const [secondsLeft, setSecondsLeft] = useState(SECONDS);

  useEffect(() => {
    if (!isFromForm) return;

    const tick = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);

    const go = window.setTimeout(() => {
      let next: string | null = null;
      try {
        next = sessionStorage.getItem(RETURN_KEY);
        sessionStorage.removeItem(RETURN_KEY);
      } catch {
        next = null;
      }

      // Same-origin paths only — never an open redirect, never back to here.
      if (next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/thank-you")) {
        router.push(next);
        return;
      }
      if (window.history.length > 1) {
        router.back();
        return;
      }
      router.push("/");
    }, SECONDS * 1000);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(go);
    };
  }, [isFromForm, router]);

  if (!isFromForm) return null;

  return (
    <p className="mt-3 text-sm text-water-deep/55">
      Taking you back in <span className="font-semibold text-water-deep/80">{secondsLeft}</span> seconds…
    </p>
  );
}
