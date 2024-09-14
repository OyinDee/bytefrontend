"use client";

import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const demoNotifications = [
      { id: 1, message: 'Someone sent you bytes', timestamp: '2024-09-11 10:34 AM' },
      { id: 2, message: 'You just ordered', timestamp: '2024-09-11 09:25 AM' },
      { id: 3, message: 'Your order has been delivered', timestamp: '2024-09-11 08:45 AM' },
    ];
    setNotifications(demoNotifications);
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl pb-20 font-bold mb-8 text-black">Notifications</h1>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-yellow-500 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-lg font-semibold text-black">
                {notification.message}
              </p>
              <p className="text-sm text-black">
                {notification.timestamp}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
