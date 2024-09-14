"use client";
import React, { useEffect } from 'react';
import '../globals.css';
import { useRouter, usePathname } from 'next/navigation'; 
import { jwtDecode } from 'jwt-decode';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {

    if (pathname !== '/restaurant/login') {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const decodedToken = jwtDecode<any>(token);
          
          if (decodedToken.restaurant) {
            localStorage.setItem('byteUser', JSON.stringify(decodedToken.restaurant));
          } else {
            router.push('/user/');
          }
        } catch (error) {
          console.error('Invalid token', error);
          localStorage.removeItem('token');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }
  }, [pathname, router]);

  return (
    <>
      {children}
    </>
  );
}
