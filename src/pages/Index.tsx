
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/mockData";

const HomePage = () => {
  // Get the first 6 products for featured section
  const featuredProducts = products.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Shop the Latest <span className="text-brand-accent">Trends</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Discover quality products for your lifestyle with free shipping and 24/7 customer support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-3 px-8 text-lg"
                asChild
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 text-lg"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-brand text-xl">
                    {category.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 capitalize">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured Products</h2>
            <Button asChild variant="outline">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-16 bg-brand text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Special Deals & Discounts
            </h2>
            <p className="text-lg mb-8">
              Sign up for our newsletter to receive exclusive offers, new product alerts, and discounts.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                className="px-4 py-3 rounded-md flex-grow text-gray-900"
                placeholder="Enter your email"
              />
              <Button className="bg-brand-accent hover:bg-brand-accent/90 text-white py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-white mr-3">
                  J
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The premium headphones exceeded my expectations! Great sound quality and very comfortable."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-white mr-3">
                  M
                </div>
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Fast shipping and excellent customer service. The keyboard is perfect for gaming!"
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-white mr-3">
                  S
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Thompson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I love my new backpack! The quality is amazing and it has plenty of storage."
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
