"use client";

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const deliveryFee = 250;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);

  const router = useRouter();

  // Load cart from localStorage - just store cart items array
  const [cartitems, setcartitem] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartitems");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Persist cart in localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
    }
  }, [cartitems]);

  const goToPage = (path) => {
    router.push(path);
  };

  // Adds `quantity` of an item. Uses a functional update so it never reads a
  // stale cart and never mutates existing state objects.
  const addtocart = async (itemid, size, quantity = 1) => {
    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    setcartitem((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === itemid && item.size === size
      );
      if (idx === -1) return [...prev, { productId: itemid, size, quantity }];
      return prev.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + quantity } : item
      );
    });
    toast.success("Item added to cart!");
  };

  // Puts the item in the cart at the chosen quantity, then goes to checkout.
  const buynow = (itemid, size, quantity = 1) => {
    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    setcartitem((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === itemid && item.size === size
      );
      if (idx === -1) return [...prev, { productId: itemid, size, quantity }];
      // Already in cart: set to the quantity chosen on the product page.
      // Use `item.quantity + quantity` instead if you want to add to it.
      return prev.map((item, i) => (i === idx ? { ...item, quantity } : item));
    });

    router.push("/checkout");
  };

  const updatequantity = async (itemid, size, quantity) => {
    if (quantity === 0) {
      // Remove item from cart
      const updatedCart = cartitems.filter(
        (item) => !(item.productId === itemid && item.size === size)
      );
      setcartitem(updatedCart);
      toast.info("Item removed from cart");
    } else {
      // Update quantity
      const updatedCart = cartitems.map((item) =>
        item.productId === itemid && item.size === size
          ? { ...item, quantity }
          : item
      );
      setcartitem(updatedCart);
    }
  };

  const getcartcount = () => {
    return cartitems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearcart = () => {
    setcartitem([]);
    localStorage.removeItem("cartitems");
    toast.info("Cart cleared");
  };

  const value = {
    currency,
    deliveryFee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartitems,
    addtocart,
    buynow,
    getcartcount,
    updatequantity,
    goToPage,
    clearcart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;