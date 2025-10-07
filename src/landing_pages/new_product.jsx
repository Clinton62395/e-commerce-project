import { Star } from "lucide-react";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import jacket from "/jacket.png";
import whitedress from "/whitedress.png";
import sweater from "/sweater.png";
import dressblanc from "/dressblanc.png";
import colorfulldress from "/colorfulldress.png";
import shirtwhite from "/shirtwhite.png";
import sis from "/sis.jpg";
import sar from "/sar.jpg";
import ssarclin from "/ssarclin.jpeg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const NewProduct = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".scroll-image");
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: elements,
          start: "top 90%",
          bottom: "bottom 10%",
          toggleActions: "play reverse play reverse",

          scrub: 1,
          // toggleActions: "play reverse play reverse",
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const imageRefs = useRef([]);
  const handleHover = (index) => {
    gsap.to(imageRefs.current[index], {
      scale: 1.1,
      rotate: 2,
      duration: 0.4,
      ease: "power2.out",
      filter: "brightness(1.1) drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
    });
  };

  const handleLeave = (index) => {
    gsap.to(imageRefs.current[index], {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  // scroll trigger animation using gsap

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
    {
      image: sar,
      price: 95.5,
      rate: <Star size={15} />,
      description: "dress promuim",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: sis,
      price: 95.5,
      rate: <Star size={15} />,
      description: "top dress at cheep price",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
    {
      image: ssarclin,
      price: 95.5,
      rate: <Star size={15} />,
      description: "last modern dress",
      review: "(4.1k) Customer Reviews",
      spseudo: "Al Karam",
      status: "Almost Sold Out",
    },
  ];
  return (
    <div ref={sectionRef}>
      <main className="mx-auto w-full md:max-w-6xl p-2 overflow-x-hidden ">
        <div className="text-center ">
          <h1 className="text-3xl  fontsemibold my-2 ">New Arrivals</h1>
          <p className="text-sm w-full p-4  md:w-1/2  mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2  ">
          {newArrivals.map((item, index) => (
            <div
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleLeave(index)}
              onTouchStart={() => handleLeave(index)}
              onTouchEnd={() => handleLeave(index)}
              key={index}
              className="group relative duration-200 transition-all rounded-md shadow-sm hover:shadow-md p-2"
            >
              <div className="relative overflow-hidden w-full h-72">
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={item.image}
                  alt={item.description}
                  className=" object-cover  scroll-image w-full h-full rounded-md transition-all duration-500 transform group-hover:-translate-x-2"
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
          <Link
            to="/shop"
            className="bg-black/80 duration-200 transition-all hover:shadow-sm text-white rounded-md py-2 fontsemibold px-6 hover:bg-black"
          >
            View more
          </Link>
        </div>
      </main>
    </div>
  );
};
