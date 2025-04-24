
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

// Map of category images
const categoryImages = {
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80",
  accessories: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80",
  clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80",
  home: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80",
  fitness: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80",
  footwear: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80"
};

const CategoryShowcase = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Browse Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/products?category=${category}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={categoryImages[category as keyof typeof categoryImages]}
                    alt={category}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-semibold text-white capitalize mb-2">
                        {category}
                      </h3>
                      <p className="text-white/80 text-sm">
                        Discover our {category} collection
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
