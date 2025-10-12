interface SweetnessScaleProps {
  level: number // 1-5 scale
}

const SWEETNESS_LABELS: Record<number, string> = {
  1: "Dry",
  2: "Semi-Dry",
  3: "Medium",
  4: "Semi-Sweet",
  5: "Sweet",
}


export function SweetnessScale({ level }: SweetnessScaleProps) {
  // Clamp to 1..5
  const validLevel = Math.min(Math.max(Math.round(level), 1), 5)
  const label = SWEETNESS_LABELS[validLevel]

  return (
    <div className="w-full max-w-[420px] pt-2" role="meter" aria-valuemin={1} aria-valuemax={5} aria-valuenow={validLevel} aria-valuetext={`Sweetness ${validLevel} of 5 (${label})`}>
      {/* Segmented bar with per-segment pointer to avoid misalignment from gaps */}
      <div className="mb-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`relative h-3 flex-1 rounded ${i <= validLevel ? "bg-brand-navy" : "bg-gray-200"}`}
          >
            {i === validLevel ? (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22L3 10H21L12 22Z" fill="#0F2A47" />
                </svg>
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[11px] tracking-wide text-gray-600 uppercase">
        <span>Dry</span>
        <span>Medium</span>
        <span>Sweet</span>
      </div>
    </div>
  )
}
