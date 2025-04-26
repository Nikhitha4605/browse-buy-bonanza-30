
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/orders");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect in the useEffect
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

          {user.orders && user.orders.length > 0 ? (
            <div className="space-y-6">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order placed</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">#{order.id}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 self-start sm:self-center">
                      {getOrderStatusBadge(order.status)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-medium mb-4">Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-4"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded">
                            {/* If we had the image URL in the order data */}
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {!item.imageUrl && (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ₹{item.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/orders/${order.id}`}>View Details</Link>
                      </Button>
                      {order.status !== "delivered" &&
                        order.status !== "cancelled" && (
                          <Button variant="ghost" size="sm">
                            Track Order
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex flex-col items-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6">
                  You haven't placed any orders yet. Start shopping to see your
                  order history here.
                </p>
                <Button asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
