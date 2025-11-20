// components/LoadingSpinner.jsx
import React from "react";

export const LoadingSpinner = ({
  size = "medium",
  text = "Chargement...",
  className = "",
}) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      {/* Spinner */}
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      ></div>

      {/* Text */}
      {text && (
        <p className={`mt-4 text-gray-600 ${textSizes[size]}`}>{text}</p>
      )}
    </div>
  );
};

// Variante avec overlay pour pages complètes
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <LoadingSpinner
        size="large"
        text="Vérification de session..."
        className="bg-white rounded-lg shadow-lg p-8"
      />
    </div>
  );
};
