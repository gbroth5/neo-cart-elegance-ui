
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/layout/Spinner";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { CheckCircle2 } from "lucide-react";

interface LoginPageProps {
  register?: boolean;
}

export default function LoginPage({ register = false }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }
        
        await registerUser(name, email, password);
      } else {
        await login(email, password);
      }
      
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Demo credential populator
  const populateDemoCredentials = () => {
    setEmail("demo@example.com");
    setPassword("password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] max-w-full glassmorphism">
          <CardHeader>
            <CardTitle className="text-center">
              {isRegister ? "Create an Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-center">
              {isRegister 
                ? "Sign up to start managing your tasks" 
                : "Login to access your task dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    disabled={loading}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  disabled={loading}
                />
              </div>
              
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>
              )}
              
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              
              {!isRegister && (
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="link" 
                    size="sm"
                    onClick={populateDemoCredentials}
                    className="h-auto p-0"
                  >
                    Use demo credentials
                  </Button>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : isRegister ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center w-full">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="h-auto p-0" 
                    onClick={() => setIsRegister(false)}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    className="h-auto p-0" 
                    onClick={() => setIsRegister(true)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Secure Authentication</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
