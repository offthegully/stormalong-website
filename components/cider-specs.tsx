import {
  Wine,
  Calendar,
  Tag,
  Award,
  Wheat,
  Droplets,
  Candy,
} from "lucide-react";

interface CiderSpecsProps {
  abv: number;
  availability: string;
  category?: string;
  awards?: string[];
}

export function CiderSpecs({
  abv,
  availability,
  category = "Core Line-Up",
  awards = [],
}: CiderSpecsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center group">
        <div className="w-10 h-10 flex items-center justify-center mr-4">
          <Wine className="w-6 h-6" />
        </div>
        <div>
          <p className="text-lg">{abv}%</p>
        </div>
      </div>
      <div className="h-px bg-amber-200 w-full"></div>

      <div className="flex items-center group">
        <div className="w-10 h-10 flex items-center justify-center mr-4">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <p className="text-lg">{availability}</p>
        </div>
      </div>
      <div className="h-px bg-amber-200 w-full"></div>

      <div className="flex items-center group">
        <div className="w-10 h-10 flex items-center justify-center mr-4">
          <Tag className="w-6 h-6" />
        </div>
        <div>
          <p className="text-lg">{category}</p>
        </div>
      </div>
      <div className="h-px bg-amber-200 w-full"></div>

      {awards && awards.length > 0 && (
        <>
          <div className="flex group">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <ul className="text-gray-700 text-sm space-y-1">
                {awards.map((award, index) => (
                  <li key={index} className="mb-1">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="h-px bg-amber-200 w-full"></div>
        </>
      )}

      {/* Product Features */}
      <div className="flex justify-center gap-4 pt-8">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center">
              <Wheat className="w-8 h-8" />
            </div>
            <p className="text-xs font-medium mt-1 uppercase">Gluten Free</p>
          </div>
        </div>
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center">
              <Droplets className="w-8 h-8" />
            </div>
            <p className="text-xs font-medium mt-1 uppercase">
              Not From Concentrate
            </p>
          </div>
        </div>
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center">
              <Candy className="w-8 h-8" />
            </div>
            <p className="text-xs font-medium mt-1 uppercase">No Added Sugar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
