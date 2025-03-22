import type React from "react"

interface NauticalPatternBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function NauticalPatternBackground({ children, className = "" }: NauticalPatternBackgroundProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5e5847d21af7dfdc603f8b35_pattern.jpg-mMuSNaVuawJbxMb5QEfmONWODnV7Yw.jpeg')",
        backgroundSize: "500px",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-brand-navy/80"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

