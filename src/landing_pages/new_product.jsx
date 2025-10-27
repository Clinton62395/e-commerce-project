import React, { useState } from "react";
import {
  DiscountDeals,
  MenAccessories,
  MenFashion,
  WomenAccessories,
  WomenFashion,
} from "../components/slides-components/productsFilters";

export const NewProduct = () => {
  const [isActive, setIsActive] = useState("WomenFashion");

  const handleFilterClick = (filter) => {
    setIsActive(filter);
  };
  const categories = [
    { key: "MenFashion", label: "Men Fashion", visible: MenFashion },
    { key: "WomenFashion", label: "Women Fashion", visible: WomenFashion },
    {
      key: "MenAccessories",
      label: "Men Accessories",
      visible: MenAccessories,
    },
    {
      key: "WomenAccessories",
      label: "Women Accessories",
      visible: WomenAccessories,
    },
    { key: "DiscountDeals", label: "Discount Deals", visible: DiscountDeals },
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-purple-50/30 via-pink-50/50 to-red-50/30 backdrop:blur-md rounded-md my-10">
      <h1 className="text-2xl font-bold mb-4 text-center">New Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-2 my-4 text-center px-10 md:px-20">
        {categories.map(
          ({ key, label, visible }) =>
            visible && (
              <button
                key={key}
                onClick={() => handleFilterClick(key)}
                className={` rounded-md py-2 px-3 duration-300 transition-all ${
                  isActive === key
                    ? "bg-[#000000] text-white/90 font-semibold"
                    : "bg-[#dcdbdb] text-gray-700"
                }`}
              >
                {label}
              </button>
            )
        )}
      </div>
      <div className="mt-4">
        {isActive === "MenFashion" && <MenFashion />}
        {isActive === "WomenFashion" && <WomenFashion />}
        {isActive === "MenAccessories" && <MenAccessories />}
        {isActive === "WomenAccessories" && <WomenAccessories />}
        {isActive === "DiscountDeals" && <DiscountDeals />}
      </div>
    </div>
  );
};
