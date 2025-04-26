
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Share2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { deliveryEstimate, getDeliveryTimeRange } from "@/utils/deliveryUtils";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState<string>("");
  const [deliveryInfo, setDeliveryInfo] = useState<{
    date: string;
    minDays: number;
    maxDays: number;
  } | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Get related products based on category and type
  const relatedProducts = products.filter(
    (p) => (p.category === product.category || p.type === product.type) && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handlePincodeCheck = () => {
    if (pincode && pincode.length === 6 && /^\d+$/.test(pincode)) {
      const date = deliveryEstimate(pincode);
      const { minDays, maxDays } = getDeliveryTimeRange(pincode);
      setDeliveryInfo({ date, minDays, maxDays });
    } else {
      toast.error("Please enter a valid 6-digit pincode");
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      // Save to wishlist
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.some((item: {id: string}) => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        toast.success(`${product.name} added to your wishlist`);
      }
    } else {
      // Remove from wishlist
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updatedWishlist = wishlist.filter((item: {id: string}) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast.info(`${product.name} removed from your wishlist`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success("Product link copied to clipboard!"))
        .catch((error) => console.error("Error copying:", error));
    }
  };

  // Check if product is in wishlist on component mount
  React.useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.some((item: {id: string}) => item.id === product.id);
    setIsWishlisted(isInWishlist);
  }, [product.id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-white rounded border border-gray-200 p-2 cursor-pointer hover:border-brand">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="bg-white rounded border border-gray-200 p-2 cursor-pointer hover:border-brand">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="bg-white rounded border border-gray-200 p-2 cursor-pointer hover:border-brand">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="bg-white rounded border border-gray-200 p-2 cursor-pointer hover:border-brand">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <div className="mt-2 space-x-2">
                <Badge variant="outline" className="capitalize bg-gray-100">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="capitalize bg-gray-100">
                  {product.type}
                </Badge>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </h2>
              <p className="text-sm text-green-600 mt-1">
                Free shipping on orders over ₹500
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-20">
                <Select
                  value={quantity.toString()}
                  onValueChange={(value) => setQuantity(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="flex-grow bg-brand hover:bg-brand/90 font-semibold"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleWishlist}
                className={isWishlisted ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900">Delivery</h3>
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-brand" />
                  <span className="text-sm text-gray-600">
                    Free delivery available
                  </span>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter pincode"
                    className="w-full sm:w-40"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePincodeCheck}
                  >
                    Check
                  </Button>
                </div>

                {deliveryInfo ? (
                  <div className="mt-2 text-green-600 text-sm">
                    <p className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Delivery by {deliveryInfo.date}
                    </p>
                    <p className="text-gray-600 mt-1 text-xs">
                      (Typically {deliveryInfo.minDays}-{deliveryInfo.maxDays}{" "}
                      business days)
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    Enter pincode to check delivery timeframes
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900">Key Features</h3>
              <ul className="mt-2 space-y-1 list-disc pl-5 text-gray-600">
                <li>Premium quality materials</li>
                <li>Durable construction for long-term use</li>
                <li>Modern, stylish design</li>
                <li>Easy maintenance</li>
              </ul>
            </div>

            <div className="md:hidden py-4">
              <Button 
                className="w-full bg-brand hover:bg-brand/90 font-semibold"
                onClick={() => window.scrollTo(0, document.body.scrollHeight)}
              >
                See Product Reviews
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">₹{relatedProduct.price.toLocaleString('en-IN')}</span>
                      <Badge variant={relatedProduct.inStock ? "outline" : "destructive"}>
                        {relatedProduct.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <div className="font-medium">Jane Doe</div>
                <div className="text-yellow-400">★★★★★</div>
              </div>
              <p className="text-gray-600">
                This product exceeded my expectations. The quality is excellent
                and it arrived earlier than expected. I would definitely
                recommend it to others.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <div className="font-medium">John Smith</div>
                <div className="text-yellow-400">★★★★☆</div>
              </div>
              <p className="text-gray-600">
                Great product for the price. It does exactly what it's supposed
                to do. The only reason I didn't give it 5 stars is because the
                color was slightly different than expected.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
