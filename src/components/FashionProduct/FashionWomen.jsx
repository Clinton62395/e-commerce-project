import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductsByCategory } from "../../api/Product.API";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const WomenFashion = () => {
  const {
    data: women = [],
    isLoading,
    isError,
    error,
  } = useProductsByCategory("women");

  console.log("filter product women", women);

  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    // ✅ Vérifier que sectionRef.current existe
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".scroll-image");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [women]);

  const handleHover = (index) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 1.1,
        rotate: 2,
        duration: 0.4,
        ease: "power2.out",
        filter: "brightness(1.1) drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
      });
    }
  };

  const handleLeave = (index) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.inOut",
        filter: "none",
      });
    }
  };

  const svgStar = {
    noted: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6646 7.12771L9.5 0L7.33536 7.12771H0L5.93479 11.742L3.73214 19L9.5 14.5146L15.2679 19L13.0652 11.742L19 7.12771H11.6646Z"
          fill="#FCA120"
        />
      </svg>
    ),
    noNoted: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6646 7.12771L9.5 0L7.33536 7.12771H0L5.93479 11.742L3.73214 19L9.5 14.5146L15.2679 19L13.0652 11.742L19 7.12771H11.6646Z"
          fill="#b9b7b5"
        />
      </svg>
    ),
  };

  if (isLoading) {
    return (
      <div className="bg-black/90 flex items-center justify-center min-h-[24vh] overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        Error occurred when fetching products: {error?.message}
      </div>
    );
  }

  if (!women || women.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-600">
          No women's products found
        </h2>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <main className="max-w-full w-full md:max-w-7xl p-2  mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold my-2">New Arrivals</h1>
          <p className="text-sm w-full p-4 md:w-1/2 mx-auto">
            Découvrez nos nouvelles collections pour femmes, élégantes et
            modernes.
          </p>
        </div>

        <div className="flex items-center justify-center mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {women.map((product, index) => (
              <div
                key={product._id}
                className="group relative duration-200 transition-all rounded-md shadow-sm hover:shadow-md p-4 border border-gray-100"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
              >
                {/* ✅ CORRECTION : Utiliser pictures au lieu de picture */}
                <div className="relative w-full h-80 mb-4 overflow-hidden rounded-lg">
                  <Link to={`/product-details/${product._id}`}>
                    <img
                      ref={(el) => (imageRefs.current[index] = el)}
                      src={
                        product.picture?.[0]?.url ||
                        product.mainImag?.url ||
                        "/placeholder-image.jpg"
                      }
                      alt={product.clotheName}
                      className="scroll-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* ✅ Overlay effet hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-lg pointer-events-none"></div>
                </div>
                {/* ✅ CORRECTION : Mini-grille pour les images secondaires */}
                {product.picture && product.picture.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {product.picture.slice(1, 4).map((img, i) => (
                      <img
                        key={i}
                        src={img.url || img}
                        alt={`${product.clotheName} ${i + 2}`}
                        className="w-full h-20 object-cover rounded-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                      />
                    ))}
                    {product.picture.length > 4 && (
                      <div className="w-full h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500">
                        +{product.picture.length - 4}
                      </div>
                    )}
                  </div>
                )}

                {/* Informations du produit */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">
                    {product.clotheName}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rate || 0)
                            ? svgStar.noted
                            : svgStar.noNoted}
                        </span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.rate || 0})
                      </span>
                    </div>
                    <span className="font-bold text-lg">
                      {product.price?.toLocaleString()} NGN
                    </span>
                  </div>

                  {product.discountPrice && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-red-600 font-semibold">
                        {product.discountPrice.toLocaleString()} NGN
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {product.price?.toLocaleString()} NGN
                      </span>
                    </div>
                  )}

                  {/* ✅ Afficher les couleurs si disponibles */}
                  {product.color && (
                    <div className="flex gap-2 mt-3">
                      {Array.isArray(product.color) ? (
                        product.color
                          .slice(0, 3)
                          .map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))
                      ) : (
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: product.color }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center my-8">
          <Link
            to="/shop"
            className="bg-black/80 hover:bg-black text-white rounded-md py-3 px-8 font-semibold transition-all duration-200 hover:scale-105"
          >
            View more
          </Link>
        </div>
      </main>
    </div>
  );
};
