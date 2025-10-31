import {
  // LayoutDashboard,
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import React, { useState } from "react";
import { Orders } from "./Orders";
import { Revenus } from "./Revenus";
import { Categories } from "./Categories";

import { DashboardProducts } from "./Products";
import { AdminDashboard } from "./adminDahboard";
import { Setting } from "./Setting";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const style = {
    width: "48px",
    transition: "width 0.3s ease",
    overflow: "hidden",
    background: "#333 min-h-screen",
    color: "#fff",
    height: "100vh",
    padding: isOpen ? "10px" : "0px",
    position: "sticky top-0 left-0",
  };

  return (
    <div className={style}>
      <div className="p-6 flex items-center justify-between border-b ">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Package className="text-white" size={20} />
          </div>
          {isOpen && (
            <h1 className="text-xl font-bold text-gray-800 ml-3">
              FashionAdmin
            </h1>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            {
              icon: LayoutDashboard,
              label: "Dashbord",
              path: "/admin-dashboard",
            },
            { icon: ShoppingCart, label: "Commandes", path: "orders" },
            { icon: Package, label: "Produits", path: "products" },
            {
              icon: CurrencyExchangeSharpIcon,
              label: "Revenu",
              path: "revenus",
            },
            {
              icon: CategorySharpIcon,
              label: "Categories",
              path: "categories",
            },
            { icon: Settings, label: "Settings", path: "settings" },
          ].map((item, idx) => (
            <div key={idx}>
              <Link
                to={item.path}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  currentPath === item.path ||
                  currentPath.startsWith(item.path) === item.path
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} />
                {isOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};
