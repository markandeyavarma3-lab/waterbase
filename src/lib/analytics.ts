"use client";

import { siteConfig } from "@/lib/site-config";

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

/**
 * Google Ads gives you ONE of two things per conversion action, depending on
 * which snippet it hands you:
 *
 *   LABEL  — e.g. "AbC-D_efGhIjKlMnOp", fired as
 *            gtag('event', 'conversion', { send_to: 'AW-xxx/LABEL' })
 *   EVENT  — e.g. "ads_conversion_Call_1", fired as
 *            gtag('event', 'ads_conversion_Call_1', {})
 *
 * Both are supported. If both are set for a conversion the LABEL wins, because
 * send_to targets the conversion action directly and cannot be mismatched by a
 * renamed event. If neither is set we fall back to the historical placeholder
 * name — which Google Ads will NOT count unless it happens to match a real
 * conversion action, so an unconfigured conversion warns in the dev console.
 *
 * NEXT_PUBLIC_* variables are inlined by literal text substitution when the
 * client bundle is built. Every one must therefore appear as a complete
 * `process.env.NEXT_PUBLIC_FOO` expression — a computed lookup such as
 * process.env[name] is not substituted and reads as undefined in the browser.
 * That is why this table is written out longhand instead of generated.
 */
const CONVERSIONS = {
  call: {
    label: process.env.NEXT_PUBLIC_ADS_CALL_LABEL,
    event: process.env.NEXT_PUBLIC_ADS_CALL_EVENT,
    fallback: "ads_conversion_Call_1",
  },
  contact: {
    label: process.env.NEXT_PUBLIC_ADS_CONTACT_LABEL,
    event: process.env.NEXT_PUBLIC_ADS_CONTACT_EVENT,
    fallback: "ads_conversion_Contact_Us_1",
  },
  form: {
    label: process.env.NEXT_PUBLIC_ADS_FORM_LABEL,
    event: process.env.NEXT_PUBLIC_ADS_FORM_EVENT,
    fallback: "ads_conversion_Form_1",
  },
} as const;

type ConversionKind = keyof typeof CONVERSIONS;

/** Treats a variable that is unset, empty, or whitespace-only as "not provided". */
function value(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Accepts a bare label ("AbC-D_efG") or one already joined to the account
 * ("AW-874230546/AbC-D_efG") — Google shows it both ways depending on where you
 * copy it from, and pasting the joined form is the more likely mistake.
 */
function sendTo(label: string): string {
  return label.includes("/") ? label : `${siteConfig.googleAdsId}/${label}`;
}

function fire(kind: ConversionKind) {
  const gtag = getGtag();
  if (!gtag) return;

  const { label, event, fallback } = CONVERSIONS[kind];

  try {
    const configuredLabel = value(label);
    if (configuredLabel) {
      gtag("event", "conversion", { send_to: sendTo(configuredLabel) });
      return;
    }

    const configuredEvent = value(event);
    if (configuredEvent) {
      gtag("event", configuredEvent, {});
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[analytics] "${kind}" conversion is unconfigured — firing placeholder "${fallback}", ` +
          `which Google Ads will not count. Set NEXT_PUBLIC_ADS_${kind.toUpperCase()}_LABEL ` +
          `(or _EVENT) in .env.local and in Vercel, then redeploy.`
      );
    }
    gtag("event", fallback, {});
  } catch (err) {
    console.error("Gtag error:", err);
  }
}

/** Fires when a WhatsApp link is clicked — wired site-wide by ConversionTracker. */
export function trackContactClick() {
  fire("contact");
}

/** Fires once on /thank-you after a genuine callback-form submission. */
export function trackFormSubmit() {
  fire("form");
}

/** Fires when a "Call Now" tel: button is clicked on any landing page. */
export function trackCallClick() {
  fire("call");
}
