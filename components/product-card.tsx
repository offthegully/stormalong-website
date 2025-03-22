import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: string
  imageSrc: string
  slug: string
}

export function ProductCard({ id, name, description, price, imageSrc, slug }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-slate-600 mb-4 line-clamp-2">{description}</p>
        <p className="text-lg font-semibold">{price}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button className="w-full" asChild>
          <Link href={`/shop/add-to-cart/${id}`}>Add to Cart</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/ciders/${slug}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

