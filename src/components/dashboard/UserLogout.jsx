import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

export const UserLogout = ({ onClose }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("adminData");
    if (!token) {
      setError("token Missing");
      isLoading(true);
      navigate("/admin-login");
      return;
    }

    setIsloading(true);
    localStorage.removeItem("adminData");

    setTimeout(() => {
      toast.success("secured login out");
      setIsloading(false);
      setError("");
      navigate("/");
    }, 2000);
  };

  if (!onClose) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <RingLoader color="#E53E3E" />
            <p className="mt-4 text-sm text-gray-600">Logging out...</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            {error && (
              <p className="text-sm text-red-500 mb-4 text-center">
                ⚠️ {error}
              </p>
            )}
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 shadow-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 shadow-sm shadow-red-300 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
