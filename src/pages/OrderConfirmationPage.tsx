
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user, addOrderToHistory } = useAuth();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    // If no order details are found, redirect to home
    if (!orderDetails) {
      navigate("/");
      return;
    }

    // Clear the cart after successful order
    clearCart();

    // Add order to user's order history
    if (user && orderDetails) {
      addOrderToHistory(orderDetails);
    }
  }, [orderDetails, clearCart, navigate, user, addOrderToHistory]);

  if (!orderDetails) {
    return null; // This will redirect in the useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Your order #{orderDetails.orderId} has been placed successfully.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">Order Summary</h3>
                <p className="text-gray-600 text-sm">
                  Order Date: {new Date().toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-sm">
                  <span className="font-medium">Order ID:</span>{" "}
                  {orderDetails.orderId}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Payment Method:</span>{" "}
                  {orderDetails.paymentMethod}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Purchased Items</h4>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col sm:flex-row items-start sm:items-center py-3 border-b border-gray-100"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:ml-4 flex-grow">
                      <h5 className="font-medium">{item.name}</h5>
                      <p className="text-gray-500 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <p className="font-medium">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <span className="font-medium">Total</span>
                <span className="font-bold text-xl">
                  ₹{orderDetails.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium text-lg mb-4">Delivery Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-600">
                    Shipping Address
                  </h4>
                  <p className="mt-2">
                    {orderDetails.shippingAddress.fullName}
                    <br />
                    {orderDetails.shippingAddress.addressLine1}
                    <br />
                    {orderDetails.shippingAddress.addressLine2 && (
                      <>
                        {orderDetails.shippingAddress.addressLine2}
                        <br />
                      </>
                    )}
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.postalCode}
                    <br />
                    {orderDetails.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-600">
                    Estimated Delivery
                  </h4>
                  <div className="mt-2">
                    <div className="flex items-center text-green-600">
                      <Truck className="h-5 w-5 mr-2" />
                      <span>
                        {orderDetails.deliveryDate || "3-5 Business Days"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>Tracking information will be sent to your email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button asChild>
              <Link to="/orders">View My Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
