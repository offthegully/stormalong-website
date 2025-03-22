import { Check } from "lucide-react"

export function CiderClubBenefits() {
  const benefits = [
    {
      title: "Exclusive Access",
      description:
        "First access to new product releases and limited small batch ciders. As a club member you will get first dibs on these ciders before we release them to the public.",
    },
    {
      title: "Member-Only Ciders",
      description:
        "Exclusive access to ultra limited small batch cider offerings, occasional surprises, special offers and invitations to special events.",
    },
    {
      title: "Permanent Discount",
      description: "A permanent 15% discount on all cider orders online throughout the year.",
    },
    {
      title: "Bi-Annual Shipments",
      description:
        "Two times a year (Spring and Fall) we ship you a variety of small batch ciders. The cost of each shipment will range between $45 to $75 (+shipping) depending upon what is included in the release.",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-brand-navy">Rare Apple Club Membership Includes:</h3>
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-gold/20 flex items-center justify-center mt-1 mr-3">
              <Check className="h-4 w-4 text-brand-gold" />
            </div>
            <div>
              <h4 className="font-semibold text-brand-navy">{benefit.title}</h4>
              <p className="text-gray-700">{benefit.description.replace(/'/g, "'")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

