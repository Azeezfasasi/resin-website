import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever cart changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id && JSON.stringify(item.selectedVariant) === JSON.stringify(product.selectedVariant));

      if (existingItem) {
          return prevCart.map((item) =>
              item._id === product._id && JSON.stringify(item.selectedVariant) === JSON.stringify(product.selectedVariant)
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
          );
      } else {
          return [...prevCart, { ...product, quantity: 1 }];
      }
  });
};

const updateQuantity = (productId, quantity) => {
  setCart((prevCart) =>
      prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
  );
};
  
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
