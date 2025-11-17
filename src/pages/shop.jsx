import React, { useEffect, useRef, useState } from "react";
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
import ScrollTrigger from "gsap/ScrollTrigger";

import gsap from "gsap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/Product.API";
gsap.registerPlugin(ScrollTrigger);

export const FashionShop = () => {
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
    staleTime: 1000 * 60 * 5,
  });

  const colors = [...new Set(data.flatMap((item) => item.colors || []))];
  const tags = [...new Set(data.flatMap((item) => item.tags || []))];
  const brands = [...new Set(data.flatMap((item) => item.brands || []))];
  const sizes = [...new Set(data.flatMap((item) => item.size || []))];
  const prices = [...new Set(data.flatMap((item) => item.price || []))];
  const collections = [...new Set(data.flatMap((item) => item.category || []))];

  console.log("les valeur extraites de data colors", colors);
  console.log("les valeur extraites de data tags", tags);
  console.log("les valeur extraites de data brands", brands);
  console.log("les valeur extraites de data sizes", sizes);
  console.log("les valeur extraites de data prices", prices);
  console.log("les valeur extraites de data category", collections);

  console.log("product from shop==>>", data);
  const sectionRef = useRef(null);
  useEffect(() => {
    const elements =
      sectionRef.current?.querySelectorAll(".scroll-image") || [];
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const [show, setShow] = useState({
    size: true,
    color: true,
    prices: true,
    brands: true,
    collection: true,
    tags: true,
    BestSelling: true,
  });

  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  // const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  // const colors = [
  //   "bg-black",
  //   "bg-white border-2",
  //   "bg-red-500",
  //   "bg-blue-500",
  //   "bg-yellow-400",
  //   "bg-green-500",
  //   "bg-purple-500",
  //   "bg-pink-500",
  //   "bg-[tomato]",
  //   "bg-orange-500",
  //   "bg-teal-500",
  //   "bg-sky-500",
  //   "bg-lime-500",
  //   "bg-indigo-500",
  // ];

  // const prices = ["$0 - $50", "$50 - $100", "$100 - $200", "$200+"];
  // const brands = ["Nike", "Adidas", "Puma", "Gucci", "Zara"];
  // const collections = ["Summer", "Winter", "Spring", "Fall"];
  // const tags = ["New", "Sale", "Trending", "Premium"];

  const products = data || [];

  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
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

  if (isLoading) {
    return (
      <div className="bg-black/90 flex items-center justify-center min-h-screen  overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center flex items-center justify-center font-extrabold bg-red-100 shadow-md py-3 px-4">
        Error occurred when fetching products: {isError.message}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center flex-col gap-2">
            <h3 className="font-bold text-xl text-black">Fashion</h3>
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/"
                className="font-semibold text-gray-900 hover:text-blue-300 hover:underline duration-150 transition-all"
              >
                Home
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-600">Fashion</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 w-full min-h-screen py-8 lg:pt-0">
            <div className="sticky top-0 min-h-screen">
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
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-7 gap-2">
                    {colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => toggleFilter("color", i)}
                        className={`w-8 h-8 rounded-full ${color} transition-all ${
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
            <div className="flex items-center gap-2 justify-between mb-6 w-full">
              <div className="flex items-center gap-3 w-full text-sm font-bold text-gray-700">
                {show.BestSelling ? (
                  "Best selling"
                ) : (
                  <p>Showing {currentIndex.length} products</p>
                )}
                <button
                  onClick={() => toggleSwitch("BestSelling")}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  {show.BestSelling ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>
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

            {/* Products - ADAPTÉ POUR LES DONNÉES API */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {currentIndex.map((product) => (
                <div
                  key={product._id}
                  className={`group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all ${
                    layout === "list" ? "flex gap-6 p-4" : ""
                  }`}
                >
                  <div
                    className={layout === "list" ? "flex-shrink-0 w-48" : ""}
                  >
                    <div
                      className={`scroll-image relative overflow-hidden bg-gray-100 ${
                        layout === "list" ? "h-48 w-48" : "h-64 w-full"
                      }`}
                    >
                      <Link to={`/product-details/${product._id}`}>
                        {" "}
                        {/* ✅ Lien dynamique */}
                        <img
                          src={
                            product.picture?.[0]?.url || product.mainImage?.url
                          }
                          alt={product.clotheName || product.title}
                          className="scroll-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
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
                      {product.clotheName || product.title}{" "}
                      {/* ✅ Utiliser clotheName */}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {product.discountPrice
                          ? product.discountPrice.toLocaleString()
                          : product.price?.toLocaleString()}{" "}
                        NGN {/* ✅ Prix dynamique */}
                      </span>
                      {product.discountPrice && product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.price.toLocaleString()} NGN
                        </span>
                      )}
                    </div>

                    {/* ✅ Couleurs dynamiques depuis l'API */}
                    <div className="flex gap-2">
                      {product.color && Array.isArray(product.color) ? (
                        product.color.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))
                      ) : product.color ? (
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: product.color }}
                        />
                      ) : (
                        // Fallback si pas de couleurs
                        <div className="w-6 h-6 rounded-full bg-gray-300 border border-gray-300" />
                      )}
                    </div>

                    {product.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* ✅ Rating si disponible */}
                    {product.rate && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-sm text-yellow-500">
                          {"★".repeat(Math.floor(product.rate))}
                        </span>
                        <span className="text-sm text-gray-400">
                          {"★".repeat(5 - Math.floor(product.rate))}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.rate})
                        </span>
                      </div>
                    )}
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
