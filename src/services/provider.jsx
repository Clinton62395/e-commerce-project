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
    // const uniqueId = `${product.id}-${selectedImageUrl}`;

    const newProduct = {
      id: selectedImageUrl, // identifiant unique
      image: selectedImageUrl,
      title: product.title,
      color: product.color1,
      price: product.price,
      rate: product.rate,
      reducePrice: product.reducePrice,
      size: product.size,
      deadline: product.deadline,
      quantity: 1,
      giftwrap: false,
    };

    setCart((prev) => {
      const exists = prev.some((item) => item.id === newProduct.id);

      const updatedCart = exists
        ? prev.map((item) =>
            item.id === newProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, newProduct];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // add increase product quantity
  const handleIncrease = (imageUrl) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.image === imageUrl
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // handle decrease product button
  const handleDerease = (imageUrl) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.image === imageUrl && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart:", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemove = (imageUrl) => {
    setCart((prev) => [...prev.filter((item) => item.id !== imageUrl)]);
  };

  const clearCart = () => setCart([]);

  const toggleGiftWrap = (imageUrl) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.image === imageUrl ? { ...item, giftwrap: !item.giftwrap } : item
      );
      localStorage.setItem("cart:", JSON.stringify(updated));
      return updated;
    });
  };

  const subTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // const totalPrice = useMemo(() => {
  //   return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // }, [cart]);

  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const ProductPrice = (itemId) => {
    const product = cart.find((item) => item.id === itemId);
    return product ? product.price * product.quantity : 0;
  };
  const giftCharge = 2000;
  const calculateGiswrap = useMemo(() => {
    const hasGiftWrap = cart.some((item) => item.giftwrap);
    return hasGiftWrap ? giftCharge : 0;
  }, [cart]);

  const totalPrice = subTotal + calculateGiswrap;

  const values = {
    addProduct,
    handleDerease,
    handleIncrease,
    handleRemove,
    clearCart,
    toggleGiftWrap,
    cart,
    totalPrice,
    totalQuantity,
    subTotal,
    ProductPrice,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};
