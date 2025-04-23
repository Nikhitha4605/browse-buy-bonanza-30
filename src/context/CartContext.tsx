
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate the subtotal price
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedCart = prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
        toast.success(`Updated quantity for ${product.name}`);
        return updatedCart;
      } else {
        // Add new item if it doesn't exist
        toast.success(`Added ${product.name} to cart`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.id === productId);
      if (product) {
        toast.info(`Removed ${product.name} from cart`);
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    totalItems,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
