
import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Navbar } from "@/components/layout/Navbar";
import { products, Product, CartItem } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Index() {
  // Load cart items from localStorage if available
  const loadCartItems = (): CartItem[] => {
    const savedCart = localStorage.getItem('neocart-items');
    return savedCart ? JSON.parse(savedCart) : [];
  };
  
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('neocart-items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      // Check if product is already in cart
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If it exists, increment quantity
        const newCart = [...prev];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        toast.success(`Added another ${product.name} to your cart!`);
        return newCart;
      } else {
        // If not, add new item with quantity 1
        toast.success(`${product.name} added to your cart!`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar cartItems={cartItems} />
      
      <main className="container mx-auto px-4 pt-32 pb-16 md:px-6">
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Elevate Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Discover premium tech and fashion products curated for the modern lifestyle.
          </p>
        </section>

        <section className="mb-20">
          <div className="flex justify-center mb-10">
            <Tabs defaultValue="all" className="w-full max-w-3xl">
              <TabsList className="w-full flex justify-center gap-2 bg-secondary p-1 h-auto">
                <TabsTrigger 
                  value="all" 
                  className="flex-1 py-3 data-[state=active]:bg-background"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Products
                </TabsTrigger>
                <TabsTrigger 
                  value="tech" 
                  className="flex-1 py-3 data-[state=active]:bg-background"
                  onClick={() => setSelectedCategory("tech")}
                >
                  Tech
                </TabsTrigger>
                <TabsTrigger 
                  value="fashion" 
                  className="flex-1 py-3 data-[state=active]:bg-background"
                  onClick={() => setSelectedCategory("fashion")}
                >
                  Fashion
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
              </TabsContent>
              <TabsContent value="tech" className="mt-6">
                <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
              </TabsContent>
              <TabsContent value="fashion" className="mt-6">
                <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="glassmorphism py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NeoCart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
