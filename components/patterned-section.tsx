import type React from "react";

interface PatternedSectionProps {
  children: React.ReactNode;
  className?: string;
  opacity?: number;
}

export function PatternedSection({
  children,
  className = "",
  opacity = 0.0,
}: PatternedSectionProps) {
  return (
    <div
      className={`relative text-white ${className}`}
      style={{
        backgroundImage: "url('/images/nautical-background.jpg')",
        backgroundSize: "150px",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`absolute inset-0 bg-brand-navy/${Math.round(
          opacity * 100
        )}`}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// For backward compatibility
export function NauticalBackground({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <PatternedSection className={className}>{children}</PatternedSection>;
}
