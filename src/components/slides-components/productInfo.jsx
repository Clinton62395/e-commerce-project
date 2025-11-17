import React, { useEffect, useState, useMemo } from "react";
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
  ChevronLeft,
} from "lucide-react";
import { UseCart } from "../../services/provider";
import { getProductById } from "../../api/Product.API";
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

  // React Query
  const { id } = useParams();
  console.log("ID récupéré:", id);
  const {
    isPending,
    error,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  console.log("Product details:", product);
  console.log("Product ID:", product._id);
  console.log("Loading state:", isPending);
  console.log("Error state:", error);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const { addProduct, handleDecrease, handleIncrease, cart } = UseCart();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Préparer les images pour l'affichage
  const allImages = useMemo(() => {
    if (!product) return [];

    const images = [];

    // Ajouter l'image principale si elle existe
    // if (product.mainImage && product.mainImage.url) {
    //   images.push(product.mainImage.url);
    // }

    // Ajouter les images secondaires (pictures)
    if (product.picture && Array.isArray(product.picture)) {
      product.picture.forEach((picture) => {
        if (picture && picture.url) {
          images.push(picture.url);
        }
      });
    }

    // Si aucune image n'est disponible, utiliser une image par défaut
    if (images.length === 0) {
      images.push("/paginationImage6.png");
    }

    return images;
  }, [product]);

  const displayImage = allImages[selectedImage] || allImages[0];

  const productInCart = cart.find((item) => item.id === id);

  // Fonction pour ajouter au panier
  const handleAddToCart = () => {
    if (!product) return;

    addProduct({
      id: product._id,
      name: product.clotheName,
      price: product.discountPrice || product.price,
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Product not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 px-3 py-2 mb-10 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300"
        aria-label="back"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
        <span className="text-sm text-black font-medium">Go Back</span>
      </button>

      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
        <div
          className={`flex flex-col lg:flex-row items-start gap-4 lg:gap-8  ${
            isMobile ? "mt-12" : "mt-0"
          }`}
        >
          {/* Side Images - Utilisation de pictures */}
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
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(index)}
                  className={`${
                    isMobile ? "w-16 h-16" : "w-24 h-24"
                  } rounded-md object-cover cursor-pointer transition-all ${
                    selectedImage === index
                      ? "border-2 border-green-500 p-1"
                      : "hover:border-2 hover:border-gray-300"
                  } flex-shrink-0`}
                  alt={`Product view ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Main Image - Utilisation de displayImage */}
          <div
            className={`${
              isMobile ? "w-full order-1" : "flex-1 max-w-xl order-2 h-full"
            }`}
          >
            <img
              src={displayImage}
              onClick={() => setZoom(!zoom)}
              className={`w-full ${
                isMobile ? "h-64" : "min-h-[600px]"
              } object-cover rounded-lg ${
                zoom ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              alt={product.clotheName || "Product image"}
            />
            {zoom && (
              <div
                onClick={() => setZoom(false)}
                className="fixed inset-0 bg-black/50 bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
              >
                <img
                  src={displayImage}
                  alt={`Zoom - ${product.clotheName}`}
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
            <h1 className="text-2xl font-bold">{product.clotheName}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-gray-600">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <span key={i}>
                    {currentRating <= Math.floor(product.rate || 0) ? (
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
              <span className="text-sm">({product.rate || 0}/5.0)</span>
            </div>

            {/* Flash Sale & Stock */}
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
                  Only {product.quantity || 0} item(s) left in stock!
                </p>
                <BorderLinearProgress
                  variant="determinate"
                  value={((product.quantity || 0) / 20) * 100}
                />
              </div>
            </div>

            {/* Price & Details */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">
                  {(
                    product.discountPrice ||
                    product.price ||
                    0
                  ).toLocaleString()}
                  ₦
                </span>
                {product.discountPrice &&
                  product.discountPrice !== product.price && (
                    <span className="text-gray-500 line-through">
                      {product.price.toLocaleString()}₦
                    </span>
                  )}
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {(product.size && Array.isArray(product.size)
                    ? product.size
                    : ["M", "L", "XL"]
                  ).map((size, i) => (
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
                  {(product.color && Array.isArray(product.color)
                    ? product.color
                    : ["#8DB4D2", "#000000", "#FFD1DC"]
                  ).map((color, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full hover:ring-2 ring-offset-2 ring-gray-400 transition-all"
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <button
                    onClick={() => handleDecrease(product._id)}
                    className="p-2 border-2 border-gray-300 hover:bg-gray-100 flex items-center justify-center w-10 h-10 rounded-md transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-semibold min-w-8 text-center">
                    {productInCart ? productInCart.quantity : 0}
                  </span>
                  <button
                    onClick={() => handleIncrease(product._id)}
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

              {/* Additional Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center py-4">
                <button className="flex gap-2 items-center text-sm hover:text-blue-600 transition-colors">
                  <ArrowDownUp size={isMobile ? 16 : 18} />
                  Compare
                </button>
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  className="flex gap-2 items-center text-sm"
                  size={isMobile ? "small" : "medium"}
                >
                  <MessageCircleQuestionMark size={isMobile ? 16 : 18} />
                  Ask a question
                </Button>
                <button className="flex gap-2 items-center text-sm hover:text-blue-600 transition-colors">
                  <Share2 size={isMobile ? 16 : 18} />
                  Share
                </button>
              </div>

              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>Ask About This Product</DialogTitle>
                <DialogContent className="p-6">
                  <DialogContentText className="mb-4 text-gray-700 text-sm">
                    Ask your question about this product, we'll reply as soon as
                    possible
                  </DialogContentText>
                  <textarea
                    placeholder="Your questions here..."
                    className="w-full h-32 resize-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-sm"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant="contained">
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Additional Info */}
              <div className="space-y-3">
                <h3 className="flex gap-2 items-center font-semibold text-base">
                  <Car size={isMobile ? 16 : 18} /> Estimated Delivery:{" "}
                  <span className="text-sm font-normal">Jul 30 - Aug 03</span>
                </h3>
                <h3 className="flex gap-2 items-center font-semibold text-base">
                  <Inbox size={isMobile ? 16 : 18} /> Free Shipping & Returns:
                  <span className="text-sm font-normal">
                    On all orders over $75
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
