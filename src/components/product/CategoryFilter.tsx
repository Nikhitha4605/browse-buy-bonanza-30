
import React from "react";
import { Check } from "lucide-react";
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-4">Categories</h3>
      <div className="space-y-2">
        <div
          className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-md ${
            selectedCategory === null
              ? "bg-brand/10 text-brand"
              : "hover:bg-gray-100"
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
              selectedCategory === category
                ? "bg-brand/10 text-brand"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            <span className="text-sm capitalize">{category}</span>
            {selectedCategory === category && <Check className="h-4 w-4" />}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm"
          onClick={() => onSelectCategory(null)}
        >
          Clear Filter
        </Button>
      )}
    </div>
  );
};

export default CategoryFilter;
