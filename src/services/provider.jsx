import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

export const cartContext = createContext(null);
export const UseCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("context must be used inside the component");
  }
  return context;
};

export const Provider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // get cart from local storage
  useEffect(() => {
    try {
      const getCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (getCart) {
        setCart(getCart);
      }
    } catch (err) {
      console.error("error occured when getting card from local storage", err);
    }
  }, []);

  // save cart for refrech
  useEffect(() => {
    try {
      const savedCart = localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("error occured when saving card to local storage", err);
    }
  }, [cart]);

  const addProduct = (product, selectedImageUrl) => {
    if (!product || !selectedImageUrl) return;

    const newProduct = {
      id: selectedImageUrl,
      image: selectedImageUrl,
      title: product.title,
      color: product.color1,
      price: product.price,
      rate: product.rate,
      reducePrice: product.reducePrice,
      size: product.size,
      deadline: product.deadline,
      quantity: 1,
      totalQuantity: 1,
    };

    setCart((prev) => {
      const exists = prev.some((item) => item.id === selectedImageUrl);
      const updatedCart = exists
        ? prev.map((item) =>
            item.id === selectedImageUrl
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, newProduct];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // add increase product quantity
  const handleIncrease = (imageId) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === imageId ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // handle decrease product button
  const handleDerease = (imageId) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === imageId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart:", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemove = (imageId) => {
    setCart((prev) => [prev.filter((item) => item.id !== imageId)]);
  };

  const clearCart = () => setCart([]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const values = {
    addProduct,
    handleDerease,
    handleIncrease,
    handleRemove,
    clearCart,
    cart,
    totalPrice,
    totalQuantity,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};
