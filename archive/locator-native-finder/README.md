# Native stockist finder — shelved, not abandoned

A complete, working replacement for the vendor locator embed. It was
built, verified, and then shelved in favour of keeping VIP's own
widget on `/locator`. Nothing here is a sketch: it ran, it was tested
in the browser, and it is shelved for one reason only — **it has no
data**.

Nothing in this folder is compiled. `archive` is in `tsconfig.json`'s
`exclude`, and nothing under `app/` imports it, so it costs the build
nothing and will not be typechecked. That also means it will not tell
you when the rest of the app drifts out from under it; see *Rot* below.

## What it is

| File | What it does |
| --- | --- |
| `types/stockist.ts` | The `Stockist` record and `StockistDataset`. The contract between the UI and whatever supplies the list. |
| `data/stockists.ts` | The list itself, as sample rows. Its header is the real document here: it records the three ways to source stockist data and why scraping VIP is not one of them. |
| `lib/stockists.ts` | The search — haversine distances, radius sweep, premise filter, town/ZIP/name matching, grouping, links out. |
| `components/press-house/stockist-finder.tsx` | The UI. List-first, grouped by town, map as a panel you open. |
| `app/locator/page.tsx` | The version of the page that mounted it. |

## Restoring it

The archive keeps each file at the path it came from, so it is a copy
and two edits:

```
cp -r archive/locator-native-finder/{types,data,lib,components,app} .
```

Then remove `"archive"` from `exclude` in `tsconfig.json` — or leave it,
since the restored copies live outside it — and check
`components/press-house/site-config.ts`, whose `locator` block was
rewritten when the embed came back.

## Why it was shelved

The UI was never the hard part. The data is.

VIP (`finder.vtinfo.com`, custID SMC) aggregates our distributors'
depletion reports: they know which accounts actually bought cider last
month. A list we keep by hand knows which accounts someone last
remembered to type in. For a locator, that difference is the whole
product — a beautiful list of shops that stopped carrying us two years
ago is worse than an ugly one that is right.

So this became worth shipping only if one of these happens:

1. **VIP gives us a supplier-side feed.** Best outcome: their freshness,
   our design. Map their rows onto `Stockist` in a script and
   `data/stockists.ts` becomes generated. This is the ask worth making.
2. **Someone commits to keeping the list by hand.** Viable for a few
   hundred accounts, and what a lot of craft brands actually do. Needs
   a real owner, not a good intention.
3. **VIP's widget becomes unacceptable** — it breaks, it is dropped, or
   its referrer allowlist blocks a domain we need.

## Known limitations, if it comes back

- **No geocoder.** A radius search can only anchor on a town or ZIP we
  already have a stockist in. The UI states this outright rather than
  pretending ("We could not place that"), and it improves on its own as
  the list grows. Fixing it properly means a geocoding API or a New
  England ZIP centroid table (~6,000 rows, ~150KB).
- **The map takes one pin.** OpenStreetMap's embed accepts a single
  marker, which is why the map shows an overview until you pick a shop
  from the list. Promoting the map to the main event means MapLibre and
  a tile provider — which means a key and a bill. `osmEmbedUrl` marks
  the spot.
- **Sample data is load-bearing.** `status: "sample"` makes the page
  print a standing notice and suppresses the per-state counts on the
  "Where we are" band. Flip it to `"live"` only with real rows.

## Rot

Excluded from the typechecker means this code cannot warn you when it
goes stale. It was written against the Press House components and
utility classes as they stood in September 2026 — `ph-label`,
`ph-slab`, `ph-press`, `ph-tint`, `ph-collapse`, `ph-enter`,
`Eyebrow`, `PinIcon`, `SearchIcon`, `Star`. If those move, this breaks
quietly. Expect to spend an hour reconnecting it rather than five
minutes, and typecheck it the moment you copy it back.
