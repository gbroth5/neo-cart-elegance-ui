
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartIconProps {
  itemCount: number;
}

export function CartIcon({ itemCount }: CartIconProps) {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative rounded-full transition-all duration-300 ${
        isHovering ? "bg-primary/10" : ""
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate("/cart")}
    >
      <ShoppingCart className={`h-5 w-5 transition-colors duration-300 ${isHovering ? "text-primary" : ""}`} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
