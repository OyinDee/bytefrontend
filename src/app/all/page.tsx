"use client";

import One from '../../components/One';
import { Meal } from '../types';

const Allpage: React.FC = () => {
  const meals: Meal[] = [
    {
      name: 'Jollof Rice',
      image: '/Images/jr.jpg',
      price: 1700,
      per: 'pack',
      countable: false,
      available: true,
    },
    {
      name: 'Fried Chicken',
      image: '/Images/fc.jpg',
      price: 1000,
      per: 'piece',
      countable: true,
      count: 0,
      available: false,
    },
    {
      name: 'Pounded Yam',
      image: '/Images/py.jpg',
      price: 500,
      per: 'wrap',
      countable: false,
      available: true,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4">

        <One restaurantName="Spicy Crumbs" meals={meals} />
      </div>
    </div>
  );
};

export default Allpage;
