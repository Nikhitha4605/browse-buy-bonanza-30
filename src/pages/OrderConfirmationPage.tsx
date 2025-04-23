
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmationPage = () => {
  const orderNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 md:p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-semibold">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">customer@example.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold">Credit Card (****1234)</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We'll email you an order confirmation with details and tracking
                info.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1 bg-brand hover:bg-brand/90">
              <Link to="/orders">View Order</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
