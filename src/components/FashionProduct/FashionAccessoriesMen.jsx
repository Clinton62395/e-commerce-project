import React, { useEffect, useRef } from "react";
import { useProductsByCategory } from "../../api/Product.API";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export const MenAccessories = () => {
  const {
    data: menAccessories = [],
    isLoading,
    isError,
  } = useProductsByCategory("menAccessories");
  console.log("filter product men", menAccessories);

  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !menAccessories.length) return;

    const elements = sectionRef.current.querySelectorAll(".scroll-image");
    if (elements.length === 0) return;

    console.log("🎯 Elements found for animation:", elements.length);

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
  }, [menAccessories]);

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

  if (isLoading) {
    return (
      <div className="bg-black/90 flex items-center justify-center min-h-[24vh] overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  if (isError) {
    return <div>error occurred when fetching products : {isError.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-8  max-w-7xl">
      <div ref={sectionRef}>
        <main className="mx-auto w-full p-4 overflow-x-hidden">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Men's Accessories</h1>
            <p>
              Discover a variety of men's accessories, from stylish watches to
              trendy bags that enhance your personal style.
            </p>
          </div>

          {/* ✅ CORRECTION : Grille principale pour TOUS les produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {menAccessories.map((product, index) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-100"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
              >
                {/* ✅ CORRECTION : Conteneur d'image PRINCIPALE */}
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

                {/* ✅ Informations du produit */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {product.clotheName}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rate || 0) ? (
                            <StarIcon
                              className="text-yellow-500"
                              fontSize="small"
                            />
                          ) : (
                            <Star size={16} className="text-gray-300" />
                          )}
                        </span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.rate || 0})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-lg text-gray-900 block">
                        {product.discountPrice
                          ? product.discountPrice.toLocaleString()
                          : product.price?.toLocaleString()}{" "}
                        NGN
                      </span>
                      {product.discountPrice && product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.price.toLocaleString()} NGN
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ✅ Couleurs disponibles */}
                  {product.color && (
                    <div className="flex gap-2 mt-2">
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
                      {Array.isArray(product.color) &&
                        product.color.length > 3 && (
                          <div className="text-xs text-gray-500 flex items-center">
                            +{product.color.length - 3}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            ))}
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
    </div>
  );
};
