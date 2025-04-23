
import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { products, orders } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsTable from "@/components/admin/ProductsTable";
import OrdersTable from "@/components/admin/OrdersTable";
import StoreSettings from "@/components/admin/StoreSettings";

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

          <TabsContent value="products">
            <ProductsTable products={products} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTable orders={orders} />
          </TabsContent>

          <TabsContent value="settings">
            <StoreSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
