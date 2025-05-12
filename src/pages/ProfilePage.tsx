
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialCart } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  
  // Order history mock data
  const [orders, setOrders] = useState([]);

  // Fetch user data with loading simulation
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // Simulate API fetch delay
      setTimeout(() => {
        setUser({
          name: "John Doe",
          email: "john.doe@example.com",
          avatar: "",
        });
        
        setOrders([
          {
            id: "ORD-12345",
            date: "2025-05-01",
            status: "Delivered",
            total: 299.99,
          },
          {
            id: "ORD-12344",
            date: "2025-04-15",
            status: "Shipped",
            total: 599.98,
          },
        ]);
        
        setIsLoading(false);
      }, 1000);
    };
    
    fetchUserData();
  }, []);

  // Handle profile update
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API save delay
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
    }, 800);
  };

  // Handle logout
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <Navbar cartItems={initialCart} />

      <main className="container mx-auto px-4 pt-32 pb-16 md:px-6">
        <h1 className="text-3xl font-bold mb-8 animate-fade-in">My Account</h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading your profile...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-1">
              <Card className="p-6 glassmorphism transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4 transition-transform duration-300 hover:scale-105">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-xl">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-colors hover:bg-primary/5"
                    onClick={() => navigate("/orders")}
                  >
                    Order History
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-colors hover:bg-primary/5"
                    onClick={() => navigate("/wishlist")}
                  >
                    Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start transition-colors hover:bg-primary/5"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full transition-all duration-300 hover:bg-destructive/90"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-6 mb-8 glassmorphism transition-all duration-300 hover:shadow-lg">
                <h2 className="font-semibold text-xl mb-4">Profile Information</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="transition-all duration-300"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </Card>

              <Card className="p-6 glassmorphism transition-all duration-300 hover:shadow-lg">
                <h2 className="font-semibold text-xl mb-4">Recent Orders</h2>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground">You have no orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center p-4 border border-border rounded-md transition-all duration-300 hover:bg-muted/20 cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
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
