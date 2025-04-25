
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Camera, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ARCameraPage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [foundProduct, setFoundProduct] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleCamera = () => {
    if (!isScanning) {
      toast({
        title: "Camera activated",
        description: "Scanning for products...",
      });
      setIsScanning(true);
      
      // Simulate finding a product after a delay
      setTimeout(() => {
        setFoundProduct("Modern Coffee Table");
        setIsScanning(false);
        toast({
          title: "Product found!",
          description: "Found: Modern Coffee Table",
        });
      }, 3000);
    } else {
      setIsScanning(false);
    }
  };

  const viewProduct = () => {
    navigate("/product/2"); // Navigate to a specific product
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">AR Camera Experience</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md h-80 bg-gray-800 rounded-lg mb-6 relative overflow-hidden">
              {isScanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="absolute text-white font-medium">Scanning...</span>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                  <Camera className="h-20 w-20 text-gray-400" />
                  <span className="absolute mt-24 text-white">Camera preview</span>
                </div>
              )}
              
              {foundProduct && !isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-lg shadow-lg max-w-xs text-center">
                    <h3 className="font-bold mb-2">Found: {foundProduct}</h3>
                    <p className="text-sm mb-3">This item matches your search criteria.</p>
                    <Button onClick={viewProduct}>View Product</Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4 w-full max-w-md">
              <Button 
                className={`w-full ${isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                onClick={toggleCamera}
              >
                <Camera className="mr-2 h-5 w-5" />
                {isScanning ? 'Stop Scanning' : 'Activate AR Camera'}
              </Button>
              
              <div className="text-gray-600 p-4 bg-gray-50 rounded-lg text-sm">
                <h3 className="font-medium mb-2">How it works:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Point your camera at an object</li>
                  <li>Our AR system will identify similar products</li>
                  <li>View and try on products virtually</li>
                  <li>Save items to your wishlist or cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ARCameraPage;
