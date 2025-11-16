import { useState } from "react";

export const UserProfileModal = ({ onclose, onConfirm, isOpen }) => {
  if (!onclose) return;
  return (
    <>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Open your Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-80 p-6 relative">
            <button
              onClick={onclose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                {/* Icône utilisateur */}
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-semibold">Billy Doumbouya</h2>
              <p className="text-sm text-gray-500 mb-6">
                {User.roles || "travailleur indépendant"}
              </p>

              <button className="w-full py-2 mb-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                Fermer le compte
              </button>
              <button
                onClick={onclose}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
