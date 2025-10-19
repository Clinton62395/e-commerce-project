import React from "react";
import { Link } from "react-router-dom";
import { UseCart } from "../services/provider";
import Badge from "@mui/material/Badge";
import { Lock, Minus, Plus } from "lucide-react";

export const Checkout = ({ displayImage }) => {
  const {
    handleDerease,
    handleIncrease,
    clearCart,
    cart,
    totalPrice,
    totalQuantity,
    subTotal,
    ProductPrice,
  } = UseCart();

  const singleImagequantity = (imageId) => {
    const found = cart.find((item) => item.image === imageId);
    return found ? found.quantity : 0;
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50 min-h-screen ">
        {/* Formulaire de checkout */}
        <div className="space-y-8 bg-white p-6 rounded-md shadow-md">
          {/* Contact */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap min-w-0">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className=" flex gap-2 items-center">
                <span>Have an account?</span>{" "}
                <Link
                  to="/register"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-md px-4 py-2 md:py-3"
            />
          </div>

          {/* Livraison */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Delivery</h2>
            <select
              className="w-full border rounded-md px-4 py-2 md:py-3"
              aria-label="list of countries"
            >
              <option disabled selected>
                Country / Region{" "}
              </option>
              <option>Guinea</option>
              <option>Nigeria</option>
              <option>Mali</option>
              <option>Cote D'Ivoire</option>
            </select>
            <div className="bg-[#F5F5F5] space-y-3 rounded-sm shadow-md p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border rounded-md px-4 py-2 md:py-3"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border rounded-md px-4 py-2 md:py-3"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded-md px-4 py-2 md:py-3"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-md px-4 py-2 md:py-3"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="border rounded-md px-4 py-2 md:py-3"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-5 h-5 accent-orange-500" />
                Save this info for future
              </label>
            </div>
          </div>

          {/* Paiement */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Payment</h2>
            <div className="space-y-2">
              <div className="relative">
                <select className="  w-full border rounded-md px-4 py-2 md:py-3 border-black ">
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Opay</option>
                  <option>Orange Money</option>
                </select>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxtlip6IJQaXvwoezxiZTUYnD3FRVxg0nqQ&s"
                  className="h-5 absolute right-5 top-3"
                />
              </div>
              <div className="bg-[#F5F5F5] space-y-3 rounded-sm shadow-md p-5">
                <div className=" relative">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border rounded-md px-4 py-2 md:py-3"
                  />
                  <Lock className="absolute right-5 top-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Expiration Date"
                    className="border rounded-md px-4 py-2 md:py-3"
                  />
                  <input
                    type="text"
                    placeholder="Security Code"
                    className="border rounded-md px-4 py-2 md:py-3"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full border rounded-md px-4 py-2 md:py-3"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-orange-500"
                  />
                  Save this info for future
                </label>
                <button className="w-full bg-black text-white py-2 md:py-3 rounded-md hover:bg-gray-800 transition">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer className="text-xs text-gray-500 pt-6 border-t">
            © 2023 FASCO. All Rights Reserved.
          </footer>
        </div>

        {/* Résumé de commande */}
        <div className="bg-[#F5F5F5] p-6 rounded-md shadow-md space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-[tomato]/90 font-semibold text-center">
              No Product Added yet
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex-1 min-w-0">
                <div className=" flex items-center gap-2 w-full min-w-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-52 h-48 object-cover rounded-md relative"
                    />
                    <div className="absolute -top-4 right-1">
                      <Badge
                        badgeContent={singleImagequantity(item.image)}
                        color="error"
                        overlap="circular"
                        showZero
                      ></Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="font-medium text-sm w-full">{item.title}</p>
                    <div className="flex w-full items-start justify-between min-w-0">
                      <p className="text-sm text-gray-500">
                        color:{" "}
                        {item.color1 && (
                          <div
                            className={`${
                              item.color1 || "h-8 w-8 rounded-full bg-green-500"
                            }`}
                          ></div>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        SubTota: {ProductPrice(item.id)}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-around items-center bg-slate-100 shadow-sm rounded-md py-2 min-w-0">
                      <button onClick={() => handleIncrease(item.image)}>
                        <Plus />
                      </button>
                      <Badge
                        badgeContent={singleImagequantity(item.image)}
                        color="warning"
                        overlap="circular"
                        showZero
                      ></Badge>
                      <button onClick={() => handleDerease(item.image)}>
                        <Minus />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Code promo */}
          <div className="flex items-center justify-center flex-wrap gap-2 min-w-0">
            <input
              type="text"
              placeholder="Discount Code"
              className="flex-1 border rounded-md px-2 md:px-4 py-2 max-w-full placeholder:text-sm"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black transition">
              Apply
            </button>
          </div>

          {/* Totaux */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm min-w-0">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="flex justify-between text-sm min-w-0">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg min-w-0">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
