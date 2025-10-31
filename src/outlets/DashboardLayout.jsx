import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/SideBar";
import { Header } from "../components/dashboard/Headers";
import React, { useState } from "react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSwicht = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col  bg-gray-50">
      <header className="shadow bg-white ">
        <Header toggleOpen={toggleSwicht} />
      </header>
      {/* Sidebar */}

      {/* Main content area */}
      <div className="flex  flex-1 justify-center">
        <aside className="sticky top-0 left-0 h-screen w-52 ">
          <Sidebar isOpen={setSidebarOpen} />
        </aside>
        {/* Header */}

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
