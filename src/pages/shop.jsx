import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Columns2,
  Rows3,
  X,
} from "lucide-react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const FashionShop = () => {
  const [show, setShow] = useState({
    size: true,
    color: true,
    prices: true,
    brands: true,
    collection: true,
    tags: true,
  });

  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "bg-black",
    "bg-white border-2",
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-purple-500",
  ];
  const prices = ["$0 - $50", "$50 - $100", "$100 - $200", "$200+"];
  const brands = ["Nike", "Adidas", "Puma", "Gucci", "Zara"];
  const collections = ["Summer", "Winter", "Spring", "Fall"];
  const tags = ["New", "Sale", "Trending", "Premium"];

  const products = [
    {
      id: 1,
      title: "Classic Tee",
      price: "$45",
      reducePrice: "$89",
      src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      color1: "bg-black",
      color2: "bg-white border",
      color3: "bg-gray-500",
    },
    {
      id: 2,
      title: "Denim Jacket",
      price: "$120",
      reducePrice: "$189",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCGygbQbjP3gy-qPSu9lG8jygABHoeMQsXZg&s",
      color1: "bg-blue-900",
      color2: "bg-blue-700",
    },
    {
      id: 3,
      title: "Summer Dress",
      price: "$65",
      reducePrice: "$129",
      src: "https://st4.depositphotos.com/4678277/20866/i/450/depositphotos_208662024-stock-photo-black-friday-happy-model-girl.jpg",
      color1: "bg-pink-300",
      color2: "bg-red-400",
    },
    {
      id: 4,
      title: "Casual Pants",
      price: "$55",
      reducePrice: "$99",
      src: "https://st2.depositphotos.com/1177973/5621/i/450/depositphotos_56213817-stock-photo-shopping-concept-beautiful-young-woman.jpg",
      color1: "bg-gray-700",
      color2: "bg-black",
    },
    {
      id: 5,
      title: "Sneakers",
      price: "$85",
      reducePrice: "$159",
      src: "https://www.bubblestranslation.com/wp-content/uploads/Top-5-International-Fashion-E-Commerce-Websites-Featured.jpg",
      color1: "bg-white border",
      color2: "bg-gray-300",
    },
    {
      id: 6,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "https://img.freepik.com/free-photo/portrait-curly-girl-with-red-lipstick-taking-notes-tablet-pink-background-with-dressees_197531-17620.jpg",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 7,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage1.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 8,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage2.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 9,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage3.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 10,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage4.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 11,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage5.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 12,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage6.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 13,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage7.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 14,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage8.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 15,
      title: "Leather Belt",
      price: "$35",
      reducePrice: "$69",
      src: "/paginationImage9.png",
      color1: "bg-amber-900",
      color2: "bg-black",
    },
    {
      id: 16,
      src: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg",
      title: "Casual Hoodie",
      price: "$28.00",
      reducePrice: "$35.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#2ECC71]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#117A65]",
    },
    {
      id: 17,
      src: "https://images.pexels.com/photos/1701207/pexels-photo-1701207.jpeg",
      title: "Denim Skirt",
      price: "$38.00",
      reducePrice: "$45.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#5DADE2]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#2874A6]",
    },
    {
      id: 18,
      src: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg",
      title: "Classic Trench Coat",
      price: "$95.00",
      reducePrice: "$110.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#D2B48C]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#BCA77E]",
    },
    {
      id: 19,
      src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      title: "Sport Tracksuit",
      price: "$70.00",
      reducePrice: "$85.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#1B2631]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#566573]",
    },
    {
      id: 20,
      src: "https://images.pexels.com/photos/6311608/pexels-photo-6311608.jpeg",
      title: "Cargo Pants",
      price: "$45.00",
      reducePrice: "$55.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#5D6D7E]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#85929E]",
    },
    {
      id: 21,
      src: "https://images.pexels.com/photos/7679465/pexels-photo-7679465.jpeg",
      title: "Knitted Cardigan",
      price: "$42.00",
      reducePrice: "$50.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#E59866]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#D35400]",
    },
    {
      id: 22,
      src: "https://images.pexels.com/photos/6311607/pexels-photo-6311607.jpeg",
      title: "Casual Shorts",
      price: "$20.00",
      reducePrice: "$25.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#F4D03F]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#D68910]",
    },
    {
      id: 23,
      src: "https://images.pexels.com/photos/2983463/pexels-photo-2983463.jpeg",
      title: "Women’s Blouse",
      price: "$35.00",
      reducePrice: "$40.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#F5B7B1]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#E6B0AA]",
    },
    {
      id: 24,
      src: "https://images.pexels.com/photos/2983462/pexels-photo-2983462.jpeg",
      title: "Beach Sandals",
      price: "$18.00",
      reducePrice: "$22.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#FAD7A0]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#EDBB99]",
    },
    {
      id: 25,
      src: "https://i5.walmartimages.com/seo/Men-s-Stretch-Skinny-Ripped-Jeans-Super-Comfy-Distressed-Denim-Pants-with-Destroyed-Holes_e3498edd-0cc4-4171-975a-7ef6c65c9e51.81c654a015b81b927a575fbf38d10f0a.jpeg",
      title: "Beach Sandals",
      price: "$18.00",
      reducePrice: "$22.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#FAD7A0]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#EDBB99]",
    },
    {
      id: 26,
      src: "/sara.jpg",
      title: "Beach Sandals",
      price: "$18.00",
      reducePrice: "$22.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#FAD7A0]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#EDBB99]",
    },
    {
      id: 27,
      src: "/sar.jpg",
      title: "Beach Sandals",
      price: "$18.00",
      reducePrice: "$22.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#FAD7A0]",
      color2: "h-8 w-8 rounded-full p-2 bg-[#EDBB99]",
    },
  ];

  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentIndex = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );



  const toggleSwitch = (key) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (category, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (v) => v !== null && v !== undefined
  );

  const clearFilters = () => setActiveFilters({});

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900">Home</span>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-600">Fashion</span>
            </div>
            <h1 className="hidden sm:block font-bold text-2xl text-gray-900">
              Best Selling
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-0 h-screen space-y-6">
              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <X size={16} /> Clear Filters
                </button>
              )}

              {/* Size Filter */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSwitch("size")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Size</span>
                  {show.size ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {show.size && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleFilter("size", size)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                          activeFilters.size === size
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSwitch("color")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Color</span>
                  {show.color ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {show.color && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-6 gap-2">
                    {colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => toggleFilter("color", i)}
                        className={`w-8 h-8 rounded-lg ${color} transition-all ${
                          activeFilters.color === i
                            ? "ring-2 ring-offset-2 ring-gray-900"
                            : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSwitch("prices")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Price</span>
                  {show.prices ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {show.prices && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
                    {prices.map((price) => (
                      <button
                        key={price}
                        onClick={() => toggleFilter("price", price)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeFilters.price === price
                            ? "bg-gray-900 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands Filter */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSwitch("brands")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Brands</span>
                  {show.brands ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {show.brands && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => toggleFilter("brand", brand)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeFilters.brand === brand
                            ? "bg-gray-900 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Collections Filter */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSwitch("collection")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">
                    Collection
                  </span>
                  {show.collection ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {show.collection && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
                    {collections.map((col) => (
                      <button
                        key={col}
                        onClick={() => toggleFilter("collection", col)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeFilters.collection === col
                            ? "bg-gray-900 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags Filter */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSwitch("tags")}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Tags</span>
                  {show.tags ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {show.tags && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleFilter("tag", tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          activeFilters.tag === tag
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Showing {currentIndex.length} products
              </h2>
              <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded-md transition-all ${
                    layout === "list"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Columns2 size={20} />
                </button>
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded-md transition-all ${
                    layout === "grid"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Rows3 size={20} />
                </button>
              </div>
            </div>

            {/* Products */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {currentIndex.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all ${
                    layout === "list" ? "flex gap-6 p-4" : ""
                  }`}
                >
                  <div
                    className={layout === "list" ? "flex-shrink-0 w-48" : ""}
                  >
                    <div
                      className={`relative overflow-hidden bg-gray-100 ${
                        layout === "list" ? "h-48 w-48" : "h-64 w-full"
                      }`}
                    >
                      <img
                        src={product.src}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div
                    className={
                      layout === "list"
                        ? "flex-grow flex flex-col justify-center"
                        : "p-4"
                    }
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.reducePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.reducePrice}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {product.color1 && (
                        <div
                          className={`w-6 h-6 rounded-full ${product.color1} border border-gray-300`}
                        />
                      )}
                      {product.color2 && (
                        <div
                          className={`w-6 h-6 rounded-full ${product.color2} border border-gray-300`}
                        />
                      )}
                      {product.color3 && (
                        <div
                          className={`w-6 h-6 rounded-full ${product.color3} border border-gray-300`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      size="large"
                      showFirstButton
                      showLastButton
                      color="primary"
                    />
                  )}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
