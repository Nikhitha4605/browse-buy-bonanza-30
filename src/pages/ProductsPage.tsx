
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import CategoryFilter from "@/components/product/CategoryFilter";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);

  // Update the URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  // Filter products based on category and search query
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...products];
      
      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }
      
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300); // Small timeout to simulate API call
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-grow relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" className="bg-brand hover:bg-brand/90">
                  Search
                </Button>
              </form>
            </div>

            {/* Results info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 && "s"}
                {selectedCategory && (
                  <span> in <span className="capitalize">{selectedCategory}</span></span>
                )}
              </p>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 animate-pulse rounded-lg h-80"
                  ></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
