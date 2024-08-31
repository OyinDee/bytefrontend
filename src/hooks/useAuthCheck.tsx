"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    const isAuthRoute = currentPath === '/login' || currentPath === '/signup';

    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);

        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          localStorage.setItem('byteUser', JSON.stringify(decodedToken));
          if (isAuthRoute) {
            router.push('/home');
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else {
      if (!isAuthRoute) {
        router.push('/login');
      }
    }
  }, [router]);
};

export default useAuthCheck;

