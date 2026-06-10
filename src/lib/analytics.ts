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