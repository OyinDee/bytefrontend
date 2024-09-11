"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {jwtDecode} from 'jwt-decode';


interface DecodedToken {
  restaurant: {
    name: string;
    description: string;
    location: string;
    contactNumber: string;
    email: string;
    imageUrl: string;
    totalIncome?: number;
  };
}

const RestaurantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Confirmed' | 'Delivered'>('Pending');
  const [restaurant, setRestaurant] = useState<any>(null); // Update with the correct type

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setRestaurant(decodedToken.restaurant);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleTabClick = (tab: 'Pending' | 'Confirmed' | 'Delivered') => {
    setActiveTab(tab);
  };

  const totalIncome = restaurant?.totalIncome || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {restaurant && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-black">{restaurant.name}</h1>
              <p className="text-lg text-gray-700 mt-2">{restaurant.description}</p>
              <p className="text-md text-gray-600 mt-2">Location: {restaurant.location}</p>
              <p className="text-md text-gray-600">Contact: {restaurant.contactNumber}</p>
              <p className="text-md text-gray-600">Email: {restaurant.email}</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-black">Total Income</h2>
            <p className="text-xl text-gray-800 mt-2">
              {totalIncome > 0 ? `₦${totalIncome.toFixed(2)}` : '₦0.00'}
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-around border-b border-gray-300 mb-4">
          <button
            className={`px-4 py-2 border-b-4 ${activeTab === 'Pending' ? 'border-yellow-500 text-black' : 'border-transparent text-gray-500'}`}
            onClick={() => handleTabClick('Pending')}
          >
            Pending Orders
          </button>
          <button
            className={`px-4 py-2 border-b-4 ${activeTab === 'Confirmed' ? 'border-yellow-500 text-black' : 'border-transparent text-gray-500'}`}
            onClick={() => handleTabClick('Confirmed')}
          >
            Confirmed Orders
          </button>
          <button
            className={`px-4 py-2 border-b-4 ${activeTab === 'Delivered' ? 'border-yellow-500 text-black' : 'border-transparent text-gray-500'}`}
            onClick={() => handleTabClick('Delivered')}
          >
            Delivered Orders
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'Pending' && (
            <>
              <OrderCard orderId="#O123" note="Please add extra sauce" totalPrice={25.00} />
              <OrderCard orderId="#O124" note="No onions, please" totalPrice={18.50} />
            </>
          )}
          {activeTab === 'Confirmed' && (
            <>
              <OrderCard orderId="#O125" note="Extra cheese" totalPrice={30.00} />
            </>
          )}
          {activeTab === 'Delivered' && (
            <>
              <OrderCard orderId="#O126" note="Gluten-free option" totalPrice={22.50} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderCard: React.FC<{ orderId: string; note: string; totalPrice: number }> = ({ orderId, note, totalPrice }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
    <p className="text-lg font-bold text-black">Order ID: {orderId}</p>
    <p className="text-gray-600">Note: {note}</p>
    <p className="text-black font-semibold">Total: ₦{totalPrice.toFixed(2)}</p>
  </div>
);

export default RestaurantDashboard;
