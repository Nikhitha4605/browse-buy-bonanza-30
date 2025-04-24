
import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartSummary: React.FC = () => {
  const { subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Calculate shipping and tax
  const shipping = subtotal > 0 ? 100 : 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3">
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
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      <Button 
        className="w-full mt-6 bg-brand hover:bg-brand/90"
        disabled={subtotal === 0}
        onClick={handleCheckout}
      >
        {isAuthenticated ? "Proceed to Checkout" : "Sign in to Checkout"}
      </Button>
      <div className="mt-4">
        <p className="text-xs text-gray-500 text-center">
          Shipping and taxes calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
