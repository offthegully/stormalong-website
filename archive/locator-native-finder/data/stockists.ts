/* ====================================================================
   SAMPLE DATA — every row below is invented. Replace this file.
   --------------------------------------------------------------------
   `status: "sample"` is load-bearing. While it is set, /locator prints
   a standing notice above the results saying the list is placeholder,
   and no visitor can mistake these rows for shops that actually stock
   us. Flip it to "live" in the same commit that brings the real list,
   and the notice disappears on its own. Every name is prefixed
   "SAMPLE —" as a second belt: if one ever leaks into a screenshot or
   a search index, it reads as what it is.

   WHY THIS FILE EXISTS AT ALL

   The live site embeds a hosted finder from finder.vtinfo.com — VIP,
   the vendor that aggregates our distributors' depletion reports. That
   widget knows which accounts actually bought cider recently, which is
   real value we cannot reproduce here. What it cannot do is look like
   the rest of this site: it is a cross-origin iframe carrying its own
   Bootstrap theme and its own Google Maps key, and it refuses to
   render at all without a referrer from the parent page.

   So the split is deliberate. This app owns the presentation; the list
   is a swappable input. Three ways to fill it, best first:

     1. A feed from VIP. We are their customer (custID SMC), and
        supplier-side data access is a thing they sell. Map their rows
        onto `Stockist` in a script and this file becomes generated.
     2. This file, kept by hand. Fine for a few hundred accounts, and
        it is what most craft brands actually do.
     3. Scraping VIP's own widget endpoint. Do not. It answers with
        HTML fragments behind a session CSRF token and an hCaptcha they
        can switch on at will — it would break without warning and is
        very likely against their terms even though the underlying data
        is ours.

   FILLING IT IN

   Only `lat`/`lng` need any work; the rest is transcription. Without
   coordinates a stockist still lists and still answers a search by
   town or name — it just cannot appear in a radius result or carry a
   distance. See `resolveOrigin` in lib/stockists.ts for how far that
   degrades gracefully, and for the one real limitation: we can only
   anchor a search on a town or ZIP we already have a stockist in.
   Geocoding a full list is the upgrade that removes it.
   ==================================================================== */

import type { StockistDataset } from "@/types/stockist";

export const stockistData: StockistDataset = {
  status: "sample",
  updated: null,
  source: "Invented placeholder rows — see the header of this file.",
  stockists: [
    {
      id: "sample-01",
      name: "SAMPLE — Village Package Store",
      premise: "off",
      kind: "Package store",
      street: "12 North Main Street",
      town: "Sherborn",
      state: "MA",
      zip: "01770",
      lat: 42.239,
      lng: -71.3712,
      products: ["legendary-dry", "mass-appeal", "farmstand-unfiltered"],
    },
    {
      id: "sample-02",
      name: "SAMPLE — Pleasant Street Market",
      premise: "off",
      kind: "Supermarket",
      street: "480 Pleasant Street",
      town: "Natick",
      state: "MA",
      zip: "01760",
      lat: 42.2835,
      lng: -71.3495,
      products: ["legendary-dry", "light-of-the-sun"],
    },
    {
      id: "sample-03",
      name: "SAMPLE — The Old Post Tavern",
      premise: "on",
      kind: "Bar",
      street: "9 Concord Street",
      town: "Framingham",
      state: "MA",
      zip: "01702",
      lat: 42.2793,
      lng: -71.4162,
      products: ["mass-appeal"],
    },
    {
      id: "sample-04",
      name: "SAMPLE — Washington Street Wine & Spirits",
      premise: "off",
      kind: "Package store",
      street: "215 Washington Street",
      town: "Wellesley",
      state: "MA",
      zip: "02481",
      lat: 42.2968,
      lng: -71.2924,
      products: ["kingston-black", "legendary-dry"],
    },
    {
      id: "sample-05",
      name: "SAMPLE — South End Cider House",
      premise: "on",
      kind: "Restaurant",
      street: "640 Tremont Street",
      town: "Boston",
      state: "MA",
      zip: "02118",
      lat: 42.3384,
      lng: -71.0728,
      products: ["legendary-dry", "red-skies-at-night"],
    },
    {
      id: "sample-06",
      name: "SAMPLE — Central Square Bottle Shop",
      premise: "off",
      kind: "Bottle shop",
      street: "551 Massachusetts Avenue",
      town: "Cambridge",
      state: "MA",
      zip: "02139",
      lat: 42.3656,
      lng: -71.104,
      products: ["kingston-black", "boston-heirloom", "grand-banks"],
    },
    {
      id: "sample-07",
      name: "SAMPLE — Union Square Taproom",
      premise: "on",
      kind: "Taproom",
      street: "30 Bow Street",
      town: "Somerville",
      state: "MA",
      zip: "02143",
      lat: 42.38,
      lng: -71.0995,
    },
    {
      id: "sample-08",
      name: "SAMPLE — Market Square Fine Wine",
      premise: "off",
      kind: "Package store",
      street: "44 Market Street",
      town: "Portsmouth",
      state: "NH",
      zip: "03801",
      lat: 43.0718,
      lng: -70.7626,
      products: ["legendary-dry", "massive-appeal"],
    },
    {
      id: "sample-09",
      name: "SAMPLE — Federal Hill Provisions",
      premise: "on",
      kind: "Restaurant",
      street: "188 Atwells Avenue",
      town: "Providence",
      state: "RI",
      zip: "02903",
      lat: 41.821,
      lng: -71.4128,
    },
    {
      id: "sample-10",
      name: "SAMPLE — Old Port Bottle Company",
      premise: "off",
      kind: "Bottle shop",
      street: "71 Commercial Street",
      town: "Portland",
      state: "ME",
      zip: "04101",
      lat: 43.6591,
      lng: -70.2568,
      products: ["farmstand-unfiltered"],
    },
    {
      id: "sample-11",
      name: "SAMPLE — Church Street Public House",
      premise: "on",
      kind: "Bar",
      street: "102 Church Street",
      town: "Burlington",
      state: "VT",
      zip: "05401",
      lat: 44.4759,
      lng: -73.2121,
    },
    {
      id: "sample-12",
      name: "SAMPLE — Whitney Avenue Wines",
      premise: "off",
      kind: "Package store",
      street: "915 Whitney Avenue",
      town: "New Haven",
      state: "CT",
      zip: "06517",
      lat: 41.3403,
      lng: -72.9099,
      products: ["mass-appeal", "legendary-dry"],
    },
  ],
};
