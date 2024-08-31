"use client";

import { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '@/components/AuthCheck';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for authentication

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update state based on token presence
  }, []);

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      setIsAuthenticated(false); // Update state after logout
      router.push('/login');
    }
  };

  return (
    <>
      {/* Navbar for small screens (always visible) */}
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
                      href="/"
                      className={`flex flex-col items-center ${getLinkClassName('/')}`}
                    >
                      <HomeIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/search"
                      className={`flex flex-col items-center ${getLinkClassName('/search')}`}
                    >
                      <ClockIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Search</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/fund"
                      className={`flex flex-col items-center ${getLinkClassName('/fund')}`}
                    >
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Fund</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/offers"
                      className={`flex flex-col items-center ${getLinkClassName('/offers')}`}
                    >
                      <ShoppingBagIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Offers</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/profile"
                      className={`flex flex-col items-center ${getLinkClassName('/profile')}`}
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
              <Link href="/" className={getLinkClassName('/')}>
                Home
              </Link>
              <Link href="/search" className={getLinkClassName('/search')}>
                Search
              </Link>
              <Link href="/fund" className={getLinkClassName('/fund')}>
                Fund Account
              </Link>
              <Link href="/offers" className={getLinkClassName('/offers')}>
                Offers
              </Link>
              <Link href="/profile" className={getLinkClassName('/profile')}>
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
