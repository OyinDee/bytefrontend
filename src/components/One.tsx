import React from 'react';
import Image from 'next/image';
import { Meal } from './types';

type OneProps = {
  restaurantName: string;
  meals: Meal[];
};

const One: React.FC<OneProps> = ({ restaurantName, meals }) => {
  return (
    <div className="container mx-auto py-10 px-4 lg:px-20 bg-white pt-24">
      <h2 className="text-3xl font-bold text-center text-black mb-10">{restaurantName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal, index) => (
          <div key={index} className={`relative bg-white shadow-lg rounded-lg overflow-hidden ${!meal.available ? 'opacity-50' : ''}`}>
            <Image 
              src={meal.imageUrl} 
              alt={meal.name} 
              width={400} 
              height={300} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-black mb-3">{meal.name}</h3>
              <p className="text-black mb-2">Price: ₦{meal.price.toFixed(2)} per {meal.per}</p>
              {meal.countable ? (
                <p className="text-black mb-4">Remaining: {meal.count}</p>
              ) : (
                <p className="text-black mb-4">Available</p>
              )}
              {meal.available ? (
                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                  Order Now
                </button>
              ) : (
                <button className="w-full bg-gray-400 text-white py-2 rounded-md cursor-not-allowed" disabled>
                  Not Available
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default One;
