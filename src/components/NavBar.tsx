import React from 'react';
import { 
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT from localStorage
    localStorage.removeItem("userEmail"); // Clear user email from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="w-full bg-black text-white h-16 px-5 flex items-center justify-between">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/Logo.png" 
          alt="Jorie AI" 
          className="h-8"
          onClick={() => navigate("/")}
        />
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-gray-600 hover:bg-gray-800 p-0">
              <User className="h-6 w-6 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 p-2">
              <div className="rounded-full h-8 w-8 bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium">{localStorage.getItem("userEmail")?.split("@")[0] || "No Email Found"}</p>
                <p className="text-xs text-gray-500">{localStorage.getItem("userEmail")}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4"/>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-sm text-gray-300">{localStorage.getItem("userEmail")?.split("@")[0] || "No Email Found"}</span>
      </div>
    </nav>
  );
}
