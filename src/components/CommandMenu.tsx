
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Tag, Home, Mic } from "lucide-react";
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/mockData";
import { useVoiceSearch } from "@/hooks/use-voice-search";
import { useCommandShortcut } from "@/hooks/use-command-shortcut";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isListening, initializeVoiceSearch, startVoiceSearch } = useVoiceSearch();

  const toggleOpen = useCallback(() => setOpen(prev => !prev), []);
  useCommandShortcut(toggleOpen);

  useEffect(() => {
    initializeVoiceSearch(setSearchTerm);
  }, []);

  const handleProductSearch = (searchQuery: string) => {
    navigate(`/products?search=${searchQuery}`);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm text-muted-foreground shadow-sm hover:bg-accent transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search products...</span>
        <kbd className="hidden pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b">
          <CommandInput 
            placeholder="Type to search..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={startVoiceSearch}
            className="mr-2"
            disabled={isListening}
            aria-label="Search with voice"
          >
            <Mic className={`h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
          </Button>
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => { navigate("/"); setOpen(false); }}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            
            <CommandItem onSelect={() => { navigate("/products"); setOpen(false); }}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>All Products</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Categories">
            {categories.map((category) => (
              <CommandItem
                key={category}
                onSelect={() => {
                  navigate(`/products?category=${category}`);
                  setOpen(false);
                }}
              >
                <Tag className="mr-2 h-4 w-4" />
                <span className="capitalize">{category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Products">
            {products
              .filter(product => 
                searchTerm ? 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) : 
                true
              )
              .slice(0, 5)
              .map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => {
                    navigate(`/product/${product.id}`);
                    setOpen(false);
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>{product.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </CommandItem>
              ))}
              
              {searchTerm && (
                <CommandItem onSelect={() => handleProductSearch(searchTerm)}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search all products for "{searchTerm}"</span>
                </CommandItem>
              )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
