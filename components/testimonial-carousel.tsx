"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    quote:
      "Stormalong's Legendary Dry is the perfect balance of crisp and refreshing. It's become my go-to cider for any occasion!",
    author: "Sarah T.",
    location: "Boston, MA",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "I've tried many ciders, but nothing compares to the depth of flavor in Stormalong's Kingston Black. It's truly exceptional.",
    author: "Michael R.",
    location: "Portland, ME",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The Red Skies at Night is a perfect blend of tart and sweet. The hibiscus and passionfruit notes are incredible!",
    author: "Jessica L.",
    location: "Providence, RI",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "As someone who appreciates craft beverages, I'm impressed by Stormalong's commitment to quality. Their ciders are in a league of their own.",
    author: "David K.",
    location: "New York, NY",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "The Rare Apple Club membership has been amazing. I love discovering new ciders and learning about different apple varieties.",
    author: "Emily W.",
    location: "Burlington, VT",
    rating: 5,
  },
]

export function TestimonialCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="py-16 bg-gray-50">
      <div className="stormalong-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-oswald text-brand-navy uppercase mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what cider enthusiasts have to say about Stormalong.
          </p>
        </motion.div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Card className="border border-gray-200 shadow-sm h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 text-brand-gold">
                        <Quote size={32} />
                      </div>
                      <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                      <div>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="font-semibold text-brand-navy">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-8 gap-2">
            <CarouselPrevious className="static transform-none bg-white border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors duration-200" />
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    current === i + 1 ? "bg-brand-gold w-3 h-3" : "bg-gray-300 hover:bg-gray-400",
                  )}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none bg-white border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors duration-200" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

