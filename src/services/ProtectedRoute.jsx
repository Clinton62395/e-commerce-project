import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./user_context";
import { PageLoader } from "./LoadingSpinner";

export const ProtectedRoute = ({ children, fallbackPath = "/login" }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  // Si pas de user → redirection vers login
  if (!user) {
    return (
      <Navigate
        to={fallbackPath}
        state={{ from: location }} // garde la dernière page visitée
        replace
      />
    );
  }

  // Protection par rôle
  const roles = user.roles;

  // Si le token contient un rôle unique (string)
  if (typeof roles === "string" && roles !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si le token contient plusieurs rôles (array)
  if (Array.isArray(roles) && !roles.includes("admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
