
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { products, orders } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

const AdminDashboard = () => {
  const { isAdmin } = useAuth();

  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Manage products, orders, and settings.
        </p>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid md:grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <ProductsTab />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <OrdersTab />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Products Tab Component
const ProductsTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    inStock: true,
  });

  const handleSaveProduct = (e) => {
    e.preventDefault();
    toast.success("Product saved successfully!");
    setShowForm(false);
    setProductData({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      inStock: true,
    });
  };

  const handleDeleteProduct = (productId) => {
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Products</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-brand hover:bg-brand/90"
        >
          {showForm ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={productData.category}
                  onValueChange={(value) =>
                    setProductData({ ...productData, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="inStock">Stock Status</Label>
                <Select
                  value={productData.inStock.toString()}
                  onValueChange={(value) =>
                    setProductData({
                      ...productData,
                      inStock: value === "true",
                    })
                  }
                >
                  <SelectTrigger id="inStock">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">In Stock</SelectItem>
                    <SelectItem value="false">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={productData.imageUrl}
                onChange={(e) =>
                  setProductData({ ...productData, imageUrl: e.target.value })
                }
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90">
                Save Product
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.inStock ? (
                      <Badge className="bg-green-600">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="space-x-2">
                      <Button variant="ghost" className="text-brand h-8">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-destructive h-8"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Orders Tab Component
const OrdersTab = () => {
  const handleUpdateOrderStatus = (orderId, status) => {
    toast.success(`Order #${orderId} updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Manage Orders</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.shippingAddress.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) =>
                        handleUpdateOrderStatus(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-brand hover:text-brand/70"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "BrowseBuyBonanza",
    email: "contact@example.com",
    phone: "+1 123-456-7890",
    address: "123 E-Commerce St, Online City, 12345",
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    toast.success("Store settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Store Settings</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={storeSettings.storeName}
              onChange={(e) =>
                setStoreSettings({
                  ...storeSettings,
                  storeName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={storeSettings.email}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              value={storeSettings.phone}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, phone: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="address">Store Address</Label>
            <Textarea
              id="address"
              value={storeSettings.address}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, address: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-brand hover:bg-brand/90">
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
