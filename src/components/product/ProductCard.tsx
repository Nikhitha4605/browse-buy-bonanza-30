import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Truck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { deliveryEstimate } from "@/utils/deliveryUtils";
import { toast } from "@/components/ui/sonner";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const deliveryDate = deliveryEstimate();

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use the current window location to construct the full URL
    const url = `${window.location.protocol}//${window.location.host}/product/${product.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: url,
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Product link copied to clipboard!"))
        .catch((error) => console.error("Error copying:", error));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute top-0 right-0 m-2">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
          <div className="absolute top-0 right-0 m-2 flex gap-2">
            <WishlistButton product={product} size="sm" />
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2 capitalize">{product.color}</span>•
              <span className="ml-2 capitalize">{product.type}</span>
            </div>
          </div>
          {product.inStock && (
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <Truck className="h-4 w-4 mr-1" />
              <span>Get it by {deliveryDate}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button
          className="w-full bg-brand hover:bg-brand/90 flex items-center justify-center gap-2"
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
