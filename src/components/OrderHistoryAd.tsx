// components/OrderHistory.tsx
import React from 'react';
import OrderItem from './OrderItemAd'
import { Order } from '../app/types';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="p-4 bg-white min-h-screen pt-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
