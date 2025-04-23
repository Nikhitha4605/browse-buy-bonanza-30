
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { cart, clearCart } = useCart();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    {cart.length} {cart.length === 1 ? "Item" : "Items"}
                  </h2>
                  <Button
                    variant="ghost"
                    className="text-gray-500 hover:text-destructive"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>

                <div className="divide-y">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            <div className="lg:w-1/3">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button className="bg-brand hover:bg-brand/90" size="lg" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
