
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product, CartItem } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
      {products.map((product) => (
        <div key={product.id} className="animate-fadeIn" style={{ 
          animationDelay: `${parseInt(product.id) * 100}ms`
        }}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}
