import { Box, House, LogIn, Sprout, SquareArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./NavLinks";

export const LandingPageNavbar = ({ logo, pages }) => {
  return (
    <div>
      <NavLinks />
    </div>
  );
};
