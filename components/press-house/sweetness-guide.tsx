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

  const anyProvisional = steps.some((s) =>
    s.ciders.some((c) => c.provisional),
  );

  return (
    <section
      id="sweetness"
      className="border-t-2 border-ink/15 bg-paper-dark"
    >
      <div className="ph-gutter py-12">
        <div className="mb-7">
          <div className="ph-label mb-2.5 text-brick">
            The only question anyone asks
          </div>
          <h2 className="ph-slab text-[2rem] leading-none sm:text-[2.4rem]">
            How dry is it?
          </h2>
          <p className="mt-2.5 max-w-[58ch] font-franklin text-[0.97rem] font-light leading-relaxed text-prose">
            Every cider on one line, driest on the left. Pick a step, then
            pick a can.
          </p>
        </div>

        <div className="border-t-2 border-ink pt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.label}
                style={{ borderLeftColor: step.color }}
                className="border-l-[3px] pl-3.5"
              >
                <div className="ph-slab text-[1.05rem] leading-none">
                  {step.label}
                </div>
                <div className="ph-label ph-num mt-1.5 text-[0.56rem] text-prose-muted">
                  {step.level} of 5
                </div>
                <div className="mt-2.5 font-franklin text-[0.84rem] font-light leading-relaxed text-prose">
                  {step.ciders.length === 0 ? (
                    <span className="text-prose-faint">Nothing here yet</span>
                  ) : (
                    step.ciders.map((c) => (
                      <span key={c.slug} className="block">
                        {c.name}
                        {c.provisional && (
                          <span className="text-brick" title="Unconfirmed">
                            {" "}
                            *
                          </span>
                        )}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* The ramp itself */}
          <div className="mt-6 flex gap-[3px]">
            {steps.map((step) => (
              <span
                key={step.label}
                style={{ backgroundColor: step.color }}
                className="h-2 flex-grow"
              />
            ))}
          </div>

          {anyProvisional && (
            <p className="mt-3 font-franklin text-[0.75rem] leading-relaxed text-prose-muted">
              Placements come from the sweetness values in the cider data.
              Ciders marked <span className="text-brick">*</span> are
              unconfirmed.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
