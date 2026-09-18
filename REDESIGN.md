# Press House redesign

Direction D from the design canvas, built on `redesign/press-house` in a
git worktree so `develop` keeps serving the current site untouched.

    ~/projects/www-stormalong            develop              port 3000
    ~/projects/www-stormalong-redesign   redesign/press-house port 3001

The artboards this is built from are in `design/` — open any `.dc.html`
in a browser. `design/CanvasReview.dc.html` is the review the build
follows; its numbered findings are cited in the code where they apply.

## Built

| Page | Route | State |
|---|---|---|
| Home | `/` | Done |
| Our Ciders | `/ciders` | Done |
| Find our cider | `/locator` | Frame done, embed slot empty |
| Rare Apple Series | `/releases` | Done, calendar provisional |
| Taproom | `/taproom` | Drafted, unlinked, `noindex` |
| Cider detail | `/ciders/[slug]` | Done, all 20 static |
| Cider Club | `/cider-club` | Done, join is email-only |
| Our Story | `/our-story` | Done |
| Contact | `/contact` | Done |
| 404 / error | — | Done |

Every page is Direction D. Nothing of the old design is left: the 34
legacy components, the `brand` colours and the Oswald / Poppins /
Bebas / Cinzel font entries have all been removed, and the global
`h1–h6 { Oswald, uppercase }` rule with them. `components/ui/` (the
shadcn primitives) stays.

The whole site now prerenders — 33 static pages, including a page per
cider from `generateStaticParams`.

## What I need from you

### 1. The cider list (blocks `/ciders`, the tiles and the detail pages)

Everything about the catalogue funnels through **`data/shelf.ts`**.
Replace that one file and the whole site follows. Right now it mirrors
the live site: 15 ciders in 3 groups.

- Which ciders are on the shelf, and in which group (core / seasonal /
  rare)?
- **Alyson's Orchard** and **Blue Hills** are sold on the live site but
  are missing from `data/ciders.ts` entirely. Both are now transcribed
  in full from their own pages on stormalong.com — description, flavour,
  apple blend, ABV, availability — rather than paraphrased.
  - **Blue Hills is resolved.** It has its real can artwork
    (`public/images/ciders/blue-hills.png`, pulled from the live CDN and
    normalised), and its sweetness is **3 / Medium**, read off the
    `Medium_Sweetness_Scale` graphic its live page renders. It was
    previously pointed at `blue-skies.png`, so `/ciders` showed the same
    label on two different ciders.
  - **Alyson's Orchard sweetness is still unknown.** That page's
    sweetness-scale image has an empty `src`, so there is nothing to
    read it off. It is the last `provisional` entry on the shelf.
- Five records in `data/ciders.ts` are **not** on the live shelf and are
  currently hidden from `/ciders` (their URLs still work): Pog Punch,
  Ragtime Reserve, Big Appeal, Bittersweet Symphonie, Lady
  Legendary. Lady Legendary is promoted on the current home page but
  absent from the live `/ciders`, so it needs a decision either way.

Three specs where the artboard and the data disagree. The build follows
the data; say the word if the artboard is right:

| | Artboard | `data/ciders.ts` |
|---|---|---|
| Kingston Black | 7.0%, semi-dry | 6.5%, dry |
| Farmstand Unfiltered | 6.2% | 4.5% |
| Red Skies at Night | medium, 3 of 5 | semi-dry, 2 of 5 |

### 2. Two corrections I found while building

- **The third Best of Class is Bittersweet Symphonie, not Blue Skies.**
  The artboard credits Blue Skies; `data/ciders.ts` attributes
  "GLINTCAP Best in Class 2021" to Bittersweet Symphonie, and Blue Skies
  has no awards at all. Bittersweet Symphonie is one of the five ciders
  that is not on the live shelf, so as things stand the trophy case
  advertises a Best of Class you cannot buy.
- **Nothing on the shelf is sweeter than "Medium".** Steps 4 and 5 of
  the sweetness guide come out empty from the data. The guide says
  "Nothing here yet" rather than padding them. Either the scale should
  be three steps, or some sweetness values are wrong.

### 3. Three things in the repo that are wrong today

These are live on the current site, not introduced by the redesign.

- **`(508) 555-5555`** is on the contact page of the current build. A
  placeholder phone number is worse than no phone number, so the new
  contact page shows the email address only. Send a real number and it
  goes back.
- **`public/images/respect-the-apple.png` is a blank white image.** It
  is used on the live footer and Our Story page, where it renders as
  nothing. Not used in the redesign.
