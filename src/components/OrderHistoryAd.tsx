// OrderHistory.tsx
import React from 'react';
import OrderItem from './OrderItemAd';
import { Order } from './types';

interface OrderHistoryProps {
  orders: Order[];
}

// Define your handler functions here
const handleMarkAsComplete = (orderId: number) => {
  console.log(`Mark order ${orderId} as complete`);
  // Implement the logic for marking an order as complete
};

const handleViewOrder = (orderId: number) => {
  console.log(`View details for order ${orderId}`);
  // Implement the logic for viewing an order
};

const handleRevertOrder = (orderId: number) => {
  console.log(`Revert order ${orderId}`);
  // Implement the logic for reverting an order
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="p-4 bg-white min-h-screen pt-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onMarkAsComplete={() => handleMarkAsComplete(order.id)}
              onViewOrder={() => handleViewOrder(order.id)}
              onRevertOrder={() => handleRevertOrder(order.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
