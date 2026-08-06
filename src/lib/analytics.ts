"use client";

type GtagFn = (...args: unknown[]) => void;

// Google Ads account — the same id layout.tsx loads the gtag script for.
const ADS_ID = "AW-874230546";

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

/**
 * Google Ads hands you one of two different things depending on which setup
 * flow you used, and they are fired differently:
 *
 *   1. A conversion LABEL — e.g. "AbC-D_efGhIjKlMnOp", sometimes shown joined
 *      to the account as "AW-874230546/AbC-D_efGhIjKlMnOp". Fired as:
 *          gtag('event', 'conversion', { send_to: 'AW-874230546/<label>' })
 *
 *   2. An EVENT NAME — e.g. "ads_conversion_Call_1". Fired as:
 *          gtag('event', 'ads_conversion_Call_1', {})
 *
 * Pasting one into the slot meant for the other records nothing, silently.
 * So this accepts either: fill in whichever Google gave you. The label wins if
 * both are set. If neither is set it falls back to the original event name.
 *
 * NEXT_PUBLIC_* vars are inlined by Next.js at build time via literal text
 * substitution, which is why each is referenced literally rather than looked
 * up dynamically.
 */
function fireConversion(
  label: string | undefined,
  eventName: string | undefined,
  fallbackEvent: string
) {
  const gtag = getGtag();
  if (!gtag) return;

  const cleanLabel = label?.trim();
  if (cleanLabel) {
    // Accept "AW-123/label" or a bare "label".
    const sendTo = cleanLabel.startsWith("AW-") ? cleanLabel : `${ADS_ID}/${cleanLabel}`;
    gtag("event", "conversion", { send_to: sendTo });
    return;
  }

  gtag("event", eventName?.trim() || fallbackEvent, {});
}

/** WhatsApp / "contact us" clicks — fired site-wide by ConversionTracker. */
export function trackContactClick() {
  try {
    fireConversion(
      process.env.NEXT_PUBLIC_ADS_CONTACT_LABEL,
      process.env.NEXT_PUBLIC_ADS_CONTACT_EVENT,
      "ads_conversion_Contact_Us_1"
    );
  } catch (err) {
    console.error("Gtag error:", err);
  }
}

/** Callback form submitted — fired on the /thank-you page. */
export function trackFormSubmit() {
  try {
    fireConversion(
      process.env.NEXT_PUBLIC_ADS_FORM_LABEL,
      process.env.NEXT_PUBLIC_ADS_FORM_EVENT,
      "ads_conversion_Form_1"
    );
  } catch (err) {
    console.error("Gtag error:", err);
  }
}

/**
 * Phone-call clicks — every visitor-facing tel: link (both "Call Now" CTAs and
 * the mobile sticky bar). Calls are the highest-volume conversion for this
 * business, so this is the one most worth getting right.
 */
export function trackCallClick() {
  try {
    fireConversion(
      process.env.NEXT_PUBLIC_ADS_CALL_LABEL,
      process.env.NEXT_PUBLIC_ADS_CALL_EVENT,
      "ads_conversion_Call_1"
    );
  } catch (err) {
    console.error("Gtag error:", err);
  }
}