- **`public/images/our-story/stormalong-taproom.png` is not a
  photograph of a taproom** — it is an architect's proposed-elevation
  drawing, complete with "PROPOSED PATIO PLAN", "NEW SIGNAGE" and
  "OUTHOUSE TO RECEIVE NEW MURAL". It is currently presented as a
  picture of the place. The redesign uses a real product photograph
  instead. This is also the strongest evidence yet that the taproom is
  a plan rather than a place — see the taproom note below.

Two forms used to answer "sent!" while throwing the message away. Both
now refuse to: `/api/newsletter` and `/api/contact` return **501** with
`configured: false` when no mail provider is set, and the forms say the
message was not sent and give the address to write to instead.

### 4. Smaller unblocks

- **Locator embed.** Set `NEXT_PUBLIC_LOCATOR_EMBED_URL` and the finder
  drops straight into `/locator`. It is `finder.vtinfo.com`, custID SMC
  — the same one running on stormalong.com today. Worth asking the
  vendor whether it can be themed, or its data read directly; a native
  list would let each cider link to its own results.
- **Newsletter.** Set `RESEND_API_KEY` and `NEWSLETTER_AUDIENCE_ID`.
  Until then the form tells people their address was not saved, rather
  than showing a tick over a black hole.
- **Stockist counts.** The artboard's "701 locations" and per-state
  numbers were invented for the mockup. Real numbers go in
  `distribution` in `components/press-house/site-config.ts`; until then
  the UI shows the state name and no figure.
- **Release calendar.** Which rare-apple release lands in which month,
  and run sizes — `data/releases.ts`.
- **Taproom.** Confirm it exists, or delete `app/taproom/` and the
  `taproom` entry in `site-config.ts`.
- **Club signup.** There is no join mechanism. (Correction to an earlier
  note here: on `/cider-club` the live "JOIN OUR RARE APPLE CLUB" button
  is not a handler-less `<button>` — it is `<a href="/wine-club-sign-up">`,
  and that page returns 200 with an empty body. No form, no iframe, no
  inputs, exactly like `/shop`. Same conclusion, different mechanism,
  worth knowing before anyone goes hunting in Webflow for a half-built
  signup.) The new page will not draw a signup form over a checkout that
  does not exist, so Join opens an email to `info@stormalong.com`, the
  address the membership copy already gives for opting out. Point
  `joinUrl` in `data/club.ts` at a real signup and the page switches.
- **Cidery address.** `130 Oak Street, Sherborn, MA 01770` is in this
  repo but not on the live contact page. It is **no longer rendered** on
  `/contact` — the block is commented out there — because the page used
  to carry the confirmation request as visible body copy. Confirm it
  should be public and restore the block.

## Copy review, second pass

A page-by-page comparison against the live stormalong.com. Everything
below was either fixed in this pass or is left deliberately.

