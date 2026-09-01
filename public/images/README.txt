WATERBASE — WHERE TO PUT PHOTOS
===============================

Drop a file in the right folder with the exact name below and it appears on the
site automatically. No code change needed. Until a file exists, that slot shows
a blueprint "image pending" placeholder instead.

After adding files: commit + push -> Vercel rebuilds -> photos are live.


11 PHOTO SLOTS — filled with licensed stock until site photos are swapped in
--------------------------------------------------------------------------

public/images/work/          (3)  homepage "what we do" cards
    fields.jpg                    Fields & farms
    lawns.jpg                     Lawns & landscapes
    nurseries.jpg                 Nurseries & greenhouses

public/images/projects/      (8)  Projects page + before/after slider
    banana-drip.jpg               Banana drip (India)
    apmip-micro.jpg               Drip / micro irrigation
    campus-landscape.jpg          Campus landscape
    nursery-drip.jpg              Poly-house
    chilli-drip.jpg               Chilli crop
    paddy-sprinkler.jpg           Paddy / field irrigation
    before-field.jpg              Dry field (representative)
    after-field.jpg               Green field (representative)

See PHOTO-CREDITS.txt in this folder. Drop your own JPGs with the same
filenames to replace stock.

See the README.txt inside each folder for the full notes.


ALSO EMPTY — THE WHOLE PRODUCTS PAGE
------------------------------------

public/products/     14 folders, ALL empty, so every card on /products shows a
                     placeholder. See public/products/README.txt for the list.
                     Note this is public/products/, NOT public/images/products/.


ALREADY WORKING (no action needed)
----------------------------------

public/crops/<crop-name>/     crop photos, homepage honeycomb + /crops page
                              e.g. public/crops/banana/, public/crops/mango/
                              Any number of images per folder; they cross-fade.

public/brands/row-1/          brand logos, scrolling marquee
public/brands/row-2/          second marquee row

public/images/hero.jpg
public/images/irrigation-product-range.jpg


PHOTO GUIDELINES
----------------

  Size         ~1200 x 675 px, landscape (16:9). Larger is fine; it is
               downscaled automatically. Avoid anything under 800px wide.
  Format       .jpg for photos. Keep each file under ~400 KB if you can —
               big files slow the page down on phone data.
  Content      Real Waterbase work beats stock every time. Customers can tell,
               and these are the images that win jobs.
  Before/after Shoot the SAME spot from the SAME angle and height, or the
               comparison slider will not line up.
  Filenames    Lower-case, exact, no spaces. "Banana-Drip.JPG" will NOT load —
               it must be "banana-drip.jpg".
