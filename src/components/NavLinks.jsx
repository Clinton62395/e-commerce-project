import { Menu, X } from "lucide-react";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SupervisorAccountSharp } from "@mui/icons-material";

export const defaultLinks = [
  { name: "Home", link: "/" },
  { name: "New Products", link: "/new-Products" },
  { name: "Sign In", link: "/login" },
  { name: "Sign Up", link: "/register" },
];

export const shopLinks = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "products", link: "/product-details" },
];
export const NavLinks = ({ logo = "FASCO", pages = defaultLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/";

  return (
    <nav
      className={`  w-full bg-white/70 backdrop-blur shadow-sm py-3 transition-all duration-300 ${
        isAuthPage ? "text-white font-bold" : "font-semibold text-gray-700"
      }`}
    >
      {/* Container */}
      <div className=" max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="hidden md:flex text-2xl sm:text-3xl font-bold tracking-wide text-black "
        >
          {logo}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center  gap-8 w-full">
          {pages.map((page, index) => {
            const isActive = location.pathname === page.link;
            const isSignUp = page.link === "/register";
            return (
              <div className="flex justify-center items-center ">
                <Link
                  key={index}
                  to={page.link}
                  className={`transition-all duration-300 ${
                    isSignUp
                      ? "bg-black/80 text-white px-4 py-2 rounded-full shadow-md hover:bg-black"
                      : isActive
                      ? "text-green-500 font-bold border-b-2 border-green-500 pb-1"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                >
                  {page.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/admin-up" className="text-black flex gap-2 items-center">
          <SupervisorAccountSharp /> Admin
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3 py-4 bg-white/95 shadow-md rounded-b-lg">
          {pages.map((page, index) => {
            const isActive = location.pathname === page.link;
            return (
              <Link
                key={index}
                to={page.link}
                className={`w-11/12 text-center py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-green-100 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)} // ferme le menu au clic
              >
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