**Fixed — internal notes that were rendering as public copy.** Four of
them: the home fleet's `<h2>` ("Every can its own colour"), the
front-page section note ("Four things, all on screen, none of them
moving"), the contact page's request to confirm the street address, and
the locator's wiring instructions, which printed the vendor name, the
customer ID and the environment variable to set. All four were written
to us and were being shown to visitors.

**Fixed — things that were untrue.**

- "Across 8 ciders and 7 competitions, **every year since 2015**" was
  false: the awards skip 2018 and 2020, and the tally directly beneath
  it prints "2015 – 2024". Now reads "from 2015 to 2024".
- Blue Hills drew the Blue Skies can (see above).
- Competition names are normalised at parse time, not just in the tally,
  so a seal no longer reads "Los Angeles Invitational Wine & Spirits"
  above a tally calling the same body "LA Invitational", and the detail
  pages no longer print the data's "SFChronicle" with the space missing.
- Kingston Black's Best of Class carries no year — the live site omits
  it too, so it is marked `[year]` rather than silently dropped, the way
  every other unverified value on the site is marked.
- Legendary Dry's tagline restated its own `flavor` field. The live
  site's line is "Made with Heirloom Bittersweet Apples"; use that.
- The "Seasonal" availability tag is suppressed inside the Rare Apple
  Series, where three of four tiles were labelling themselves "Seasonal"
  under a heading that said "Rare Apple Series".
- `/releases` sorted everything newest-first, which put "Pouring now"
  *third*, behind two months that have not happened. Current releases
  now read forwards, the archive still reads backwards.

**Fixed — structure and copy.** British spellings ("favourite",
"neighbourhood", "colour") on an American brand; `<br/>` with no
adjacent space inside headings, so the accessible name read "The
RareApple Club" and "We respectthe apple"; a duplicated `dt` on
`/our-story` that read out as "Founded, 2014, Founded"; "Two times a
year" against "Twice a year" in the paragraph above it; a mid-sentence
person shift in subscription term 03; `/ciders` printing the Rare Apple
Series blurb twice; "All 15" beside "Core line-up (8)"; "1800's";
"Six states across New England". The home page's only `h1` was
"Kingston Black" — a seasonal product — so there is now an `sr-only`
`h1` naming the brand and the lead is an `h2`. `/our-story`'s `h1` was
"True Cider", which identified neither the brand nor the page.

### Still outstanding

- **No redirects.** `next.config.mjs` has no `redirects()`. The live
  site's product pages are `/cider/<slug>`; ours are `/ciders/<slug>`,
  so **20 product URLs 404**, along with `/shop`, `/store2`, `/blog`,
  `/press` and every `/news/*`. These are the URLs the Boston Globe,
  Brewbound and Cider Culture link to.
- **`/ciders#awards` does not exist.** The trophy case's "See every
  medal" points at it. There is also no page anywhere listing all 26
  medals, so the CTA promises something the site does not have.
- **No OpenGraph or Twitter card tags, no `sitemap.ts`, no `robots.ts`.**
  Every link shared to Instagram, Facebook or iMessage renders bare, on
  a brand whose whole pitch is the label artwork.
- **The masthead's magnifying glass is not a search.** It is a `Link` to
  `/ciders` with `aria-label="Search the ciders"`, landing on a page with
  no search field.
- **Contact is in no nav**, desktop or mobile; Our Story is in the mobile
  drawer only. The live site has both at top level.
- **Tap targets below the WCAG 2.2 minimum of 24x24**: the hamburger
  (22x22), the search icon (19x19), and the mobile drawer's links, which
  have no vertical padding (15px tall, 16px gap).
- **The primary CTA is hidden below 640px** — "Find a can near you" is
  `hidden sm:inline-flex`, so on a phone the site's main action is only
  inside the drawer.
- **`/press` was not rebuilt, on purpose.** The 26 items are strong
  (Boston Globe x4, Boston Magazine, WGBH, Thrillist) but the newest is
  **11 October 2022**, and two links are dead (Cider Couple 404s, Zagat
  no longer resolves at all). A dated feed that stops four years ago
  reads as decline. The suggestion on the table is an undated "As seen
  in" strip on `/our-story` carrying the four or five strongest, still
  live hits. `/blog` — four "where to eat" roundups — can go.

## Photography

The detail pages carry a full-bleed photo band built from
`public/images/cider-details-images/` — 50 shots, three per cider,
1800 to 4500px. They are the best images in the repo and they were on
the old detail pages; the first rebuild dropped them.

`components/press-house/photo-spread.tsx` sits directly under the hero
with no section furniture between them: the can has just been shown as
a cutout on a flat colour, and these are the same cider as a
photograph, so the join is the point. The band is not three equal
panes — one shot leads at two thirds width and full height, the other
two stack beside it in a 420px row, which reads as a composed spread
rather than a row of thumbnails. Square corners and hairline gutters
like the tiles. Below `sm` it unwinds to one column at 4:3, because a
fixed-height row split three ways on a phone crops every shot to a
letterbox it was not composed for.

Six other arrangements were built and compared before this one, all
now deleted. The two that lost narrowly: the same spread with the
photograph stacked over the colour plate inside the hero, and a
"cover" layout that made the photograph the page and dropped the
cutout to pack-shot size. The cover is the better-looking page when
the photography is strong, but it falls back to the plain hero for
every cider with no photos, which would have given five of them a
visibly different page.

The manifest in `lib/cider-photos.ts` is read off disk at build time
rather than typed out, so adding a `<slug>-4.jpg` is enough to make it
appear. It keys on the filename prefix, which is why the three Lady
Legendary shots were renamed from `the-lady-legendary-*` to
`lady-legendary-*`: the slug in `data/ciders.ts` is `lady-legendary`,
so the page had silently been showing no photographs at all. Ragtime
Reserve has two and degrades to two equal halves; Pog Punch, Alyson's
Orchard and Blue Hills have none and get no band.

Two things worth doing when you have a moment:

- **Alt text.** The photos differ per cider — apples in bins, a can on
  a piling, a pour — and describing them accurately needs someone who
  has seen them. They are marked decorative for now, which is honest
  but not ideal.
- **Weight.** The folder is ~195 MB; several files are over 3.5 MB at
  4548px. Next resizes them on demand and caches the result, so pages
  are not shipping 4 MB, but pre-resizing the originals to ~2000px
  would make the repo far lighter with no visible difference.

## The cans

The labels are the strongest thing Stormalong owns, so the shelf tile
is now a can with a caption under it rather than a paragraph with a
thumbnail beside it: 250px of can on the colour ground, a rule, then
the name, the flavour, the two specs and the link. At 375px wide you
can read the ABV printed on the can.

Three things were in the way of that, all of them in the assets.

**The cut-outs were square.** A can is 0.42 as wide as it is tall, but
every file in `public/images/ciders` put it on a square canvas, so 60%
of each file was empty pixels. `h-[86px] w-auto object-contain`
therefore produced an 86 x 86 box holding a 34px-wide can, and that
dead width padded every layout it appeared in.

**Next sized the srcset from a `width` prop that did not describe the
file.** Every call site declared a can-shaped `width` — 54, 300, 40 —
against a square image, so the candidates came out 2.4x too narrow.
The shelf tile ended up drawing its can from a 128px-wide source at
best and a 64px one in practice: roughly 50 source pixels across the
label, which is why the artwork read as a coloured smudge.

**The fill varied per file** — 87.6% to 98.6% of the frame — so
neighbouring tiles drew visibly different-sized cans.

`scripts/normalize-can-images.py` fixes all three. It crops each file
to its alpha bounding box and pads it back out horizontally to one
shared 0.42 ratio, so every can fills its frame top to bottom and all
fifteen line up. Nothing visible is removed; the crop is exactly the
transparent margin, and re-running is idempotent. Run it after adding
a can:

    python3 scripts/normalize-can-images.py          # normalise
    python3 scripts/normalize-can-images.py --check  # CI-style check

Two things follow for anyone adding a can to a page:

- **Declare `width`/`height` at 0.42** (210 x 500 is the pair used
  everywhere) and **always pass `sizes`.** Without `sizes` Next emits
  a density srcset and caps the candidates at twice the declared
  width, which is how this went wrong the first time.
- **Clear `.next/cache/images` after re-running the script.** The
  optimiser caches by source path and width, not by mtime, so it will
  keep serving the old geometry until that folder goes. Delete only
  that folder — never the whole `.next` while a dev server is up.

Worth doing when you have a moment: these are still PNGs, 17 MB for
nineteen cans, because they need alpha. Re-encoding them as WebP at
q86 is 2.7 MB for output I could not tell apart, and Next reads
`.webp` sources happily. It is a one-line change to the script plus a
find-and-replace across `data/ciders.ts` and `data/shelf.ts`.

## Feature icons (review finding 04)

The old badge row set `apple-gold` on 18 of 18 ciders and `apple-red`
on 14 of 18, and labelled them "Gold Rush" and "Red Delicious" —
varieties that appear in no cider's blend. A badge on every product
distinguishes nothing, and those two were inaccurate besides, so they
are gone. What is drawn now is only what varies: barrel-aged, Rare
Apple Series, and the hibiscus / passionfruit / guava infusions, with
the label on screen rather than in a hover tooltip that a phone cannot
show.

The three claims that hold for everything — 100% fresh pressed, never
from concentrate, naturally gluten free — are stated once per detail
page as house claims, not sprinkled onto individual cans as though
they differed. They have no data field behind them; they come from the
site's own FAQ and the "We respect the apple" copy.

## Motion

Motion is mostly *feedback*: it fires when something responds — a
hover, a press, a focus, the mobile drawer opening, the shelf filter
changing, a form answering, the age gate arriving. Hovers are built
from `ph-lift`, which raises a panel 4px on an ease that overshoots
and settles; that overshoot is the difference between a panel that
lifts and one that merely moves, and it is why the hovers read as
alive rather than mechanical.

Three things move without being asked, and each is deliberate:

- **The ticker** runs as a newspaper marquee. The three announcements
  are rendered twice and the pair scrolls as one track, so at -50% the
  loop has no seam; the duplicate is `aria-hidden` so a screen reader
  hears them once. It pauses under the pointer and while anything in
  it has focus. This also replaced the horizontal scroll the phone
  used to need.
- **The hero can** floats: six seconds a cycle, ten pixels of travel.
  It is a photograph beside the copy, never text, and it is the only
  ambient motion in the body of the page.
- **The trophy-case figures** count up the first time they are
  scrolled into view, once per load. This is the only scroll-triggered
  motion on the site and it is confined to numbers. The server renders
  the final figure, so a crawler, a reader with JavaScript off and
  anyone on reduced motion all get `26` and nothing moves.

No prose ever animates, and nothing is withheld from a reader waiting
for an animation to finish.

**A lift means you can click it.** That is the one rule the whole
vocabulary hangs on, and it decides which class a thing gets:

- **Clickable** → `ph-lift`: the panel rises 4px with a shadow.
  Buttons, cider tiles, the mosaic secondaries, the award seals, the
  search field.
- **Not clickable** → `ph-tint` on the panel and `ph-figure` on its
  number: the rule above it takes the accent colour and the figure
  grows in place. Just as much life, without promising a click it
  cannot honour. The three "Find a can" cards are the clearest case —
  two of them are not links, so their icons answer instead.

The second kind is most of the secondary pages: the release rows and
rare-apple facts on `/releases`, the founding figures and the "then
and now" table on `/our-story`, the membership tiles and numbered
subscription terms on `/cider-club`, the two asides and the state
grid on `/locator`, the "Looking for a can?" panel on `/contact`, and
the "what to expect" grid on `/taproom`. A sold-out release is dimmed
to 70% and comes back to full strength — and full colour — under the
pointer, since the archive is still worth reading, just not first.

The four award seals on the home page are now **links to the cider
that won**, which is what gives their hover something to mean: the
card lifts, its ground warms, the seal's rays turn 22.5° and its
medallion swells, and a "See the cider →" line grows in. Every
`group-hover:` reveal has a matching `group-focus-visible:`, so a
keyboard gets the same answer as a pointer.

It is CSS, with one exception. Nothing became a client component
except `count-up.tsx` (about 30 lines, no dependency): the 33 pages
still prerender, First Load JS is unchanged at 111 kB and the home
page grew by 385 bytes. `framer-motion` is still in `package.json`
but nothing imports it — everything here is pointer and focus state,
which CSS does with no JavaScript and no client boundary.
`lib/animation-config.ts`, left over from the retired design, is gone.

Three durations do all of it, in `app/globals.css`: `--ph-fast`
(130ms) for feedback that should feel like the pointer, `--ph-base`
(200ms) for something changing state, `--ph-slow` (320ms) for a lift.
`--ph-ease` settles; `--ph-spring` overshoots and is only ever used on
transforms, because a colour that overshoots just looks wrong. The
classes are `ph-press`, `ph-lift`, `ph-wipe`, `ph-ring`, `ph-hint`,
`ph-figure`, `ph-move` / `ph-move-fast`, `ph-tint`, `ph-reveal`,
`ph-enter`, `ph-collapse` and `ph-marquee`.

**Each of those declares a whole `transition`, so an element takes
exactly one of them — never two.** The later one in `globals.css`
wins outright and the other's property snaps instead of animating.
The audit is a grep of every `className` for two of `ph-press`,
`ph-lift`, `ph-tint`, `ph-move`, `ph-move-fast`, `ph-reveal`,
`ph-figure`, `ph-hint`; it is currently clean.

A `prefers-reduced-motion` block collapses every duration to 0.01ms
rather than removing the rules, so feedback still arrives for someone
who asked for no motion — it just does not travel. The ticker and the
float are stopped outright instead, since collapsing their duration
would park each on its final keyframe, which for the ticker means
scrolled halfway along. That block also switches off the smooth
scrolling `layout.tsx` sets on `<html>`.

The site also gains one focus ring where most controls previously had
none: an ink hairline inside a gold one. Either colour alone fails
somewhere — gold is 1.9:1 on cream, ink disappears on the ink bands —
but the pair always leaves one ring reading, and it echoes the double
rule.

## Conventions

- Motion is feedback first. The three exceptions — ticker, floating
  can, counting figures — are listed under Motion above; anything else
  that would move on its own, or on scroll, does not belong here.
- Prose never animates, and never waits on an animation.
- Unverified values render as a visible `[TBC]` via the `Tbc` component.
  Never silently guess a number.
- Gold only ever sits on ink. Type on a coloured tile is always
  `paper.light`.
- Tile grounds are a per-hue-family **value** ladder, not an eyedropper
  of the label — see finding 09 and the note on `CiderTile`.
- Nothing has a border radius.
