import Image from "next/image";

interface SimplePageHeaderProps {
  title: string;
  subtitle?: string;
}

export function SimplePageHeader({ title, subtitle }: SimplePageHeaderProps) {
  return (
    <div
      className="relative h-[200px] w-full overflow-hidden"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5e5847d21af7dfdc603f8b35_pattern.jpg-mMuSNaVuawJbxMb5QEfmONWODnV7Yw.jpeg')",
        backgroundSize: "150px",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-brand-navy/80">
        <div className="stormalong-container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-4xl font-oswald uppercase text-white mb-2 tracking-wider">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-white/90 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
