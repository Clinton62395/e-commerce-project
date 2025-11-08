import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./user_context";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (user.roles !== "admin") return <Navigate to="/unauthorized" replace />;
  return children;
};
