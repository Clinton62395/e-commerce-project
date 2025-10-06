import React from "react";

import {
  ArrowUp,
  BadgeCheck,
  Box,
  HandCoins,
  PhoneOutgoing,
  ShoppingCart,
} from "lucide-react";
import {
  CountdownTimer,
  dynamicImages,
  images,
  slideImages,
  SlidePagination,
} from "../components/slides-components/slide_pagination";

export const Home = () => {
  return (
    <>
      <main className="bg-white mt-10 overflow-x-hidden ">
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
              activeImageSize="w-52 h-52 md:w-80 md:h-full"
              inactiveImageSize="w-36 h-36 md:w-56 md:h-56"
              autoplayDelay={5000}
              navigationPosition="absolute transform translate-x-1/2 z-10 flex"
            />
            {/* promo card */}

            <div className=" absolute bottom-4 z-10 text-center rounded-md shadow-md p-2  bg-slate-300 text-black w-32 h-16 md:w-36 md:h-20">
              <h4>01 Spring Sale</h4>
              <span className="text-lg md:text-3xl font-semibold">30% OFF</span>
            </div>
          </div>
        </div>

        {/*  */}
        <div className=" bg-slate-100 ">
          <div className=" relative my-5 flex items-center justify-center gap-3 w-full mx-auto max-w-6xl flex-wrap md:flex-nowrap">
            <di>
              <img
                src="/homepicture.png"
                alt="homepicture"
                className="w-full h-full "
              />
            </di>
            {/* <div
              style={{
                transformOrigin: "bottom left",
                transform: "skewY(-5deg)",
              }}
            >
              <div className="  text-start text-black py-5 px-2  transform ">
                <p className="font-semibold ">Women Collection</p>
                <h2>Peaky Blinders</h2>
                <p className="text-lg font-semibold underline my-2">
                  DESCRIPTION
                </p>
                <p className="text-xs ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Scelerisque duis ultrices sollicitudin aliquam sem.
                  Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Scelerisque duis.
                </p>
                <p className="flex items-center gap-2 text-xs my-2">
                  Size:
                  <span className="bg-black/80 hover:bg-black duration-300 transition-all text-white rounded-md p-2 px-3">
                    M
                  </span>
                </p>
                <p className=" font-semibold">$100.00</p>

                <button className="bg-black/80 my-2 hover:bg-black duration-300 transition-all text-white px-5  py-2 rounded-md">
                  Buy Now
                </button>
              </div>
            </div> */}

            <div
              className="relative bg-gray-100 border-2 border-blue-500 p-8 md:p-12"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 0)",
              }}
            >
              <div className="ml-12 md:ml-24">
                <p className="text-sm text-gray-500 mb-2">Women Collection</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Peaky Blinders
                </h1>

                <h3 className="text-sm font-semibold uppercase mb-3 underline">
                  Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Scelerisque duis ultrices sollicitudin aliquam sem.
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm">Size:</span>
                  <button className="bg-black text-white px-6 py-2 rounded-full text-sm">
                    M
                  </button>
                </div>

                <p className="text-3xl font-bold mb-6">$100.00</p>

                <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="flex  items-center bg-white shadow-md py-5 md:py-10 my-4 justify-evenly">
            <div className="flex gap-3 items-center">
              <HandCoins size={20} />
              <div className="flex flex-col">
                <h3>High Quality</h3>
                <h3>crafted from top materials</h3>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <BadgeCheck size={20} />
              <div className="flex flex-col ">
                <h3>Warrany Protection</h3>
                <h3>Over 2 years</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Box size={20} />
              <div className="flex flex-col">
                <h3>Free Shipping</h3>
                <h3>Order over 150 $</h3>
              </div>
            </div>

            <div className="flex items-center ">
              <PhoneOutgoing size={20} />
              <div className="flex flex-col gap-3">
                <h3>24 / 7 Support</h3>
                <h3>Dedicated support</h3>
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="h-screen justify-center items-center flex flex-col">
          <h2 className="text-center text-2xl font-bold">Follow Us On Instagram</h2>
          <p className="text-sm leading-relaxed w-full  p-4 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin{" "}
          </p>
          <div className="flex items-center justify-center mx-2">
            {dynamicImages.map((src, index) => (
              <div key={index} className="">
                <img src={src} className="" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
