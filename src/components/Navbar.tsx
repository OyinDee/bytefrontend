"use client";

import { useContext, useState } from 'react';
import { Bars3Icon, XMarkIcon, HomeIcon, ArrowRightOnRectangleIcon, ShoppingBagIcon, UserIcon, ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/components/AuthCheck';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); 
  const authContext = useContext(AuthContext);

  const isAuthenticated = authContext?.isAuthenticated; // Check if context is undefined

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  return (
    <>
      {/* Sidebar for small screens */}
      <nav
        className={`fixed bottom-0 left-0 w-full bg-black text-white transform transition-transform ${
          isSidebarOpen ? 'translate-y-0' : 'translate-y-full'
        } lg:hidden z-50 shadow-lg`}
        style={{ height: '60px' }}
      >
        <div className="flex items-center justify-between p-2">
          <div
            className={`flex flex-1 justify-around ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex items-center w-full justify-around">
              {isAuthenticated ? (
                <>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/"
                      onClick={closeSidebar}
                      className={`flex flex-col items-center ${getLinkClassName(
                        '/'
                      )}`}
                    >
                      <HomeIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/offers"
                      onClick={closeSidebar}
                      className={`flex flex-col items-center ${getLinkClassName(
                        '/offers'
                      )}`}
                    >
                      <ShoppingBagIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Offers</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/fund"
                      onClick={closeSidebar}
                      className={`flex flex-col items-center ${getLinkClassName(
                        '/fund'
                      )}`}
                    >
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Fund</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/history"
                      onClick={closeSidebar}
                      className={`flex flex-col items-center ${getLinkClassName(
                        '/history'
                      )}`}
                    >
                      <ClockIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">History</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/profile"
                      onClick={closeSidebar}
                      className={`flex flex-col items-center ${getLinkClassName(
                        '/profile'
                      )}`}
                    >
                      <UserIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Profile</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/login"
                      onClick={closeSidebar}
                      className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Login</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link
                      href="/signup"
                      onClick={closeSidebar}
                      className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200"
                    >
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Signup</span>
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
              <Link href="/profile" className={getLinkClassName('/profile')}>
                Profile
              </Link>
              <Link href="/history" className={getLinkClassName('/history')}>
                History
              </Link>
              <Link href="/offers" className={getLinkClassName('/offers')}>
                Offers
              </Link>
              <Link href="/fund" className={getLinkClassName('/fund')}>
                Fund Account
              </Link>
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
          <div className="block lg:hidden">
            <button onClick={toggleSidebar} className="text-white">
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
