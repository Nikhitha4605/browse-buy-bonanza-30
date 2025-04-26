
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Product } from '@/types/product';

interface WishlistButtonProps {
  product: Product;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  size = 'icon', 
  variant = 'outline' 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist on component mount
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.some((item: {id: string}) => item.id === product.id);
    setIsWishlisted(isInWishlist);
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!isWishlisted) {
      // Add to wishlist
      if (!wishlist.some((item: {id: string}) => item.id === product.id)) {
        const updatedWishlist = [...wishlist, {...product, addedAt: new Date().toISOString()}];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.success(`${product.name} added to your wishlist`);
      }
    } else {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: {id: string}) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast.info(`${product.name} removed from your wishlist`);
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
