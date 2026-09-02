PRODUCT PHOTOS — the /products page
===================================

Every card on the Products page reads from its own folder here. Drop any number
of images into a folder and that card uses them; with more than one they
cross-fade automatically. Leave a folder empty and the card shows a blueprint
"image pending" placeholder instead.

Right now Phases 1 and 3 have stock photos (micro irrigation, then pumps
    and farm essentials). Phase 2 (pipes) is a separate PR if not already on main.

Accepted formats: .jpg  .jpeg  .png  .webp  .gif
Filenames inside a folder do not matter — only the FOLDER name does.


FOLDERS (14)
------------

  MICRO IRRIGATION & WATERING
    drip-irrigation/             Drip Irrigation Systems
    micro-mini-sprinklers/       Micro & Mini Sprinklers
    sprinkler-irrigation/        Sprinkler Irrigation
    rainguns/                    Rainguns
    filters-dosing-injectors/    Filters, Dosing Pump & Injectors

  PIPES & FITTINGS
    pvc-pipes/                   PVC Pipes & Fittings
    pe-pipes/                    PE Pipes & Fittings
    hose-pipes/                  Hose Pipes & Fittings
    column-pipes/                Column Pipes & Fittings
    casing-pipes/                Casing Pipes

  PUMPS & AUTOMATION
    motors-pumps/                Motors & Pumps
    starters-others/             Starters & Others

  FARM ESSENTIALS
    mulching-sheets/             Mulching Sheets & Weed Mats
    planting-material/           Planting Material


GUIDELINES
----------

  Size      ~1200 x 900 px or similar. Landscape or square both work.
  Weight    Under ~400 KB each. These pages show 14 cards at once, so file
            size adds up fast on phone data.
  Content   A clean product shot on a plain background reads best, but a real
            photo of stock on your shelves is better than nothing.
  Multiple  Two or three images in one folder cross-fade on the card, which
            is a nice way to show variants of the same product.

The .gitkeep file in each folder just keeps the empty folder in git. You can
leave it there; it is ignored when picking images.

After adding photos: commit + push -> Vercel rebuilds -> they are live.
