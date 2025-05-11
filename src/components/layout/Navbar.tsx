import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartIcon } from "../cart/CartIcon";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, User, X } from "lucide-react";
import { CartItem } from "@/lib/data";

interface NavbarProps {
  cartItems: CartItem[];
}

export function Navbar({ cartItems }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "glassmorphism py-3" : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NeoCart
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CartIcon itemCount={cartItemCount} />
          
          <div className="hidden md:block">
            <Button variant="outline" onClick={() => navigate('/login')}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
          
          {/* Mobile Menu Trigger */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glassmorphism animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const techTab = document.querySelector('[value="tech"]') as HTMLElement;
                  if (techTab) techTab.click();
                }, 100);
              }}
            >
              Tech
            </Link>
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  const fashionTab = document.querySelector('[value="fashion"]') as HTMLElement;
                  if (fashionTab) fashionTab.click();
                }, 100);
              }}
            >
              Fashion
            </Link>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => {
                navigate('/login');
                setIsMobileMenuOpen(false);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
