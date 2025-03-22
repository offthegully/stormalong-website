interface SweetnessScaleProps {
  level: number // 1-5 scale
}

export function SweetnessScale({ level }: SweetnessScaleProps) {
  // Ensure level is between 1 and 5
  const validLevel = Math.min(Math.max(level, 1), 5)

  return (
    <div className="relative w-full max-w-[400px]">
      {/* Scale Line */}
      <div className="flex items-center mb-2 relative">
        <div className="h-px bg-gray-300 w-full absolute"></div>
        {[1, 2, 3, 4].map((position) => (
          <div key={position} className="flex flex-col items-center relative z-10 w-1/4">
            <div className={`w-2 h-2 rounded-full ${position <= validLevel ? "bg-brand-navy" : "bg-gray-300"}`}></div>
          </div>
        ))}
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-gray-600 uppercase font-medium">
        <div className="text-center">DRY</div>
        <div className="text-center">
          MEDIUM
          <br />
          DRY
        </div>
        <div className="text-center">
          MEDIUM
          <br />
          SWEET
        </div>
        <div className="text-center">SWEET</div>
      </div>

      {/* Indicator Arrow */}
      <div className="absolute top-[-20px] transform -translate-x-1/2" style={{ left: `${(validLevel - 1) * 33.33}%` }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22L3 10H21L12 22Z" fill="#0F2A47" />
        </svg>
      </div>
    </div>
  )
}

