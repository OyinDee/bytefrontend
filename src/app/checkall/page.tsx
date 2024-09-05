"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To handle API requests
import Image from 'next/image'
import RestaurantListings from '@/components/AllRestaurants'; // Adjust the import path if necessary
import { Restaurant } from '../../components/types'; // Adjust the import path if necessary

const RestaurantListingsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null); // To handle dropdowns for meals

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetching restaurants from the API
        const response = await axios.get('https://mongobyte.onrender.com/api/v1/restaurants');
        console.log(response.data);
        setRestaurants(response.data); // Assuming API response has restaurants array
      } catch (error) {
        setError('Error fetching restaurants. Please try again.');
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const toggleMeals = (restaurantId: string) => {
    // If already expanded, close it; otherwise, expand the clicked one
    setExpanded((prev) => (prev === restaurantId ? null : restaurantId));
  };

  return (
    <div className="bg-white min-h-screen p-6 mt-5 mb-12">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-white text-black">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.customId} className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-6">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                width ={500}
                height={500}
                className="w-full sm:w-1/4 h-40 object-cover rounded-lg"
              />
              <div className="sm:ml-6 mt-4 sm:mt-0 sm:w-3/4 w-full">
                <h2 className="text-2xl font-semibold text-gray-800">{restaurant.name}</h2>
                <p className="mt-2 text-gray-600">{restaurant.description}</p>
                <p className="mt-2 text-gray-500">Rating: 5.0</p>

                <button
                  onClick={() => toggleMeals(restaurant.customId)}
                  className="mt-4 inline-block text-yellow-500 hover:text-yellow-600 underline"
                >
                  {expanded === restaurant.customId ? 'Hide Meals' : 'View Meals'}
                </button>
                {expanded === restaurant.customId && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-md w-full">
                    <h3 className="font-semibold text-lg text-gray-700">Meals</h3>
                    {restaurant.meals.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {restaurant.meals.map((meal) => (
                          <li key={meal.customId} className="border-b py-2">
                            <p className="text-gray-700"><strong>{meal.name}</strong> - ${meal.price}</p>
                            <p className="text-gray-500">{meal.description}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No meals available for this restaurant.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantListingsPage;
