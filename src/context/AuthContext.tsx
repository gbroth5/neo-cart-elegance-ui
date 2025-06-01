
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User as TaskUser } from "@/types/task";
import { toast } from "sonner";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: TaskUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TaskUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const taskUser: TaskUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email || "",
          avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.email}`,
        };
        setUser(taskUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid credentials";
      toast.error("Login failed: " + errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // For demo purposes, we don't update the user profile with the name
      // In a real app, you would use updateProfile to set displayName
      toast.success("Registration successful!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      toast.error("Registration failed: " + errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      toast.error("Logout failed: " + errorMessage);
    }
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
