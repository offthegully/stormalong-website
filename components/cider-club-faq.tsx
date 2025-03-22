"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CiderClubFAQ() {
  const faqs = [
    {
      question: "How often will I receive shipments?",
      answer:
        "Rare Apple Club members receive two shipments per year, typically in Spring (April/May) and Fall (October/November). You'll receive an email notification before each shipment with details about what's included.",
    },
    {
      question: "How much does membership cost?",
      answer:
        "There is no upfront membership fee. You only pay for the bi-annual shipments, which range from $45-$75 plus shipping, depending on the selection. Additionally, you receive a permanent 15% discount on all other purchases throughout the year.",
    },
    {
      question: "Can I skip a shipment?",
      answer:
        "Yes! We'll notify you before each shipment, and you can choose to skip that particular release if you wish. There's no obligation to receive every shipment.",
    },
    {
      question: "What states do you ship to?",
      answer:
        "We currently ship to most states, but alcohol shipping regulations vary by location. Please contact us directly if you have questions about shipping to your specific area.",
    },
    {
      question: "Can I pick up my shipment instead of having it delivered?",
      answer:
        "Yes, we offer pickup options at our seasonal, regional farmers market locations throughout the year. You can select this option when confirming your shipment.",
    },
    {
      question: "How do I cancel my membership?",
      answer:
        "You can cancel your membership at any time by contacting us via email or phone. There are no cancellation fees or minimum commitment periods.",
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
          <AccordionTrigger className="text-left font-medium text-brand-navy hover:text-brand-gold transition-colors py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-4">{faq.answer.replace(/'/g, "'")}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

