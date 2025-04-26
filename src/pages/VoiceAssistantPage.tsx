import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Mic, MicOff, Volume2, MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { products, categories } from "@/data/mockData";

interface VoiceCommandResult {
  type: 'search' | 'navigate' | 'info' | 'unknown';
  data?: string;
  response: string;
}

const VoiceAssistantPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversationHistory, setConversationHistory] = useState<{type: 'user' | 'assistant', text: string}[]>([
    { type: 'assistant', text: 'Hello! I\'m your SnapShop voice assistant. How can I help you today?' }
  ]);
  const [supported, setSupported] = useState(true);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const navigate = useNavigate();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSupported(false);
      toast.error("Voice recognition is not supported in your browser");
      return;
    }
    
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
    
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcriptResult = event.results[0][0].transcript;
      setTranscript(transcriptResult);
      handleUserInput(transcriptResult);
      setIsListening(false);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
      toast.error("Voice recognition error. Please try again.");
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    } else {
      toast.warning("Text-to-speech is not supported in your browser");
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const startListening = () => {
    if (!supported) {
      toast.error("Voice recognition is not supported in your browser");
      return;
    }
    
    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        toast.info("I'm listening...");
      }
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      setIsListening(false);
      toast.error("Could not start voice recognition");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      synthesisRef.current.speak(utterance);
    }
  };

  const handleUserInput = (input: string) => {
    setConversationHistory(prev => [...prev, { type: 'user', text: input }]);
    
    const result = processVoiceCommand(input);
    
    setConversationHistory(prev => [...prev, { type: 'assistant', text: result.response }]);
    
    speak(result.response);
    
    if (result.type === 'navigate' && result.data) {
      setTimeout(() => {
        navigate(result.data as string);
      }, 1500);
    }
    
    if (result.type === 'search' && result.data) {
      setTimeout(() => {
        navigate(`/products?search=${encodeURIComponent(result.data as string)}`);
      }, 1500);
    }
  };

  const processVoiceCommand = (command: string): VoiceCommandResult => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('search for') || lowerCommand.includes('find') || lowerCommand.includes('show me')) {
      const searchTerms = lowerCommand.replace(/search for|find|show me/gi, '').trim();
      return {
        type: 'search',
        data: searchTerms,
        response: `Searching for ${searchTerms}. Here are the results.`
      };
    }
    
    if (lowerCommand.includes('go to') || lowerCommand.includes('open') || lowerCommand.includes('navigate to')) {
      if (lowerCommand.includes('home')) {
        return {
          type: 'navigate',
          data: '/',
          response: 'Taking you to the home page.'
        };
      }
      
      if (lowerCommand.includes('products') || lowerCommand.includes('shop')) {
        return {
          type: 'navigate',
          data: '/products',
          response: 'Opening the products page.'
        };
      }
      
      if (lowerCommand.includes('cart') || lowerCommand.includes('shopping cart')) {
        return {
          type: 'navigate',
          data: '/cart',
          response: 'Opening your shopping cart.'
        };
      }
      
      for (const category of categories) {
        if (lowerCommand.includes(category.toLowerCase())) {
          return {
            type: 'navigate',
            data: `/products?category=${category}`,
            response: `Showing you our ${category} collection.`
          };
        }
      }
      
      const destination = lowerCommand.replace(/go to|open|navigate to/gi, '').trim();
      return {
        type: 'navigate',
        data: `/${destination}`,
        response: `I'll try to take you to ${destination}.`
      };
    }
    
    if (lowerCommand.includes('tell me about') || lowerCommand.includes('what is') || lowerCommand.includes('information on')) {
      const productQuery = lowerCommand.replace(/tell me about|what is|information on/gi, '').trim();
      
      const matchedProduct = products.find(p => 
        p.name.toLowerCase().includes(productQuery) || 
        p.description.toLowerCase().includes(productQuery)
      );
      
      if (matchedProduct) {
        return {
          type: 'info',
          data: matchedProduct.id,
          response: `${matchedProduct.name} is priced at ₹${matchedProduct.price.toLocaleString('en-IN')}. ${matchedProduct.description}`
        };
      }
    }
    
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      return {
        type: 'info',
        response: 'I can help you search for products, navigate to different pages, or provide information about items. Try saying "search for headphones", "go to cart", or "tell me about sneakers".'
      };
    }
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi') || lowerCommand.includes('hey')) {
      return {
        type: 'info',
        response: 'Hello! How can I help you with your shopping today?'
      };
    }
    
    return {
      type: 'unknown',
      response: "I'm not sure what you're asking. Try asking to search for products, navigate to a page, or get information about an item."
    };
  };

  const handleTextSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (transcript.trim()) {
      handleUserInput(transcript);
      setTranscript('');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Voice Shopping Assistant</h1>
          </div>
          
          <Card className="mb-6">
            <div className="p-4 h-[500px] flex flex-col">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
                {conversationHistory.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-brand text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t pt-4">
                <form onSubmit={handleTextSubmit} className="flex gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                      placeholder="Type a message or press the mic to speak..."
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                    />
                    <MessageCircle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <Button 
                    type="button" 
                    variant={isListening ? "destructive" : "default"}
                    size="icon"
                    className={isListening ? "" : "bg-brand hover:bg-brand/90"}
                    onClick={isListening ? stopListening : startListening}
                    disabled={!supported}
                  >
                    {isListening ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <Button type="submit" size="icon" disabled={!transcript.trim()}>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </Card>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-lg mb-4">Things you can ask:</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-800">"Search for wireless headphones"</p>
                  <p className="text-gray-500 text-sm">Find products in our catalog</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-800">"Go to my shopping cart"</p>
                  <p className="text-gray-500 text-sm">Navigate to different pages</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-800">"Tell me about the latest electronics"</p>
                  <p className="text-gray-500 text-sm">Get product information</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-800">The assistant will speak responses to you</p>
                  <p className="text-gray-500 text-sm">Make sure your volume is on</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoiceAssistantPage;
