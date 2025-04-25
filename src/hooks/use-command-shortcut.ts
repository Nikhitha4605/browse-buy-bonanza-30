
import { useEffect } from "react";

export const useCommandShortcut = (callback: () => void) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Support both Cmd+K (Mac) and Ctrl+K (Windows/Linux)
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
      
      // Support Escape key to close modal
      if (e.key === "Escape") {
        // We don't prevent default since the Escape key 
        // is handled naturally by modal/dialog components
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [callback]);
};
