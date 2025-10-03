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
      rate: <Star />,
      description: "Shiny Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: whitedress,
      price: 95.5,
      rate: <Star />,
      description: "Long Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: sweater,
      price: 95.5,
      rate: <Star />,
      description: "Full Sweater",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: dressblanc,
      price: 95.5,
      rate: <Star />,
      description: "White Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: colorfulldress,
      price: 95.5,
      rate: <Star />,
      description: "Colorful Dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: shirtwhite,
      price: 95.5,
      rate: <Star />,
      description: "White Shirt",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
  ];
  return (
    <div>
      <main>
        <h1>New Arrivals</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 mx-auto max-w-6xl">
          {newArrivals.map((item, index) => (
            <div
              key={index}
              className="rounded-md shadow-sm hover:shadow-md p-2"
            >
              <img src={item.image} alt={item.description} />
              <div className="flex justify-between">
                <span>
                  {item.description}
                  {item.spseudo}
                </span>
                {item.rate}
              </div>
              {item.review}
              <div className="flex justify-between ">
                $ {item.price}
                <span className="text-sm text-red ">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
