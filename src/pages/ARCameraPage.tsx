
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/layout/Layout";
import { toast } from "@/components/ui/sonner";
import { Camera, X, Scan, Check } from "lucide-react";
import { products } from "@/data/mockData";
import { Link } from 'react-router-dom';

const ARCameraPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [recognizedProduct, setRecognizedProduct] = useState<any>(null);
  const [isCameraSupported, setIsCameraSupported] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  const startCamera = async () => {
    try {
      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setCameraPermission(true);
        toast.success("Camera activated successfully");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Could not access camera. Please check permissions.");
      setCameraPermission(false);
      setIsCameraSupported(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      setScanning(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        simulateObjectRecognition();
      }
    }
  };

  const startScanning = () => {
    setScanning(true);
    toast.info("Scanning for objects...");
    setTimeout(captureImage, 1500);
  };

  const simulateObjectRecognition = () => {
    // In a real app, this would use computer vision/ML to recognize objects
    // For demo, we'll just pick a random product
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setRecognizedProduct({
        ...randomProduct,
        confidence: Math.floor(Math.random() * 30) + 70 // 70-99% confidence
      });
      setScanning(false);
      toast.success("Object recognized!");
    }, 2000);
  };

  const resetRecognition = () => {
    setRecognizedProduct(null);
  };

  // Clean up camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">AR Product Visualization</h1>
          
          {!isCameraSupported && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Camera not supported</AlertTitle>
              <AlertDescription>
                Your device or browser doesn't support camera access. Please try using a different browser or device.
              </AlertDescription>
            </Alert>
          )}
          
          {cameraPermission === false && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Camera permission denied</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature. You may need to update your browser settings.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative aspect-[4/3] bg-black">
              {/* Camera Feed */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              
              {/* Canvas for image processing */}
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Scanning overlay */}
              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 border-2 border-white rounded-lg opacity-70"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="animate-pulse h-0.5 bg-brand rounded-full w-full absolute top-1/2"></div>
                      <div className="animate-pulse w-0.5 bg-brand rounded-full h-full absolute left-1/2"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Recognized product overlay */}
              {recognizedProduct && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" onClick={resetRecognition} className="bg-white/20 text-white hover:bg-white/30">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Card className="w-[90%] max-w-md">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded overflow-hidden">
                          <img 
                            src={recognizedProduct.imageUrl} 
                            alt={recognizedProduct.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{recognizedProduct.name}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">{recognizedProduct.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-semibold">₹{recognizedProduct.price.toLocaleString('en-IN')}</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              {recognizedProduct.confidence}% match
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <Button className="flex-1" asChild>
                          <Link to={`/product/${recognizedProduct.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
            
            <div className="p-4">
              {!cameraActive ? (
                <Button onClick={startCamera} className="w-full gap-2 bg-brand hover:bg-brand/90">
                  <Camera className="h-5 w-5" />
                  Start AR Camera
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={stopCamera} className="flex-1 gap-2">
                    <X className="h-4 w-4" />
                    Close Camera
                  </Button>
                  <Button 
                    onClick={startScanning} 
                    disabled={scanning}
                    className="flex-1 gap-2 bg-brand hover:bg-brand/90"
                  >
                    {scanning ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Scan className="h-4 w-4" />
                        {recognizedProduct ? "Scan Again" : "Scan Object"}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-lg mb-4">How to use AR Product Visualization</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Start Camera</h3>
                  <p className="text-gray-600 text-sm">Click the Start AR Camera button to activate your device camera.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Scan className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Scan Product</h3>
                  <p className="text-gray-600 text-sm">Point camera at an object and tap Scan to recognize it.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-brand/10 rounded-full p-2 text-brand">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">View Results</h3>
                  <p className="text-gray-600 text-sm">See product matches from our catalog and click to view details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ARCameraPage;
