
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-3 sm:mb-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-grow px-4">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
        <div className="mt-1 text-brand font-semibold">
          ${item.price.toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center mt-3 sm:mt-0">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
        <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-destructive"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
