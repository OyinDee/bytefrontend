"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Restaurant } from "../../components/types";

interface Meal {
  customId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  per: string;
  countable: boolean;
  available: boolean;
  count?: number;
}

const demoPopularMeals: Meal[] = [
  {
    customId: 'hgtr56',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil.',
    price: 10.99,
    imageUrl: '/images/fc.jpg',
    per: 'per slice',
    countable: true,
    available: true,
    count: 10,
  },
  {
    customId: 'trhf76',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
    price: 8.99,
    imageUrl: '/images/fc.jpg',
    per: 'per bowl',
    countable: false,
    available: true,
  },
  {
    customId: 'dsfe43',
    name: 'Chicken Tacos',
    description: 'Spicy chicken with fresh toppings in soft tortillas.',
    price: 9.99,
    imageUrl: '/images/fc.jpg',
    per: 'per taco',
    countable: true,
    available: false,
    count: 5,
  },
];

const CombinedPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [popularMeals, setPopularMeals] = useState<Meal[]>(demoPopularMeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurantSearchResults, setRestaurantSearchResults] = useState<Restaurant[]>([]);
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

      AOS.init({ duration: 1000 });
      AOS.refresh();  

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://mongobyte.onrender.com/api/v1/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        setError('Error fetching restaurants. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const toggleMeals = (restaurantId: string) => {
    setExpanded((prev) => (prev === restaurantId ? null : restaurantId));
  };

  const handleSearch = () => {
    const mealResults = popularMeals.filter(meal =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const restaurantResults = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(mealResults);
    setRestaurantSearchResults(restaurantResults);
  };

  return (
    <div  data-aos="fade-up">
      <main className="p-4 lg:p-8 bg-white text-black pt-5 pb-20 min-h-screen lg:pt-5">
        {/* Search Bar */}
        <section className="mb-6">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search meals or restaurants..."
              className="p-2 w-full lg:w-1/2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Popular Combos</h2>
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            showStatus={false}
            showIndicators={false}
            className="popular-meals-carousel"
          >
            {(searchQuery ? searchResults : popularMeals).map((meal) => (
              <div key={meal.customId} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded-lg object-cover h-[300px]"
                />
                <h3 className="text-xl font-semibold mt-2 text-black">{meal.name}</h3>
                <p className="text-gray-600">{meal.description}</p>
                <p className="text-yellow-500 font-semibold">B{meal.price.toFixed(2)}</p>
                <button className='btn w-full bg-yellow-500 mt-2 text-white p-2'>Add To Cart!</button>
              </div>
            ))}
          </Carousel>
        </section>

        {/* Restaurant Listings */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-8">Restaurants</h2>
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
              {(searchQuery ? restaurantSearchResults : restaurants).map((restaurant) => (
                <div
                  key={restaurant.customId}
                  className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-6 border border-gray-200"
                >
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    width={500}
                    height={300}
                    className="w-full sm:w-1/4 h-40 object-cover rounded-lg"
                  />
                  <div className="sm:ml-6 mt-4 sm:mt-0 sm:w-3/4 w-full">
                    <h2 className="text-2xl font-semibold text-black">{restaurant.name}</h2>
                    <p className="mt-2 text-gray-600">{restaurant.description}</p>
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
                                <div className="flex space-x-4">
                                  <Image
                                    src={meal.imageUrl}
                                    alt={meal.name}
                                    width={100}
                                    height={60}
                                    className="object-cover rounded"
                                  />
                                  <div>
                                    <p className="text-black"><strong>{meal.name}</strong> - B{meal.price}</p>
                                    <p className="text-gray-500">{meal.description}</p>
                                  </div>
                                </div>
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
        </section>
      </main>
    </div>
  );
};

export default CombinedPage;
