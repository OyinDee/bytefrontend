"use client"
import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Adjust import if necessary


interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info'; // Adjust types based on your needs
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'user' | 'restaurant' | null;
  userNotifications: Notification[];
  restaurantNotifications: Notification[];
  addNotification: (notification: Notification, type: 'user' | 'restaurant') => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setIsAuthenticated: (status: boolean) => void;
  setUserType: (type: 'user' | 'restaurant' | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'user' | 'restaurant' | null>(null);
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
  const [restaurantNotifications, setRestaurantNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const currentPath = window.location.pathname;
  
    const isAuthRoute = ['/login', '/signup', '/forgot-password', '/', '/restaurant/login'].includes(currentPath);
  
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);
        // console.log('Decoded Token:', decodedToken);
  
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          Cookies.remove('token');
          setIsAuthenticated(false);
          setUserType(null);
          if (!isAuthRoute) router.push('/login');
        } else {
          setIsAuthenticated(true);
  
          if (decodedToken.user) {
            setUserType('user');
          } else if (decodedToken.restaurant) {
            setUserType('restaurant');
          } else {
            setUserType(null);
          }
  
          Cookies.set('byteUser', JSON.stringify(decodedToken), { expires: 7 });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUserType(null);
        if (!isAuthRoute) router.push('/login');
      }
    } else {
      setIsAuthenticated(false);
      setUserType(null);
      if (!isAuthRoute) router.push('/login');
    }
  }, [router]);
  

  const addNotification = (notification: Notification, type: 'user' | 'restaurant') => {
    if (type === 'user') {
      setUserNotifications((prevNotifications) => [...prevNotifications, notification]);
    } else if (type === 'restaurant') {
      setRestaurantNotifications((prevNotifications) => [...prevNotifications, notification]);
    }
  };

  const removeNotification = (id: string) => {
    setUserNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
    setRestaurantNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
  };

  const clearNotifications = () => {
    setUserNotifications([]);
    setRestaurantNotifications([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        userNotifications,
        restaurantNotifications,
        addNotification,
        removeNotification,
        clearNotifications,
        setIsAuthenticated,
        setUserType
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
