
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card
      className={`overflow-hidden card-hover h-full flex flex-col glassmorphism ${
        isHovering ? "scale-[1.02]" : "scale-100"
      } transition-all duration-300`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform duration-700 ${
            isHovering ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-end p-4">
          <p className="text-white text-sm truncate">{product.description}</p>
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium truncate">{product.name}</h3>
          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button 
          className="w-full gap-2 bg-primary/90 hover:bg-primary" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
