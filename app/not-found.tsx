import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h2 className="text-5xl font-oswald text-brand-navy uppercase mb-4">404</h2>
        <h3 className="text-3xl font-oswald text-brand-navy uppercase mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase">Return Home</Button>
        </Link>
      </div>
    </div>
  )
}

