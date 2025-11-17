import { useProductsByCategory } from "../../api/Product.API";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

gsap.registerPlugin(ScrollTrigger); // ✅ N'oubliez pas d'enregistrer le plugin

export const MenFashion = () => {
  const { data: men = [], isLoading, isError } = useProductsByCategory("men");
  console.log("filter product men", men);

  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    // ✅ VÉRIFIER que sectionRef.current existe ET qu'il y a des données
    if (!sectionRef.current || !men.length) return;

    const elements = sectionRef.current.querySelectorAll(".scroll-image");

    // ✅ VÉRIFIER qu'il y a des éléments à animer
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
  }, [men]); // ✅ AJOUTER men comme dépendance pour re-animer quand les données arrivent

  const handleHover = (index) => {
    // ✅ VÉRIFIER que la référence existe
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
    // ✅ VÉRIFIER que la référence existe
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
    return (
      <div className="text-center flex items-center justify-center font-extrabold bg-red-100 shadow-md py-3 px-4">
        Error occurred when fetching products: {isError.message}
      </div>
    );
  }

  // ✅ VÉRIFIER que men est un tableau avant de mapper
  if (!men || men.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-600">
          No men's products found
        </h2>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <main className="mx-auto w-full md:max-w-6xl p-2 overflow-x-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-semibold my-2">New Arrivals</h1>
          <p className="text-sm w-full p-4 md:w-1/2 mx-auto">
            Découvrez nos nouvelles collections pour hommes, élégantes et
            modernes.
          </p>
        </div>

        <div className="flex items-center justify-center mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {men.map((item, index) => (
              <div
                key={item._id}
                className="group relative duration-200 transition-all rounded-md shadow-sm hover:shadow-md p-4 border border-gray-100"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleLeave(index)}
              >
                {/* ✅ GRID POUR LES IMAGES */}
                <div className="relative grid grid-cols-2 gap-2 mb-4">
                  {item?.picture?.slice(0, 10).map((img, i) => (
                    <Link
                      key={i}
                      to={`/product-details/${item._id}`}
                      className="block"
                    >
                      <img
                        ref={(el) => {
                          if (i === 0) imageRefs.current[index] = el;
                        }}
                        src={img.url}
                        alt={`${item.clotheName} - Vue ${i + 1}`}
                        className={`object-cover scroll-image w-full h-28 rounded-md transition-all duration-300 ${
                          i === 0
                            ? "group-hover:scale-105"
                            : "group-hover:opacity-90"
                        }`}
                      />
                    </Link>
                  ))}
                </div>

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-200 rounded-md pointer-events-none"></div>

                {/* ✅ Informations du produit */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{item.clotheName}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(item.rate || 0) ? (
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
                        ({item.rate || 0})
                      </span>
                    </div>
                    <span className="font-bold text-lg">
                      {item.price?.toLocaleString()} NGN
                    </span>
                  </div>

                  {item.discountPrice && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-red-600 font-semibold">
                        {item.discountPrice.toLocaleString()} NGN
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {item.price?.toLocaleString()} NGN
                      </span>
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
