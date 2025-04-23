
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

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
              ${product.price.toFixed(2)}
            </span>
          </div>
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
