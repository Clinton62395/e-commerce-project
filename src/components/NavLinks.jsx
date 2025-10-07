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
} from "lucide-react";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const defaultLinks = [
  { name: "Home", icon: <House size={15} />, link: "/" },
  { name: "Deals", icon: <LogIn size={15} />, link: "/deals" },
  { name: "New Products", icon: <Sprout size={15} />, link: "/new-Products" },
  { name: "Packages", icon: <Box size={15} />, link: "/packages" },
  { name: "Page", icon: <SquareArrowUpRight size={15} />, link: "/page" },
  { name: "Sign In", icon: <LogIn size={15} />, link: "/login" },
  {
    name: "Sign Up",
    icon: <SquareArrowUpRight size={15} />,
    link: "/register",
  },
];

export const shopLinks = [
  { name: "Home", icon: <House size={15} />, link: "/" },
  { name: "Shop", icon: <LogIn size={15} />, link: "/shop" },
  { name: "products", icon: <ShoppingBasket size={15} />, link: "/products" },
  { name: "Page", icon: <Target size={15} />, link: "/shop-page" },
];
export const NavLinks = ({ logo = "FASCO", pages = defaultLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/";

  return (
    <div>
      {" "}
      <div
        className={`mb-10flex items-center justify-center gap-4 p-4 relative  ${
          isAuthPage
            ? "border-green-500 text-white font-bold"
            : "font-semibold text-gray-700"
        }`}
      >
        <button
          className="md:hidden absolute left-4 z-20 bg-white p-2 rounded-md shadow-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isMenuOpen && (
          <div className=" ms-10 md:mx-auto text-center w-full bg-white shadow-md flex flex-wrap space-y-2 items-center gap-2 md:gap-4 p-2 md:p-4 md:hidden z-10">
            {pages.map((page, index) => {
              const isActive = location.pathname === page.link;
              return (
                <div
                  key={index}
                  className=" flex items-center  md:px-4 border rounded-xl p-2 transition-all duration-200 hover:bg-gray-300 shadow-md hover:shadow-lg "
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

        <div className="hidden  md:flex items-center justify-between mx-10">
          <Link to="/" className="text-3xl font-bold leading-loose text-black ">
            FASCO
          </Link>

          <div className="flex gap-10 me-5">
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
    </div>
  );
};
