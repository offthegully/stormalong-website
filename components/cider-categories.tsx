"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function CiderCategories() {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const categories = [
    {
      id: "all",
      name: "All Ciders",
      description: "Our complete collection of craft hard ciders",
      link: "/ciders?category=all",
    },
    {
      id: "core",
      name: "Core Collection",
      description: "Our flagship ciders available year-round",
      link: "/ciders?category=core",
    },
    {
      id: "seasonal",
      name: "Seasonal Releases",
      description: "Limited edition ciders that celebrate the seasons",
      link: "/ciders?category=seasonal",
    },
    {
      id: "rare",
      name: "Rare Apple Series",
      description: "Ciders made with rare and heirloom apple varieties",
      link: "/ciders?category=rare",
    },
    {
      id: "barrel-aged",
      name: "Barrel-Aged",
      description: "Ciders aged in whiskey, wine, and other barrels",
      link: "/ciders?category=barrel-aged",
    },
  ]

  return (
    <section className="bg-brand-navy py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-oswald text-white mb-8 text-center">Explore Our Cider Collections</h2>

        {/* Desktop view - horizontal scrolling container */}
        <div className="hidden md:flex space-x-4 overflow-x-auto pb-4 snap-x">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className={`snap-start flex-shrink-0 w-[calc(20%-16px)] p-6 rounded-lg transition-all duration-300 ${
                currentCategory === category.id
                  ? "bg-brand-gold/30 border-2 border-brand-gold"
                  : "bg-white/10 hover:bg-white/20 border-2 border-transparent"
              }`}
            >
              <div>
                <h3 className="text-xl font-oswald text-brand-gold mb-2">{category.name}</h3>
                <p className="text-white/80 mb-4 text-sm">{category.description}</p>
                <span
                  className={`text-sm font-medium ${
                    currentCategory === category.id ? "text-white" : "text-brand-gold"
                  }`}
                >
                  {currentCategory === category.id ? "Currently Viewing" : "Explore →"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view - horizontal scrolling with larger cards */}
        <div className="md:hidden flex overflow-x-auto space-x-4 pb-4 snap-x">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className={`snap-start flex-shrink-0 w-[85%] p-6 rounded-lg transition-all duration-300 ${
                currentCategory === category.id
                  ? "bg-brand-gold/30 border-2 border-brand-gold"
                  : "bg-white/10 hover:bg-white/20 border-2 border-transparent"
              }`}
            >
              <div>
                <h3 className="text-xl font-oswald text-brand-gold mb-2">{category.name}</h3>
                <p className="text-white/80 mb-4 text-sm">{category.description}</p>
                <span
                  className={`text-sm font-medium ${
                    currentCategory === category.id ? "text-white" : "text-brand-gold"
                  }`}
                >
                  {currentCategory === category.id ? "Currently Viewing" : "Explore →"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

