import { describe, it, expect } from "vitest";
import { to24h } from "./seo";

/**
 * Feeds `openingHoursSpecification` in the LocalBusiness JSON-LD. Getting noon
 * or midnight wrong is the classic 12-hour-clock bug, and the failure mode is
 * silent: Google simply shows the wrong opening hours in the local pack.
 */
describe("to24h", () => {
  it.each([
    ["10:00 AM", "10:00"],
    ["7:00 PM", "19:00"],
    ["9:00 AM", "09:00"],
    ["8:30 PM", "20:30"],
    ["11:59 PM", "23:59"],
  ])("converts %s to %s", (input, expected) => {
    expect(to24h(input)).toBe(expected);
  });

  it("maps 12 AM to midnight, not to 12:00", () => {
    expect(to24h("12:00 AM")).toBe("00:00");
    expect(to24h("12:30 AM")).toBe("00:30");
  });

  it("keeps 12 PM at noon, not at 24:00", () => {
    expect(to24h("12:00 PM")).toBe("12:00");
    expect(to24h("12:45 PM")).toBe("12:45");
  });

  it("zero-pads single-digit hours", () => {
    expect(to24h("1:05 AM")).toBe("01:05");
  });

  it("accepts lowercase and surrounding whitespace", () => {
    expect(to24h("  7:00 pm  ")).toBe("19:00");
  });

  it("passes through anything it does not recognise, rather than emitting garbage", () => {
    // Better a value a human can spot in the JSON-LD than a confident wrong one.
    expect(to24h("Closed")).toBe("Closed");
    expect(to24h("")).toBe("");
  });
});

describe("business hours in site-config", () => {
  it("every open/close time converts cleanly to 24h", async () => {
    const { siteConfig } = await import("./site-config");
    for (const h of siteConfig.hours) {
      if (!h.open || !h.close) continue;
      expect(to24h(h.open)).toMatch(/^\d{2}:\d{2}$/);
      expect(to24h(h.close)).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it("covers all seven days exactly once", async () => {
    const { siteConfig } = await import("./site-config");
    const days = siteConfig.hours.map((h) => h.day);
    expect(days).toHaveLength(7);
    expect(new Set(days).size).toBe(7);
  });
});
