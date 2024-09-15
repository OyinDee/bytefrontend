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

const CombinedPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurantSearchResults, setRestaurantSearchResults] = useState<Restaurant[]>([]);
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

  const handleSearch = () => {
    const searchLower = searchQuery.toLowerCase();
    const restaurantResults = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.description.toLowerCase().includes(searchLower) ||
      restaurant.meals.some(meal =>
        meal.name.toLowerCase().includes(searchLower) ||
        meal.description.toLowerCase().includes(searchLower)
      )
    );

    setRestaurantSearchResults(restaurantResults);
  };

  return (
    <div data-aos="fade-up">
      <main className="p-4 lg:p-8 bg-white text-black pt-5 pb-20 min-h-screen lg:pt-5">
        <section className="mb-6">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants or meals..."
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
                  className="bg-white shadow-md rounded-lg border border-gray-200"
                >
                  <div className="flex items-center p-4">
                    <Image
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      width={500}
                      height={500}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-black">{restaurant.name}</h2>
                      <p className="text-gray-600">{restaurant.description}</p>
                    </div>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="p-4">
                    {restaurant.meals.length > 0 ? (
                      <Carousel
                        showThumbs={false}
                        infiniteLoop
                        autoPlay
                        showStatus={false}
                        showIndicators={true}
                        className="restaurant-meals-carousel"
                      >
                        {restaurant.meals.map((meal) => (
                          <div key={meal.customId} className="bg-white p-4 pb-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div style={{ position: "relative"}} className='w-full h-56'>
                            <Image
                              src={meal.imageUrl}
                              alt={meal.name}
                              fill
                              style={{ objectFit: "contain" }}
                            />
                            </div>
                            <h3 className="text-lg font-semibold mt-2 text-black">{meal.name}</h3>
                            <p className="text-gray-600">{meal.description}</p>
                            <p className="text-yellow-500 font-semibold">B{meal.price.toFixed(2)}</p>
                            <button className="btn w-full bg-yellow-500 mt-2 text-white p-2">
                              Add To Cart!
                            </button>
                          </div>
                        ))}
                      </Carousel>
                    ) : (
                      <div className="text-gray-500">No meals available for this restaurant.</div>
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
