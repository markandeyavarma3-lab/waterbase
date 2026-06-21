import fs from "node:fs";
import path from "node:path";

export type Logo = { src: string; name: string };

/**
 * Reads every image file inside /public/<dir> at build time and returns
 * them as { src, name } — so dropping a PNG/SVG into the folder is all
 * that's needed for it to appear on the site (then commit + push).
 *
 * The filename becomes the display name:
 *   "nuziveedu-seeds.png"  ->  "Nuziveedu Seeds"
 */
export function listLogos(dir: string): Logo[] {
  const full = path.join(process.cwd(), "public", dir);
  let files: string[] = [];
  try {
    files = fs.readdirSync(full);
  } catch {
    return [];
  }
  return files
    .filter((f) => /\.(png|jpe?g|webp|svg|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => ({
      src: `/${dir}/${f}`,
      name: f
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim(),
    }));
}
