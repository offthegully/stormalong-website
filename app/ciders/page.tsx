"use client";

import Image from "next/image";
import Link from "next/link";
import { ciders } from "@/data/ciders";
import { CiderFeatureIcons } from "@/components/cider-feature-icons";
import { CiderGrid } from "@/components/cider-grid";
import { useSearchParams } from "next/navigation";

export default function CidersPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      {/* <div className="relative h-[400px] w-full">
        <Image
          src="/images/landing-page/award-winning-landing.jpg"
          alt="Our Ciders"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald uppercase text-white mb-4 tracking-wider">
              Our Ciders
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Crafted with care, respect for tradition, and the finest apples
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div> */}

      {/* Category Navigation */}
      <div className="bg-brand-navy py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-oswald text-white mb-8 text-center">
            Explore Our Cider Collections
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: "all", name: "All Ciders" },
              { id: "core", name: "Core Collection" },
              { id: "seasonal", name: "Seasonal Releases" },
              { id: "rare", name: "Rare Apple Series" },
              { id: "barrel-aged", name: "Barrel-Aged" },
            ].map((cat) => (
              <Link
                key={cat.id}
                href={`/ciders?category=${cat.id}`}
                scroll={false}
                className={`px-6 py-3 rounded-md text-center transition-colors ${
                  cat.id === category
                    ? "bg-brand-gold text-brand-navy font-bold"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Cider Grid */}
          <CiderGrid ciders={ciders} category={category} />
        </div>
      </section>
    </div>
  );
}
