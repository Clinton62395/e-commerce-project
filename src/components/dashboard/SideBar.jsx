import { LayoutDashboard } from "lucide-react";
import React, { useState } from "react";
import { Orders } from "./Orders";
import { Analytics } from "./Analytics";
import {
  BarChart3,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { DashboardProducts } from "./Products";
import { Customers } from "./Customers";

export const Sidebar = ({ sidebarOpen: tabOpen }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("AdminDashboard");

  return (
    <div
      className={`bg-white shadow-lg min-h-screen sticky top-0 flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-6 flex items-center justify-between border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Package className="text-white" size={20} />
          </div>
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800 ml-3">
              FashionAdmin
            </h1>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {activeTab === "AdminDashboard" && "Tableau de Bord"}
          {activeTab === "products" && "Gestion des Produits"}
          {activeTab === "orders" && "Commandes"}
          {activeTab === "customers" && "Clients"}
          {activeTab === "analytics" && "Analytics"}
          {activeTab === "settings" && "Paramètres"}
        </h2>
        <ul className="space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
            { icon: Package, label: "Produits", id: "products" },
            { icon: ShoppingCart, label: "Commandes", id: "orders" },
            { icon: Users, label: "Clients", id: "customers" },
            { icon: BarChart3, label: "Analytics", id: "analytics" },
            { icon: Settings, label: "Paramètres", id: "settings" },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
