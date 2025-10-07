import React from "react";
import { Outlet } from "react-router-dom";
import { NavLinks, shopLinks } from "../components/NavLinks";

export const ShopLayout = () => {
  return (
    <div>
      <NavLinks logo="FASCO" pages={shopLinks} />

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};
