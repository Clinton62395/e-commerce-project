import React, { useState } from "react";
import {
  BadgeCheck,
  Box,
  HandCoins,
  MousePointer,
  PhoneOutgoing,
  Star,
} from "lucide-react";
import { CountdownTimer, dynamicImages } from "./slide_pagination";
import { progress } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";
import { api } from "../../services/constant";
import { set } from "react-hook-form";

export const ServiceTime = () => {
  return (
    <div className=" bg-slate-100">
      <div className="md:grid md:grid-cols-2 relative my-5 flex items-center justify-center gap-3 w-full mx-auto max-w-6xl flex-wrap md:flex-nowrap">
        <div>
          <img
            src="/homepicture.png"
            alt="homepicture"
            className="w-full h-full "
          />
        </div>

        <div
          style={{
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 7% 100%)",
          }}
          className=" relative bg-[#DADADA]  p-8 md:p-12 "
        >
          <div
            style={{
              clipPath: "polygon(20% 0, 100% 0, 100% 100%, 7% 100%)",
            }}
            className="absolute left-0 top-0 h-wull w-[4px] "
          ></div>
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

            <Link
              to="/shop"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4   bg-white shadow-md p-5 md:p-10 mx-auto">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <HandCoins size={20} className="" />
          <div className="flex flex-col  items-start justify-center text-sm md:text-lg text-gray-800 leading-tight md:leading-relaxed">
            <h3>High Quality</h3>
            <h3>crafted from top materials</h3>
          </div>
        </div>

        <div className="ml-5 flex flex-col md:flex-row gap-3 items-center">
          <BadgeCheck size={20} />
          <div className="flex flex-col items-start justify-center text-sm md:text-lg text-gray-800 leading-tight md:leading-relaxed">
            <h3>Warrany Protection</h3>
            <h3>Over 2 years</h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <Box size={20} />
          <div className="flex flex-col items-start justify-center text-sm md:text-lg text-gray-800 leading-tight md:leading-relaxed">
            <h3>Free Shipping</h3>
            <h3>Order over 150 $</h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 ">
          <PhoneOutgoing size={20} />
          <div className="flex flex-col  items-start justify-center text-sm md:text-lg text-gray-800 leading-tight md:leading-relaxed">
            <h3>24 / 7 Support</h3>
            <h3>Dedicated support</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const SubscriptNewLetter = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [existingEmail, setExistingEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      const res = await toast.promise(api.post("/auth/subscribe", { email }), {
        loading: "Subscribing...",
        success: (res) =>
          res.data.status === "user already subscribed"
            ? setExistingEmail(res.data.email)
            : "Subscription successful.",

        error: (err) =>
          err.response?.data?.message ||
          err.response.data ||
          "Subscription failed. Please try again later.",
      });
      setTimeout(() => {
        setExistingEmail("");
      }, 5000);
    } catch (err) {
      console.log("error occured when subscribing user", err);
      setError("Subscription failed. Please try again later.");
      return;
    }
    setEmail("");
    setError("");

    // handleClose();
  };

  return (
    <div className="min-h-screen p-5 flex flex-col md:flex-row items-center justify-center md:space-x-6 space-y-6 md:space-y-0 bg-gray-50">
      {/* Image gauche */}
      <div className="flex-shrink-0 w-40 sm:w-56 md:w-64 lg:w-72">
        <img
          src="/jacketstyle.png"
          alt="jacketstyle"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Bloc texte + bouton */}
      <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-white/90 shadow-md rounded-md w-full max-w-sm sm:max-w-md md:max-w-lg text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-gray-800">
          Subscribe To Our Newsletter
        </h2>

        <p className="text-xs sm:text-sm md:text-base leading-relaxed mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin.
        </p>

        <p className="text-gray-700 text-xs sm:text-sm text-start mt-4 w-full break-all">
          michael@ymail.com
        </p>

        <div>
          <button
            className="bg-black py-2 flex gap-2 items-center px-5 text-xl text-center text-white font-semibold rounded-md"
            onClick={handleClickOpen}
          >
            Subscribe Now <MousePointer />
          </button>
          <Dialog open={open} onClose={handleClose}>
            <h1 className="text-gray-800 font-semibold ms-10 my-2 text-2xl ">
              Subscribe
            </h1>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <form onSubmit={handleSubmit} id="subscription-form">
                <div>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  {existingEmail && (
                    <p className="text-blue-500 text-sm mt-2">
                      {existingEmail} is already subscribed.
                    </p>
                  )}
                </div>
                <DialogActions>
                  <button
                    onClick={handleClose}
                    className="bg-black/80 duration-300 transition-all hover:bg-black py-2 px-5 rounded-md text-teal-50 hover:text-yellow-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="subscription-form"
                    className="bg-black/80 duration-300 transition-all hover:bg-black py-2 px-5 rounded-md text-teal-50 hover:text-yellow-50"
                  >
                    Subscribe
                  </button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Image droite */}
      <div className="flex-shrink-0 w-40 sm:w-56 md:w-64 lg:w-72">
        <img
          src="/jacketwoman.png"
          alt="jacketwoman"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export const SocioMediaProfile = () => {
  return (
    <div className="min-h-screen justify-center items-center flex flex-col space-y-4">
      <h2 className="text-center text-2xl font-bold mt-10">
        Follow Us On Instagram
      </h2>
      <p className="text-sm leading-relaxed w-full  p-4 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
        sollicitudin{" "}
      </p>
      <div className="grid grid-cols-2 md:flex items-center justify-center mx-2">
        {dynamicImages.map((src, index) => (
          <div key={index} className="">
            <img src={src} className="" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
