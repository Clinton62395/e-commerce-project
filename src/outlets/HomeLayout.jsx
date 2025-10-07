import React from "react";
import { LandingPageNavbar } from "../components/navbar";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div>
      <LandingPageNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};
