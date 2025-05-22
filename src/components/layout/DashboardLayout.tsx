
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, CheckSquare, Home, LogOut, Menu, Settings, Trello, User } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const firstInitial = user?.name?.charAt(0) || "U";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Kanban Board", href: "/kanban", icon: Trello },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex animated-bg">
      {/* Sidebar */}
      <Collapsible
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        className="h-screen bg-background/90 border-r border-border relative"
      >
        <div 
          className={cn(
            "transition-all duration-300 h-full flex flex-col",
            isSidebarOpen ? "w-64" : "w-[70px]"
          )}
        >
          {/* Logo */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            {isSidebarOpen ? (
              <Link to="/dashboard" className="font-semibold text-xl">TaskFlow</Link>
            ) : (
              <div className="w-full flex justify-center">
                <span className="text-xl font-bold">TF</span>
              </div>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Menu className="h-5 w-5" />
              </Button>
            </CollapsibleTrigger>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors relative group animate-hover",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-secondary text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <CollapsibleContent>
                      <span className="ml-3">{item.name}</span>
                    </CollapsibleContent>
                    
                    {!isSidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md shadow-md invisible opacity-0 translate-x-1 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        {item.name}
                      </div>
                    )}
                    
                    {isActive && isSidebarOpen && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute right-0 top-0 h-full w-1 bg-primary rounded-l-md"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* User Info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                <AvatarFallback>{firstInitial}</AvatarFallback>
              </Avatar>
              <CollapsibleContent>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </CollapsibleContent>
            </div>
            
            <CollapsibleContent>
              <div className="mt-3 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        </div>
      </Collapsible>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col max-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/90 backdrop-blur-sm flex items-center px-4">
          <div className="flex-1">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
