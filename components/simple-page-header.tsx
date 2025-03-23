import Image from "next/image";
import { PatternedSection } from "@/components/patterned-section";

interface SimplePageHeaderProps {
  title: string;
  subtitle?: string;
}

export function SimplePageHeader({ title, subtitle }: SimplePageHeaderProps) {
  return (
    <PatternedSection className="h-[200px] flex items-center justify-center">
      <div className="stormalong-container text-center">
        <h1 className="text-3xl md:text-4xl font-oswald uppercase text-white mb-2 tracking-wider">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </PatternedSection>
  );
}
