import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, subtotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Calculate shipping and tax
  const shipping = 100;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = [
      "firstName", "lastName", "email", "address", 
      "city", "state", "zipCode", "country", 
      "cardName", "cardNumber", "expDate", "cvv"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Simulate order processing
    setIsProcessingOrder(true);
    
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation");
      setIsProcessingOrder(false);
    }, 1500);
  };

  if (cart.length === 0 && !isProcessingOrder) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <form onSubmit={(e) => {
              e.preventDefault();
              
              // Validate form
              const requiredFields = [
                "firstName", "lastName", "email", "address", 
                "city", "state", "zipCode", "country", 
                "cardName", "cardNumber", "expDate", "cvv"
              ];
              
              const missingFields = requiredFields.filter(field => !formData[field]);
              
              if (missingFields.length > 0) {
                toast.error("Please fill in all required fields");
                return;
              }
              
              if (cart.length === 0) {
                toast.error("Your cart is empty");
                return;
              }

              // Simulate order processing
              setIsProcessingOrder(true);
              
              setTimeout(() => {
                clearCart();
                navigate("/order-confirmation");
                setIsProcessingOrder(false);
              }, 1500);
            }}>
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    required
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="zipCode">PIN Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        setFormData(prev => ({ ...prev, country: value }))
                      }
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="UAE">United Arab Emirates</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Payment Information
                </h2>

                <div className="mb-4">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expDate">Expiration Date</Label>
                    <Input
                      id="expDate"
                      name="expDate"
                      placeholder="MM/YY"
                      value={formData.expDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand/90"
                  size="lg"
                  disabled={isProcessingOrder}
                >
                  {isProcessingOrder
                    ? "Processing Order..."
                    : `Place Order • ₹${total.toLocaleString('en-IN')}`}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="divide-y mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">
                        {item.name}{" "}
                        <span className="text-gray-600">x{item.quantity}</span>
                      </p>
                    </div>
                    <p className="font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{shipping.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
