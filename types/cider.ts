export interface CiderType {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  image: string
  abv: number
  availability: "Year-round" | "Seasonal" | "Limited"
  features: string[]
  flavor: string
  apples: string
  sweetness: number // 1-5 scale
  awards?: string[]
}

