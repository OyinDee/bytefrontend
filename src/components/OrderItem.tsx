import React from 'react';
import { Order } from './types';
import ReorderIcon from './ReorderIcon'; 

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Order #{order.id}</h2>
        <span className={`text-sm font-medium ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">Total: ${order.totalAmount.toFixed(2)}</p>
      <button className="text-yellow-600 hover:underline flex items-center">
        <ReorderIcon />
        <span className="ml-2">Reorder</span>
      </button>
    </div>
  );
};

export default OrderItem;
