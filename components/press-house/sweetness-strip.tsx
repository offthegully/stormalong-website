import { cn } from "@/lib/utils";
import { sweetnessLabels } from "@/lib/catalogue";

/**
 * "How dry is it?" — the same five-step scale the shelf guide uses,
 * with this cider's stop lit. The step is named in the heading as
 * well as coloured, so it survives being read without colour.
 */
export function SweetnessStrip({
  value,
  provisional = false,
}: {
  value: number;
  provisional?: boolean;
}) {
  const step = Math.min(Math.max(value, 1), 5);

  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <span className="ph-label text-[0.53rem] text-paper/45">
          How dry is it?
        </span>
        <span className="ph-label ph-num text-[0.53rem] text-gold">
          {provisional && "[ "}
          {sweetnessLabels[step - 1]} &middot; {step} of 5
          {provisional && " ]"}
        </span>
      </div>
      <ol className="flex gap-1">
        {sweetnessLabels.map((label, index) => {
          const active = index + 1 === step;
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className={cn(
                "ph-label flex-grow border px-1.5 py-3 text-center text-[0.5rem]",
                active
                  ? "border-gold bg-gold text-ink"
                  : "border-paper/25 bg-paper/10 text-paper/55",
              )}
            >
              {/* The step is abbreviated to fit a phone, so the full
                  name is carried separately for screen readers rather
                  than being read out twice. */}
              <span className="sr-only">{label}</span>
              <span aria-hidden="true" className="hidden sm:inline">
                {label}
              </span>
              <span aria-hidden="true" className="sm:hidden">
                {label.replace("Semi-", "S-")}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
