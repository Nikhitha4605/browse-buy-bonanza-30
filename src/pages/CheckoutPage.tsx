
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import { deliveryEstimate } from "@/utils/deliveryUtils";

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Calculate shipping and tax
  const shipping = subtotal > 500 ? 0 : 100;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate shipping info
    const requiredFields = ["fullName", "addressLine1", "city", "state", "postalCode"];
    const missingFields = requiredFields.filter((field) => !shippingAddress[field as keyof typeof shippingAddress]);

    if (missingFields.length > 0) {
      toast.error("Please fill all required shipping information");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Create order info
    const orderDetails = {
      id: `ORD${Date.now().toString().slice(-8)}`,
      userId: user?.id || "guest",
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      })),
      total,
      status: "processing" as const,
      shippingAddress,
      paymentMethod: 
        paymentMethod === "credit-card" 
          ? "Credit Card" 
          : paymentMethod === "upi" 
            ? "UPI" 
            : "Cash on Delivery",
      createdAt: new Date().toISOString(),
      deliveryDate: deliveryEstimate(shippingAddress.postalCode)
    };

    // In a real app, we would send this to the server
    console.log("Order placed:", orderDetails);

    // Navigate to confirmation page with order details
    navigate("/order-confirmation", { state: { orderDetails } });
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-8">Add some products to your cart before checkout.</p>
          <Button onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Customer Info */}
              <div className="lg:w-2/3 space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingAddress.fullName}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine2">
                        Address Line 2 (Optional)
                      </Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center">
                        <span className="mr-2">Credit/Debit Card</span>
                        <div className="flex space-x-1">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/196/196578.png"
                            alt="Visa"
                            className="h-6 w-8 object-contain"
                          />
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/196/196561.png"
                            alt="MasterCard"
                            className="h-6 w-8 object-contain"
                          />
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center">
                        <span className="mr-2">UPI Payment</span>
                        <div className="flex space-x-1">
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/6124/6124998.png"
                            alt="UPI"
                            className="h-6 w-8 object-contain"
                          />
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit-card" && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div>
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="name@ybl" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing Address */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="billing-same"
                      checked={sameAsBilling}
                      onCheckedChange={(checked) => {
                        setSameAsBilling(!!checked);
                      }}
                    />
                    <Label htmlFor="billing-same">
                      Billing address same as shipping address
                    </Label>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start border-b border-gray-100 pb-4"
                      >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="mt-1 text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="ml-4 text-sm font-medium">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `₹${shipping.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST (18%)</span>
                      <span>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-base font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-4">
                      By placing this order, you agree to our{" "}
                      <a href="#" className="text-brand hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-brand hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                    <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
