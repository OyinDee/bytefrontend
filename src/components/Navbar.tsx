"use client";

import { useContext, useEffect } from 'react';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  UserIcon,
  ClockIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './AuthCheck'; 
import { jwtDecode } from 'jwt-decode'; 

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

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
  }, [isAuthenticated, router, setIsAuthenticated]);

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 w-full bg-black text-white z-50 shadow-lg lg:hidden"
        style={{ height: '60px' }}
      >
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-1 justify-around">
            <ul className="flex items-center w-full justify-around">
              {isAuthenticated ? (
                <>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/user"
                      className={`flex flex-col items-center ${getLinkClassName('/user')}`}
                    >
                      <HomeIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/user/offers"
                      className={`flex flex-col items-center ${getLinkClassName('/user/offers')}`}
                    >
                      <ShoppingBagIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Offers</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/user/fund"
                      className={`flex flex-col items-center ${getLinkClassName('/user/fund')}`}
                    >
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Fund</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/user/profile"
                      className={`flex flex-col items-center ${getLinkClassName('/user/profile')}`}
                    >
                      <UserIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Profile</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <button
                      onClick={handleLogout}
                      className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/signup"
                      className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200"
                    >
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Signup</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/login"
                      className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Login</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Navbar for large screens */}
      <nav className="bg-black text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-6 lg:mb-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Byte!
          </Link>
          {isAuthenticated ? (
            <div className="hidden lg:flex lg:space-x-6">
              <Link href="/user/" className={getLinkClassName('/user/')}>
                Home
              </Link>
              <Link href="/user/offers" className={getLinkClassName('/user/offers')}>
                Offers
              </Link>
              <Link href="/user/fund" className={getLinkClassName('/user/fund')}>
                Fund Account
              </Link>
              <Link href="/user/profile" className={getLinkClassName('/user/profile')}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex lg:space-x-6">
              <Link
                href="/login"
                className="flex items-center hover:text-gray-400 transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
                Login
              </Link>
              <Link
                href="/signup"
                className="flex items-center hover:text-gray-400 transition-colors duration-200"
              >
                <PlusCircleIcon className="h-6 w-6 mr-2" />
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
