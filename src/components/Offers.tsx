// app/promotions-offers.tsx
"use client";

import React from 'react';

const PromotionsOffers: React.FC = () => {
  return (
    <div className="relative pt-24 min-h-screen bg-white text-black py-12">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Promotions Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Current Promotions & Offers</h1>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">10% Off Your First Order</h2>
              <p className="text-gray-600 mb-4">Use code <span className="font-bold text-yellow-500">FIRST10</span> at checkout.</p>
              <p className="text-gray-500">Valid until: September 30, 2024</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Free Delivery on Orders Over $50</h2>
              <p className="text-gray-600 mb-4">No code needed. Automatically applied at checkout.</p>
              <p className="text-gray-500">Valid until: October 15, 2024</p>
            </div>
            {/* Add more promotions as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsOffers;
