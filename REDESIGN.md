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
  are missing from `data/ciders.ts` entirely. They are stubbed from the
  live site and flagged; their sweetness is a guess and Blue Hills has
  no artwork in the repo.
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
- **Club signup.** There is no join mechanism and there never was —
  the current site's "Join our Rare Apple Club" button is a styled
  `<button>` with no href and no handler. The new page will not draw a
  signup form over a checkout that does not exist, so Join opens an
  email to `info@stormalong.com`, the address the membership copy
  already gives for opting out. Point `joinUrl` in `data/club.ts` at a
  real signup and the page switches to it.
- **Cidery address.** `130 Oak Street, Sherborn, MA 01770` is in this
  repo but not on the live contact page. Confirm it should be public.

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

## Conventions

- Unverified values render as a visible `[TBC]` via the `Tbc` component.
  Never silently guess a number.
- Gold only ever sits on ink. Type on a coloured tile is always
  `paper.light`.
- Tile grounds are a per-hue-family **value** ladder, not an eyedropper
  of the label — see finding 09 and the note on `CiderTile`.
- Nothing has a border radius.
