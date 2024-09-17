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
  removeItem: (mealId: string) => void;
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(Array.from(cart.entries())));
  }, [cart]);

  const addToCart = (meal: Meal, quantity: number) => {
    if (!meal.restaurantId) {
      return;
    }

    const newCart = new Map(cart);
    const restaurantId = meal.restaurantId;
    const items = newCart.get(restaurantId) || [];
    const existingItem = items.find(item => item.meal.customId === meal.customId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ meal, quantity });
    }

    newCart.set(restaurantId, items);
    setCart(newCart);
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);

      for (const [restaurantId, items] of newCart) {
        const updatedItems = items
          .map((item: CartItem | null) => {
            if (item?.meal.customId === mealId) {
              if (quantity > 0) {
                return { ...item, quantity };
              }
              return null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null);

        if (updatedItems.length > 0) {
          newCart.set(restaurantId, updatedItems);
        } else {
          newCart.delete(restaurantId);
        }
      }

      return newCart;
    });
  };

  const removeItem = (mealId: string) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);

      for (const [restaurantId, items] of newCart) {
        const updatedItems = items.filter(item => item.meal.customId !== mealId);

        if (updatedItems.length > 0) {
          newCart.set(restaurantId, updatedItems);
        } else {
          newCart.delete(restaurantId);
        }
      }

      return newCart;
    });
  };

  const clearCart = () => {
    setCart(new Map());
  };

  const getItemCount = () => {
    return Array.from(cart.values())
      .flat()
      .reduce((count, item) => count + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return Array.from(cart.values())
      .flat()
      .reduce((total, item) => total + item.meal.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem, clearCart, getItemCount, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
