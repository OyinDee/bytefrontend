"use client";

import React, { useEffect, useState } from 'react';
import RestaurantListings from '@/components/AllRestaurants'; // Adjust the import path if necessary
import { Restaurant } from '../../components/types'; // Adjust the import path if necessary

const RestaurantListingsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Hardcoded demo data
  const demoRestaurants: Restaurant[] = [
    {
      id: 1,
      name: "The Gourmet Burger",
      description: "Delicious gourmet burgers and sides.",
      image: "/images/gourmet-burger.jpg", // Use a valid image URL
      rating: 4.5,
      operatingHours: "16"
    },
    {
      id: 2,
      name: "Taste of Italy",
      description: "Authentic Italian cuisine with a modern twist.",
      image: "/images/taste-of-italy.jpg", // Use a valid image URL
      rating: 4.7,
      operatingHours: "16"

    },
    {
      id: 3,
      name: "Sushi Express",
      description: "Fresh and fast sushi delivered to your door.",
      image: "/images/sushi-express.jpg", // Use a valid image URL
      rating: 4.3,
      operatingHours: "16"

    },
    {
      id: 4,
      name: "Spicy Thai",
      description: "Exquisite Thai dishes with a spicy kick.",
      image: "/images/spicy-thai.jpg", // Use a valid image URL
      rating: 4.6,
      operatingHours: "16"

    }
  ];

  useEffect(() => {
    // Simulate a network request
    const fetchRestaurants = async () => {
      try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRestaurants(demoRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-white text-black">
          <p>Loading...</p>
        </div>
      ) : (
        <RestaurantListings restaurants={restaurants} />
      )}
    </div>
  );
};

export default RestaurantListingsPage;
