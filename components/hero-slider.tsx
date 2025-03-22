"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { ANIMATION_CONFIG } from "@/lib/animation-config"

type SlideProps = {
  id: number
  imageUrl: string
  title: string
  description: string
  ctaText: string
  ctaUrl: string
}

const slides: SlideProps[] = [
  {
    id: 1,
    imageUrl: "https://web-assets.same.dev/3086885054/4396725.jpg",
    title: "Boston Heirloom is back!",
    description:
      "Boston Heirloom is our tribute cider to New England's rich apple history. Crafted with a blend of Roxbury Russet and Baldwin apples, two of the oldest apple varietals in the U.S., this cider embodies a flavor rooted in tradition.",
    ctaText: "LEARN MORE",
    ctaUrl: "/cider/boston-heirloom",
  },
  {
    id: 2,
    imageUrl: "https://web-assets.same.dev/3543492737/723241991.jpeg",
    title: "It's White Mountain Magic season!",
    description: "Spiced unfiltered cider with a hint of NH maple syrup. It's savory yet crisp.",
    ctaText: "FIND IT!",
    ctaUrl: "/locator",
  },
  {
    id: 3,
    imageUrl: "https://web-assets.same.dev/288679565/359899466.jpeg",
    title: "The Official Cider of the New England Free Jacks",
    description:
      "We're a proud sponsor of the New England Free Jacks, Major League Rugby champions 2 times in a row!!!",
    ctaText: "LEARN MORE",
    ctaUrl: "https://freejacks.com/",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMobile()

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return

      setIsAnimating(true)
      setCurrentSlide(index)

      // Reset animation state after transition completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 500)
    },
    [isAnimating],
  )

  const goToNextSlide = useCallback(() => {
    const nextSlide = (currentSlide + 1) % slides.length
    goToSlide(nextSlide)
  }, [currentSlide, goToSlide, slides.length])

  const goToPrevSlide = useCallback(() => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(prevSlide)
  }, [currentSlide, goToSlide, slides.length])

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goToNextSlide()
    }, 6000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [goToNextSlide])

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      goToNextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous slide
      goToPrevSlide()
    }
  }

  // Reset auto-play on user interaction
  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    autoPlayRef.current = setInterval(() => {
      goToNextSlide()
    }, 6000)
  }

  const handleNavClick = (index: number) => {
    goToSlide(index)
    resetAutoPlay()
  }

  const handlePrevClick = () => {
    goToPrevSlide()
    resetAutoPlay()
  }

  const handleNextClick = () => {
    goToNextSlide()
    resetAutoPlay()
  }

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px] w-full" aria-live="polite">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: ANIMATION_CONFIG.duration.medium,
                    ease: ANIMATION_CONFIG.ease.easeOut,
                  }}
                  aria-hidden={currentSlide !== index}
                >
                  <Image
                    src={slide.imageUrl || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
                    <div className="stormalong-container h-full flex flex-col justify-center">
                      <div className="max-w-xl">
                        <motion.h2
                          className="text-3xl sm:text-4xl lg:text-5xl font-oswald mb-3 sm:mb-4 text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: ANIMATION_CONFIG.duration.medium,
                            delay: ANIMATION_CONFIG.delay.minimal,
                            ease: ANIMATION_CONFIG.ease.smooth,
                          }}
                        >
                          {slide.title}
                        </motion.h2>
                        <motion.p
                          className="mb-4 sm:mb-6 text-sm sm:text-base text-white/90"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: ANIMATION_CONFIG.duration.medium,
                            delay: ANIMATION_CONFIG.delay.short,
                            ease: ANIMATION_CONFIG.ease.smooth,
                          }}
                        >
                          {slide.description}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: ANIMATION_CONFIG.duration.medium,
                            delay: ANIMATION_CONFIG.delay.medium,
                            ease: ANIMATION_CONFIG.ease.smooth,
                          }}
                        >
                          <Link href={slide.ctaUrl}>
                            <Button
                              variant="outline"
                              className="bg-transparent text-white border-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-colors font-oswald uppercase tracking-wider"
                            >
                              {slide.ctaText}
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center">
        <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full" role="tablist">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavClick(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                currentSlide === index ? "bg-brand-gold" : "bg-white/50 hover:bg-white/80",
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={currentSlide === index ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentSlide === index ? "true" : "false"}
              role="tab"
              tabIndex={currentSlide === index ? 0 : -1}
            />
          ))}
        </div>
      </div>

      {/* Previous/Next Buttons */}
      {!isMobile && (
        <>
          <motion.button
            onClick={handlePrevClick}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </>
      )}
    </div>
  )
}

