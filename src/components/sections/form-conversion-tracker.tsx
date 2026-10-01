"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackFormSubmit } from "@/lib/analytics";

/**
 * Fires the Google Ads form conversion, once per submission.
 *
 * This is deliberately its OWN component, so that the `useSearchParams()` call
 * lives in the smallest possible subtree. Reading search params opts a subtree
 * out of static prerendering — and because the whole `<ThankYou>` page used to
 * sit inside one `<Suspense fallback={null}>` for the sake of this one hook, the
 * entire page prerendered to nothing. A visitor who had just converted got a
 * blank white screen until the JS bundle arrived, which is the worst possible
 * moment for a blank screen.
 *
 * Now the page renders on the server and only this invisible component waits.
 *
 * Dedupe: the token in the URL identifies one submission, so a reload, a back
 * navigation, or a shared link does not re-fire and inflate the number Google
 * Ads bids against — while a genuine SECOND submission carries a new token and
 * is counted again.
 */
export function FormConversionTracker() {
  const searchParams = useSearchParams();
  const isFromForm = searchParams.get("ref") === "lead";
  const token = searchParams.get("s");

  useEffect(() => {
    if (!isFromForm) return;

    // A link without a token predates this change (or was hand-edited); still
    // worth counting, but only the first time it is seen in this session.
    const key = `wb:conversion:form:${token ?? "untokenized"}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private browsing or storage disabled — fall through and count it rather
      // than losing a real conversion.
    }

    trackFormSubmit();
  }, [isFromForm, token]);

  return null;
}
