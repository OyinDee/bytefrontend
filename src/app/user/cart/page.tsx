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
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.size === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          Array.from(cart.entries()).map(([restaurantId, items]) => (
            <div key={restaurantId} className="border-b mb-8 pb-6">
              <h2 className="text-xl font-semibold mb-4">
                Restaurant: {items.length > 0 ? items[0].meal.restaurantId : "Unknown"}
              </h2>
              <div className="space-y-4">
                {items.map(({ meal, quantity }) => (
                  <div key={meal.customId} className="grid grid-cols-3 gap-4 sm:grid-cols-5 items-center">
                    {meal.imageUrl && (
                      <div className="relative w-full h-24 sm:h-32">
                        <Image
                          src={meal.imageUrl}
                          alt={meal.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                    )}
                    <div className="col-span-2 sm:col-span-3">
                      <h3 className="text-lg font-semibold">{meal.name}</h3>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <p className="text-lg font-bold">B{meal.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(restaurantId, meal.customId)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold">
                  Total: B{totalAmountPerRestaurant(items).toFixed(2)}
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full flex justify-center bg-yellow-500 text-white px-6 py-3 rounded hover:bg-green-600"
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
