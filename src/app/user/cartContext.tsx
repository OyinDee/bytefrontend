"use client";

import React, { createContext, useState, useContext, useEffect, FC, ReactNode } from "react";
import { Meal } from "@/components/types";

interface CartItem {
  meal: Meal;
  quantity: number;
}

interface CartContextType {
  cart: Map<string, CartItem[]>;
  addToCart: (meal: Meal, quantity: number) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Map<string, CartItem[]>>(new Map());

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(new Map(JSON.parse(storedCart)));
    }
  }, []);

  const addToCart = (meal: Meal, quantity: number) => {
    if (!meal.restaurantId) {
      console.error("Meal does not have a restaurantId.");
      return;
    }

    const newCart = new Map(cart);
    const restaurantId = meal.restaurantId;
    if (!newCart.has(restaurantId)) {
      newCart.set(restaurantId, []);
    }
    const items = newCart.get(restaurantId) || [];
    const existingItem = items.find(item => item.meal.customId === meal.customId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ meal, quantity });
    }
    newCart.set(restaurantId, items);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(Array.from(newCart.entries())));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = new Map(prevCart);
      var currentItems = Array.from(updatedCart.values()).flat();
      const currentItem = currentItems.find(item => item.meal.customId === mealId);

      if (currentItem) {
        if (quantity > 0) {
          currentItem.quantity = quantity;
        } else {
          currentItems = currentItems.filter(item => item.meal.customId !== mealId);
        }
        if (currentItem.meal.restaurantId) {
          updatedCart.set(currentItem.meal.restaurantId, currentItems);
        }
        localStorage.setItem("cart", JSON.stringify(Array.from(updatedCart.entries())));
      }

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart(new Map());
    localStorage.removeItem("cart");
  };

  const getItemCount = () => {
    return Array.from(cart.values()).flat().reduce((count, item) => count + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return Array.from(cart.values()).flat().reduce(
      (total, item) => total + item.meal.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, clearCart, getItemCount, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
