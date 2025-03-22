"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Where can I purchase Stormalong Cider?",
    answer:
      "Stormalong Cider is available at select retailers, bars, and restaurants throughout the Northeast. You can use our Location Finder to find a store near you, or purchase directly from our online shop for delivery in select states.",
  },
  {
    question: "Do you offer tours of your cidery?",
    answer:
      "Yes! We offer tours of our production facility in Sherborn, MA on weekends. Tours include a guided walkthrough of our cider-making process and a tasting of our current offerings. Please contact us to schedule a tour.",
  },
  {
    question: "Are Stormalong ciders gluten-free?",
    answer:
      "Yes, all of our ciders are naturally gluten-free as they are made exclusively from apples and other fruits, without any gluten-containing ingredients.",
  },
  {
    question: "What makes Stormalong different from other ciders?",
    answer:
      "We craft our ciders using 100% fresh-pressed apples, never from concentrate. We focus on using traditional cider apple varieties and heirloom apples when possible, and we ferment our ciders slowly to develop complex flavors. Our commitment to quality and traditional methods sets us apart.",
  },
  {
    question: "How do I join the Rare Apple Club?",
    answer:
      "You can join our Rare Apple Club through our website. Members enjoy first access to new product releases, special events, a permanent 15% discount on all orders, and exclusive access to small-batch ciders offered only to club members.",
  },
  {
    question: "Do you ship cider directly to consumers?",
    answer:
      "Yes, we ship to select states in compliance with local regulations. Please check our online shop for current shipping availability to your location.",
  },
]

export function Faq() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
          <AccordionTrigger className="text-left font-medium text-brand-navy hover:text-brand-gold transition-colors py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-4">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

