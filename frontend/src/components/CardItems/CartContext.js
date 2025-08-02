import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    const parsed = saved ? JSON.parse(saved) : [];
    const unique = parsed.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t._id === item._id) // or use name
    );
    return unique;
  });

  const addToCart = (item) => {
    setCartItems(prev => {
      const isAlreadyInCart = prev.some(cartItem => cartItem._id === item._id);
      if (isAlreadyInCart) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter((item) => item._id !== id));
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};