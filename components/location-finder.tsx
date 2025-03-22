"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  type: "store" | "bar" | "restaurant"
  distance?: string
}

// Mock data for demonstration
const mockLocations: Location[] = [
  {
    id: "1",
    name: "Craft Beer Cellar",
    address: "123 Main St",
    city: "Boston",
    state: "MA",
    type: "store",
    distance: "0.8 miles",
  },
  {
    id: "2",
    name: "The Publick House",
    address: "456 Washington St",
    city: "Brookline",
    state: "MA",
    type: "bar",
    distance: "1.2 miles",
  },
  {
    id: "3",
    name: "Whole Foods Market",
    address: "789 Beacon St",
    city: "Cambridge",
    state: "MA",
    type: "store",
    distance: "2.5 miles",
  },
]

export function LocationFinder() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [locationType, setLocationType] = useState<string>("all")

  const filteredLocations =
    locationType === "all" ? locations : locations.filter((location) => location.type === locationType)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-oswald uppercase text-brand-navy">Find Stormalong Near You</h3>
          <div className="flex gap-2">
            <Input type="text" placeholder="Enter zip code or city" className="flex-1" />
            <Button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-oswald uppercase">Search</Button>
          </div>
          <Select value={locationType} onValueChange={setLocationType}>
            <SelectTrigger className="font-oswald uppercase">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="store">Stores</SelectItem>
              <SelectItem value="bar">Bars</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {filteredLocations.map((location) => (
            <Card key={location.id} className="cursor-pointer hover:bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">{location.name}</h4>
                    <p className="text-sm text-slate-600">{location.address}</p>
                    <p className="text-sm text-slate-600">
                      {location.city}, {location.state}
                    </p>
                    {location.distance && <p className="text-sm text-brand-gold mt-1">{location.distance}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-slate-100 rounded-lg min-h-[500px] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-slate-500">Interactive map would be displayed here</p>
          <p className="text-sm text-slate-400 mt-2">Using Mapbox or Google Maps API integration</p>
        </div>
      </div>
    </div>
  )
}

