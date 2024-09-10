"use client";

import { useContext, useState } from 'react';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  UserIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  BellIcon,
  EllipsisHorizontalIcon, // New "More" icon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './AuthCheck';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false); // State for toggling "More" dropdown

  if (!authContext) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { isAuthenticated, userType, setIsAuthenticated } = authContext;

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('byteUser');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-black text-white z-50 shadow-lg lg:hidden" style={{ height: '60px' }}>
        <div className="flex items-center justify-around p-2">
          <ul className="flex items-center w-full justify-around">
            {isAuthenticated ? (
              userType === 'user' ? (
                <>
                  <li>
                    <Link href="/user" className={`flex flex-col items-center ${getLinkClassName('/user')}`}>
                      <HomeIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/fund" className={`flex flex-col items-center ${getLinkClassName('/user/fund')}`}>
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Fund</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/cart" className={`flex flex-col items-center ${getLinkClassName('/user/cart')}`}>
                      <ShoppingCartIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Cart</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/notifications" className={`flex flex-col items-center ${getLinkClassName('/user/notifications')}`}>
                      <BellIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Notifications</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => setShowMore(!showMore)} className="flex flex-col items-center">
                      <EllipsisHorizontalIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">More</span>
                    </button>
                    {showMore && (
                      <ul className="absolute bg-black text-white p-2 rounded-lg mt-1 space-y-2 shadow-md">
                        <li>
                          <Link href="/user/offers" className={`flex flex-col items-center ${getLinkClassName('/user/offers')}`}>
                            <ShoppingBagIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Offers</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/user/profile" className={`flex flex-col items-center ${getLinkClassName('/user/profile')}`}>
                            <UserIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Profile</span>
                          </Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Logout</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/restaurant/dashboard" className={`flex flex-col items-center ${getLinkClassName('/restaurant/dashboard')}`}>
                      <HomeIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/restaurant/notifications" className={`flex flex-col items-center ${getLinkClassName('/restaurant/notifications')}`}>
                      <BellIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Notifications</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/restaurant/menu" className={`flex flex-col items-center ${getLinkClassName('/restaurant/menu')}`}>
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Menu</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => setShowMore(!showMore)} className="flex flex-col items-center">
                      <EllipsisHorizontalIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">More</span>
                    </button>
                    {showMore && (
                      <ul className="absolute bg-black text-white p-2 rounded-lg mt-1 space-y-2 shadow-md">
                        <li>
                          <Link href="/restaurant/orders" className={`flex flex-col items-center ${getLinkClassName('/restaurant/orders')}`}>
                            <ShoppingBagIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Orders</span>
                          </Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                            <span className="text-xs">Logout</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <Link href="/signup" className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                    <PlusCircleIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Signup</span>
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Login</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Navbar for large screens */}
      <nav className="bg-black text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg hidden lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-6">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white">
            Byte
          </Link>

          <div className="flex space-x-6">
            {isAuthenticated && userType === 'user' && (
              <>
                <Link href="/user" className={`text-lg font-semibold ${getLinkClassName('/user')}`}>Home</Link>
                <Link href="/user/offers" className={`text-lg font-semibold ${getLinkClassName('/user/offers')}`}>Offers</Link>
                <Link href="/user/fund" className={`text-lg font-semibold ${getLinkClassName('/user/fund')}`}>Fund</Link>
                <Link href="/user/cart" className={`text-lg font-semibold ${getLinkClassName('/user/cart')}`}>Cart</Link>
                <Link href="/user/profile" className={`text-lg font-semibold ${getLinkClassName('/user/profile')}`}>Profile</Link>
                <Link href="/user/notifications" className={`text-lg font-semibold ${getLinkClassName('/user/notifications')}`}>Notifications</Link>
              </>
            )}
            {isAuthenticated && userType === 'restaurant' && (
              <>
                <Link href="/restaurant/dashboard" className={`text-lg font-semibold ${getLinkClassName('/restaurant/dashboard')}`}>Dashboard</Link>
                <Link href="/restaurant/orders" className={`text-lg font-semibold ${getLinkClassName('/restaurant/orders')}`}>Orders</Link>
                <Link href="/restaurant/menu" className={`text-lg font-semibold ${getLinkClassName('/restaurant/menu')}`}>Menu</Link>
                <Link href="/restaurant/notifications" className={`text-lg font-semibold ${getLinkClassName('/restaurant/notifications')}`}>Notifications</Link>
              </>
            )}
          </div>

          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/signup" className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
                  Signup
                </Link>
                <Link href="/login" className="ml-4 text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
