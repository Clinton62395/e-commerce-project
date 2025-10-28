import React, { useState } from "react";
import { Bell, Menu, Search, User, X } from "lucide-react";

export const Header = ({sidebarOpen: istabOpen}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 mr-4"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
         
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
