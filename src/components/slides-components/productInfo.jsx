import React, { useState } from "react";
import { CountdownTimer } from "./slide_pagination";
import StarIcon from "@mui/icons-material/Star";
// modal import
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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
import { Link } from "react-router-dom";
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

// Modal from Material UI

export const SingleProductInfo = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const handleDismiss = () => setShowPanel(false);

  const { addProduct, handleDerease, handleIncrease, cart } = UseCart();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedImage, setSelectedImage] = useState(0);

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

  return (
    <>
      <div className=" min-h-screen max-w-7xl mx-auto px-4 py-8">
        <div className="fixed right-5 md:right-10 top-7 z-50 lg:right-20">
          <button onClick={() => setShowPanel(true)}>
            <Badge
              badgeContent={cart.length}
              color="primary"
              overlap="circular"
              showZero
            >
              <ShoppingCartIcon />
            </Badge>
          </button>
          <ShopingCart open={showPanel} onClose={handleDismiss} />
        </div>
        <div className="flex items-start gap-8">
          {/* Side Images Column */}
          <div className="w-24 flex-shrink-0">
            <div className="flex flex-col gap-3 sticky top-4">
              {currentImage.sideImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className={`w-24 h-24 rounded-md object-cover cursor-pointer transition-all ${
                    selectedImage === i
                      ? "border-2 border-green-500 p-2"
                      : "hover:border-2 hover:border-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Image Column */}
          <div className="flex-1 max-w-xl h-screen">
            <img
              src={displayImage}
              className="w-full h-full max-h-[700px] object-cover rounded-lg"
              alt={currentImage.title}
            />
          </div>

          {/* Product Info Column */}
          <div className="flex-1 space-y-6 bg-orange-50 p-5 rounded-sm h-screen max-h-[715px] ">
            <h1 className="text-2xl font-bold">{currentImage.title}</h1>

            <div className="flex items-center gap-2 text-gray-600">
              {[...Array(5)].map((icone, i) => {
                const currentRating = i + 1;
                return (
                  <span key={i}>
                    {currentRating >= currentImage.rate ? (
                      <Star size={18} />
                    ) : (
                      <StarIcon />
                    )}
                  </span>
                );
              })}
              <span className="text-sm">(4.8/5.0)</span>
            </div>

            <div className=" p-4 rounded-lg space-y-3">
              {currentImage.view && (
                <p className="flex items-center gap-2 text-sm font-medium text-orange-700">
                  <Eye /> {currentImage.view}
                </p>
              )}
              <div className="bg-[#F8CCCC] border border-[#F8CCCC] text-[#FF706B] flex justify-between items-center p-3 rounded-md">
                <p className="text-sm font-medium mb-2">Flash Sale Ends In:</p>
                <CountdownTimer endDate={currentImage.deadline}>
                  {({ days, hours, minutes, seconds, completed }) =>
                    completed ? (
                      <p>Time is over</p>
                    ) : (
                      <div className="flex gap-2 items-center justify-center">
                        <span>{days}:</span>
                        <span> {hours}:</span>
                        <span> {minutes}:</span>
                        <span> {seconds}</span>
                      </div>
                    )
                  }
                </CountdownTimer>
              </div>
              {/* progress bar from material ui */}
              <div className="">
                {currentImage.stockLeft.text}

                <BorderLinearProgress
                  variant="determinate"
                  value={currentImage.stockLeft.value}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">
                  {currentImage.reducePrice}
                </span>
                <span className="text-gray-500 line-through">
                  {currentImage.price}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Select Size</h3>
                <div className="flex gap-3">
                  {currentImage.size.map((size, i) => (
                    <button
                      key={i}
                      className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center hover:border-black transition-colors"
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
                        className={`${color} hover:ring-2 ring-offset-2 ring-gray-400 transition-all`}
                      ></button>
                    ))}
                </div>
              </div>

              {/* button to add product to the panel */}
              <div className="md:grid md:grid-cols-2 flex  justify-center gap-5 items-center">
                <div className="flex gap-5">
                  <button
                    onClick={() => handleDerease(displayImage)}
                    className="p-2 ring-2 hover:bg-slate-100  flex items-center justify-center focus:border border duration-300 transition-all hover:border-[#FDEFEE]  w-8 h-8 rounded-md"
                  >
                    <Minus size={20} />
                  </button>
                  <div className="flex gap-2 h-6 w-6 rounded-full  text-sm font-semibold px-3 py-1">
                    <button className="text-[tomato]/80 font-semibold">
                      {productInCard ? productInCard.quantity : 0}
                    </button>
                  </div>
                  <button
                    onClick={() => handleIncrease(displayImage)}
                    className="p-2 ring-2 hover:bg-slate-100  flex items-center justify-center focus:border border duration-300 transition-all border-[#FDEFEE] w-8 h-8 rounded-md"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={() => addProduct(currentImage, displayImage)}
                  disabled={isAddedToCart}
                  className={`
              relative overflow-hidden group
              flex items-center justify-center gap-2
              px-6 py-3.5 rounded-xl
              font-semibold text-base
              transition-all duration-300
              ${
                isAddedToCart
                  ? "bg-green-600 text-white"
                  : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
            `}
                >
                  {isAddedToCart ? (
                    <>
                      <Check size={20} className="animate-bounce" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>Add to Cart</span>
                    </>
                  )}

                  {/* Animated background effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>

              {/* share button and fgq */}

              <div className="flex my-3 items-center justify-evenly">
                <button className="flex gap-3 items-center">
                  <ArrowDownUp />
                  Compare
                </button>
                <div className=" relative flex gap-3 items-center">
                  {" "}
                  <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    className="flex gap-2 items-center"
                  >
                    <MessageCircleQuestionMark />
                    Ask a question
                  </Button>
                  <Dialog
                    open={open}
                    slots={{
                      transition: Transition,
                    }}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>
                      The best reliable Platform e-commerce plat-forme
                    </DialogTitle>
                    <DialogContent className="p-6">
                      <DialogContentText
                        id="alert-dialog-slide-description"
                        className="mb-4 text-gray-700 text-sm"
                      >
                        Ask your question about this product , we are going to
                        reply to you as soon as possible
                      </DialogContentText>

                      <textarea
                        placeholder="your questions  here..."
                        className="w-full h-32 resize-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-sm text-gray-800 placeholder-gray-400 transition-all duration-200"
                      />

                      <div className="mt-4 flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit
                        </button>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      {/* <Button onClick={handleClose}>Submit</Button> */}
                      <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <button className="flex gap-3 items-center">
                  <Share2 />
                  Share
                </button>
              </div>
              <hr className=" bg-gray-400 " />
              <div>
                <h3 className="flex gap-2 items-center font-semibold text-lg">
                  <Car /> Estimated Delivery:{" "}
                  <span className="text-sm">Jul 30 - Aug 03</span>{" "}
                </h3>
                <h3 className="flex gap-2 items-center font-semibold text-lg">
                  <Inbox /> Free Shipping & Returns:
                  <span className="text-sm"> On all orders over $75</span>{" "}
                </h3>
              </div>
              <button className="flex items-center justify-center flex-col gap-2 p-10 rounded-sm bg-[#F8F8F8] my-5">
                <img src="/service-transfer.png" alt="transfer-logo" />
                <p>Guarantee safe & secure checkout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
