import {
  Wine,
  Calendar,
  Tag,
  Award,
  Wheat,
  Droplets,
  Candy,
} from "lucide-react";
import type React from "react";

interface BadgeProps {
  icon: React.ReactNode;
  title: string;
}

function Badge({ icon, title }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-amber-200">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-amber-800">
        {icon}
      </div>
      <span className="font-medium text-xs text-amber-950 whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}

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
      <div className="flex flex-wrap items-center justify-start gap-2 py-3 mx-auto">
        <Badge icon={<Wheat className="h-4 w-4" />} title="Gluten Free" />
        <Badge icon={<Candy className="h-4 w-4" />} title="No Added Sugar" />
        <Badge
          icon={<Droplets className="h-4 w-4" />}
          title="Not From Concentrate"
        />
      </div>
    </div>
  );
}
