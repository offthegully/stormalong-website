"use client";

import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <div className="relative h-[200px] md:h-[300px] lg:h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30">
        <div className="stormalong-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald uppercase text-white mb-4 tracking-wider">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
