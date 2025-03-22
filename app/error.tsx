"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h2 className="text-3xl font-oswald text-brand-navy uppercase mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase">
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-oswald uppercase"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

