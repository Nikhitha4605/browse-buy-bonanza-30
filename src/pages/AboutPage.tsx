import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About SnapShop</h1>
          
          <div className="prose max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              SnapShop is your ultimate online shopping destination, offering quality products across multiple categories with exceptional customer experience.
            </p>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2023, SnapShop started with a simple mission: to make online shopping more accessible, enjoyable, and rewarding for everyone. We believe that e-commerce should be more than just transactions—it should be about creating memorable experiences and building lasting relationships with our customers.
              </p>
              <p>
                What began as a small collection of curated products has since grown into a comprehensive online marketplace offering thousands of items across multiple categories, from cutting-edge electronics to stylish fashion accessories and everything in between.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                At SnapShop, our mission is to provide customers with:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>High-quality products at competitive prices</li>
                <li>Exceptional customer service and support</li>
                <li>A seamless and enjoyable shopping experience</li>
                <li>Fast and reliable shipping options</li>
                <li>A commitment to sustainability and ethical business practices</li>
              </ul>
              <p>
                We continuously strive to improve our platform, expand our product offerings, and enhance our services to meet the evolving needs of our customers.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                  <p>Every product in our catalog undergoes rigorous quality checks to ensure it meets our high standards.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-2">Customer-First Approach</h3>
                  <p>Your satisfaction is our priority. We're always here to assist with any questions or concerns.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-2">Secure Shopping</h3>
                  <p>Shop with confidence knowing that your personal information and transactions are protected.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                  <p>We partner with reliable shipping services to ensure your purchases arrive quickly and safely.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <h2 className="text-2xl font-semibold mb-6">Ready to Experience the Difference?</h2>
              <Button className="bg-brand hover:bg-brand/90" size="lg" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
