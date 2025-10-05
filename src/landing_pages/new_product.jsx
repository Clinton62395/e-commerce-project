import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import jacket from "/jacket.png";
import whitedress from "/whitedress.png";
import sweater from "/sweater.png";
import dressblanc from "/dressblanc.png";
import colorfulldress from "/colorfulldress.png";
import shirtwhite from "/shirtwhite.png";

export const NewProduct = () => {
  const newArrivals = [
    {
      image: jacket,
      price: 95.5,
      rate: <Star size={15} />,
      description: "Shiny Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: whitedress,
      price: 95.5,
      rate: <Star size={15} />,
      description: "Long Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: sweater,
      price: 95.5,
      rate: <Star size={15} />,
      description: "Full Sweater",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: dressblanc,
      price: 95.5,
      rate: <Star size={15} />,
      description: "White Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: colorfulldress,
      price: 95.5,
      rate: <Star size={15} />,
      description: "Colorful Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: shirtwhite,
      price: 95.5,
      rate: <Star size={15} />,
      description: "White Shirt",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
  ];
  return (
    <div>
      <main className="mx-auto max-w-6xl ">
        <div className="text-center ">
          <h1 className="text-3xl  fontsemibold my-2 ">New Arrivals</h1>
          <p className="text-sm  w-1/2  mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 ">
          {newArrivals.map((item, index) => (
            <div
              key={index}
              className="group relative duration-200 transition-all rounded-md shadow-sm hover:shadow-md p-2"
            >
              <div className="relative ">
                <img
                  src={item.image}
                  alt={item.description}
                  className=" object-cover rounded-md transition-all duration-500 transform group-hover:-translate-x-2"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-md pointer-events-none"></div>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-sm ">
                  {item.description}
                  {item.spseudo}
                </span>
                <div className="flex justify-end gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-200 text-sm ">
                      {item.rate}
                    </span>
                  ))}
                </div>
              </div>
              {item.review}
              <div className="flex justify-between text-sm">
                $ {item.price}
                <span className="text-sm text-red-500 ">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center my-4">
          <button className="bg-black/80 duration-200 transition-all hover:shadow-sm text-white rounded-md py-2 fontsemibold px-6 hover:bg-black">
            View more
          </button>
        </div>
      </main>
    </div>
  );
};
