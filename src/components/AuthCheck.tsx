"use client";

import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    const isAuthRoute = currentPath === '/login' || currentPath === '/signup' || currentPath === '/forgot-password' || currentPath === '/';

    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);

        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          if (!isAuthRoute) router.push('/login');
        } else {
          setIsAuthenticated(true);
          localStorage.setItem('byteUser', JSON.stringify(decodedToken));
          if (isAuthRoute) router.push('/');
        }
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        if (!isAuthRoute) router.push('/login');
      }
    } else {
      setIsAuthenticated(false);
      if (!isAuthRoute) router.push('/login');
    }

  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
