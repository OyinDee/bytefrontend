// app/restaurant-details.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { Restaurant, Meal } from '../app/types';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  menuItems: Meal[];
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ restaurant, menuItems }) => {
  // Debugging: Log the props to the console
  console.log('Restaurant:', restaurant);
  console.log('Menu Items:', menuItems);

  // Check if restaurant data is available
  if (!restaurant) {
    return <div className="text-center text-red-500">Restaurant data is not available.</div>;
  }

  return (
    <div className="relative pt-24 min-h-screen bg-white text-black py-12">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Restaurant Header */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            {restaurant.image ? (
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            ) : (
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold mt-4">{restaurant.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{restaurant.description}</p>
          <div className="mt-4">
            <p className="text-lg font-semibold">Operating Hours:</p>
            <p className="text-gray-600">{restaurant.operatingHours}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Rating:</p>
            <p className="text-yellow-500 font-bold">{restaurant.rating} ⭐</p>
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold mb-4">Menu</h2>
          <div className="space-y-4">
            {menuItems.length > 0 ? (
              menuItems.map((meal) => (
                <div key={meal.name} className="flex flex-col items-start bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      {meal.image ? (
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600">No Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{meal.name}</h3>
                      <p className="text-sm text-gray-600">{meal.per} - ${meal.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    disabled={!meal.available}
                    className={`w-full bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold ${!meal.available ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'} transition`}
                  >
                    {meal.available ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No menu items available.</p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Reviews</h2>
          {/* Example reviews, replace with real data */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">August 20, 2024</p>
              <p className="text-lg font-semibold mb-1">Delicious Food!</p>
              <p className="text-gray-600">The food was amazing and the service was great. Highly recommend!</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">August 15, 2024</p>
              <p className="text-lg font-semibold mb-1">Not Bad</p>
              <p className="text-gray-600">The food was decent but the wait time was a bit long.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
