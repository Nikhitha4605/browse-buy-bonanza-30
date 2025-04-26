
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend
    // For now, just show a success toast
    setIsEditing(false);
    toast.success("Profile information updated successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                          />
                        ) : (
                          <p className="text-gray-700 mt-1">{profileData.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                          />
                        ) : (
                          <p className="text-gray-700 mt-1">{profileData.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <p className="text-gray-700 mt-1">
                            {profileData.phone || "Not provided"}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="address">Shipping Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            placeholder="Enter your shipping address"
                          />
                        ) : (
                          <p className="text-gray-700 mt-1">
                            {profileData.address || "Not provided"}
                          </p>
                        )}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-2 pt-2">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {user?.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div
                          key={order.id}
                          className="border p-4 rounded-md shadow-sm"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">Order #{order.id}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Total: ₹{order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Items: {order.items.length}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <a href="/wishlist" className="text-brand hover:underline">
                      View your wishlist →
                    </a>
                  </CardTitle>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="checkbox"
                          id="notifications"
                          className="rounded border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="notifications" className="text-sm text-gray-700">
                          Receive order updates and promotional offers
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="destructive" className="w-full sm:w-auto">
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
