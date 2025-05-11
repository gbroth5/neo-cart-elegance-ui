
import { ShoppingCart, Axis3d } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartIconProps {
  itemCount: number;
}

export function CartIcon({ itemCount }: CartIconProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  
  // Handle cart animation when items are added
  useEffect(() => {
    if (itemCount > 0) {
      setIsAdded(true);
      const timer = setTimeout(() => setIsAdded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative rounded-full transition-all duration-300 transform-gpu ${
        isHovering ? "bg-primary/10" : ""
      } ${isAdded ? "scale-110" : "scale-100"}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate("/cart")}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <ShoppingCart 
        className={`h-5 w-5 transition-all duration-300 
          ${isHovering ? "text-primary" : ""} 
          ${isAdded ? "animate-[bounce_0.5s_ease-in-out]" : ""}`} 
        style={{
          transform: isHovering ? "translateZ(5px)" : "translateZ(0px)",
          transition: "transform 0.3s ease-out"
        }}
      />
      {itemCount > 0 && (
        <span className={`absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${
          isAdded ? "animate-[ping_0.3s_ease-out]" : "animate-pulse"
        }`}>
          {itemCount}
        </span>
      )}
      {isHovering && (
        <Axis3d 
          className="absolute h-10 w-10 text-primary/10 animate-spin-slow" 
          style={{
            animation: "spin 8s linear infinite",
            opacity: 0.2
          }}
        />
      )}
    </Button>
  );
}
