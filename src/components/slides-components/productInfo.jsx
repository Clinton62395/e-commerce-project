import React, { useEffect, useState } from "react";
import { CountdownTimer } from "./slide_pagination";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Skeleton, Box, useMediaQuery, useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import {
  ArrowDownUp,
  Eye,
  MessageCircleQuestionMark,
  Minus,
  Plus,
  Share2,
  Star,
  Check,
  ShoppingCart,
  Car,
  Inbox,
} from "lucide-react";
import { UseCart } from "../../services/provider";
import Badge from "@mui/material/Badge";
import { getSingleProduct } from "../../api/Product.API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Progress bar from Material UI
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#EF2D2D",
  },
}));

export const ProductDetails = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [loading, setIsloading] = useState(false);

  // React Query - Correction des paramètres
  const { id } = useParams(); // Changer _id en id

  const {
    isPending,
    error,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id], // Utiliser "product" au singulier pour un produit spécifique
    queryFn: () => getSingleProduct(id), // Passer l'id explicitement
    enabled: !!id, // Ne lancer la requête que si l'id existe
    staleTime: 1000 * 60 * 5,
  });

  console.log("Product details:", product);
  console.log("Product ID:", id);
  console.log("Loading state:", isPending);
  console.log("Error state:", error);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const { addProduct, handleDecrease, handleIncrease, cart } = UseCart();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Utiliser les données de l'API ou les données mock en attendant
  const productData = product || {
    mainImage: "/paginationImage6.png",
    images: [
      "/paginationImage6.png",
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYlYYTNEeJqR2LGjlHk-xyqD-on7maX6CQUiFjtiu8dcjGoL8FEDeP0GW6IpD7ULXLwU69xHulnxAbgHDo77XpLvDLElsygwfwPN-b6FuQRxxDiDY4xV_3wI7EuVXDtVq0vw&usqp=CAc",
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSEs26HnIdXYe9tswKBDfvbCeGi9bdWeDtj4VdhzoTp653aUdNwzJG9NIZQ3w1dpeQyO0BXI9meoeueYf9-TI-saDNC4eRpXLu0qW67JbZK8KkZEmWT&usqp=CAc",
    ],
    clotheName: "Casual Long Sleeve Graphic T-Shirt",
    description: "Perfect blend of style and comfort for everyday wear",
    price: 68000,
    discountPrice: 62400,
    rate: 4.8,
    quantity: 9,
    size: ["M", "L", "XL", "XXL"],
    colors: ["#8DB4D2", "#000000", "#FFD1DC"],
  };

  // Préparer les images pour l'affichage
  const productImages =
    productData.images ||
    (productData.mainImage ? [productData.mainImage] : []);

  const allImages =
    productImages.length > 0
      ? productImages
      : [
          "/paginationImage6.png",
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYlYYTNEeJqR2LGjlHk-xyqD-on7maX6CQUiFjtiu8dcjGoL8FEDeP0GW6IpD7ULXLwU69xHulnxAbgHDo77XpLvDLElsygwfwPN-b6FuQRxxDiDY4xV_3wI7EuVXDtVq0vw&usqp=CAc",
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSEs26HnIdXYe9tswKBDfvbCeGi9bdWeDtj4VdhzoTp653aUdNwzJG9NIZQ3w1dpeQyO0BXI9meoeueYf9-TI-saDNC4eRpXLu0qW67JbZK8KkZEmWT&usqp=CAc",
        ];

  const displayImage = allImages[selectedImage] || allImages[0];

  const productInCart = cart.find((item) => item.id === id);

  // Fonction pour ajouter au panier
  const handleAddToCart = () => {
    addProduct({
      id: id,
      name: productData.clotheName,
      price: productData.discountPrice || productData.price,
      image: displayImage,
      quantity: 1,
    });

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1000);
  };

  useEffect(() => {
    setIsloading(true);
    const timer = setTimeout(() => setIsloading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // États de chargement et d'erreur
  if (isPending || loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Side Images Skeleton */}
          <Box className="order-2 lg:order-1 lg:w-24">
            <Box className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={96}
                  height={96}
                  className="flex-shrink-0"
                />
              ))}
            </Box>
          </Box>

          {/* Main Image Skeleton */}
          <Box className="flex-1 order-1 lg:order-2">
            <Skeleton
              variant="rounded"
              width="100%"
              height={isMobile ? 300 : isTablet ? 400 : 600}
            />
          </Box>

          {/* Product Info Skeleton */}
          <Box className="flex-1 space-y-4 bg-orange-50 p-4 lg:p-6 rounded-sm order-3">
            <Skeleton variant="text" width="80%" height={40} />
            <Box className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} variant="circular" width={20} height={20} />
              ))}
            </Box>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="rounded" width="100%" height={60} />
            <Skeleton variant="text" width="40%" height={25} />
          </Box>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading product
          </h2>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
      <div
        className={`flex flex-col lg:flex-row items-start gap-4 lg:gap-8 ${
          isMobile ? "mt-12" : "mt-0"
        }`}
      >
        {/* Side Images */}
        <div
          className={`${
            isMobile ? "w-full order-2" : "w-24 order-1"
          } flex-shrink-0`}
        >
          <div
            className={`flex ${
              isMobile
                ? "flex-row gap-2 overflow-x-auto pb-4"
                : "flex-col gap-3"
            }`}
          >
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(i)}
                className={`${
                  isMobile ? "w-16 h-16" : "w-24 h-24"
                } rounded-md object-cover cursor-pointer transition-all ${
                  selectedImage === i
                    ? "border-2 border-green-500 p-1"
                    : "hover:border-2 hover:border-gray-300"
                } flex-shrink-0`}
                alt={`Product view ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div
          className={`${
            isMobile ? "w-full order-1" : "flex-1 max-w-xl order-2"
          }`}
        >
          <img
            src={displayImage}
            onClick={() => setZoom(!zoom)}
            className={`w-full ${
              isMobile ? "h-64" : "max-h-[700px]"
            } object-cover rounded-lg ${
              zoom ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            alt={productData.clotheName}
          />
          {zoom && (
            <div
              onClick={() => setZoom(false)}
              className="fixed inset-0 bg-black/50 bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <img
                src={displayImage}
                alt={`Zoom - ${productData.clotheName}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div
          className={`${
            isMobile ? "w-full order-3" : "flex-1 order-3"
          } space-y-6 bg-orange-50 p-6 rounded-sm`}
        >
          <h1 className="text-2xl font-bold">{productData.clotheName}</h1>

          <div className="flex items-center gap-2 text-gray-600">
            {[...Array(5)].map((_, i) => {
              const currentRating = i + 1;
              return (
                <span key={i}>
                  {currentRating <= Math.floor(productData.rate || 0) ? (
                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ) : (
                    <StarIcon className="text-gray-300" fontSize="medium" />
                  )}
                </span>
              );
            })}
            <span className="text-sm">({productData.rate}/5.0)</span>
          </div>

          <div className="p-4 rounded-lg space-y-3 bg-white">
            <div className="bg-[#F8CCCC] border border-[#F8CCCC] text-[#FF706B] flex flex-col sm:flex-row justify-between items-center p-3 rounded-md gap-2">
              <p className="text-sm font-medium">Flash Sale Ends In:</p>
              <CountdownTimer
                endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              >
                {({ days, hours, minutes, seconds, completed }) =>
                  completed ? (
                    <p className="font-semibold">Time is over</p>
                  ) : (
                    <div className="flex gap-2 items-center text-sm">
                      <span>{days}d</span>
                      <span>{hours}h</span>
                      <span>{minutes}m</span>
                      <span>{seconds}s</span>
                    </div>
                  )
                }
              </CountdownTimer>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                Only {productData.quantity} item(s) left in stock!
              </p>
              <BorderLinearProgress
                variant="determinate"
                value={(productData.quantity / 20) * 100} // Assuming max stock is 20
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">
                {(
                  productData.discountPrice || productData.price
                ).toLocaleString()}
                ₦
              </span>
              {productData.discountPrice && (
                <span className="text-gray-500 line-through">
                  {productData.price.toLocaleString()}₦
                </span>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {(productData.size || ["M", "L", "XL"]).map((size, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Select Color</h3>
              <div className="flex items-center gap-3">
                {(productData.colors || ["#8DB4D2", "#000000", "#FFD1DC"]).map(
                  (color, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full hover:ring-2 ring-offset-2 ring-gray-400 transition-all"
                      style={{ backgroundColor: color }}
                    ></button>
                  )
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <button
                  onClick={() => handleDecrease(id)}
                  className="p-2 border-2 border-gray-300 hover:bg-gray-100 flex items-center justify-center w-10 h-10 rounded-md transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-lg font-semibold min-w-8 text-center">
                  {productInCart ? productInCart.quantity : 0}
                </span>
                <button
                  onClick={() => handleIncrease(id)}
                  className="p-2 border-2 border-gray-300 hover:bg-gray-100 flex items-center justify-center w-10 h-10 rounded-md transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddedToCart}
                className={`
                  relative overflow-hidden group
                  flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300
                  ${
                    isAddedToCart
                      ? "bg-green-600 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isAddedToCart ? (
                  <>
                    <Check size={20} className="animate-bounce" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Additional product info would go here... */}
          </div>
        </div>
      </div>
    </div>
  );
};
