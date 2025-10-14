import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { UseCart } from "../services/provider";
import Typography from "@mui/material/Typography";
import { Minus, Plus, Trash } from "lucide-react";

export const ShopingCart = ({ open: isDrowerOpen, onClose }) => {
  const {
    handleDerease,
    handleIncrease,
    clearCart,
    cart,
    totalPrice,
    totalQuantity,
  } = UseCart();

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <div className="bg-gray-100 p-4">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography>No products added yet</Typography>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="border-b pb-2 mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: "auto", marginBottom: "8px" }}
                />
                <Typography variant="body2">{item.title}</Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Total Quantity: {totalQuantity}
                </Typography>
                <Typography variant="body2">
                  Color: <div className={item.color1}></div>
                </Typography>

                <div className="flex w-52 justify-center items-center gap-2 py-3 bg-[#F1F1F1] rounded-sm shadow ">
                  <Button size="small" onClick={() => handleDerease(item.id)}>
                    <Minus />
                  </Button>
                  <h1 className="text-[#8A8A8A] font-semibold text-lg">{item.quantity}</h1>
                  <Button size="small" onClick={() => handleIncrease(item.id)}>
                    <Plus />
                  </Button>
                 
                </div>
                <hr />
                <div>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" />
                    <label
                      htmlFor="product"
                      className="flex items-center justify-center gap-3"
                    >
                      For $10.00 please wrap the product
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p className="font-bold text-2xl ">${totalPrice}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                  <button className="bg-black py-2 text-white rounded-md w-full text-center ">
                    Checkout
                  </button>
                  <button
                    onClick={() => window.history.back()}
                    className="hover:bg-slate-200 w-full rounded-md py-2 hover:text-black duration-200 transition-all"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${totalPrice}</Typography>
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
            fullWidth
            variant="outlined"
            color="warning"
            onClick={onClose}
          >
            Close
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
