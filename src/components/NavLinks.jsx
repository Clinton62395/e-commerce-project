import {
  Box,
  House,
  LogIn,
  ShoppingBasket,
  Sprout,
  SquareArrowUpRight,
  Target,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const defaultLinks = [
  { name: "Home", link: "/" },
  { name: "Deals", link: "/deals" },
  { name: "New Products", link: "/new-Products" },
  { name: "Packages", link: "/packages" },
  { name: "Page", link: "/page" },
  { name: "Sign In", link: "/login" },
  { name: "Sign Up", link: "/register" },
];

export const shopLinks = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "products", link: "/products" },
  // { name: <ShoppingBag size={20} />, link: "/shoping-cart" },
];
export const NavLinks = ({ logo = "FASCO", pages = defaultLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/";

  return (
    <div
      className={`mb-10 sticky top-3 md:top-0 z-50  bg-white/70 shadow-sm py-3 backdrop-blur  ${
        isAuthPage
          ? "border-green-500 text-white font-bold"
          : "font-semibold text-gray-700"
      }`}
    >
      <button
        className=" md:hidden absolute left-4 -top-6 z-20 bg-white/90 backdrop-blur p-2 rounded-md shadow-sm text-gray-700 hover:bg-gray-100"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isMenuOpen && (
        <div className="pt-5 text-center w-full max-w-full mx-auto bg-white shadow-md  flex flex-wrap justify-center min-w-0  items-center gap-2 md:gap-4 p-2  md:hidden z-10">
          {pages.map((page, index) => {
            const isActive = location.pathname === page.link;
            return (
              <div
                key={index}
                className=" flex items-center min-w-0 md:px-4 border rounded-xl p-2 transition-all duration-200 hover:bg-gray-300 shadow-md hover:shadow-lg "
              >
                <Link
                  to={page.link}
                  className={`flex items-center gap-2 md:gap-4 duration-200 transition-all text-xs md:text-[20px] hover:font-semibold ${
                    isActive
                      ? "text-green-500 font-bold border-b-2 border-green-500"
                      : "text-gray-700"
                  }`}
                >
                  {page.icon}
                  {page.name}
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="hidden    md:flex items-center justify-center mx-10">
        <Link
          to="/"
          className="flex items-start justify-start text-3xl font-bold leading-loose text-black "
        >
          FASCO
        </Link>

        <div className="flex justify-center  gap-10 me-5 flex-1">
          {pages.map((page, index) => {
            const isActive = location.pathname === page.link;
            const isSignUp = page.link === "/register";
            return (
              <Link
                key={index}
                to={page.link}
                className={`flex items-center gap-2 text-[14px] transition-all duration-500 ${
                  isSignUp
                    ? "bg-black/80 text-white px-4 py-2 rounded-full shadow-md hover:bg-black"
                    : isActive
                    ? "text-green-500 font-bold border-b-2 border-green-500"
                    : "text-gray-700"
                }`}
              >
                {page.icon}
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
