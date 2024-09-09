"use client";

import { useContext } from 'react';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  UserIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './AuthCheck';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { isAuthenticated, userType, setIsAuthenticated } = authContext;

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('byteUser');

    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-black text-white z-50 shadow-lg lg:hidden" style={{ height: '60px' }}>
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-1 justify-around">
            <ul className="flex items-center w-full justify-around">
              {isAuthenticated ? (
                userType === 'user' ? (
                  <>
                    <li className="flex flex-col items-center">
                      <Link href="/user" className={`flex flex-col items-center ${getLinkClassName('/user')}`}>
                        <HomeIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Home</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/user/offers" className={`flex flex-col items-center ${getLinkClassName('/user/offers')}`}>
                        <ShoppingBagIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Offers</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/user/fund" className={`flex flex-col items-center ${getLinkClassName('/user/fund')}`}>
                        <PlusCircleIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Fund</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/user/cart" className={`flex flex-col items-center ${getLinkClassName('/user/cart')}`}>
                        <ShoppingCartIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Cart</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/user/profile" className={`flex flex-col items-center ${getLinkClassName('/user/profile')}`}>
                        <UserIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Profile</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/user/notifications" className={`flex flex-col items-center ${getLinkClassName('/user/notifications')}`}>
                        <BellIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Notifications</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <button onClick={handleLogout} className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex flex-col items-center">
                      <Link href="/restaurant/dashboard" className={`flex flex-col items-center ${getLinkClassName('/restaurant/dashboard')}`}>
                        <HomeIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Dashboard</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/restaurant/orders" className={`flex flex-col items-center ${getLinkClassName('/restaurant/orders')}`}>
                        <ShoppingBagIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Orders</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <Link href="/restaurant/menu" className={`flex flex-col items-center ${getLinkClassName('/restaurant/menu')}`}>
                        <PlusCircleIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Menu</span>
                      </Link>
                    </li>
                    <li className="flex flex-col items-center">
                      <button onClick={handleLogout} className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Logout</span>
                      </button>
                    </li>
                  </>
                )
              ) : (
                <>
                  <li className="flex flex-col items-center">
                    <Link href="/signup" className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                      <PlusCircleIcon className="h-5 w-5 mb-1" />
                      <span className="text-xs">Signup</span>
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link href="/login" className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
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
      <nav className="bg-black text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-6">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          {/* App Name */}
          <Link href="/" className="text-2xl font-bold text-white">
            Byte
          </Link>

          {/* Menu Links */}
          <div className="hidden lg:flex flex-grow justify-center space-x-6">
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
              </>
            )}
          </div>

          {/* Auth Links or Logout Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/signup" className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">Signup</Link>
                <Link href="/login" className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">Login</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">Logout</button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
