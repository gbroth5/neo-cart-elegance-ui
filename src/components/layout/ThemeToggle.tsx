
import { Moon, Sun, Rotate3d } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);
  
  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
    }, 200);
  };
  
  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => setIsRotating(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isRotating]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full w-9 h-9 relative overflow-hidden transition-all duration-500 ${
        isRotating ? "animate-[spin_0.7s_ease-in-out]" : ""
      }`}
    >
      <div className={`absolute inset-0 transition-transform duration-700 ${isRotating ? "scale-150 opacity-30" : ""}`}>
        <Rotate3d className="h-5 w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-30" />
      </div>
      <Sun 
        className={`h-5 w-5 absolute transition-all duration-500 transform-gpu ${
          theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100 translate-z-0' 
            : 'rotate-90 scale-0 opacity-0 -translate-z-10'
        }`} 
      />
      <Moon 
        className={`h-5 w-5 absolute transition-all duration-500 transform-gpu ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100 translate-z-0' 
            : '-rotate-90 scale-0 opacity-0 -translate-z-10'
        }`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
