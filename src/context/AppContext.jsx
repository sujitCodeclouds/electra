import React, { createContext, useState, useEffect } from "react";
import { products } from "../data/catalog";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from localStorage on init
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const savedCompare = localStorage.getItem("compare");
    return savedCompare ? JSON.parse(savedCompare) : [];
  });

  // Save state to localStorage when changed
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareList));
  }, [compareList]);

  // Actions
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const addToCart = (product, quantity = 1, selectedVariants = {}) => {
    setCart((prevCart) => {
      // Find if item already exists with exact same variants
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        const cartId = `${product.id}-${Date.now()}`;
        return [...prevCart, { cartId, product, quantity, selectedVariants }];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartVariants = (cartId, selectedVariants) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId ? { ...item, selectedVariants } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const toggleCompare = (product) => {
    setCompareList((prevCompare) => {
      const exists = prevCompare.find((p) => p.id === product.id);
      if (exists) {
        return prevCompare.filter((p) => p.id !== product.id);
      }
      if (prevCompare.length >= 3) {
        alert("You can compare up to 3 products at a time.");
        return prevCompare;
      }
      return [...prevCompare, product];
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        theme,
        cart,
        wishlist,
        compareList,
        toggleTheme,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartVariants,
        clearCart,
        toggleWishlist,
        toggleCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
