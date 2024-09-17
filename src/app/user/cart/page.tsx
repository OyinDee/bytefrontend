"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Meal } from "@/components/types";

interface CartItem {
  meal: Meal;
  quantity: number;
  restaurantId: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<Map<string, CartItem[]>>(new Map());

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = new Map<string, CartItem[]>(JSON.parse(storedCart));
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart(new Map());
      }
    }
  }, []);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  const handleRemoveItem = (restaurantId: string, mealId: string) => {
    const newCart = new Map(cart);
    const items = newCart.get(restaurantId) || [];
    const updatedItems = items.filter(item => item.meal.customId !== mealId);

    if (updatedItems.length > 0) {
      newCart.set(restaurantId, updatedItems);
    } else {
      newCart.delete(restaurantId);
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(Array.from(newCart.entries())));
    toast.success("Item removed from cart!");
  };

  const handleClearCart = (restaurantId: string) => {
    const newCart = new Map(cart);
    newCart.delete(restaurantId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(Array.from(newCart.entries())));
    toast.success("Cart cleared successfully!");
  };

  const totalAmountPerRestaurant = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + (item.meal?.price ?? 0) * (item.quantity ?? 0), 0);

  return (
    <div className="p-4 bg-white min-h-screen mb-20">
      <ToastContainer />
      <div className="max-w-4xl mx-auto text-black">
        <h1 className="text-3xl font-bold text-black mb-6">Your Cart</h1>
        {cart.size === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          Array.from(cart.entries()).map(([restaurantId, items]) => (
            <div key={restaurantId} className="border-b border-gray-200 mb-8 pb-6">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Restaurant: {items.length > 0 ? items[0].meal.restaurantId : "Unknown"}
              </h2>
              <div className="space-y-4">
                {items.map(({ meal, quantity }) => (
                  <div key={meal.customId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {meal.imageUrl && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={meal.imageUrl}
                            alt={meal.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-black">{meal.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-lg font-bold text-yellow-500">B{meal.price.toFixed(2)}</p>
                      <button
                        onClick={() => handleRemoveItem(restaurantId, meal.customId)}
                        className="text-red-500 hover:text-red-700 flex justify-center"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold text-black">
                  Total: <span className="text-yellow-500">B{totalAmountPerRestaurant(items).toFixed(2)}</span>
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
                >
                  Checkout
                </button>
                <button
                  onClick={() => handleClearCart(restaurantId)}
                  className="bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <FaTrashAlt className="mr-2" />
                  Clear Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
