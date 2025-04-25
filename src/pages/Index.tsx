
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CategoryShowcase from "@/components/browse/CategoryShowcase";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/CommandMenu";
import { ShoppingBag, Search, CreditCard, Truck, Camera, Mic, Award, Video, Music } from "lucide-react";

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
      
      {/* Advanced Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Advanced Shopping Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* AR Camera Feature */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="md:flex">
                <div className="md:shrink-0 bg-purple-600 flex items-center justify-center p-6">
                  <Camera className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">AR-Powered Camera</h3>
                  <p className="text-gray-600 mb-4">Virtually try on products or scan real-world items to find similar products on SnapShop.</p>
                  <Button variant="outline" onClick={() => navigate("/ar-camera")} className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    Try Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Voice Assistant */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="md:flex">
                <div className="md:shrink-0 bg-blue-600 flex items-center justify-center p-6">
                  <Mic className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Voice Shopping Assistant</h3>
                  <p className="text-gray-600 mb-4">Search products, add to cart, and checkout with simple voice commands.</p>
                  <Button variant="outline" onClick={() => navigate("/voice-assistant")} className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Talk to Assistant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Premium Memberships */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Premium Memberships</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Join our premium programs and enjoy exclusive benefits tailored for our valued customers.</p>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            {/* SnapShop Plus */}
            <div className="flex-1 border rounded-xl p-8 shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-purple-700">SnapShop Plus</h3>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                  Exclusive discounts on all products
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                  Priority customer service
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                  Early access to sales events
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                  Free next-day delivery on orders
                </li>
              </ul>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Join SnapShop Plus</Button>
            </div>
            
            {/* SnapPrime */}
            <div className="flex-1 border rounded-xl p-8 shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-700">SnapPrime</h3>
                <div className="flex gap-2">
                  <Video className="h-6 w-6 text-blue-600" />
                  <Music className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                  Free express shipping on all orders
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                  Unlimited streaming of movies and shows
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                  Ad-free music streaming service
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                  Exclusive member-only deals
                </li>
              </ul>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Try SnapPrime Free</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Verified Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Verified Customer Reviews</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Real reviews from real customers who purchased and used our products.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-medium text-gray-700">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <div className="flex text-yellow-400">
                    ★★★★★
                    <span className="text-gray-400 ml-2">Verified Purchase</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The AR camera feature helped me find the perfect desk lamp that matches my existing furniture. Amazing technology!"
              </p>
            </div>
            
            {/* Review 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-medium text-gray-700">AS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Amanda Smith</h4>
                  <div className="flex text-yellow-400">
                    ★★★★★
                    <span className="text-gray-400 ml-2">Verified Purchase</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "SnapPrime membership is totally worth it! The streaming services alone make up for the cost, and the free shipping is a huge bonus."
              </p>
            </div>
            
            {/* Review 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-medium text-gray-700">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <div className="flex text-yellow-400">
                    ★★★★☆
                    <span className="text-gray-400 ml-2">Verified Purchase</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The voice assistant makes shopping so convenient. I just ask for what I need while cooking, and it's added to my cart!"
              </p>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-200 text-base px-6"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </Button>
            <Button 
              size="lg" 
              className="bg-brand hover:bg-brand/90 text-base px-6"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
