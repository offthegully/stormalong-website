"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  directionsUrl,
  findStockists,
  groupByTown,
  osmEmbedUrl,
  type StockistHit,
} from "@/lib/stockists";
import type { Premise, StockistDataset } from "@/types/stockist";
import { PinIcon, SearchIcon, Star } from "./icons";

/**
 * The stockist finder.
 *
 * List first, map second — the opposite of every store locator, and on
 * purpose. A map answers "where is it" for one shop you have already
 * chosen; a list answers "who has it near me", which is the question
 * people arrive with. A list is also the thing this site can set in
 * its own type, and it is the one that works on a phone held one-handed
 * on a train. The map is a panel you open, not the page you land on.
 *
 * Everything is client-side over a list already in the payload. See
 * lib/stockists.ts for the search itself and for the one real
 * limitation: with no geocoder we can only anchor on a town we
 * already stock.
 */

const RADII = [5, 10, 25, 50] as const;

const PREMISE_LABELS: Record<Premise, string> = {
  off: "Retail stores",
  on: "Bars and restaurants",
};

export function StockistFinder({ data }: { data: StockistDataset }) {
  const [query, setQuery] = useState("");
  // `submitted` is what the results read from; `query` is what the box
  // shows. Typing does not re-run the search — a locator that shuffles
  // its answer under your thumb between the third and fourth digit of
  // a ZIP is unreadable, and a ZIP is only ever right when it is whole.
  const [submitted, setSubmitted] = useState("");
  const [radius, setRadius] = useState<number>(25);
  const [premise, setPremise] = useState<Premise | null>(null);
  const [here, setHere] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  /**
   * The one stockist the map is showing, if any.
   *
   * This exists because OpenStreetMap's embed takes a single marker
   * and no more. A map of eleven results can therefore only show the
   * ground they cover, with nothing on it — an extent, not an answer.
   * So the map does the job it can actually do: the list picks the
   * shop, and the map says precisely where that one is. Overview when
   * nothing is picked, pin when something is.
   */
  const [focused, setFocused] = useState<StockistHit | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () => findStockists(data, { query: submitted, radius, premise, here }),
    [data, submitted, radius, premise, here],
  );

  const groups = useMemo(() => groupByTown(result.hits), [result.hits]);
  const mapSrc = useMemo(
    () => osmEmbedUrl(focused ? [focused] : result.hits),
    [focused, result.hits],
  );

  function runSearch() {
    // A typed place and the device's position are two answers to the
    // same question, so asking one clears the other.
    setHere(null);
    setLocateError(null);
    setSubmitted(query);
    setFocused(null);
  }

  /** Point the map at one shop, open it, and bring it into view. */
  function showOnMap(hit: StockistHit) {
    setFocused(hit);
    setMapOpen(true);
    // After paint, so the panel has its height before we scroll to it.
    requestAnimationFrame(() =>
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  }

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setLocateError("This browser cannot share a location.");
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setHere({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setQuery("");
        setSubmitted("");
        setLocating(false);
      },
      () => {
        // The browser does not say whether this was a refusal or a
        // failure, so the message must cover both without guessing.
        setLocateError("We could not get your location. Try a town or ZIP.");
        setLocating(false);
      },
      { timeout: 10000, maximumAge: 300000 },
    );
  }

  return (
    <div>
      {data.status === "sample" && <SampleNotice />}

      {/* Search ------------------------------------------------------ */}
      <div className="border-[3px] border-ink bg-paper-light">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
          className="border-b-2 border-ink/15 px-6 py-6 sm:px-8"
        >
          <label
            htmlFor="ph-stockist-query"
            className="ph-label mb-2.5 block text-prose-faint"
          >
            Town or ZIP code
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-grow">
              <SearchIcon
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-prose-faint"
              />
              <input
                id="ph-stockist-query"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sherborn, or 01770"
                autoComplete="postal-code"
                className="ph-press w-full border-2 border-ink/25 bg-paper py-3.5 pl-11 pr-4 font-franklin text-[0.95rem] text-ink placeholder:text-prose-faint hover:border-ink/45 focus:border-ink"
              />
            </div>
            <button
              type="submit"
              className="ph-press ph-label shrink-0 bg-brick px-7 py-3.5 text-paper hover:bg-brick-dark"
            >
              Search
            </button>
            <button
              type="button"
              onClick={useMyLocation}
              disabled={locating}
              className="ph-press ph-label inline-flex shrink-0 items-center justify-center gap-2 border-2 border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-paper disabled:opacity-50"
            >
              <PinIcon size={13} />
              {locating ? "Locating…" : "Use my location"}
            </button>
          </div>

          {locateError && (
            <p
              role="status"
              className="mt-3 font-franklin text-[0.85rem] text-brick"
            >
              {locateError}
            </p>
          )}
        </form>

        {/* Filters --------------------------------------------------- */}
        <div className="flex flex-col gap-5 px-6 py-5 sm:px-8 md:flex-row md:items-start md:justify-between">
          <Field label="Show">
            <Chip
              active={premise === null}
              onClick={() => {
                setPremise(null);
                setFocused(null);
              }}
            >
              Everywhere
            </Chip>
            {(["off", "on"] as const).map((p) => (
              <Chip
                key={p}
                active={premise === p}
                onClick={() => {
                  setPremise(p);
                  setFocused(null);
                }}
              >
                {PREMISE_LABELS[p]}
              </Chip>
            ))}
          </Field>

          {/* The radius only means something once there is a point to
              measure from, so it says so rather than sitting there
              looking live and changing nothing. */}
          <Field
            label="Within"
            hint={result.origin ? undefined : "after a search"}
          >
            {RADII.map((r) => (
              <Chip
                key={r}
                active={radius === r}
                muted={!result.origin}
                onClick={() => {
                  setRadius(r);
                  setFocused(null);
                }}
              >
                {r} mi
              </Chip>
            ))}
          </Field>
        </div>
      </div>

      {/* Results ----------------------------------------------------- */}
      <div className="mt-8">
        <ResultsHeading result={result} />

        {mapSrc && (
          <div ref={mapRef} className="mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setMapOpen((v) => !v)}
                aria-expanded={mapOpen}
                aria-controls="ph-stockist-map"
                className="ph-press ph-label inline-flex items-center gap-2 border-2 border-ink/25 px-5 py-3 text-ink hover:border-ink/50 hover:bg-ink/5"
              >
                <PinIcon size={13} className="text-brick" />
                {mapOpen ? "Hide the map" : "Show the area on a map"}
              </button>
              {focused && (
                <button
                  type="button"
                  onClick={() => setFocused(null)}
                  className="ph-wipe ph-label text-ink hover:text-brick"
                >
                  Back to the whole area
                </button>
              )}
            </div>

            <div className="ph-collapse" data-open={mapOpen}>
              <div>
                <div className="mt-4 border-[3px] border-ink">
                  {/* The caption is not decoration. An extent with no
                      pin and a pin on one shop look similar at a
                      glance and mean completely different things. */}
                  <p className="ph-label flex items-center gap-2 border-b-2 border-ink bg-ink px-4 py-3 text-paper">
                    {focused ? (
                      <>
                        <PinIcon size={12} className="shrink-0 text-gold" />
                        {focused.name}
                      </>
                    ) : (
                      "The ground these results cover — pick a shop below to pin it"
                    )}
                  </p>
                  <iframe
                    id="ph-stockist-map"
                    key={mapSrc}
                    title={
                      focused
                        ? `Map showing ${focused.name}`
                        : "Map of the area these results cover"
                    }
                    src={mapSrc}
                    loading="lazy"
                    className="block h-[380px] w-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {groups.length === 0 ? (
          <EmptyState result={result} />
        ) : (
          /* Keyed so the CSS entrance replays on every new answer — the
             same trick the cider shelf uses, and for the same reason:
             two searches can share most of their rows. */
          <div key={`${submitted}-${radius}-${premise}-${!!here}`} className="ph-enter">
            {groups.map((group) => (
              <section key={`${group.town}-${group.state}`} className="mb-9">
                <div className="mb-4 flex items-baseline gap-3 border-b-2 border-ink pb-2.5">
                  <h3 className="ph-slab text-[1.35rem] leading-none">
                    {group.town}
                  </h3>
                  <span className="ph-label text-prose-faint">
                    {group.state}
                  </span>
                  <span className="h-px flex-grow bg-ink/15" />
                  <span className="ph-label text-prose-faint">
                    {group.hits.length}{" "}
                    {group.hits.length === 1 ? "place" : "places"}
                  </span>
                </div>
                <ul className="grid gap-4 md:grid-cols-2">
                  {group.hits.map((hit) => (
                    <StockistCard
                      key={hit.id}
                      hit={hit}
                      focused={focused?.id === hit.id}
                      onShowOnMap={showOnMap}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function SampleNotice() {
  return (
    <div
      role="status"
      className="mb-6 border-2 border-brick bg-brick/10 px-6 py-5"
    >
      <span className="ph-label block text-brick">
        <Star className="mr-1.5" />
        Placeholder listings
      </span>
      <p className="mt-2 max-w-[68ch] font-franklin text-[0.9rem] font-light leading-relaxed text-prose">
        Every shop below is invented, for laying out this page. None of
        them stock us and none of them exist. The real list replaces{" "}
        <code className="font-mono text-[0.85em] text-brick">
          data/stockists.ts
        </code>
        .
      </p>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="ph-label mb-2.5 text-prose-faint">
        {label}
        {hint && <span className="ml-2 normal-case opacity-70">{hint}</span>}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  muted = false,
  onClick,
  children,
}: {
  active: boolean;
  muted?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "ph-press ph-label border-2 px-4 py-2.5 text-[0.59rem]",
        active
          ? "border-ink bg-ink text-gold"
          : "border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
        muted && "opacity-55",
      )}
    >
      {children}
    </button>
  );
}

/**
 * The line above the results. It names what was searched and how it
 * was answered, because "12 places" means something different when it
 * is everything we have than when it is everything within 25 miles.
 */
function ResultsHeading({
  result,
}: {
  result: ReturnType<typeof findStockists>;
}) {
  const n = result.hits.length;
  const count = `${n} ${n === 1 ? "place" : "places"}`;

  let note: string;
  if (result.mode === "all") note = "Everywhere we are, top to bottom";
  else if (result.origin) note = `Nearest first, from ${result.origin.label}`;
  else if (result.mode === "unplaced") note = "Nothing matched that";
  else note = "Matched by name and town";

  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h2 className="ph-slab text-[1.5rem] leading-none">{count}</h2>
      <span className="ph-label text-prose-faint">{note}</span>
    </div>
  );
}

/**
 * The empty state does the one job an empty state has: say which kind
 * of nothing this is. "We cannot place that ZIP" and "nobody within 5
 * miles" send the reader in completely different directions, and the
 * second one has a fix sitting right there in the radius chips.
 */
function EmptyState({
  result,
}: {
  result: ReturnType<typeof findStockists>;
}) {
  const unplaced = result.mode === "unplaced";

  return (
    <div className="border-[3px] border-dashed border-ink/35 bg-paper-light px-8 py-11 text-center">
      <PinIcon size={26} className="mx-auto mb-3.5 text-brick" />
      <h3 className="ph-slab mb-2.5 text-[1.3rem] leading-tight">
        {unplaced ? "We could not place that" : "Nothing here yet"}
      </h3>
      <p className="mx-auto max-w-[56ch] font-franklin text-[0.92rem] font-light leading-relaxed text-prose">
        {unplaced
          ? "We can only search towns and ZIP codes we already sell into. Try a nearby town by name, or widen the search."
          : "No one in range is carrying us right now. Try a wider radius, or ask your local shop to order us in — they can."}
      </p>
    </div>
  );
}

function StockistCard({
  hit,
  focused,
  onShowOnMap,
}: {
  hit: StockistHit;
  focused: boolean;
  onShowOnMap: (hit: StockistHit) => void;
}) {
  const canMap = typeof hit.lat === "number" && typeof hit.lng === "number";

  return (
    <li
      className={cn(
        "ph-tint flex flex-col border-2 px-5 py-5",
        focused ? "border-brick bg-brick/5" : "border-ink/20 hover:border-brick",
      )}
    >
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <span className="ph-label text-brick">{hit.kind}</span>
        {typeof hit.distance === "number" && (
          <span className="ph-num ph-label shrink-0 text-prose-faint">
            {hit.distance < 10
              ? hit.distance.toFixed(1)
              : Math.round(hit.distance)}{" "}
            mi
          </span>
        )}
      </div>

      <h4 className="ph-slab mb-2 text-[1.08rem] leading-tight">
        {hit.url ? (
          <a
            href={hit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brick"
          >
            {hit.name}
          </a>
        ) : (
          hit.name
        )}
      </h4>

      <address className="mb-3 font-franklin text-[0.88rem] font-light not-italic leading-relaxed text-prose">
        {hit.street}
        <br />
        {hit.town}, {hit.state} {hit.zip}
        {hit.phone && (
          <>
            <br />
            <a href={`tel:${hit.phone}`} className="hover:text-brick">
              {hit.phone}
            </a>
          </>
        )}
      </address>

      {/* Pushes the actions to the bottom so cards in a row line up
          however uneven their addresses are. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        {/* Two different jobs, deliberately separate: "where is this
            on the map" stays on the page, "take me there" hands off to
            whichever map app the reader already has open. */}
        {canMap && (
          <button
            type="button"
            onClick={() => onShowOnMap(hit)}
            className="ph-wipe ph-label inline-flex items-center gap-1.5 text-ink hover:text-brick"
          >
            <PinIcon size={12} />
            {focused ? "On the map" : "Show on map"}
          </button>
        )}
        <a
          href={directionsUrl(hit)}
          target="_blank"
          rel="noopener noreferrer"
          className="ph-wipe ph-label inline-flex items-center gap-1.5 text-ink hover:text-brick"
        >
          Directions
        </a>
        {hit.confirmed && (
          <span className="ph-label text-prose-faint">
            Confirmed {hit.confirmed}
          </span>
        )}
      </div>
    </li>
  );
}
