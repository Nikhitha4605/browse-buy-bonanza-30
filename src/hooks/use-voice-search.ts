
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useVoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const initializeVoiceSearch = (onTranscript: (text: string) => void) => {
    const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      console.log("Speech recognition not supported in this browser");
      return;
    }
    
    try {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
        toast({
          title: "Voice search completed",
          description: `Searching for "${transcript}"`,
        });
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice search error",
          description: "There was an error. Please try again.",
          variant: "destructive",
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
    }
  };

  const startVoiceSearch = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice search not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Say what you're looking for.",
      });
      recognitionRef.current.start();
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Voice search error",
        description: "There was an error starting the voice recognition. Please try again.",
        variant: "destructive",
      });
      console.error("Voice recognition error:", error);
    }
  };

  return {
    isListening,
    initializeVoiceSearch,
    startVoiceSearch
  };
};
