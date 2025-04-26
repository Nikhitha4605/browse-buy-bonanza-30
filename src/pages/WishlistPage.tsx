
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { Product, WishlistItem } from "@/types/product";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    };

    loadWishlist();
    
    // Add event listener to refresh wishlist when storage changes
    window.addEventListener("storage", loadWishlist);
    
    return () => {
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.info("Item removed from wishlist");
  };

  const moveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success("Item moved to cart");
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.setItem("wishlist", "[]");
    toast.info("Wishlist cleared");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">My Wishlist</h1>
            {wishlistItems.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Add items you love to your wishlist. Review them anytime and easily move them to your cart.
              </p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {wishlistItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0">
                              <img className="h-16 w-16 object-cover rounded" src={item.imageUrl} alt={item.name} />
                            </div>
                            <div className="ml-4">
                              <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-900 hover:underline">
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-500 mt-1 capitalize">
                                {item.category} · {item.color}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString('en-IN')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={!item.inStock}
                              onClick={() => moveToCart(item)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" /> Move to Cart
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
