import React, { useState } from "react";
import {
  BarChart3,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import { Link, useLocation } from "react-router-dom";
export const Sidebar = ({ isOpen, onClickLogout }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin-dashboard" },
    { icon: ShoppingCart, label: "Commandes", path: "orders" },
    { icon: Package, label: "Produits", path: "products" },
    { icon: CurrencyExchangeSharpIcon, label: "Revenu", path: "revenus" },
    { icon: CategorySharpIcon, label: "Catégories", path: "categories" },
    { icon: Settings, label: "Paramètres", path: "settings" },
  ];

  return (
    <div className="absolute top-0 bg-white -z-50 shadow-md py-4 text-sm md:text-lg  min-h-screen">
      {isOpen && (
        <div className="space-y-3">
          <div className=" w-full  gap-2 flex-col">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg z-0 flex items-center justify-center">
                  <Package className="text-white" />
                </div>
                <span className=" text-sm md:text-xl font-bold text-gray-800 ">
                  Admin
                </span>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, idx) => {
              const isActive =
                item.path === "/admin-dashboard"
                  ? currentPath === "/admin-dashboard"
                  : currentPath.startsWith(`/admin-dashboard/${item.path}`);
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={20} />

                    <span className="ml-2 font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}

            {/* Logout Button */}
            <div className=" p-3 cursor-pointer text-gray-600 hover:bg-gray-50 rounded-lg">
              <button
                onClick={onClickLogout}
                className="font-medium text-sm flex items-center gap-4"
              >
                <LogoutIcon fontSize="small" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
