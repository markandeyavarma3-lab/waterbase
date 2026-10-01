import { describe, it, expect } from "vitest";
import {
  siteConfig,
  telLink,
  whatsappLink,
  fullAddress,
  statText,
  experienceText,
  yearsInBusiness,
} from "./site-config";

describe("telLink / whatsappLink", () => {
  it("builds an E.164 tel: link", () => {
    expect(telLink("9440018418")).toBe("tel:+919440018418");
  });

  it("builds a wa.me link with the country code and no leading +", () => {
    // wa.me rejects a "+" in the path — it must be bare digits.
    expect(whatsappLink("hi")).toMatch(/^https:\/\/wa\.me\/91\d{10}\?text=/);
    expect(whatsappLink("hi")).not.toContain("wa.me/+");
  });

  it("URL-encodes the message, including newlines", () => {
    const url = whatsappLink("line one\nline two & more");
    expect(url).toContain("line%20one%0Aline%20two%20%26%20more");
  });

  it("uses the public WhatsApp number by default", () => {
    expect(whatsappLink()).toContain(`/91${siteConfig.whatsappNumber}?`);
  });

  it("accepts an explicit number override", () => {
    expect(whatsappLink("hi", "9100149844")).toContain("/919100149844?");
  });

  it("has a default message so a bare CTA is never blank", () => {
    expect(whatsappLink().split("text=")[1].length).toBeGreaterThan(20);
  });
});

describe("statText", () => {
  it("formats with Indian digit grouping", () => {
    // 15400 groups as 15,400 in en-IN — not 154,00.
    expect(statText("customers")).toBe("15,400+");
    expect(statText("acres")).toBe("52,800+");
  });

  it("handles small values without separators", () => {
    expect(statText("states")).toBe("4+");
    expect(statText("districts")).toBe("22+");
  });

  it("returns every key defined in siteConfig.stats", () => {
    for (const s of siteConfig.stats) {
      expect(statText(s.key)).toBe(`${s.value.toLocaleString("en-IN")}${s.suffix}`);
    }
  });
});

describe("experienceText — derived, never hardcoded", () => {
  it("counts from the founding year, not a literal", () => {
    const expected = new Date().getFullYear() - siteConfig.since;
    expect(experienceText).toBe(`${expected}+ years`);
  });

  it("matches siteConfig.experienceYears", () => {
    expect(experienceText).toBe(`${siteConfig.experienceYears} years`);
  });

  it("the hero badge never claims more years than the business has existed", () => {
    // The badge is a hand-written marketing line, deliberately not derived — the
    // owner chose "25+ Years of Trusted Experience". A floor like "25+" stays
    // true every year. What must never happen is the reverse: a typo or a
    // copy-paste from another site claiming MORE years than \`since\` supports.
    const claimed = siteConfig.heroBadge.match(/(\d+)\s*\+?\s*years/i);
    if (!claimed) return; // a badge with no year count makes no claim to check
    expect(Number(claimed[1])).toBeLessThanOrEqual(yearsInBusiness);
  });
});

describe("business data integrity", () => {
  it("every phone number is a valid 10-digit Indian mobile", () => {
    const all = Object.values(siteConfig.phones).flatMap((group) =>
      Object.entries(group)
        .filter(([k]) => k !== "label")
        .map(([, v]) => v as string)
    );
    expect(all.length).toBeGreaterThan(0);
    for (const n of all) expect(n).toMatch(/^[6-9]\d{9}$/);
  });

  it("the public WhatsApp number is one of the real business numbers", () => {
    const all = Object.values(siteConfig.phones).flatMap((g) =>
      Object.entries(g).filter(([k]) => k !== "label").map(([, v]) => v as string)
    );
    expect(all).toContain(siteConfig.whatsappNumber);
  });

  it("url is the www host Vercel serves — not the apex, which redirects", () => {
    // The apex 308-redirects to www. A canonical/sitemap on the apex points
    // every crawler at a redirect, which is why the site was not indexed.
    expect(new URL(siteConfig.url).host).toBe("www.waterbasetechnologies.com");
    expect(siteConfig.url.startsWith("https://")).toBe(true);
    expect(siteConfig.domain).toBe(new URL(siteConfig.url).host);
  });

  it("url has no trailing slash — pageMeta concatenates paths onto it", () => {
    // A trailing slash here produces "https://site.com//products" canonicals.
    expect(siteConfig.url.endsWith("/")).toBe(false);
  });

  it("fullAddress includes the city, state and PIN", () => {
    expect(fullAddress).toContain(siteConfig.address.city);
    expect(fullAddress).toContain(siteConfig.address.state);
    expect(fullAddress).toContain(siteConfig.address.pin);
  });

  it("the Google Ads ID has the AW- form the conversion code assumes", () => {
    // lib/analytics.ts builds `send_to` as `${googleAdsId}/${label}`.
    expect(siteConfig.googleAdsId).toMatch(/^AW-\d+$/);
  });
});
