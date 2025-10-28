import { ArrowBigLeft, Home, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icône 404 animée */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-indigo-600 mb-4 animate-bounce">
            404
          </div>
          <div className="text-6xl text-indigo-800  animate-pulse">
            <Search size={52} />
          </div>
        </div>

        {/* Texte principal */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page not found
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Oups ! the page that you are looking for might not exist anymore.
        </p>

        {/* Boutons d'action */}
        <div className="space-y-4">
          <button
            onClick={() => window.history.back()}
            className=" flex items-center gap-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <ArrowBigLeft size={24} /> Go back
          </button>

          <Link
            to="/"
            className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-3"
          >
            <Home /> Home
          </Link>
        </div>

        {/* Animation décorative */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
