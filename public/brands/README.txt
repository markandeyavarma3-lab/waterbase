BRAND LOGOS — scrolling strips
==============================

Logos are split into TWO folders, one per scrolling row:

   public/brands/row-1/   ->  FIRST  row  (Jain, KSB, Acurain, Naandanjain ...)
   public/brands/row-2/   ->  SECOND row  (Netafim, Automat, Kasta, etc.)

WHERE THINGS SHOW
-----------------
- Products page: BOTH rows scroll (row-1 on top, row-2 below).
- Home page: a single strip showing all logos (row-1 + row-2 combined).

HOW TO ADD / MOVE A LOGO
------------------------
1. Save the logo as a JPG on a WHITE background (~200 x 80 px).
2. Drop it into row-1/ to put it on the first row, or row-2/ for the
   second row. To move a brand between rows, just move its file
   between the two folders.
3. Commit + push (or tell Claude to push) -> Vercel rebuilds.

NOTE
----
The filename is only used for alt text (not shown on screen for brand
logos), so name it after the brand, e.g. jain-drip.jpg, ksb.jpg.
