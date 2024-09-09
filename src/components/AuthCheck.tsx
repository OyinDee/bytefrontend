"use client";

import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; 

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'user'| 'admin' | 'restaurant' | null;
  userData: any | null;
  setIsAuthenticated: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'user'| 'admin' | 'restaurant' | null>(null);
  const [userData, setUserData] = useState<any | null>(null); // Holds the user or restaurant data
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    const isAuthRoute = currentPath === '/login' || currentPath === '/signup' || currentPath === '/forgot-password' || currentPath === '/';

    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);

        // Check token expiration
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUserType(null);
          setUserData(null);
          if (!isAuthRoute) router.push('/login');
        } else {
          setIsAuthenticated(true);
          
          
          if (decodedToken.user) {
          if (decodedToken.user.superAdmin) {

            setUserType('admin');
            setUserData(decodedToken.user);

          }
          else{
              setUserType('user');
            setUserData(decodedToken.user);}
          } else if (decodedToken.restaurant) {
            setUserType('restaurant');
            setUserData(decodedToken.restaurant);
          }
          
          localStorage.setItem('byteUser', JSON.stringify(decodedToken));
        }
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserType(null);
        setUserData(null);
        if (!isAuthRoute) router.push('/login');
      }
    } else {
      setIsAuthenticated(false);
      setUserType(null);
      setUserData(null);
      if (!isAuthRoute) router.push('/login');
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, userData, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
