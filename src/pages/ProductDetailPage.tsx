
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(products.find((p) => p.id === id));
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct);
      
      // Get related products (same category, different product)
      if (foundProduct) {
        const related = products
          .filter(
            (p) => p.category === foundProduct.category && p.id !== foundProduct.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 300);
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 animate-pulse bg-gray-200 h-96 rounded-lg"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded mt-4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-brand">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/products" className="text-gray-500 hover:text-brand">
            Products
          </Link>{" "}
          /{" "}
          <Link
            to={`/products?category=${product.category}`}
            className="text-gray-500 hover:text-brand capitalize"
          >
            {product.category}
          </Link>{" "}
          / <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl text-brand font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <div className="mb-6">
              {product.inStock ? (
                <Badge className="bg-green-600">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1 || !product.inStock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={!product.inStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                className="w-full bg-brand hover:bg-brand/90"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Category: <span className="capitalize">{product.category}</span></li>
                <li>Free shipping on orders over $50</li>
                <li>30-day money-back guarantee</li>
                <li>1-year warranty included</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-brand font-semibold">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
