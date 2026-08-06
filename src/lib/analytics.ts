"use client";

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: GtagFn }).gtag;
  return typeof g === "function" ? g : null;
}

export function trackContactClick() {
  try {
    getGtag()?.("event", "ads_conversion_Contact_Us_1", {});
  } catch (err) {
    console.error("Gtag error:", err);
  }
}

export function trackFormSubmit() {
  try {
    getGtag()?.("event", "ads_conversion_Form_1", {});
  } catch (err) {
    console.error("Gtag error:", err);
  }
}

export function trackCallClick() {
  try {
    getGtag()?.("event", "ads_conversion_Call_1", {});
  } catch (err) {
    console.error("Gtag error:", err);
  }
}