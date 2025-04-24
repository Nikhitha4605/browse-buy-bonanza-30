
import React from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { categories, colors, types } from "@/data/mockData";

interface FilterSectionProps {
  selectedCategory: string | null;
  selectedColor: string | null;
  selectedType: string | null;
  priceRange: [number, number];
  maxPrice: number;
  onSelectCategory: (category: string | null) => void;
  onSelectColor: (color: string | null) => void;
  onSelectType: (type: string | null) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  selectedColor,
  selectedType,
  priceRange,
  maxPrice,
  onSelectCategory,
  onSelectColor,
  onSelectType,
  onPriceRangeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Filters</h3>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-2">Categories</h4>
        <div className="space-y-2">
          <div
            className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-md ${
              selectedCategory === null ? "bg-brand/10 text-brand" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectCategory(null)}
          >
            <span className="text-sm">All Products</span>
            {selectedCategory === null && <Check className="h-4 w-4" />}
          </div>

          {categories.map((category) => (
            <div
              key={category}
              className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-md ${
                selectedCategory === category ? "bg-brand/10 text-brand" : "hover:bg-gray-100"
              }`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="text-sm capitalize">{category}</span>
              {selectedCategory === category && <Check className="h-4 w-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-medium mb-2">Colors</h4>
        <div className="space-y-2">
          {colors.map((color) => (
            <div
              key={color}
              className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-md ${
                selectedColor === color ? "bg-brand/10 text-brand" : "hover:bg-gray-100"
              }`}
              onClick={() => onSelectColor(color)}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-200" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm capitalize">{color}</span>
              </div>
              {selectedColor === color && <Check className="h-4 w-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Types */}
      <div>
        <h4 className="font-medium mb-2">Types</h4>
        <div className="space-y-2">
          {types.map((type) => (
            <div
              key={type}
              className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-md ${
                selectedType === type ? "bg-brand/10 text-brand" : "hover:bg-gray-100"
              }`}
              onClick={() => onSelectType(type)}
            >
              <span className="text-sm capitalize">{type}</span>
              {selectedType === type && <Check className="h-4 w-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="px-2">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            min={0}
            max={maxPrice}
            step={10}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedColor || selectedType || priceRange[1] < maxPrice) && (
        <Button
          variant="ghost"
          className="w-full text-sm"
          onClick={() => {
            onSelectCategory(null);
            onSelectColor(null);
            onSelectType(null);
            onPriceRangeChange([0, maxPrice]);
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default FilterSection;
