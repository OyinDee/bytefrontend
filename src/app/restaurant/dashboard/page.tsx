"use client"
import React, { useState } from 'react';

// Meal Interface
interface Meal {
  customId: string;
  name: string;
  description?: string;
  tag?: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
  restaurant: string; // Referencing a Restaurant by ID
  createdAt?: Date;
  updatedAt?: Date;
}

// Order Interface
interface Order {
  customId: string;
  user: string; // Referencing a User by ID
  meals: {
    meal: Meal;
    quantity: number;
  }[];
  note: string;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Delivered';
  orderDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const RestaurantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Confirmed' | 'Delivered'>('Pending'); // Active tab state

  const handleTabClick = (tab: 'Pending' | 'Confirmed' | 'Delivered') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Restaurant Info */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-black">Restaurant Name</h1>
        <p className="text-2xl text-gray-700">
          Custom ID: <span className="font-bold">#RE12345</span>
        </p>
      </div>

      {/* Order Tabs */}
      <div className="mb-8">
        <div className="flex justify-around">
          <button
            className={`px-4 py-2 border-b-4 ${activeTab === 'Pending' ? 'border-yellow-500 text-black' : 'border-gray-300 text-gray-500'}`}
            onClick={() => handleTabClick('Pending')}
          >
            Pending Orders
          </button>
          <button
            className={`px-4 py-2 border-b-4 ${activeTab === 'Confirmed' ? 'border-yellow-500 text-black' : 'border-gray-300 text-gray-500'}`}
            onClick={() => handleTabClick('Confirmed')}
          >
            Confirmed Orders
          </button>
          <button
            className={`px-4 py-2 border-b-4 ${activeTab === 'Delivered' ? 'border-yellow-500 text-black' : 'border-gray-300 text-gray-500'}`}
            onClick={() => handleTabClick('Delivered')}
          >
            Delivered Orders
          </button>
        </div>

        {/* Orders Content */}
        <div className="mt-6">
          {activeTab === 'Pending' && (
            <div className="space-y-4">
              <OrderCard orderId="#O123" note="Please add extra sauce" totalPrice={25.00} />
              <OrderCard orderId="#O124" note="No onions, please" totalPrice={18.50} />
            </div>
          )}
          {activeTab === 'Confirmed' && (
            <div className="space-y-4">
              <OrderCard orderId="#O125" note="Extra cheese" totalPrice={30.00} />
            </div>
          )}
          {activeTab === 'Delivered' && (
            <div className="space-y-4">
              <OrderCard orderId="#O126" note="Gluten-free option" totalPrice={22.50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard: React.FC<{ orderId: string; note: string; totalPrice: number }> = ({ orderId, note, totalPrice }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <p className="text-lg font-bold text-black">Order ID: {orderId}</p>
    <p className="text-gray-600">Note: {note}</p>
    <p className="text-black">Total: ${totalPrice.toFixed(2)}</p>
  </div>
);

// Meal Card Component
const MealCard: React.FC<{ name: string; price: number; availability: boolean }> = ({ name, price, availability }) => (
  <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
    <div className="flex justify-between">
      <p className="text-lg font-bold text-black">{name}</p>
      <p className="text-gray-600">${price.toFixed(2)}</p>
    </div>
    <p className={`text-sm ${availability ? 'text-green-500' : 'text-red-500'}`}>
      {availability ? 'Available' : 'Not Available'}
    </p>
  </div>
);

export default RestaurantDashboard;
