import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { UseCart } from "../services/provider";
import Typography from "@mui/material/Typography";
import { Minus, Plus, Trash, X } from "lucide-react";
import { Link } from "react-router-dom";

export const ShopingCart = ({ open: isDrowerOpen, onClose }) => {
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  // const handleChange = (e) => {
  //   setIsGiftWrap(e.target.value);
  // };
  const {
    handleDerease,
    handleIncrease,
    clearCart,
    cart,
    totalPrice,
    totalQuantity,
    subTotal,
    ProductPrice,
    toggleGiftWrap,
  } = UseCart();

  const DrawerList = (
    <Box role="presentation" className="w-[250px] md:w-[400px] lg:w-[500px]">
      <div className=" relative bg-gray-100 p-4">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography>No products added yet</Typography>
        ) : (
          <div className="flex flex-col  gap-5">
            {cart.map((item) => (
              <div key={item._id} className="border-b pb-2 mb-2">
                <div className="grid grid-cols-2  gap-2">
                  <div className="flex col-span-3 gap-2">
                    Buy more and get
                    <span className="font-bold text-lg">
                      {ProductPrice(item._id).toLocaleString()} ₦
                    </span>
                    <span className="font-bold text-lg">free shipping</span>
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={item.mainImage.url}
                      alt={item.title}
                      style={{
                        width: "100%",
                        marginBottom: "8px",
                      }}
                      className=" object-contain md:h-52 h-24  "
                    />
                  </div>

                  <div className="flex flex-col space-y-2 text-sm justify-center items-start">
                    <Typography variant="body2">{item.title}</Typography>
                    <Typography variant="body2">
                      Price: {item.price.toLocaleString()} ₦
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {item.quantity}
                    </Typography>

                    <div>
                      Color: <div className={item.color}></div>
                    </div>
                  </div>
                  <div className="flex w-full col-span-2  justify-center items-center gap-2 py-2 bg-[#F1F1F1] rounded-sm shadow ">
                    <Button
                      size="small"
                      onClick={() => handleDerease(item._id)}
                    >
                      <Minus />
                    </Button>
                    <h1 className="text-[#8A8A8A] font-semibold text-lg">
                      {item.quantity}
                    </h1>
                    <Button
                      size="small"
                      onClick={() => handleIncrease(item._id)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                <div className="space-y-6 p-4 bg-white rounded-md shadow-sm">
                  {/* Option d'emballage cadeau */}
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={item.giftwrap}
                      onChange={(e) => toggleGiftWrap(item._id)}
                      className="accent-green-600 w-5 h-5"
                    />
                    <label
                      htmlFor="giftWrap"
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      <span className="font-medium">Gift wrap</span>
                      <span className="text-gray-500">(+ ₦2000.00)</span>
                    </label>
                  </div>

                  {/* Sous-total dynamique */}
                </div>
              </div>
            ))}
          </div>
        )}

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
            p: 2,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="h6" color="text.primary">
            Subtotal: ₦{subTotal.toLocaleString()}
          </Typography>

          <Typography variant="h6" color="text.primary">
            Total: ₦
            {isGiftWrap
              ? totalPrice.toLocaleString()
              : totalPrice.toLocaleString()}
          </Typography>

          <Divider />

          <Typography variant="body2" color="text.secondary">
            Total Quantity: {totalQuantity}
          </Typography>
        </Box>
        <div className="flex flex-col gap-3 items-center justify-center">
          <Link
            to="/checkout"
            className="bg-black py-2 text-white rounded-md w-full text-center "
          >
            Checkout
          </Link>
          <button
            onClick={() => window.history.back()}
            className="hover:bg-slate-200 w-full rounded-md py-2 hover:text-black duration-200 transition-all"
          >
            View Cart
          </button>
        </div>

        <Box sx={{ display: "flex", gap: 1, mt: 2, flexDirection: "column" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            style={{ position: "absolute" }}
            className="top-0 -right-0 h-8 w-8 translate-x-1/5 transform rounded-full text-black p-2  hover:bg-gray-200 duration-500 transition-all "
          >
            <X />
          </Button>
        </Box>
      </div>
    </Box>
  );
  return (
    <Drawer anchor="right" open={isDrowerOpen} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
};
