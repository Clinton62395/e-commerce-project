import { Box, House, LogIn, Sprout, SquareArrowUpRight } from "lucide-react";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const LandingPageNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const location = useLocation();

  const pages = [
    { name: "Home", icon: <House size={15} />, link: "/" },
    { name: "Deals", icon: <LogIn size={15} />, link: "/deals" },
    { name: "New Products", icon: <Sprout size={15} />, link: "/new-Products" },
    { name: "Packages", icon: <Box size={15} />, link: "/packages" },
    { name: "Page", icon: <SquareArrowUpRight size={15} />, link: "/page" },
    { name: "Sign In", icon: <LogIn size={15} />, link: "/login" },
    { name: "Sign Up", icon: <SquareArrowUpRight size={15}/>, link: "/register" },
  ];
  const isAuthPage = location.pathname === "/";

  return (
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

      <div className="hidden md:flex items-center gap-8">
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
    </div>
  );
};
