import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/SideBar";
import { Header } from "../components/dashboard/Headers";
import React, { useState } from "react";
import { UserLogout } from "../components/dashboard/UserLogout";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setMdalOpen] = useState(false);

  const toggleSwicht = () => {
    setSidebarOpen((prev) => !prev);
  };
  // const sideBarToggle =
  //   typeof children === "function" ? children(toggleSwicht) : null;
  // if (sideBarToggle) return sideBarToggle;

  return (
    <div className="flex flex-col  bg-gray-50 ">
      <header className="shadow bg-white  sticky top-0  z-[1000]">
        <Header toggleOpen={toggleSwicht} isOpen={sidebarOpen} />
      </header>
      {/* Sidebar */}

      {/* Main content area */}
      <div className="flex">
        <aside
          className={`sticky  top-0  h-screen shadow-md z-50 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0 w-64 p-2" : "-translate-x-full w-0 p-0"
          }`}
        >
          <Sidebar
            isOpen={sidebarOpen}
            onClickLogout={() => setMdalOpen(true)}
          />
        </aside>
        {/* Header */}

        {/* Page content */}
        <main className="flex-grow p-6 overflow-y-auto z-10">
          <Outlet context={{ toggleSwicht, sidebarOpen }} />
        </main>
        {modalOpen && (
          <div>
            <UserLogout onClose={() => setMdalOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
};
