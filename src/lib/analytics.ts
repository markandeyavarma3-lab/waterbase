"use client";

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

/** Fired on WhatsApp clicks (direct-contact intent). */
export function trackContactClick() {
  getGtag()?.("event", "ads_conversion_Contact_Us_1", {});
}

/** Fired on /thank-you page load after successful form submit. */
export function trackFormSubmit() {
  getGtag()?.("event", "ads_conversion_Form_1", {});
}

/**
 * Fired when a visitor taps "Call Now" on an ad landing page.
 * TODO: Replace "ads_conversion_Call_1" with the actual event name from your
 * Google Ads "Phone Call" conversion action (Goals → Conversions → New → Website).
 */
export function trackCallClick() {
  getGtag()?.("event", "ads_conversion_Call_1", {});
}