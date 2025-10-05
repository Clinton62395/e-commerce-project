import React from "react";

import { ArrowUp, ShoppingCart } from "lucide-react";
import {
  CountdownTimer,
  images,
  slideImages,
  SlidePagination,
} from "../components/slides-components/slide_pagination";

export const Home = () => {
  return (
    <>
      <main className="bg-white mt-10  ">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 p-4 mx-auto max-w-6xl">
          <div className="bg-gray-100 rounded-t-lg flex items-end hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
            <img
              src="image-p.png"
              alt="image 1"
              className="object-contain h-full md:h-96 lg:h-full lg:pt-24"
            />
          </div>
          <div className="bg-gray-100 rounded-t-lg flex flex-col items-center gap-2 hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
            <img
              src="line.png"
              alt="image 2"
              className="object-contain h-full md:h-96 lg:h-full"
            />
            <h2 className="text-7xl font-bold  leading-none">ULTIMATE</h2>
            <h2
              className="text-8xl font-bold leading-none"
              style={{
                WebkitTextStroke: "2px black",
                WebkitTextFillColor: "transparent",
              }}
            >
              SALE
            </h2>
            <p className="text-gray-600 text-sm tracking-widest ">
              NEW COLLECTION
            </p>
            <button className="bg-black text-white px-10 py-2 rounded-lg hover:bg-gray-800 font-medium">
              SHOP NOW
            </button>
            <img src="shopingphoto.png" alt="line" className="mt-4" />
          </div>
          <div className="bg-gray-100 rounded-t-md flex items-end hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
            <img
              src="image 227.png"
              alt="image 3"
              className="object-contain h-full md:h-96 lg:h-full lg:pt-24"
            />
          </div>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-4 md:gap-16 py-8 border-t hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
          <span className="text-2xl font-serif font-bold">CHANEL</span>
          <span className="text-2xl font-serif tracking-wide">
            LOUIS VUITTON
          </span>
          <span className="text-2xl font-serif font-bold">PRADA</span>
          <span className="text-2xl tracking-tight">Calvin Klein</span>
          <span className="text-2xl font-bold tracking-widest">DENIM</span>
        </div>

        <button className="fixed bottom-8 right-8 bg-black/80  text-white p-4 rounded-full shadow-lg hover:bg-gray-800 duration-200 transition-all z-[100] hover:shadow-md">
          <ShoppingCart size={24} />
        </button>
        <button className="fixed bottom-24 right-8 hover:text-white bg-white text-black p-4 rounded-full shadow-lg border hover:bg-gray-900 duration-200 transition-all z-[100] hover:shadow-md">
          <ArrowUp size={24} />
        </button>
        <div className="my-5 flex flex-col space-y-4">
          <SlidePagination slideId="slider1" images={images} />
        </div>

        <div className="relative flex flex-col  items-center justify-center gap-4 mx-auto max-6xl">
          <div className="">
            <CountdownTimer />
          </div>
          <SlidePagination
            slideId="slider2"
            images={slideImages}
            slidesPerView={2}
            containerMaxWidth="max-w-md"
            initialSlide={2}
            centeredSlides={false}
            activeImageSize="w-40 h-40 md:w-56 md:h-56"
            inactiveImageSize="w-32 h-32 md:w-48 md:h-48"
          />
        </div>
      </main>
    </>
  );
};
