"use client";
import OrderHistory from "@/components/OrderHistory";
import { Order, Meal } from '../../types';

const sampleMeals: Meal[] = [
    {
      name: 'Cheeseburger',
      image: '/images/cheeseburger.jpg',
      price: 9.99,
      per: 'piece',
      countable: false,
      available: true,
    },
    {
      name: 'Large Fries',
      image: '/images/fries.jpg',
      price: 3.49,
      per: 'box',
      countable: true,
      count: 2,
      available: true,
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