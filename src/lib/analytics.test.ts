import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/**
 * The single Google Ads ad optimises for ONE conversion action, "Contact Us",
 * whose event Google Ads issued as `ads_conversion_Contact_Us_1`. If any contact
 * path fires a different name, Google never sees it — silently. These pin that
 * every path reaches the real action, and that per-path overrides still work.
 */

type Call = unknown[];
let calls: Call[];

async function load() {
  vi.resetModules();
  return import("./analytics");
}

beforeEach(() => {
  calls = [];
  vi.stubGlobal("window", {
    gtag: (...args: unknown[]) => calls.push(args),
    dataLayer: [] as Record<string, unknown>[],
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

/** Google Ads hits only — GA4 events (cta_call_now etc.) are filtered out. */
const adsHits = () =>
  calls.filter((c) => c[0] === "event" && (String(c[1]).startsWith("ads_conversion") || c[1] === "conversion"));

describe("every contact path fires the Contact Us conversion", () => {
  it.each([
    ["Call now click", "trackCallClick"],
    ["WhatsApp link click", "trackContactClick"],
    ["WhatsApp float / sticky click", "trackWhatsAppFloatClick"],
    ["callback form completed (/thank-you)", "trackFormSubmit"],
  ] as const)("%s", async (_label, fn) => {
    const a = await load();
    a[fn]();
    const hits = adsHits();
    expect(hits).toHaveLength(1);
    expect(hits[0][1]).toBe("ads_conversion_Contact_Us_1");
    expect(a.CONTACT_US_EVENT).toBe("ads_conversion_Contact_Us_1");
  });

  it("sends with beacon transport, so leaving for the dialer or WhatsApp cannot drop it", async () => {
    const a = await load();
    a.trackCallClick();
    expect(adsHits()[0][2]).toMatchObject({ transport_type: "beacon" });
  });

  it("'Request a callback' clicks are NOT a conversion — only the completed form is", async () => {
    const a = await load();
    a.trackRequestCallbackClick();
    expect(adsHits()).toHaveLength(0);
  });
});

describe("per-path overrides (for if separate actions are created again)", () => {
  it("an EVENT override replaces the default for that path only", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_CALL_EVENT", "ads_conversion_Call_2");
    const a = await load();
    a.trackCallClick();
    a.trackContactClick();
    expect(adsHits().map((c) => c[1])).toEqual(["ads_conversion_Call_2", "ads_conversion_Contact_Us_1"]);
  });

  it("a LABEL override wins and targets the account via send_to", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_FORM_LABEL", "AbC-D_efG");
    vi.stubEnv("NEXT_PUBLIC_ADS_FORM_EVENT", "ignored_when_label_set");
    const a = await load();
    a.trackFormSubmit();
    const [hit] = adsHits();
    expect(hit[1]).toBe("conversion");
    expect(hit[2]).toMatchObject({ send_to: "AW-874230546/AbC-D_efG" });
  });

  it("a label pasted with the account prefix is not double-prefixed", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_CONTACT_LABEL", "AW-874230546/XyZ");
    const a = await load();
    a.trackContactClick();
    expect(adsHits()[0][2]).toMatchObject({ send_to: "AW-874230546/XyZ" });
  });

  it("a whitespace-only override is treated as unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_CALL_EVENT", "   ");
    const a = await load();
    a.trackCallClick();
    expect(adsHits()[0][1]).toBe("ads_conversion_Contact_Us_1");
  });
});

describe("GTM events still fire alongside", () => {
  it("call click pushes cta_call_now to the dataLayer", async () => {
    const a = await load();
    a.trackCallClick();
    const dl = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer;
    expect(dl.some((e) => e.event === "cta_call_now")).toBe(true);
  });

  it("does nothing (and does not throw) when gtag has not loaded", async () => {
    vi.stubGlobal("window", { dataLayer: [] });
    const a = await load();
    expect(() => a.trackCallClick()).not.toThrow();
  });
});
