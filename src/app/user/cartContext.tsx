"use client"
import React, { createContext, useState, useContext, FC, ReactNode } from "react";
import { Meal } from '@/components/types';

interface CartItem {
  meal: Meal;
  quantity: number;
  restaurantName: string;
}

interface CartContextType {
  cart: Map<string, CartItem>;
  addToCart: (meal: Meal) => void;
  updateQuantity: (meal: Meal, change: number) => void;
  clearCart: () => void;
  getItemCount: () => number;  // Add getItemCount here
  
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
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map());

  const addToCart = (meal: Meal) => {
    setCart(prevCart => {
      const updatedCart = new Map(prevCart);
      const currentItem = updatedCart.get(meal.customId);
      if (currentItem) {
        updatedCart.set(meal.customId, { ...currentItem, quantity: currentItem.quantity });
      } else {
        updatedCart.set(meal.customId, { meal, quantity: 1, restaurantName: "" });
      }
      localStorage.setItem("cart", JSON.stringify(Array.from(updatedCart.entries())));
      return updatedCart;
    });
  };

  const updateQuantity = (meal: Meal, change: number) => {
    setCart(prevCart => {
      const updatedCart = new Map(prevCart);
      const currentItem = updatedCart.get(meal.customId);
      if (currentItem) {
        const newQuantity = Math.max(1, currentItem.quantity + change);
        updatedCart.set(meal.customId, { ...currentItem, quantity: newQuantity });
      } else {
        updatedCart.set(meal.customId, { meal, quantity: Math.max(1, change), restaurantName: "" });
      }
      localStorage.setItem("cart", JSON.stringify(Array.from(updatedCart.entries())));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart(new Map());
    localStorage.removeItem("cart");
  };

  const getItemCount = () => {
    let count = 0;
    cart.forEach(item => count += item.quantity);
    return count;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
