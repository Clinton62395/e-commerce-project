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

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/Product.API";
import { FashionShopSkeleton } from "../components/ShopSkeleton";

import { motion, AnimatePresence } from "framer-motion"; // ✅ Remplace GSAP

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

  const colors = [
    ...new Set(
      data.flatMap((item) => {
        if (Array.isArray(item.color)) {
          return item.color;
        }
        if (typeof item.color === "string") {
          return [item.color]; // on garde la string entière
        }
        return [];
      })
    ),
  ];
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

  const [show, setShow] = useState({
    size: true,
    color: true,
    price: true,
    brand: true,
    collection: true,
    tag: true,
    BestSelling: true,
  });

  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  const hasActiveFilters = Object.values(activeFilters).some(
    (v) => v !== null && v !== undefined
  );

  const products = data || [];

  // Apply active filters to products before pagination
  const filteredProducts = products.filter((p) => {
    // if no active filters, keep all
    if (!hasActiveFilters) return true;

    let ok = true;

    // size: accept if p.size contains the selected size (or equals)
    if (activeFilters.size) {
      const sizes = Array.isArray(p.size) ? p.size : [p.size].filter(Boolean);
      ok = ok && sizes.includes(activeFilters.size);
    }

    // color: p.color can be array or string; compare values
    if (activeFilters.color) {
      const colors = Array.isArray(p.color)
        ? p.color
        : [p.color].filter(Boolean);
      ok = ok && colors.includes(activeFilters.color);
    }

    // price: compare numeric equality (or you can map ranges)
    if (activeFilters.price !== undefined && activeFilters.price !== null) {
      // if the filter value is a string range (e.g. "$0 - $50"), adapt accordingly.
      // Here we support direct numeric match.
      ok =
        ok &&
        (p.price === activeFilters.price ||
          p.price?.toString() === activeFilters.price?.toString());
    }

    if (activeFilters.brand) {
      const brands = Array.isArray(p.brands)
        ? p.brands
        : [p.brands].filter(Boolean);
      ok = ok && brands.includes(activeFilters.brand);
    }

    if (activeFilters.collection) {
      const cats = Array.isArray(p.category)
        ? p.category
        : [p.category].filter(Boolean);
      ok = ok && cats.includes(activeFilters.collection);
    }

    if (activeFilters.tag) {
      const tagsLocal = Array.isArray(p.tags)
        ? p.tags
        : [p.tags].filter(Boolean);
      ok = ok && tagsLocal.includes(activeFilters.tag);
    }

    return ok;
  });

  const itemsPerPage = 9;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );
  const currentIndex = filteredProducts.slice(
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
    // Reset to first page whenever filters change
    setPage(1);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setPage(1);
  };

  if (isLoading) {
    return <FashionShopSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center flex items-center justify-center font-extrabold bg-red-100 shadow-md py-3 px-4">
        Error occurred when fetching products: {isError.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm"
      >
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
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 w-full min-h-screen py-8 lg:pt-0"
          >
            <div className="sticky top-0 min-h-screen space-y-4">
              {/* Clear Filters */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    <X size={16} /> Clear Filters
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Size Filter */}
              <motion.div
                layout
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleSwitch("size")}
                  className="w-full flex items-center justify-between p-4 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Size</span>
                  {show.size ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {show.size && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-wrap gap-2"
                    >
                      {[...new Set(sizes)].map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFilter("size", size)}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                            activeFilters.size === size
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Color Filter */}
              <motion.div
                layout
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleSwitch("color")}
                  className="w-full flex items-center justify-between p-4 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Color</span>
                  {show.color ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {show.color && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-7 gap-2"
                    >
                      {[...new Set(colors)].map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ backgroundColor: color }}
                          onClick={() => toggleFilter("color", color)}
                          className={`w-7 h-7 rounded-full transition-all flex gap-2 items-center flex-wrap ${
                            activeFilters.color === color
                              ? "ring-2 ring-offset-2 ring-gray-900"
                              : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-400"
                          }`}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Price Filter */}
              <motion.div
                layout
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleSwitch("price")}
                  className="w-full flex items-center justify-between p-4 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Price</span>
                  {show.price ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {show.price && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2"
                    >
                      {[...new Set(prices)].map((price) => (
                        <motion.button
                          key={price}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFilter("price", price)}
                          className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            activeFilters.price === price
                              ? "bg-gray-900 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <span>{price}</span>
                          <span>NGN</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Brands Filter */}
              <motion.div
                layout
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleSwitch("brand")}
                  className="w-full flex items-center justify-between p-4 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Brands</span>
                  {show.brand ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {show.brand && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2"
                    >
                      {[...new Set(brands)].map((brand) => (
                        <motion.button
                          key={brand}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFilter("brand", brand)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            activeFilters.brand === brand
                              ? "bg-gray-900 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {brand}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Collections Filter */}
              <motion.div
                layout
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleSwitch("collection")}
                  className="w-full flex items-center justify-between p-4 transition-colors"
                >
                  <span className="font-semibold text-gray-900">
                    Collection
                  </span>
                  {show.collection ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {show.collection && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2"
                    >
                      {collections.map((col) => (
                        <motion.button
                          key={col}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFilter("collection", col)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            activeFilters.collection === col
                              ? "bg-gray-900 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {col}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Tags Filter */}
              <motion.div
                layout
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleSwitch("tag")}
                  className="w-full flex items-center justify-between p-4 transition-colors"
                >
                  <span className="font-semibold text-gray-900">Tags</span>
                  {show.tag ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {show.tag && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 pt-2 border-t border-gray-100 flex flex-wrap gap-2"
                    >
                      {[...new Set(tags)].map((tag) => (
                        <motion.button
                          key={tag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFilter("tag", tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            activeFilters.tag === tag
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {tag}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Controls */}
            <motion.div
              layout
              className="flex items-center gap-2 justify-between mb-6 w-full"
            >
              <div className="flex items-center gap-3 w-full text-sm font-bold text-gray-700">
                {show.BestSelling ? (
                  "Best selling"
                ) : (
                  <p>Showing {currentIndex.length} products</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSwitch("BestSelling")}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  {show.BestSelling ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </motion.button>
              </div>
              <motion.div
                className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded-md transition-all ${
                    layout === "list"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Columns2 size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded-md transition-all ${
                    layout === "grid"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Rows3 size={20} />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Products */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="no-products"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-12 col-span-3 text-center"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    No product match your filters.
                  </p>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearFilters}
                        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Delete all filters
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="products-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  className={
                    layout === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {currentIndex.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      className={`group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all ${
                        layout === "list" ? "flex gap-6 p-4" : ""
                      }`}
                    >
                      <div
                        className={
                          layout === "list" ? "flex-shrink-0 w-48" : ""
                        }
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`relative overflow-hidden bg-gray-100 ${
                            layout === "list" ? "h-48 w-48" : "h-64 w-full"
                          }`}
                        >
                          <Link to={`/product-details/${product._id}`}>
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              src={
                                product.picture?.[0]?.url ||
                                product.mainImage?.url
                              }
                              alt={product.clotheName || product.title}
                              className="w-full h-full object-cover transition-transform duration-300"
                            />
                          </Link>
                        </motion.div>
                      </div>
                      <div
                        className={
                          layout === "list"
                            ? "flex-grow flex flex-col justify-center"
                            : "p-4"
                        }
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {product.clotheName || product.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg font-bold text-gray-900">
                            {product.discountPrice
                              ? product.discountPrice.toLocaleString()
                              : product.price?.toLocaleString()}{" "}
                            NGN
                          </span>
                          {product.discountPrice && product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.price.toLocaleString()} NGN
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between w-full flex-wrap items-center">
                          <div className="text-gray-800 text-sm font-medium">
                            qty: {product.quantity || 0} pcs
                          </div>
                          <div className="flex items-center gap-2">
                            {product.color?.map((color, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`w-6 h-6 rounded-full border border-gray-300`}
                                  style={{ backgroundColor: color }}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {product.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        )}

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
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 mt-12"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
