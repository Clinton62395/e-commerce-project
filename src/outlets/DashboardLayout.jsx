
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/SideBar";
import { Header } from "../components/dashboard/Headers";
import React, { useState } from "react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSideBar = () => {
    setSidebarOpen(!setSidebarOpen);
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={toggleSideBar} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="shadow bg-white">
          <Header />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
