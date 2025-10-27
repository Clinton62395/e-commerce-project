import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import Countdown from "react-countdown";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const slideImages = [
  "/dressblack.png",
  "/jupewhitcap.png",
  "/jolisa.jpg",
  "/clintonsar.jpg",
  "/styletop.png",
];
export const images = [
  "/mainpicture.png",
  "/imageslide.png",
  "/sara.jpg",
  "/shirtwhite.png",
  "/shopingphoto.png",
  "/sweater.png",
];
export const dynamicImages = [
  "/image11.png",
  "/image22.png",
  "/image33.png",
  "/image44.png",
  "/image55.png",
  "/image77.png",
  "/image66.png",
];

export const SlidePagination = ({
  images = [],
  slidesPerView = 3,
  spaceBetween = 0,
  autoplayDelay = 3000,
  loop = true,

  centeredSlides = false,
  showNavigation = true,
  showPagination = true,
  initialSlide = 0,
  activeImageSize = "w-40 h-40 md:w-80 md:h-full ",
  inactiveImageSize = "w-24 h-24 md:w-56 md:h-56",
  containerMaxWidth = "max-w-6xl mx-auto",
  containerHeight = " h-52 md:h-96",
  navigationPosition = "absolute bottom-10 md:left-24  top-56 md:top-72 transform translate-x-1/2   flex justify-center items-center gap-2 z-50",
  navigationButtonClass = "bg-gray-100 flex justify-center items-center duration-500 transition-all rounded-full w-8 h-8 hover:bg-gray-700 text-black hover:text-white",
  slideId = "slider",
}) => {
  const swiperRef = useRef(null);
  useEffect(() => {
    const instance = swiperRef.current?.swiper;
    if (instance) {
      instance.params.navigation.prevEl = `.swiper-button-prev-${slideId}`;
      instance.params.navigation.nextEl = `.swiper-button-next-${slideId}`;
      instance.navigation.init();
      instance.navigation.update();
    }
  }, [slideId]);

  return (
    <div className="relative ">
      <Swiper
        ref={swiperRef}
        className={`${containerMaxWidth} ${containerHeight}`}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={spaceBetween}
        initialSlide={initialSlide}
        slidesPerView={slidesPerView}
        navigation={false}
        centeredSlides={centeredSlides}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        pagination={showPagination ? { clickable: true } : false}
        loop={loop}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={``}>
            {({ isActive }) => (
              <img
                src={src}
                alt={`slide-${index}`}
                className={`rounded-xl transition-all duration-500 object-cover ${
                  isActive ? activeImageSize : inactiveImageSize
                }`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${navigationPosition}`}>
        <button
          className={`swiper-button-prev-${slideId} ${navigationButtonClass}`}
        >
          <CircleChevronLeft size={20} />
        </button>
        <button
          className={`swiper-button-next-${slideId}  ${navigationButtonClass}`}
        >
          <CircleChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

{
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
}

export const CountdownTimer = ({ children }) => {
  const endDate = new Date("2025-10-31T23:59:59").getTime();

  const SegmentDigit = ({ digit }) => {
    // Configuration des segments pour chaque chiffre (0-9)
    const segments = {
      0: [true, true, true, false, true, true, true],
      1: [false, false, true, false, false, true, false],
      2: [true, false, true, true, true, false, true],
      3: [true, false, true, true, false, true, true],
      4: [false, true, true, true, false, true, false],
      5: [true, true, false, true, false, true, true],
      6: [true, true, false, true, true, true, true],
      7: [true, false, true, false, false, true, false],
      8: [true, true, true, true, true, true, true],
      9: [true, true, true, true, false, true, true],
    };

    const activeSegments = segments[digit] || segments["0"];
    const segmentClass = (isActive) =>
      `rounded-sm transition-colors duration-300 ${
        isActive ? "bg-gray-800" : "bg-gray-200"
      }`;

    return (
      <div className="relative mx-1" style={{ width: "24px", height: "40px" }}>
        {/* Segment horizontal haut */}
        <div
          className={segmentClass(activeSegments[0])}
          style={{
            position: "absolute",
            top: 0,
            left: "4px",
            right: "4px",
            height: "4px",
          }}
        />

        {/* Segment vertical haut gauche */}
        <div
          className={segmentClass(activeSegments[1])}
          style={{
            position: "absolute",
            top: "4px",
            left: 0,
            width: "4px",
            height: "14px",
          }}
        />

        {/* Segment vertical haut droit */}
        <div
          className={segmentClass(activeSegments[2])}
          style={{
            position: "absolute",
            top: "4px",
            right: 0,
            width: "4px",
            height: "14px",
          }}
        />

        {/* Segment horizontal milieu */}
        <div
          className={segmentClass(activeSegments[3])}
          style={{
            position: "absolute",
            top: "18px",
            left: "4px",
            right: "4px",
            height: "4px",
          }}
        />

        {/* Segment vertical bas gauche */}
        <div
          className={segmentClass(activeSegments[4])}
          style={{
            position: "absolute",
            bottom: "4px",
            left: 0,
            width: "4px",
            height: "14px",
          }}
        />

        {/* Segment vertical bas droit */}
        <div
          className={segmentClass(activeSegments[5])}
          style={{
            position: "absolute",
            bottom: "4px",
            right: 0,
            width: "4px",
            height: "14px",
          }}
        />

        {/* Segment horizontal bas */}
        <div
          className={segmentClass(activeSegments[6])}
          style={{
            position: "absolute",
            bottom: 0,
            left: "4px",
            right: "4px",
            height: "4px",
          }}
        />
      </div>
    );
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const timeValues = { days, hours, minutes, seconds, completed };

    if (typeof children === "function") {
      return children(timeValues) || null;
    }

    if (completed) {
      return (
        <div className="text-3xl font-bold text-green-600 h-screen flex items-center justify-center">
          Done{" "}
        </div>
      );
    }

    const timeUnits = [
      { label: "Days", value: days },
      { label: "Hours", value: hours },
      { label: "Minutes", value: minutes },
      { label: "Secondes", value: seconds },
    ];

    return (
      <div className=" bg-white  p-6 rounded-2xl shadow-sm ">
        <div className="flex flex-col items-start justify-start p-5">
          <h2 className="font-bold text-2xl font-Volkhov">
            Deals Of The Month
          </h2>
          <p className="text-sm leading-5 my-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin{" "}
          </p>

          <Link
            to="/shop"
            className="bg-black/70 hover:bg-[#000000] duration-300  transition-all py-2 px-5 my-2 rounded-md text-white shadow-lg"
          >
            Buy Now
          </Link>

          <h3 className="text-start font-semibold text-2xl mt-4 mb-2">
            Hurry, Before It’s Too Late!
          </h3>
        </div>

        <div className=" flex justify-center  md:gap-4 ">
          {timeUnits.map((unit, i) => {
            const digits = String(unit.value).padStart(2, "0").split("");

            return (
              <div className="text-center">
                <div key={i} className="bg-gray-50 rounded-xl shadow-md p-2">
                  <div className="flex justify-center ">
                    {digits.map((digit, idx) => (
                      <SegmentDigit key={idx} digit={digit} />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{unit.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return <Countdown date={endDate} autoStart renderer={renderer} />;
};
