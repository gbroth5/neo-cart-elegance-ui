
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isHovered?: boolean;
}

export function ProductCard({ product, onAddToCart, isHovered = false }: ProductCardProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAddedToCart(true);
    
    // Animation for add to cart feedback
    setTimeout(() => setIsAddedToCart(false), 1000);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card
      className={`overflow-hidden card-hover h-full flex flex-col glassmorphism transition-all duration-300 ${
        isHovered ? "shadow-xl" : "shadow-md"
      }`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white text-sm truncate">{product.description}</p>
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className={`font-medium text-base md:text-lg line-clamp-2 min-h-[2.5rem] transition-all duration-300 ${isHovered ? "text-primary" : ""}`}>
            {product.name}
          </h3>
          <span className="text-xs whitespace-nowrap ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-base">
            <span className="text-sm text-muted-foreground mr-1">Price:</span>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button 
          className={`w-full gap-2 transition-all duration-300 ${
            isAddedToCart 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-primary/90 hover:bg-primary"
          }`}
          onClick={handleAddToCart}
        >
          <ShoppingCart className={`h-4 w-4 ${isAddedToCart ? "animate-bounce" : ""}`} />
          {isAddedToCart ? "Added!" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
