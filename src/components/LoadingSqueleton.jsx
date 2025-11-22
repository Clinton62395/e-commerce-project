import React from "react";

export const LoadingSqueleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-8 max-w-7xl">
      <div>
        <main className="mx-auto w-full p-4 overflow-x-hidden">
          {/* Skeleton pour le header */}
          <div className="text-center space-y-4 mb-8">
            <div className="h-8 bg-gray-300 rounded-lg w-1/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Skeleton pour la grille de produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg shadow-md p-4 border border-gray-100"
              >
                {/* Skeleton pour l'image principale */}
                <div className="relative w-full h-80 mb-4 overflow-hidden rounded-lg bg-gray-300 animate-pulse"></div>

                {/* Skeleton pour les mini-images */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-20 bg-gray-200 rounded-md animate-pulse"
                    ></div>
                  ))}
                </div>

                {/* Skeleton pour les informations du produit */}
                <div className="space-y-3">
                  {/* Titre */}
                  <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4"></div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>

                  {/* Rating et prix */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                        ></div>
                      ))}
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-8 ml-1"></div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="h-6 bg-gray-300 rounded animate-pulse w-20"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
                    </div>
                  </div>

                  {/* Skeleton pour les couleurs */}
                  <div className="flex gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"
                      ></div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-gray-100 animate-pulse flex items-center justify-center">
                      <div className="h-2 bg-gray-300 rounded w-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skeleton pour le bouton "View more" */}
          <div className="flex justify-center my-8">
            <div className="h-12 bg-gray-300 rounded-md w-32 animate-pulse"></div>
          </div>
        </main>
      </div>
    </div>
  );
};
