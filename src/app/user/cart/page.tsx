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
    alert("Okay...")
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
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.size === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          Array.from(cart.entries()).map(([restaurantId, items]) => (
            <div key={restaurantId} className="border-b mb-6 pb-6">
              <h2 className="text-xl font-semibold mb-4">
                Restaurant: {items.length > 0 ? items[0].meal.restaurantId : "Unknown"}
              </h2>
              {items.map(({ meal, quantity }) => (
                <div key={meal.customId} className="flex items-center justify-between mb-4">
                  {meal.imageUrl && (
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={meal.imageUrl}
                        alt={meal.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{meal.name}</h3>
                  </div>
                  <div className="text-right flex items-center">
                    <p className="text-lg font-bold mr-4">B{(meal.price).toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mr-4">Quantity: {quantity}</p>
                    <button
                      onClick={() => handleRemoveItem(restaurantId, meal.customId)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total: B{totalAmountPerRestaurant(items).toFixed(2)}</p>

              </div>
              <div>
              <button
                onClick={handleCheckout}
                className="w-full flex justify-center bg-yellow-500 text-white px-6 py-3 rounded hover:bg-green-600 my-2"
              >
                Checkout
              </button>
                <button
                  onClick={() => handleClearCart(restaurantId)}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600 w-full justify-center"
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
