"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import  { ClockIcon } from '@heroicons/react/24/outline';

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const demoFeaturedMeal: Meal = {
  id: '1',
  name: 'Spaghetti Carbonara',
  description: 'Classic Italian pasta with creamy sauce and pancetta.',
  price: 12.99,
  imageUrl: '/images/spaghetti-carbonara.jpg', // Use a demo image path
};

const demoPopularMeals: Meal[] = [
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil.',
    price: 10.99,
    imageUrl: '/images/margherita-pizza.jpg', // Use a demo image path
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
    price: 8.99,
    imageUrl: '/images/caesar-salad.jpg', // Use a demo image path
  },
  {
    id: '4',
    name: 'Chicken Tacos',
    description: 'Spicy chicken with fresh toppings in soft tortillas.',
    price: 9.99,
    imageUrl: '/images/chicken-tacos.jpg', // Use a demo image path
  },
];

const LandingPage: React.FC = () => {
  const [featuredMeal, setFeaturedMeal] = useState<Meal | null>(demoFeaturedMeal);
  const [popularMeals, setPopularMeals] = useState<Meal[]>(demoPopularMeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Meal[]>([]);

  const handleSearch = () => {
    const results = popularMeals.filter(meal =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="bg-white text-black min-h-screen mt-16">
      {/* Header */}
      <header className="bg-white text-black p-4 w-full">
        <div className="container">
        <div className="relative flex items-center">
      <input
        type="text"
        value ={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          handleSearch()
        }}    
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded-l-lg text-black w-full"
        style={{ paddingRight: '50px' }} // Adjust padding to make space for the button
      />
    
    </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        {/* Featured Meal */}
        {featuredMeal && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Featured Meal of the Day</h2>
                <div>
                <Image
                  src={featuredMeal.imageUrl}
                  alt={featuredMeal.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                />
                </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{featuredMeal.name}</h3>
                  <p className="text-gray-700">{featuredMeal.description}</p>
                  <p className="text-yellow-500 font-semibold">${featuredMeal.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Popular Meals */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Popular Meals</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(searchQuery ? searchResults : popularMeals).map((meal) => (
              <div key={meal.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                />
                <h3 className="text-xl font-semibold mt-2">{meal.name}</h3>
                <p className="text-gray-700">{meal.description}</p>
                <p className="text-yellow-500 font-semibold">${meal.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
};

export default LandingPage;
