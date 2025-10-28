import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ShopingCart } from "../pages/shoping.Cart";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLinks, shopLinks } from "../components/NavLinks";
import { UseCart } from "../services/provider";

export const ShopLayout = () => {
  const [showPanel, setShowPanel] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const { addProduct, handleDerease, handleIncrease, cart } = UseCart();

  const handleDismiss = () => setShowPanel(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/*  Navigation */}
      <nav className="sticky top-0 z-50 ">
        <NavLinks logo="FASCO"  pages={shopLinks} />
      </nav>

      <div
        className={`fixed z-50 ${
          isMobile
            ? "right-4 top-16"
            : isTablet
            ? "right-8 top-20"
            : "right-5 top-2"
        }`}
      >
        <button
          onClick={() => setShowPanel(true)}
          className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Badge
            badgeContent={cart.length}
            color="primary"
            overlap="circular"
            showZero
          >
            <ShoppingCartIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" />
          </Badge>
        </button>
        <ShopingCart open={showPanel} onClose={handleDismiss} />
      </div>

      {/*  Contenu principal */}
      <main className="flex-grow pt-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};
