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
| Cider detail | `/ciders/[slug]` | **Still the old design** |
| Cider Club | `/cider-club` | **Still the old design** |
| Our Story | `/our-story` | **Still the old design** |
| Contact | `/contact` | **Still the old design** |

Shell, age gate, footer and the design system are done and apply to
every page, including the four not yet rebuilt — so those four work,
they just still carry the old look inside the new chrome.

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
  Ragtime Reserve, The Big Appeal, Bittersweet Symphonie, Lady
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

### 3. Smaller unblocks

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

## Conventions

- Unverified values render as a visible `[TBC]` via the `Tbc` component.
  Never silently guess a number.
- Gold only ever sits on ink. Type on a coloured tile is always
  `paper.light`.
- Tile grounds are a per-hue-family **value** ladder, not an eyedropper
  of the label — see finding 09 and the note on `CiderTile`.
- Nothing has a border radius.
