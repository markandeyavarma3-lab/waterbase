import fs from "node:fs";
import path from "node:path";

export type Logo = { src: string; name: string };

/**
 * Reads every image file inside /public/<dir> at build time and returns
 * them as { src, name } — so dropping a JPG into the folder is all
 * that's needed for it to appear on the site (then commit + push).
 * (Other formats still work, but JPG is the site-wide standard.)
 *
 * The filename becomes the display name:
 *   "nuziveedu-seeds.jpg"  ->  "Nuziveedu Seeds"
 */
export function listLogos(dir: string): Logo[] {
  const publicDir = path.join(process.cwd(), "public");
  const full = path.join(publicDir, dir);
  
  if (!path.resolve(full).startsWith(path.resolve(publicDir))) {
    return [];
  }
  
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
