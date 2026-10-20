CROP PHOTOS — "Irrigation tailored to your crop" cards
======================================================

Each crop has its OWN sub-folder here. Drop 3-4 photos into a
crop's folder and they will auto-scroll (one every 2 seconds)
inside that crop's card on the website.

FOLDERS (one per crop):
  public/crops/banana/
  public/crops/coconut/
  public/crops/oil-palm/
  public/crops/cocoa/
  public/crops/lemon/
  public/crops/guava/
  public/crops/papaya/
  public/crops/dragon-fruit/
  public/crops/maize/
  public/crops/vegetables/
  public/crops/flowers/
  public/crops/plantations/

HOW TO USE
----------
1. Pick a crop folder, e.g. public/crops/oil-palm/
2. Drop 3-4 images into it (JPG — the standard format for the
   whole site). File names don't matter — name them anything, e.g.:
      1.jpg  2.jpg  3.jpg
3. Recommended: landscape-ish photos, about 800 x 600 px.
4. Commit + push (or tell Claude to push) -> Vercel rebuilds and
   the photos auto-scroll in that crop's card.

NOTES
-----
- A crop with no photos yet is omitted from the grid (text-only
  "and many more" chips cover other crops we still serve).
- A crop with only 1 photo just shows that photo (no scrolling).
- Do not delete the .gitkeep files — they keep the empty folders
  tracked in git.

Phase 4 filled vegetables/, flowers/, and plantations/ with licensed
stock. See PHOTO-CREDITS-PHASE4.txt.
