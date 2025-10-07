import React, { useState } from "react";
import { LandingPageNavbar } from "../components/navbar";
import { ChevronRight, Tally2, Tally3, Tally4, Tally5 } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const Shop = () => {
  const products = [
    {
      id: 1,
      src: "/paginationImage1.png",
      title: "Rounded Red Hat",
      price: "$8.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#FFD700] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#000000] ",
    },
    {
      id: 2,
      src: "/paginationImage2.png",
      title: "Linen-blend Shirt",
      price: "$17.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#8DB4D2] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#FFD1DC] ",
    },
    {
      id: 3,
      src: "/paginationImage3.png",
      title: "Long-sleeve Coat",
      price: "$106.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#EBE6DB] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#C1E1C1] ",
    },
    {
      id: 4,
      src: "/paginationImage4.png",
      title: "Boxy Denim Hat",
      price: "$25.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#B1C5D4] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#063E66] ",
    },
    {
      id: 5,
      src: "/paginationImage5.png",
      title: "Linen Plain Top",
      price: "$25.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#C1E1C1] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#C1E1C1] ",
    },
    {
      id: 6,
      src: "/paginationImage6.png",
      title: "Oversized T-shirt",
      price: "$11.00",
      reducePrice: "$14.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#FFD1DC] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#C6AEC7] ",
      color3: "h-8 w-8 rounded-full p-2 bg-[#FFFFFF01] ",
    },
    {
      id: 7,
      src: "/paginationImage7.png",
      title: "Polarised Sunglasses",
      price: "$18.00",
      reducePrice: "$21.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#000000] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#836953] ",
    },
    {
      id: 8,
      src: "/paginationImage8.png",
      title: "Rockstar Jacket",
      price: "$22.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#C6AEC7] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#BEDCE3] ",
    },
    {
      id: 9,
      src: "/paginationImage9.png",
      title: "Dotted Black Dress",
      price: "$20.00",
      color1: "h-8 w-8 rounded-full p-2 bg-[#063E66] ",
      color2: "h-8 w-8 rounded-full p-2 bg-[#000000] ",
      color3: "h-8 w-8 rounded-full p-2 bg-[#B1C5D4] ",
    },
  ];
  const prices = ["$0-$50", "$50-$100", "$100-$150", "$150-$200", "$300-$400"];
  const brands = ["Minimog", "Retrolie", "Brook", "Learts", "Vagabond", "Abby"];
  const Collection = [
    "All products",
    "Best sellers",
    "New arrivals",
    "Accessories",
  ];
  const tags = [
    "Fashion",
    "Hats",
    "Sandal",
    "Belt",
    "Bags",
    "Snacker",
    "Denim",
    "Minimog",
    "Vagabond",
    "Sunglasses",
    "Beachwear",
  ];
  const color = [
    "bg-[#FF6C6C] w-8 h-8 rounded-full p-2",
    "bg-[#FF7629] w-8 h-8 rounded-full p-2",
    "bg-[#FFF06C] w-8 h-8 rounded-full p-2",
    "bg-[#9BFF6C] w-8 h-8 rounded-full p-2",
    "bg-[#6CFF9E] w-8 h-8 rounded-full p-2",
    "bg-[#6CFFDC] w-8 h-8 rounded-full p-2",
    "bg-[#6CB9FF] w-8 h-8 rounded-full p-2",
    "bg-[#6CF6FF] w-8 h-8 rounded-full p-2",
    "bg-[#6CA7FF] w-8 h-8 rounded-full p-2",
    "bg-[#6C7BFF] w-8 h-8 rounded-full p-2",
    "bg-[#8A6CFF] w-8 h-8 rounded-full p-2",
    "bg-[#B66CFF] w-8 h-8 rounded-full p-2",
    "bg-[#FC6CFF] w-8 h-8 rounded-full p-2",
    "bg-[#FF6C6C] w-8 h-8 rounded-full p-2",
  ];
  const sizes = ["S", "L", "M", "XL", "XXL"];

  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const handleChange = (even, value) => {
    setPage(value);
  };
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentIndex = products.slice(startIndex, endIndex);
  return (
    <div className="h-screen ">
      <div className="flex flex-col space-y-4 justify-center items-center my-5">
        <div className="flex gap-3 items-center">
          <h1 className="font-bold text-2xl">Home</h1>
          <span>
            <ChevronRight />
          </span>
          <p>Fashion</p>
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <div className="w-full max-w-md mx-auto text-center ">
          <h2>Filters</h2>
          <span>Size</span>
          <div className="grid grid-cols-2 md:grid-cols-3  gap-2 text-start max-w-32 mx-auto ">
            {sizes.map((size) => (
              <button key={size} className="border flex items-center justify-center rounded-md p-2 ">{size}</button>
            ))}
          </div>
          <p className="font-bold text-2xl ">Price</p>
          <div className="flex flex-col gap-4 text-start">
            {prices.map((price) => (
              <button key={price}>{price}</button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between my-4 md:my-5 mx-5">
            <h3>Best selling</h3>
            <div className="flex gap-4">
              <button
                aria-label="size"
                className=" w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center p-2 duration-300 transition-all hover:bg-slate-300"
              >
                <Tally3 size={20} />
              </button>
              <button
                aria-label="size"
                className=" w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center p-2 duration-300 transition-all hover:bg-slate-300"
              >
                <Tally2 size={20} />
              </button>
              <button
                aria-label="size"
                className=" w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center p-2 duration-300 transition-all hover:bg-slate-300"
              >
                <Tally4 size={20} />
              </button>
              <button
                aria-label="size"
                className=" w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center p-2 duration-300 transition-all hover:bg-slate-300"
              >
                <Tally5 size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mx-2">
            {currentIndex.map((product, index) => (
              <div key={index} className="flex flex-col gap-2">
                <img src={product.src} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <p>{product?.reducePrice}</p>
                <div className="flex gap-2">
                  {product.color1 && <div className={product.color1}></div>}
                  {product.color2 && <div className={product.color2}></div>}
                  {product?.color3 && <div className={product.color3}></div>}
                </div>
              </div>
            ))}
          </div>
          {/* 📄 Pagination */}
          <div className="pb-10">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(products.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};
