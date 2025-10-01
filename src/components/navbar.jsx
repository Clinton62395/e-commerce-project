import { Box, House, LogIn, Sprout, SquareArrowUpRight } from "lucide-react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

export const LandingPageNavbar = () => {
  const location = useLocation();

  const pages = [
    { name: "Home", icon: <House />, link: "/" },
    { name: "Deals", icon: <LogIn />, link: "/deals" },
    { name: "New Products", icon: <Sprout />, link: "/new-Products" },
    { name: "Packages", icon: <Box />, link: "/packages" },
    { name: "Page", icon: <SquareArrowUpRight />, link: "/page" },
    { name: "Sign In", icon: <LogIn />, link: "/login" },
    { name: "Sign Up", icon: <SquareArrowUpRight />, link: "/register" },
  ];
  const isAuthPage = location.pathname === "/";

  return (
    <div
      className={`flex items-center justify-center gap-4 p-4 ${
        isAuthPage
          ? " border-green-500 text-white font-bold "
          : "font-semibold text-gray-700"
      }`}
    >
      {pages.map((page, index) => {
        const isActive = location.pathname === page.link;
        return (
          <div key={index} className="flex items-center gap-5">
            <Link
              to={page.link}
              className={`flex items-center gap-4 duration-200 transition-all text-[14px] ${
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
  );
};
