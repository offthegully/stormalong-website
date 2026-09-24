import Link from "next/link";
import { shelf, sweetnessLabels } from "@/lib/catalogue";

/**
 * The whole range on one line, driest to sweetest.
 *
 * The sweetness scale is the best idea on the current site and it is
 * buried on the detail pages; this promotes it to a guide in its own
 * right. Placements are read from the `sweetness` values in the
 * catalogue, so a step with nothing in it says so rather than being
 * quietly padded.
 */

/** Driest to sweetest. Ink through wine, so the ramp reads as a ramp. */
const stepColors = [
  "#0A1A2B", // ink
  "#35604A", // moss
  "#9A6B24", // gold, dark
  "#A8402C", // brick, light
  "#63202C", // wine
];

export function SweetnessGuide() {
  const steps = sweetnessLabels.map((label, i) => ({
    label,
    level: i + 1,
    color: stepColors[i],
    ciders: shelf.filter((c) => c.sweetness === i + 1),
  }));

  return (
    <section
      id="sweetness"
      className="border-t-2 border-ink/15 bg-paper-dark"
    >
      <div className="ph-gutter py-12">
        <div className="mb-7">
          <div className="ph-label mb-2.5 text-brick">
            Dry to sweet
          </div>
          <h2 className="ph-slab text-[2rem] leading-none sm:text-[2.4rem]">
            How dry is it?
          </h2>
          <p className="mt-2.5 max-w-[58ch] font-franklin text-[0.97rem] font-light leading-relaxed text-prose">
            Every cider we make, from driest to sweetest.
          </p>
        </div>

        <div className="border-t-2 border-ink pt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.label}
                style={{ borderLeftColor: step.color }}
                className="ph-tint group border-l-[3px] pl-3.5 hover:bg-ink/[0.04]"
              >
                <div className="ph-figure ph-slab origin-left text-[1.05rem] leading-none group-hover:scale-105">
                  {step.label}
                </div>
                <div className="ph-label ph-num mt-1.5 text-[0.56rem] text-prose-muted">
                  {step.level} of 5
                </div>
                <div className="mt-2.5 font-franklin text-[0.84rem] font-light leading-relaxed text-prose">
                  {step.ciders.length === 0 ? (
                    <span className="text-prose-faint">None right now</span>
                  ) : (
                    step.ciders.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/ciders/${c.slug}`}
                        className="ph-press block w-fit hover:text-brick hover:underline hover:underline-offset-4"
                      >
                        {c.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* The ramp itself */}
          {/* The ramp reads as one continuous scale, so each band
              grows in place on hover rather than moving — a band that
              slid would shift every band after it. */}
          <div className="mt-6 flex h-4 items-end gap-[3px]">
            {steps.map((step) => (
              <span
                key={step.label}
                style={{ backgroundColor: step.color }}
                className="ph-move h-2 flex-grow origin-bottom hover:scale-y-[2]"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
