import React from "react";
import { Menu, Search, User } from "lucide-react";
export const Navigation = () => {
  return <nav className="w-full bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 md:hidden" />
          <h1 className="text-xl font-bold">CampusSwap</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Browse
          </a>
          <a href="#" className="hover:text-blue-600">
            How It Works
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5" />
          <User className="h-5 w-5" />
        </div>
      </div>
    </nav>;
};