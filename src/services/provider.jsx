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
  const [isAddedToCart, setIsAddedToCart] = useState(false);

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

  const addProduct = (currentImage, imageUrl) => {
    if (!currentImage || !currentImage.sideImages?.length) return;

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1000);

    const product = {
      id: imageUrl,
      image: imageUrl,
      title: currentImage.title,
      color: currentImage.color1,
      price: currentImage.price,
      rate: currentImage.rate,
      reducePrice: currentImage.reducePrice,
      size: currentImage.size,
      quantity: 1,
    };

    setCart((prev) => {
      const exists = prev.some((item) => item.id === imageUrl);
      const updatedCart = exists
        ? prev.map((item) =>
            item.id === imageUrl
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, product];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // add increase product quantity
  const handleIncrease = (imageId) => {
    const existingProduct = currentImage.sideImages.some(
      (product) => product.id === imageId
    );
    if (existingProduct) {
      setCart((prev) => {
        const productAdded = prev.map((item) =>
          item.id === imageId ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("cart:", JSON.stringify(productAdded));
        return productAdded;
      });
    }
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
    setCart((prev) => [...prev.filter((item) => item.id !== imageId)]);
  };

  const clearCart = () => setCart([]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const getTotalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const values = {
    addProduct,
    handleDerease,
    handleIncrease,
    handleRemove,
    clearCart,
    cart,
    isAddedToCart,
    totalPrice,
    getTotalQuantity,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};
