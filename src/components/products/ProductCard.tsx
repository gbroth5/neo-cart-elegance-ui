
import { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Scale3d } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isHovered?: boolean;
}

export function ProductCard({ product, onAddToCart, isHovered = false }: ProductCardProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
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
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on mouse position
    // The closer to the edge, the more rotation
    const rotateY = ((x - centerX) / centerX) * 5; // max 5 degrees
    const rotateX = ((centerY - y) / centerY) * 5; // max 5 degrees
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Card
      ref={cardRef}
      className={`overflow-hidden card-hover h-full flex flex-col glassmorphism transition-all duration-300 ${
        isHovered ? "shadow-xl" : "shadow-md"
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.3s ease',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          style={{
            transform: isHovered ? `translateZ(20px)` : 'translateZ(0)',
            transition: 'transform 0.5s ease'
          }}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.5s ease, opacity 0.3s ease'
          }}
        >
          <p className="text-white text-sm truncate">{product.description}</p>
        </div>
        {isHovered && (
          <div className="absolute top-2 right-2 opacity-20">
            <Scale3d className="h-6 w-6 text-white animate-pulse" />
          </div>
        )}
      </div>
      <CardContent
        className="pt-4 flex-grow"
        style={{
          transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
          transition: 'transform 0.5s ease'
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-medium truncate transition-all duration-300 ${isHovered ? "text-primary" : ""}`}>
            {product.name}
          </h3>
          <span 
            className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full"
            style={{
              transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
              transition: 'transform 0.5s ease'
            }}
          >
            {product.category}
          </span>
        </div>
        <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter
        className="pt-0 pb-4"
        style={{
          transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
          transition: 'transform 0.5s ease'
        }}
      >
        <Button 
          className={`w-full gap-2 transition-all duration-300 ${
            isAddedToCart 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-primary/90 hover:bg-primary"
          }`}
          onClick={handleAddToCart}
          style={{
            transform: isHovered ? 'translateZ(5px) scale(1.05)' : 'translateZ(0)',
            transition: 'transform 0.3s ease'
          }}
        >
          <ShoppingCart className={`h-4 w-4 ${isAddedToCart ? "animate-bounce" : ""}`} />
          {isAddedToCart ? "Added!" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
