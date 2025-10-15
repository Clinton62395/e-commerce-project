import React, { useEffect, useState } from "react";
import { CountdownTimer } from "./slide_pagination";
import StarIcon from "@mui/icons-material/Star";
// modal import
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
  ShoppingCartIcon,
} from "lucide-react";
import { UseCart } from "../../services/provider";
import { ShopingCart } from "../../pages/shoping.Cart";
import Badge from "@mui/material/Badge";

// progress bar from Material UI
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#EF2D2D",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

export const SingleProductInfo = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoom, setZoom] = useState(false);

  const [loading, setIsloading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const handleDismiss = () => setShowPanel(false);
  const { addProduct, handleDerease, handleIncrease, cart } = UseCart();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shopingImage = [
    {
      sideImages: [
        "/paginationImage6.png",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYlYYTNEeJqR2LGjlHk-xyqD-on7maX6CQUiFjtiu8dcjGoL8FEDeP0GW6IpD7ULXLwU69xHulnxAbgHDo77XpLvDLElsygwfwPN-b6FuQRxxDiDY4xV_3wI7EuVXDtVq0vw&usqp=CAc",
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSEs26HnIdXYe9tswKBDfvbCeGi9bdWeDtj4VdhzoTp653aUdNwzJG9NIZQ3w1dpeQyO0BXI9meoeueYf9-TI-saDNC4eRpXLu0qW67JbZK8KkZEmWT&usqp=CAc",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQLwiiEW9XhlL_N6-TLjWKhKE4pCIQIRYGqtuUYvncUvKQ-bZAqFnswqzTqvfhHoGzpZZbpa5dLdW5S6OPE825Czm7GXGnNPLuqTYlGfcfP4HYLedl-&usqp=CAc",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ0KpnX_LZUmbHNpUEUwukvCWdy3ouDkexDskYLxjHjAj-PzSvCySpiY5I9uAIPxdkJWa_ztXeZA1CbLF5xlMwRj6MzD1XGMQM7ywKJ9yrk16U3V02rjB0q6_XiW2YaMGGj&usqp=CAc",
        "https://www.sendcloud.com/wp-content/uploads/2019/11/Reduce_Returns_Fashion.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEa34MxUYg7TzUxHtitEqnWoU-DVpv2GIODw&s",
      ],
      title: "Casual Long Sleeve Graphic T-Shirt",
      description: "Perfect blend of style and comfort for everyday wear",
      price: 59.0,
      reducePrice: 39.0,
      rate: 5,
      view: "24 people are viewing this right now",
      stockLeft: {
        value: 9,
        text: `Only ${9} item(s) left in stock!`,
      },
      stockTotal: 20,
      size: ["M", "L", "XL", "XXL"],
      color1: "w-8 h-8 rounded-full p-2 bg-[#8DB4D2]",
      color2: "w-8 h-8 rounded-full p-2 bg-[#000000]",
      color3: "w-8 h-8 rounded-full p-2 bg-[#FFD1DC]",
      deadline: new Date("2025-10-31T23:59:59"),
    },
  ];

  const currentImage = shopingImage[0];
  const displayImage =
    selectedImage === 0
      ? currentImage.sideImages[0]
      : currentImage.sideImages[selectedImage];

  const productInCard = cart.find((item) => {
    return item.image === displayImage;
  });

  // function wraper
  const handleAddToCart = () => {
    addProduct(
      {
        ...currentImage,
        image: displayImage,
      },
      displayImage
    );
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  useEffect(() => {
    setIsloading(true);
    const timer = setTimeout(() => {
      setIsloading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Squelette de chargement
  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Side Images Skeleton */}
          <Box className="order-2 lg:order-1 lg:w-24">
            <Box className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {[...Array(6)].map((_, i) => (
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

            <Box className="space-y-3">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rounded" width="100%" height={60} />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rounded" width="100%" height={8} />
            </Box>

            <Box className="space-y-4">
              <Box className="flex gap-3">
                <Skeleton variant="text" width={80} height={40} />
                <Skeleton variant="text" width={60} height={30} />
              </Box>

              <Box>
                <Skeleton variant="text" width={100} />
                <Box className="flex gap-2 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      width={48}
                      height={48}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Skeleton variant="text" width={100} />
                <Box className="flex gap-2 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="circular"
                      width={32}
                      height={32}
                    />
                  ))}
                </Box>
              </Box>

              <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton variant="rounded" width="100%" height={48} />
                <Skeleton variant="rounded" width="100%" height={48} />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
        {/* Cart Button - Position responsive */}
        <div
          className={`fixed z-50 ${
            isMobile
              ? "right-4 top-4"
              : isTablet
              ? "right-8 top-6"
              : "right-10 top-7"
          }`}
        >
          <button
            onClick={() => setShowPanel(true)}
            className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Badge
              badgeContent={cart.length}
              color="primary"
              overlap="circular"
              showZero
            >
              <ShoppingCartIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            </Badge>
          </button>
          <ShopingCart open={showPanel} onClose={handleDismiss} />
        </div>

        {/* Main Content - Layout responsive */}
        <div
          className={`flex flex-col lg:flex-row items-start gap-4 lg:gap-8 ${
            isMobile ? "mt-12" : "mt-0"
          }`}
        >
          {/* Side Images Column - Horizontal sur mobile, vertical sur desktop */}
          <div
            className={`${
              isMobile
                ? "w-full order-2"
                : isTablet
                ? "w-20 order-1"
                : "w-24 order-1"
            } flex-shrink-0 lg:sticky lg:top-0`}
          >
            <div
              className={`flex ${
                isMobile
                  ? "flex-row gap-2 overflow-x-auto pb-4"
                  : "flex-col gap-3"
              }`}
            >
              {currentImage.sideImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className={`${
                    isMobile
                      ? "w-16 h-16"
                      : isTablet
                      ? "w-20 h-20"
                      : "w-24 h-24"
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

          {/* Main Image Column */}
          <div
            className={`${
              isMobile ? "w-full order-1" : "h-screen flex-1 max-w-xl order-2 "
            }`}
          >
            <img
              src={displayImage}
              onClick={() => setZoom(!zoom)}
              className={`w-full ${
                isMobile ? "h-64" : isTablet ? " max-h-[700px] " : "h-full"
              } object-cover rounded-lg ${
                zoom ? " cursor-zoom-out" : " cursor-zoom-in"
              }`}
              alt={currentImage.title}
            />
            {zoom && (
              <div
                onClick={() => setZoom(false)}
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
              >
                <img
                  src={displayImage}
                  alt={`zoomImage${currentImage.title}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div
            className={`${
              isMobile ? "w-full order-3" : "flex-1 order-3"
            } space-y-4 lg:space-y-6 bg-orange-50 p-4 lg:p-6 rounded-sm ${
              isMobile ? "" : "lg:max-h-[715px] lg:overflow-y-auto"
            }`}
          >
            <h1 className="text-xl lg:text-2xl font-bold">
              {currentImage.title}
            </h1>

            <div className="flex items-center gap-2 text-gray-600">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <span key={i}>
                    {currentRating <= currentImage.rate ? (
                      <Star
                        size={isMobile ? 16 : 18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ) : (
                      <StarIcon
                        className="text-gray-300"
                        fontSize={isMobile ? "small" : "medium"}
                      />
                    )}
                  </span>
                );
              })}
              <span className="text-sm">(4.8/5.0)</span>
            </div>

            <div className="p-4 rounded-lg space-y-3">
              {currentImage.view && (
                <p className="flex items-center gap-2 text-sm font-medium text-orange-700">
                  <Eye size={isMobile ? 14 : 16} /> {currentImage.view}
                </p>
              )}
              <div className="bg-[#F8CCCC] border border-[#F8CCCC] text-[#FF706B] flex flex-col sm:flex-row justify-between items-center p-3 rounded-md gap-2">
                <p className="text-sm font-medium">Flash Sale Ends In:</p>
                <CountdownTimer endDate={currentImage.deadline}>
                  {({ days, hours, minutes, seconds, completed }) =>
                    completed ? (
                      <p className="font-semibold">Time is over</p>
                    ) : (
                      <div className="flex gap-1 sm:gap-2 items-center justify-center text-sm">
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
                <p className="text-sm">{currentImage.stockLeft.text}</p>
                <BorderLinearProgress
                  variant="determinate"
                  value={currentImage.stockLeft.value}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">
                  ${currentImage.reducePrice}
                </span>
                <span className="text-gray-500 line-through">
                  ${currentImage.price}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {currentImage.size.map((size, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors text-sm lg:text-base"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Select Color</h3>
                <div className="flex items-center gap-3">
                  {[
                    currentImage.color1,
                    currentImage.color2,
                    currentImage.color3,
                  ]
                    .filter(Boolean)
                    .map((color, i) => (
                      <button
                        key={i}
                        className={`${
                          isMobile ? "w-6 h-6" : "w-8 h-8"
                        } rounded-full hover:ring-2 ring-offset-2 ring-gray-400 transition-all ${color}`}
                      ></button>
                    ))}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <button
                    onClick={() => handleDerease(displayImage)}
                    className="p-2 border-2 border-gray-300 hover:bg-gray-100 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-md transition-colors"
                  >
                    <Minus size={isMobile ? 16 : 18} />
                  </button>
                  <span className="text-lg font-semibold min-w-8 text-center">
                    {productInCard ? productInCard.quantity : 0}
                  </span>
                  <button
                    onClick={() => handleIncrease(displayImage)}
                    className="p-2 border-2 border-gray-300 hover:bg-gray-100 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-md transition-colors"
                  >
                    <Plus size={isMobile ? 16 : 18} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                  className={`
                    relative overflow-hidden group
                    flex items-center justify-center gap-2
                    px-4 lg:px-6 py-3 rounded-xl
                    font-semibold text-sm lg:text-base
                    transition-all duration-300
                    ${
                      isAddedToCart
                        ? "bg-green-600 text-white"
                        : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg hover:shadow-xl
                  `}
                >
                  {isAddedToCart ? (
                    <>
                      <Check
                        size={isMobile ? 18 : 20}
                        className="animate-bounce"
                      />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart
                        size={isMobile ? 18 : 20}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>Add to Cart</span>
                    </>
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>

              {/* Action Buttons */}
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

              <hr className="border-gray-300" />

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

              <div className="flex items-center justify-center flex-col gap-2 p-6 rounded-sm bg-[#F8F8F8] border border-gray-200">
                <img
                  src="/service-transfer.png"
                  alt="Secure checkout"
                  className="w-80"
                />
                <p className="text-sm text-gray-600 text-center">
                  Guarantee safe & secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
