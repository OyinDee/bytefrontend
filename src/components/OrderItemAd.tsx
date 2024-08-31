// components/AdminOrderItem.tsx
import React from 'react';
import { Order } from '../app/types'; // Adjust the path to where your types are located
import ReorderIcon from './ReorderIcon'; // Assuming this is for a reorder action

interface AdminOrderItemProps {
  order: Order;
  onMarkAsComplete: (orderId: number) => void;
  onViewOrder: (orderId: number) => void;
  onRevertOrder: (orderId: number) => void;
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = ({ order, onMarkAsComplete, onViewOrder, onRevertOrder }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Order #{order.id}</h2>
        <span className={`text-sm font-medium ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">Total: ${order.totalAmount.toFixed(2)}</p>
      <div className="flex space-x-4">
        <button 
          onClick={() => onMarkAsComplete(order.id)}
          className="text-blue-600 hover:underline flex items-center"
        >
          Mark as Complete
        </button>
        <button 
          onClick={() => onViewOrder(order.id)}
          className="text-gray-600 hover:underline flex items-center"
        >
          View Order
        </button>
        {order.status !== 'Cancelled' && (
          <button 
            onClick={() => onRevertOrder(order.id)}
            className="text-red-600 hover:underline flex items-center"
          >
            Revert Order
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminOrderItem;
