"use client"
import React from 'react'
import '../globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../../components/Navbar";
import { jwtDecode } from 'jwt-decode';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);
        if (decodedToken.user) {
          localStorage.setItem('byteUser', JSON.stringify(decodedToken.user))
        }
      else if(decodedToken.restaurant){
        router.push('/restaurant/dashboard')
      }
      else{
        localStorage.removeItem('token'); 
        router.push('/login');
      }
      } catch (error) {

        console.error('Invalid token', error);
        localStorage.removeItem('token'); 
        router.push('/login');
      }
    } else {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <>

        {children}

    </>
  );
}
