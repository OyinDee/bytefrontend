"use client";
import OrderHistory from "@/components/OrderHistoryAd";
import { Order, Meal } from '../../../components/types';

const sampleMeals: Meal[] = [
  {
    customId: 'hgtr56',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil.',
    price: 10.99,
    imageUrl: '/images/fc.jpg',
    per: 'per slice',
    countable: true,
    available: true,
    count: 10, // Only applicable when countable is true
  },
  {
    customId: 'trhf76',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
    price: 8.99,
    imageUrl: '/images/fc.jpg',
    per: 'per bowl',
    countable: false, // This meal doesn't have a countable quantity
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
    available: false, // Meal is not available
    count: 5, // Only applicable when countable is true
  },
  ];
  
  // Sample orders
  const sampleOrders: Order[] = [
    {
      id: 1,
      status: 'Completed',
      totalAmount: 1000,
      meals: sampleMeals,
    },
    {
      id: 2,
      status: 'Pending',
      totalAmount: 50,
      meals: [sampleMeals[0]],
    },
    {
      id: 3,
      status: 'Completed',
      totalAmount: 65,
      meals: [sampleMeals[1]],
    },
  ];
  
  const OrderHistoryPage: React.FC = () => {
    return <OrderHistory orders={sampleOrders} />;
  };
export default OrderHistoryPage;