
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, ShoppingBag } from "lucide-react";
import { useVoiceSearch } from "@/hooks/use-voice-search";
import { products } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VoiceAssistantPage = () => {
  const [transcript, setTranscript] = useState("");
  const [matchingProducts, setMatchingProducts] = useState<any[]>([]);
  const { isListening, initializeVoiceSearch, startVoiceSearch } = useVoiceSearch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    initializeVoiceSearch(handleTranscript);
  }, []);

  const handleTranscript = (text: string) => {
    setTranscript(text);
    
    // Simple product matching based on transcript
    const matches = products.filter(product => 
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.category.toLowerCase().includes(text.toLowerCase())
    );
    
    setMatchingProducts(matches.slice(0, 5));
    
    if (matches.length > 0) {
      toast({
        title: "Products found!",
        description: `Found ${matches.length} products matching "${text}"`,
      });
    } else {
      toast({
        title: "No products found",
        description: `No products match "${text}". Try different keywords.`,
        variant: "destructive",
      });
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Voice Shopping Assistant</h1>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg shadow-sm mb-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6 relative">
              {isListening ? (
                <div className="absolute inset-0 rounded-full border-4 border-white animate-pulse"></div>
              ) : null}
              {isListening ? (
                <Mic className="h-12 w-12 text-white animate-pulse" />
              ) : (
                <Mic className="h-12 w-12 text-white" />
              )}
            </div>
            
            <Button
              size="lg"
              onClick={startVoiceSearch}
              disabled={isListening}
              className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-brand hover:bg-brand/90'} text-white px-6 py-6 rounded-lg text-lg mb-4 h-auto`}
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-6 w-6" /> Listening...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-6 w-6" /> Tap to Speak
                </>
              )}
            </Button>
            
            <p className="text-gray-500 mb-4">
              {isListening 
                ? "I'm listening... Speak clearly." 
                : "Try saying something like \"Show me red shirts\" or \"Find coffee tables\""}
            </p>
            
            {transcript && (
              <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-lg">
                <p className="font-medium text-gray-700 mb-1">You said:</p>
                <p className="text-gray-900 italic">"{transcript}"</p>
              </div>
            )}
          </div>
          
          {matchingProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Matching Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {matchingProducts.map(product => (
                  <div 
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="font-medium mb-1">{product.name}</div>
                    <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-purple-700">₹{product.price.toLocaleString('en-IN')}</span>
                      <Button size="sm" variant="outline">
                        <ShoppingBag className="h-4 w-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Voice Commands You Can Try</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Product Search</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>"Show me black shoes"</li>
                <li>"Find kitchen appliances"</li>
                <li>"Search for headphones"</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Shopping Actions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>"Add this to my cart"</li>
                <li>"Show my shopping cart"</li>
                <li>"Check out now"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoiceAssistantPage;
