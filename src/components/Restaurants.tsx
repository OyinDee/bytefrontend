// pages/restaurant.tsx
import React from 'react';
import RestaurantMeals from './One';
import { Meal } from './types';

const meals: Meal[] = [
  {
    name: 'Jollof Rice',
    image: '/Images/jollof.jpg',
    price: 500,
    per: 'plate',
    countable: true,
    count: 20,
    available: true,
  },
  {
    name: 'Fried Chicken',
    image: '/Images/chicken.jpg',
    price: 300,
    per: 'piece',
    countable: true,
    count: 15,
    available: false,
  },
  {
    name: 'Pounded Yam and Egusi',
    image: '/Images/pounded_yam.jpg',
    price: 1000,
    per: 'plate',
    countable: false,
    available: true,
  },
];

const Restaurants = () => {
  return <RestaurantMeals restaurantName="Mama's Kitchen" meals={meals} />;
};

export default Restaurants;
