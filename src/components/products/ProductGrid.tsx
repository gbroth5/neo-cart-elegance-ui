
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product, CartItem } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-fadeIn transition-all duration-500 ease-out" 
          style={{ 
            animationDelay: `${index * 100}ms`,
            transform: hoveredProductId === product.id ? 'translateY(-8px)' : 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={() => setHoveredProductId(product.id)}
          onMouseLeave={() => setHoveredProductId(null)}
        >
          <ProductCard 
            product={product} 
            onAddToCart={onAddToCart} 
            isHovered={hoveredProductId === product.id}
          />
        </div>
      ))}
    </div>
  );
}
