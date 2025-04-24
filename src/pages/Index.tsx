
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CategoryShowcase from "@/components/browse/CategoryShowcase";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/CommandMenu";
import { ShoppingBag, Search, CreditCard, Truck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Shop Smarter, Not Harder
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover quality products with fast delivery and exceptional service at SnapShop.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-brand hover:bg-brand/90 text-base px-6"
              onClick={() => navigate("/products")}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Shop Now
            </Button>
            
            <div className="w-full sm:w-auto">
              <CommandMenu />
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-purple-100 p-3 mb-3">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium">Quality Products</h3>
              <p className="text-sm text-gray-500">Curated for excellence</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-100 p-3 mb-3">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Quick & reliable shipping</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 p-3 mb-3">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-gray-500">100% secure checkout</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-amber-100 p-3 mb-3">
                <Search className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-medium">Easy Search</h3>
              <p className="text-sm text-gray-500">Find products quickly</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <CategoryShowcase />
      
      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to experience SnapShop?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've discovered their favorite products through our platform.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-gray-900 hover:bg-gray-200 text-base px-6"
            onClick={() => navigate("/register")}
          >
            Create an Account
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
