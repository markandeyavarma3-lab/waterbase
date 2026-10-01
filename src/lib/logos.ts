import "server-only";
import fs from "node:fs";
import path from "node:path";

export type Logo = { src: string; name: string };

/** One list, so brands, clients, crops, products and awards can never disagree. */
const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|svg|avif|gif)$/i;

/**
 * Resolves `dir` inside /public and refuses to escape it.
 *
 * Every caller currently passes a hardcoded literal, so this is not guarding
 * against a live attack — it is guarding against the day someone wires a route
 * param or a CMS field into one of these calls and does not think about `../`.
 * Returns null rather than throwing so a bad path degrades to "no images".
 */
function resolveInsidePublic(dir: string): string | null {
  const publicDir = path.resolve(process.cwd(), "public");
  const full = path.resolve(publicDir, dir);
  // `publicDir + sep` — a bare startsWith would also accept "public-secrets".
  if (full !== publicDir && !full.startsWith(publicDir + path.sep)) return null;
  return full;
}

/**
 * Reads every image inside /public/<dir> at build time.
 *
 * Dropping a JPG into the folder is all that is needed for it to appear on the
 * site (then commit + push). The filename becomes the display name:
 *
 *   "nuziveedu-seeds.jpg"  ->  "Nuziveedu Seeds"
 *
 * This is the ONE implementation. There used to be three near-identical copies —
 * this one, `getAwards` in awards-list.tsx and `getProductImages` in
 * product-categories.tsx — which had drifted to accept different file
 * extensions (only this one took .svg/.avif; only the others took .gif) and of
 * which only this one checked for path traversal.
 */
export function listLogos(dir: string): Logo[] {
  const full = resolveInsidePublic(dir);
  if (!full) return [];

  let files: string[];
  try {
    files = fs.readdirSync(full);
  } catch {
    // Folder absent (or unreadable) — a missing folder is a normal state here,
    // it just means no photos have been added for that category yet.
    return [];
  }

  return files
    .filter((f) => IMAGE_EXTENSIONS.test(f))
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

/** Put featured companies first. Matches filename or display name. */
export function prioritizeLogos(list: Logo[], lead: string[]): Logo[] {
  const rank = (logo: Logo) => {
    const hay = `${logo.src} ${logo.name}`.toLowerCase();
    const i = lead.findIndex((key) => hay.includes(key.toLowerCase()));
    return i === -1 ? lead.length + 1 : i;
  };
  return [...list].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

/** Just the paths, for callers that render images without a caption. */
export function listImages(dir: string): string[] {
  return listLogos(dir).map((l) => l.src);
}

/**
 * True when /public/<rel> exists. Build-time only (it reads the filesystem), for
 * Server Components deciding whether a photo-dependent section should render at
 * all — a section with no photo is hidden rather than drawn as a placeholder.
 * Uses the same traversal guard as listLogos.
 */
export function publicFileExists(rel: string): boolean {
  const full = resolveInsidePublic(rel.replace(/^\/+/, ""));
  if (!full) return false;
  try {
    return fs.statSync(full).isFile();
  } catch {
    return false;
  }
}
