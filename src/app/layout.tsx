
"use client";

import React, { useEffect } from 'react';
import './globals.css';
import MetaTags from './MetaTags'
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Head from 'next/head'
import { jwtDecode } from 'jwt-decode';
import Head from 'next/head';
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
          localStorage.setItem('byteUser', JSON.stringify(decodedToken.user));
        } else if (decodedToken.restaurant) {
          router.push('/restaurant/dashboard');
        } else {
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
<html>
<Head>
      <title>Byte</title>
      <meta name="description" content="...Fast and hungry!" />
      <meta name="generator" content="Next.js" />
      <meta name="manifest" content="/manifest.json" />
      <meta name="keywords" content="nextjs, next14, pwa, next-pwa" />
      <meta name="theme-color" content="#fff" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" href="/icons/pizza.png" />
      <link rel="icon" href="/icons/pizza-32x32.png" sizes="32x32" />
      <link rel="icon" href="/icons/pizza-192x192.png" sizes="192x192" />
    </Head>
  <body>
    

      <Navbar />
      <main>{children}</main>
    </body>
    </html>
</>
  );
}
