"use client"
import { Inter } from "next/font/google";
import './globals.css';
import AuthProvider from '@/components/AuthCheck';
import RestaurantNavbar from '@/components/RestaurantNavbar';
import UserNavbar from '@/components/UserNavbar';
import PublicNavbar from '@/components/PublicNavbar';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import MetaTags from './MetaTags';

const inter = Inter({ subsets: ["latin"] });

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
        if (decodedToken) {
          localStorage.setItem('byteUser', JSON.stringify(decodedToken.user))
          router.push('/user/');
        }
      } catch (error) {
      }
    } else {

    }
  }, [router]);
  const pathname = usePathname();

  const renderNavbar = () => {
    if (pathname.startsWith('/restaurant') && pathname !='/restaurant/login') {
      return <RestaurantNavbar />;
    } else if (pathname.startsWith('/user')) {
      return <UserNavbar />;
    } else {
      return <PublicNavbar />;
    }
  };

  return (
    <html>
      <body className={inter.className}>
          <MetaTags /> 
          {renderNavbar()}
          <main>{children}</main>
      </body>
    </html>
  );
}
