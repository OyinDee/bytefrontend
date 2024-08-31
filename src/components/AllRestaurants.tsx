"use client";

import React, { useState } from 'react';
import { Restaurant } from './types';
import Image from 'next/image';

interface RestaurantListingsProps {
  restaurants: Restaurant[];
}

const RestaurantListings: React.FC<RestaurantListingsProps> = ({ restaurants }) => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants); // State for filtered restaurants

  // Filter restaurants based on search query
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(
        restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="relative pt-24 min-h-screen bg-white text-black py-12">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Search Restaurants or Meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg mr-2 w-full"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400"
          >
            Search
          </button>
        </div>

        {/* Restaurant List */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Available Restaurants</h1>
          <div className="space-y-4">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden mr-4">
                    {restaurant.image ? (
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600">No Image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                    <p className="text-gray-600">{restaurant.description}</p>
                    <p className="text-yellow-500 font-bold">{restaurant.rating} ⭐</p>
                    <a href={`/restaurant/${restaurant.id}`} className="text-blue-500 hover:text-blue-400 mt-2 block">View Details</a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No restaurants available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListings;
