
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Product } from '@/types/product';
import { useAuth } from '@/context/AuthContext';

interface WishlistButtonProps {
  product: Product;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

// Key for localStorage
const WISHLIST_KEY = 'snapshop_wishlist';

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  size = 'icon', 
  variant = 'outline' 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useAuth();
  
  // Generate a consistent storage key that can include user ID when available
  const getStorageKey = () => {
    return user ? `${WISHLIST_KEY}_${user.id}` : WISHLIST_KEY;
  };

  useEffect(() => {
    // Check if product is in wishlist on component mount or when user changes
    const storageKey = getStorageKey();
    const wishlist = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const isInWishlist = wishlist.some((item: {id: string}) => item.id === product.id);
    setIsWishlisted(isInWishlist);
  }, [product.id, user]);

  const toggleWishlist = () => {
    const storageKey = getStorageKey();
    const wishlist = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (!isWishlisted) {
      // Add to wishlist
      if (!wishlist.some((item: {id: string}) => item.id === product.id)) {
        const updatedWishlist = [...wishlist, {...product, addedAt: new Date().toISOString()}];
        localStorage.setItem(storageKey, JSON.stringify(updatedWishlist));
        toast.success(`${product.name} added to your wishlist`);
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      }
    } else {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: {id: string}) => item.id !== product.id);
      localStorage.setItem(storageKey, JSON.stringify(updatedWishlist));
      toast.info(`${product.name} removed from your wishlist`);
      
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }
    
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist();
      }}
      className={isWishlisted ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""}
    >
      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
    </Button>
  );
};

export default WishlistButton;
