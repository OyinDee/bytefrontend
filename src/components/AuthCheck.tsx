"use client";

import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'user' | 'restaurant' | null;
  setIsAuthenticated: (status: boolean) => void;
  setUserType: (type: 'user' | 'restaurant' | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'user' | 'restaurant' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    const isAuthRoute = ['/login', '/signup', '/forgot-password', '/', '/restaurant/login'].includes(currentPath);

    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);

        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('byteUser');
          setIsAuthenticated(false);
          setUserType(null);
          if (!isAuthRoute) router.push('/login');
        } else {
          setIsAuthenticated(true);

          if (decodedToken.user) {
            setUserType('user');
          } else if (decodedToken.restaurant) {
            setUserType('restaurant');
          }

          localStorage.setItem('byteUser', JSON.stringify(decodedToken));
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('byteUser');
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, setIsAuthenticated, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
