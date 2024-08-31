// app/payment.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FoodItem {
  id: number;
  name: string;
  restaurant: string;
  amount: number;
  image: string; // URL or path to the image
}

const initialFoodItems: FoodItem[] = [
  {
    id: 1,
    name: "Jollof Rice",
    restaurant: "Taste of Africa",
    amount: 500,
    image: "/Images/jr.jpg" // Replace with your food image path
  },
  {
    id: 2,
    name: "Plantain",
    restaurant: "Taste of Africa",
    amount: 300,
    image: "/Images/plantain.jpg" // Replace with your food image path
  }
];

const Payment: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return foodItems.reduce((total, item) => total + item.amount, 0);
  };

  // Remove item
  const removeItem = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-white text-black flex flex-col items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Food Items */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-12 text-center">Order Summary</h1>
          {foodItems.map(item => (
            <div key={item.id} className="flex items-center mb-4 border-b border-gray-200 pb-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden mr-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                <p className="text-lg text-gray-600 mb-2">{item.restaurant}</p>
                <p className="text-lg font-bold">Amount: ${item.amount.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-400 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between items-center py-4 border-t border-gray-200">
            <h2 className="text-xl font-bold">Subtotal:</h2>
            <p className="text-xl font-bold">${calculateSubtotal().toFixed(2)}</p>
          </div>
        </div>

        {/* Pay Button */}
        <div className="flex justify-center mb-6">
          <button className="bg-black w-96 mx-5 text-white hover:bg-gray-400 font-semibold py-3 px-8 rounded-lg text-lg transition duration-300">
            Pay Now
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center mb-6">
          <Link href="/" className="text-gray-600 hover:text-gray-500 font-semibold text-lg transition duration-300">
            Back to Menu 🍴
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
