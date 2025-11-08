import React, { useState, useEffect } from "react";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/constant";
import { Link } from "react-router-dom";

export const Header = ({ toggleOpen, isOpen }) => {
  const [adminData, setAdminData] = useState("");
  // get adminInfo from local storage
  const { data: payement = [], isPending } = useQuery({
    queryKey: ["allPayments"],
    queryFn: () => api.get("/payment/all").then((res) => res.data.data),
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("adminData"));
      console.log("data admin ==>", saved);

      if (saved) {
        setAdminData(saved);
      }
    } catch (err) {
      console.error("error when getting admin info from local storage", err);
    }
  }, []);

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <p className="hidden md:flex items-center  flex-col">
            Welcom back
            <span className=" font-medium">
              <b>{adminData.firstName}</b>
            </span>
          </p>
          <button
            onClick={toggleOpen}
            className="flex md:hidden duration-500 transition-all justify-center items-center h-8 w-8 rounded-full bg-slate-200 hover:bg-slate-800 hover:text-white  hover:ring-2 focus:ring-offset-2"
          >
            {isOpen ? <X /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} />
            {!isPending && (
              <Link
                to="/admin-dashboard/orders"
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                {payement.length}
              </Link>
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={16} />
            </div>
            {/* <span className="text-sm font-medium text-gray-700">Admin</span> */}
          </div>
        </div>
      </div>
    </header>
  );
};
