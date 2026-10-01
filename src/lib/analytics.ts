"use client";

import { siteConfig } from "@/lib/site-config";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: GtagFn;
  }
}

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  return typeof window.gtag === "function" ? window.gtag : null;
}

/**
 * Push a Custom Event into GTM's dataLayer.
 * Create a GTM trigger of type "Custom Event" with the same `event` name.
 */
export function pushDataLayer(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

/**
 * The ONE Google Ads conversion action the single ad optimises for: "Contact Us"
 * (account AW-874230546). Google Ads gave this event snippet for it:
 *
 *   gtag('event', 'ads_conversion_Contact_Us_1', { … })
 *
 * Every way a visitor reaches the business counts as a contact, so all three
 * paths fire it by default:
 *   - callback form — on /thank-you load after a real submission (the "Page
 *     load" option Google Ads offered; FormConversionTracker dedupes it)
 *   - WhatsApp click
 *   - Call now click (calls are ~two-thirds of this business's leads)
 *
 * Set the action's "Count" to ONE in Google Ads, so a visitor who WhatsApps and
 * then also fills the form is one conversion, not two.
 */
export const CONTACT_US_EVENT = "ads_conversion_Contact_Us_1";

/**
 * Per-path overrides, for if separate Call / WhatsApp / Form actions are ever
 * created again. Google gives ONE of two things per action:
 *
 *   LABEL  — e.g. "AbC-D_efGhIjKlMnOp", fired as
 *            gtag('event', 'conversion', { send_to: 'AW-xxx/LABEL' })
 *   EVENT  — e.g. "ads_conversion_Call_1", fired as
 *            gtag('event', 'ads_conversion_Call_1', {})
 *
 * If both are set the LABEL wins (send_to targets the action directly). If
 * neither is set — the normal case now — the path fires CONTACT_US_EVENT.
 *
 * NEXT_PUBLIC_* variables are inlined by literal text substitution when the
 * client bundle is built, so each must appear as a complete
 * `process.env.NEXT_PUBLIC_FOO` expression; a computed process.env[name] reads
 * as undefined in the browser. Hence the longhand table.
 */
const CONVERSIONS = {
  call: {
    label: process.env.NEXT_PUBLIC_ADS_CALL_LABEL,
    event: process.env.NEXT_PUBLIC_ADS_CALL_EVENT,
  },
  contact: {
    label: process.env.NEXT_PUBLIC_ADS_CONTACT_LABEL,
    event: process.env.NEXT_PUBLIC_ADS_CONTACT_EVENT,
  },
  form: {
    label: process.env.NEXT_PUBLIC_ADS_FORM_LABEL,
    event: process.env.NEXT_PUBLIC_ADS_FORM_EVENT,
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

/** Also send a GA4 event so GTM / GA4 pick up the CTA without extra tags. */
function ga4Event(name: string, params: Record<string, unknown> = {}) {
  const gtag = getGtag();
  gtag?.("event", name, params);
}

function fire(kind: ConversionKind) {
  const gtag = getGtag();
  if (!gtag) return;

  const { label, event } = CONVERSIONS[kind];

  // `beacon` lets the hit survive the page being left — which is exactly what
  // a Call or WhatsApp click is about to do. It does the job of the "delayed
  // navigation helper" Google Ads offers (gtagSendEvent + event_callback)
  // without holding the visitor back for up to two seconds before the dialer
  // or WhatsApp opens.
  const params = { transport_type: "beacon" };

  try {
    const configuredLabel = value(label);
    if (configuredLabel) {
      gtag("event", "conversion", { send_to: sendTo(configuredLabel), ...params });
      return;
    }
    gtag("event", value(event) ?? CONTACT_US_EVENT, params);
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
  pushDataLayer("cta_form_submit", { cta: "form_submit" });
  ga4Event("cta_form_submit", { cta: "form_submit" });
  fire("form");
}

/** Hero / landing "Call now" tel: click — Ads conversion + GTM event `cta_call_now`. */
export function trackCallClick() {
  pushDataLayer("cta_call_now", { cta: "call_now", phone: siteConfig.callNowNumber });
  ga4Event("cta_call_now", { cta: "call_now", phone: siteConfig.callNowNumber });
  fire("call");
}

/** Hero / sticky "Request a callback" click — GTM event `cta_request_callback`. */
export function trackRequestCallbackClick() {
  pushDataLayer("cta_request_callback", { cta: "request_callback" });
  ga4Event("cta_request_callback", { cta: "request_callback" });
}

/**
 * WhatsApp float / sticky WhatsApp — GTM event `cta_whatsapp_float`
 * plus the WhatsApp/contact Ads conversion.
 */
export function trackWhatsAppFloatClick() {
  pushDataLayer("cta_whatsapp_float", { cta: "whatsapp_float", phone: siteConfig.whatsappNumber });
  ga4Event("cta_whatsapp_float", { cta: "whatsapp_float", phone: siteConfig.whatsappNumber });
  fire("contact");
}
