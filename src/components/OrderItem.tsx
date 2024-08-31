// components/OrderItem.tsx
import React from 'react';
import { Order } from './types';

interface OrderItemProps {
  order: Order;
  onMarkAsComplete?: (orderId: number) => void;
  onViewOrder?: (orderId: number) => void;
  onRevertOrder?: (orderId: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  onMarkAsComplete,
  onViewOrder,
  onRevertOrder,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Order #{order.id}</h2>
        <span className={`text-sm font-medium ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">Total: ${order.totalAmount.toFixed(2)}</p>
      {onViewOrder && (
        <button className="text-yellow-600 hover:underline flex items-center" onClick={() => onViewOrder(order.id)}>
          <span className="ml-2">View Order</span>
        </button>
      )}
      {/* Render additional buttons or actions if provided */}
      {onMarkAsComplete && (
        <button className="text-green-600 hover:underline flex items-center" onClick={() => onMarkAsComplete(order.id)}>
          <span className="ml-2">Mark as Complete</span>
        </button>
      )}
      {onRevertOrder && (
        <button className="text-red-600 hover:underline flex items-center" onClick={() => onRevertOrder(order.id)}>
          <span className="ml-2">Revert Order</span>
        </button>
      )}
    </div>
  );
};

export default OrderItem;
