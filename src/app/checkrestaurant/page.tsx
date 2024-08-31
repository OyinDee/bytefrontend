"use client";
import RestaurantDetails from "@/components/RestaurantDetails";

import { Restaurant, Meal } from '../types';

// Example data (replace with real data fetching logic)
const exampleRestaurant: Restaurant = {
  id: 1,
  name: "Taste of Africa",
  description: "Delicious African Cuisine",
  image: "/Images/toa.png",
  rating: 4.5,
  operatingHours: "10:00 AM - 10:00 PM"
};

const exampleMenuItems: Meal[] = [
  {
    name: "Jollof Rice",
    image: "/Images/jr.jpg",
    price: 500,
    per: "plate",
    countable: false,
    available: true
  },
  {
    name: "Plantain",
    image: "/Images/plantain.jpg",
    price: 50,
    per: "piece",
    countable: false,
    available: true
  }
];

const RestaurantPage = () => {
    // Client-side logic here
    return (
        <RestaurantDetails 
        restaurant={exampleRestaurant}
        menuItems={exampleMenuItems}
      />
    );
};

export default RestaurantPage;
