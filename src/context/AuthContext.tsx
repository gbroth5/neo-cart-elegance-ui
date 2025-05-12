
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/task";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("taskUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // Mock a loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (email === "demo@example.com" && password === "password") {
      const user: User = {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        avatar: "https://i.pravatar.cc/150?u=demo@example.com",
      };
      
      setUser(user);
      localStorage.setItem("taskUser", JSON.stringify(user));
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Mock a loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration
    const user: User = {
      id: "1",
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    };
    
    setUser(user);
    localStorage.setItem("taskUser", JSON.stringify(user));
    toast.success("Registration successful!");
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("taskUser");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
