
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import FilterSection from "@/components/product/FilterSection";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategoryParam = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryParam);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const maxPrice = Math.max(...products.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedColor) params.set("color", selectedColor);
    if (selectedType) params.set("type", selectedType);
    setSearchParams(params);
  }, [selectedCategory, selectedColor, selectedType, setSearchParams]);

  // Filter products based on all criteria
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...products];
      
      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Filter by color
      if (selectedColor) {
        filtered = filtered.filter(product => product.color === selectedColor);
      }
      
      // Filter by type
      if (selectedType) {
        filtered = filtered.filter(product => product.type === selectedType);
      }
      
      // Filter by price range
      filtered = filtered.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
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
  }, [selectedCategory, selectedColor, selectedType, priceRange, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Shop All Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products, carefully selected for quality and style.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with all filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-100">
              <FilterSection
                selectedCategory={selectedCategory}
                selectedColor={selectedColor}
                selectedType={selectedType}
                priceRange={priceRange}
                maxPrice={maxPrice}
                onSelectCategory={setSelectedCategory}
                onSelectColor={setSelectedColor}
                onSelectType={setSelectedType}
                onPriceRangeChange={setPriceRange}
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
                    className="pl-9 border-gray-200 focus:border-brand focus:ring-brand"
                  />
                </div>
                <Button type="submit" className="bg-brand hover:bg-brand/90">
                  Search
                </Button>
              </form>
            </div>

            {/* Results info */}
            <div className="mb-6">
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
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedColor(null);
                    setSelectedType(null);
                    setPriceRange([0, maxPrice]);
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
