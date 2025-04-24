
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Tag, Home } from "lucide-react";
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { products, categories } from "@/data/mockData";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Register keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            
            <CommandItem
              onSelect={() => {
                navigate("/products");
                setOpen(false);
              }}
            >
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
            {products.map((product) => (
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
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
