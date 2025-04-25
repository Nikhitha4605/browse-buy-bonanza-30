
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl font-extrabold text-purple-700 opacity-20">404</div>
          <h1 className="text-4xl font-bold text-gray-900 -mt-16 mb-4">Page not found</h1>
        </div>
        
        <p className="text-xl text-gray-600 mb-8">
          We couldn't find the page you're looking for. The link might be incorrect or the page may have been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-purple-600 hover:bg-purple-700" 
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/products")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse Products
          </Button>
        </div>
        
        <p className="mt-8 text-gray-500 text-sm">
          Need assistance? <a href="/contact" className="text-purple-600 hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
