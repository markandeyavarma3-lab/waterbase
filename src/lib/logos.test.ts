import { describe, it, expect } from "vitest";
import { publicFileExists, listImages } from "./logos";

/**
 * These decide whether photo-dependent sections render at all, and they take a
 * path — so the traversal guard matters as much as the happy path.
 */
describe("publicFileExists", () => {
  it("finds a file that ships in /public", () => {
    expect(publicFileExists("/images/hero.jpg")).toBe(true);
    expect(publicFileExists("images/hero.jpg")).toBe(true);
  });

  it("is false for a missing file", () => {
    expect(publicFileExists("/images/definitely-not-here.jpg")).toBe(false);
  });

  it("is false for a directory", () => {
    expect(publicFileExists("/images")).toBe(false);
  });

  it("refuses to escape /public", () => {
    expect(publicFileExists("../package.json")).toBe(false);
    expect(publicFileExists("/../package.json")).toBe(false);
    expect(publicFileExists("images/../../package.json")).toBe(false);
  });
});

describe("listImages", () => {
  it("lists real product photos", () => {
    const imgs = listImages("products/drip-irrigation");
    expect(imgs.length).toBeGreaterThan(0);
    for (const src of imgs) expect(src).toMatch(/^\/products\/drip-irrigation\/.+\.(jpe?g|png|webp|avif|gif|svg)$/i);
  });

  it("returns nothing for a missing folder rather than throwing", () => {
    expect(listImages("no-such-folder")).toEqual([]);
  });

  it("refuses to escape /public", () => {
    expect(listImages("../src")).toEqual([]);
  });
});
