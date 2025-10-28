import React from "react";

import { ArrowUp, ShoppingCart } from "lucide-react";
import {
  CountdownTimer,
  dynamicImages,
  images,
  slideImages,
  SlidePagination,
} from "../components/slides-components/slide_pagination";
import { Link } from "react-router-dom";
import {
  ServiceTime,
  SocioMediaProfile,
  SubscriptNewLetter,
} from "../components/slides-components/component_section";
import { NewProduct } from "../landing_pages/new_product";

export const Home = () => {
  return (
    <>
      <main id="home" className="bg-white mt-10 overflow-x-hidden ">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 p-4 mx-auto max-w-6xl">
          <div className="bg-gray-100 rounded-t-lg flex md:items-end hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
            <img
              src="image-p.png"
              alt="image 1"
              className="object-contain h-full md:h-96 lg:h-full lg:pt-24 "
            />
          </div>
          <div className="bg-gray-100 rounded-t-lg flex flex-col items-center gap-2 hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
            <img
              src="line.png"
              alt="image 2"
              className="object-contain  h-full md:h-96 lg:h-full"
            />
            <h2 className="text-5xl md:text-7xl font-bold  leading-none">
              ULTIMATE
            </h2>
            <h2
              className="text-5xl md:text-8xl font-bold leading-none"
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
        <div className="flex items-center flex-wrap justify-center gap-4  md:gap-16 py-8 px-2 border-t hover:scale-105 duration-300 shadow-sm hover:shadow-lg">
          <span className="text-2xl font-serif font-bold">CHANEL</span>
          <span className="text-2xl font-serif tracking-wide">
            LOUIS VUITTON
          </span>
          <span className="text-2xl font-serif font-bold">PRADA</span>
          <span className="text-2xl tracking-tight">Calvin Klein</span>
          <span className="text-2xl font-bold tracking-widest">DENIM</span>
        </div>
        <Link
          to="shop"
          className="fixed bottom-8 right-8 bg-black/80  text-white p-4 rounded-full shadow-lg hover:bg-gray-800 duration-200 transition-all z-[100] hover:shadow-md"
        >
          <ShoppingCart size={24} />
        </Link>
        <button
          onClick={() => {
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="fixed bottom-24 right-8 hover:text-white bg-white text-black p-4 rounded-full shadow-lg border hover:bg-gray-900 duration-200 transition-all z-[100] hover:shadow-md"
        >
          <ArrowUp size={24} />
        </button>
        <div className="my-5 flex flex-col space-y-4">
          <SlidePagination
            slideId="slider1"
            images={images}
            centeredSlides={true}
          />
        </div>
        <div className="min-h-screen flex flex-col md:flex-row  w-full  items-center justify-center gap-y-5 md:gap-2 mx-auto max-6xl">
          <div className=" max-w-md min-w-0">
            <CountdownTimer />
          </div>
          <div className="relative flex-1 w-full  min-w-0 p-2">
            <SlidePagination
              slideId="slider2"
              images={slideImages}
              spaceBetween={0}
              slidesPerView={3}
              initialSlide={2}
              centeredSlides={false}
              activeImageSize="w-36 h-36 md:w-80 md:h-full"
              inactiveImageSize="w-24 h-24 md:w-56 md:h-56"
              autoplayDelay={5000}
              navigationPosition="absolute transform translate-x-1/2 z-10 flex"
            />
            {/* promo card */}

            <div className=" absolute text-sm bottom-4 z-10 text-center rounded-md shadow-md p-2  bg-slate-300 text-black h-18  md:h-20">
              <h4 className="text-sm  md:text-lg font-semibold">
                01 Spring Sale
              </h4>
              <span className="text-sm  md:text-xl font-semibold">30% OFF</span>
            </div>
          </div>
        </div>

        <div className="min-h-screen flex flex-col  ">
          {/* new prouct monponent  */}
          <NewProduct />
          {/* service time component */}
          <ServiceTime />

          {/* sociol media profile picture component  */}

          <SocioMediaProfile />

          {/* scribscript new letter component  */}
          <SubscriptNewLetter />
        </div>
        {/* footer */}
        <footer className="p-5 border-2 border-t shadow-sm">
          <div className=" w-full py-4  flex items-center flex-wrap   md:justify-between max-w-4xl mx-auto">
            <div>
              <Link
                className="tex-2xl font-bold -tracking-wide leading-relaxed"
                to="/"
              >
                FASCO
              </Link>
            </div>
            <div className="flex gap-2 flex-wrap md:gap-4">
              <Link>Support Center</Link>
              <Link>Invoicing</Link>
              <Link>Contract</Link>
              <Link>Careers</Link>
              <Link>Blog</Link>
              <Link>FAQ,s</Link>
            </div>
          </div>
          <span className="text-center text-xs flex justify-center items-center mt-5">
            {" "}
            Copyright © 2022 Xpro . All Rights Reseved.
          </span>
        </footer>
      </main>
    </>
  );
};
