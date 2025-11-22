import React from "react";
import { ChevronRight, Columns2, Rows3, ChevronUp, ChevronDown, X } from "lucide-react";

export const FashionShopSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center flex-col gap-2">
            <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <ChevronRight size={16} className="text-gray-300" />
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters Skeleton */}
          <div className="lg:col-span-1 w-full min-h-screen py-8 lg:pt-0">
            <div className="sticky top-0 min-h-screen space-y-4">
              {/* Clear Filters Skeleton */}
              <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>

              {/* Size Filter Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="w-full flex items-center justify-between p-4">
                  <div className="h-5 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <ChevronDown size={18} className="text-gray-300" />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-10 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Color Filter Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="w-full flex items-center justify-between p-4">
                  <div className="h-5 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <ChevronDown size={18} className="text-gray-300" />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-7 gap-2">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Price Filter Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="w-full flex items-center justify-between p-4">
                  <div className="h-5 bg-gray-300 rounded w-20 animate-pulse"></div>
                  <ChevronDown size={18} className="text-gray-300" />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center w-full">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands Filter Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="w-full flex items-center justify-between p-4">
                  <div className="h-5 bg-gray-300 rounded w-20 animate-pulse"></div>
                  <ChevronDown size={18} className="text-gray-300" />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Collections Filter Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="w-full flex items-center justify-between p-4">
                  <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
                  <ChevronDown size={18} className="text-gray-300" />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Tags Filter Skeleton */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="w-full flex items-center justify-between p-4">
                  <div className="h-5 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <ChevronDown size={18} className="text-gray-300" />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            {/* Controls Skeleton */}
            <div className="flex items-center gap-2 justify-between mb-6 w-full">
              <div className="flex items-center gap-3">
                <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
                <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="h-64 w-full bg-gray-300 animate-pulse"></div>
                  
                  {/* Content Skeleton */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                      <div className="h-3 bg-gray-200 rounded w-8 ml-1 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};