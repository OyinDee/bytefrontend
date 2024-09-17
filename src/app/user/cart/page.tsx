"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa"; 

interface Meal {
  customId: string;
  name: string;
  description?: string;
  price: number;
  availability: boolean;
  
  imageUrl?: string;
  tag: "regular" | "combo" | "add-on"; 
}

interface CartItem {
  meal: Meal;
  quantity: number;

}

const CartPage = () => {
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map());
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(new Map(JSON.parse(storedCart)));
    }
  }, []);

  const handleClearCart = () => {
    setCart(new Map());
    localStorage.removeItem("cart");
  };

  const handlePay = () => {
    alert("Payment process initiated!");
    // Implement payment logic here
  };

  const totalAmount = Array.from(cart.values()).reduce((sum, item) => sum + item.meal.price * item.quantity, 0);

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto text-black">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* Cart Items */}
        {Array.from(cart.values()).length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {Array.from(cart.values()).map(({ meal, quantity }) => (
              <div key={meal.customId} className="flex items-center justify-between border-b py-4">
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
                  <p className="text-gray-600">{meal.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">B{(meal.price * quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}
        {Array.from(cart.values()).length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Total Amount</h2>
              <p className="text-xl font-semibold">B{totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center hover:bg-red-600"
              >
                <FaTrashAlt className="mr-2" />
                Clear Cart
              </button>
              <button
                onClick={handlePay}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
