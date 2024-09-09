"use client";

import { useContext, useEffect } from 'react';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  UserIcon,
  ClockIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  BellIcon,
  CogIcon,
  CurrencyDollarIcon, // Fund Wallet icon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './AuthCheck';
import {jwtDecode} from 'jwt-decode';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;
  const decodedToken: any = localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token')!)
    : null;
  const userType = decodedToken?.user?.type || decodedToken?.restaurant?.type || 'user';

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    const logout = confirm("Sure you want to logout?")
    if(logout){
      localStorage.removeItem('token');
      localStorage.removeItem('byteUser');
      setIsAuthenticated(false);
      router.push('/login');
    }
    else{
      alert("Thanks, I guess...")
    }
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
          localStorage.removeItem('byteUser');
          setIsAuthenticated(false);
          if (!isAuthRoute) router.push('/login');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('byteUser');
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
      {/* Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-black text-white z-50 shadow-lg lg:hidden" style={{ height: '60px' }}>
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-1 justify-around mt-2">
            <ul className="flex items-center w-full justify-around">
              {isAuthenticated ? (
                <>
                  {/* Common links */}
                  <li className="flex flex-col items-center">
                    <Link href="/user" className={`flex flex-col items-center ${getLinkClassName('/user')}`}>
                      <HomeIcon className="h-5 w-5 mb-1" />
                    </Link>
                  </li>
                  <li className="flex flex-col items-center">
                    <Link href="/notifications" className={`flex flex-col items-center ${getLinkClassName('/notifications')}`}>
                      <BellIcon className="h-5 w-5 mb-1" />

                    </Link>
                  </li>
                  
                  {/* User-specific tabs */}
                  {userType === 'user' && (
                    <>
                      <li className="flex flex-col items-center">
                        <Link href="/user/offers" className={`flex flex-col items-center ${getLinkClassName('/user/offers')}`}>
                          <ShoppingBagIcon className="h-5 w-5 mb-1" />

                        </Link>
                      </li>
                      <li className="flex flex-col items-center">
                        <Link href="/user/cart" className={`flex flex-col items-center ${getLinkClassName('/user/cart')}`}>
                          <ShoppingCartIcon className="h-5 w-5 mb-1" />

                        </Link>
                      </li>
                      <li className="flex flex-col items-center">
                        <Link href="/user/fund" className={`flex flex-col items-center ${getLinkClassName('/user/fund')}`}>
                          <CurrencyDollarIcon className="h-5 w-5 mb-1" />

                        </Link>
                      </li>

                    </>
                  )}

                  {/* Restaurant-specific tabs */}
                  {userType === 'restaurant' && (
                    <>
                      <li className="flex flex-col items-center">
                        <Link href="/restaurant/orders" className={`flex flex-col items-center ${getLinkClassName('/restaurant/orders')}`}>
                          <ClockIcon className="h-5 w-5 mb-1" />
                          <span className="text-xs">Orders</span>
                        </Link>
                      </li>
                      <li className="flex flex-col items-center">
                        <Link href="/restaurant/edit" className={`flex flex-col items-center ${getLinkClassName('/restaurant/edit')}`}>
                          <UserIcon className="h-5 w-5 mb-1" />
                          <span className="text-xs">Edit</span>
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Admin-specific tabs */}
                  {userType === 'admin' && (
                    <>
                      <li className="flex flex-col items-center">
                        <Link href="/admin/dashboard" className={`flex flex-col items-center ${getLinkClassName('/admin/dashboard')}`}>
                          <CogIcon className="h-5 w-5 mb-1" />
                          <span className="text-xs">Dashboard</span>
                        </Link>
                      </li>
                      <li className="flex flex-col items-center">
                        <Link href="/admin/orders" className={`flex flex-col items-center ${getLinkClassName('/admin/orders')}`}>
                          <ClockIcon className="h-5 w-5 mb-1" />
                          <span className="text-xs">Orders</span>
                        </Link>
                      </li>
                    </>
                  )}


                  <li className="flex flex-col items-center">
                    <Link href="/profile" className={`flex flex-col items-center ${getLinkClassName('/profile')}`}>
                      <UserIcon className="h-5 w-5 mb-1" />

                    </Link>
                  </li>


                  <li className="flex flex-col items-center">
                    <button onClick={handleLogout} className="flex flex-col items-center hover:text-gray-400 transition-colors duration-200">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />

                    </button>
                  </li>
                </>
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
      <nav className="bg-black text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-6 lg:mb-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/restaurant/login" className="text-2xl font-bold">
            Byte!
          </Link>
          {isAuthenticated ? (
            <div className="hidden lg:flex lg:space-x-6">
              {/* Common links */}
              <Link href="/user/" className={getLinkClassName('/user')}>
                Home
              </Link>
              <Link href="/notifications" className={getLinkClassName('/notifications')}>
                Notifications
              </Link>

              {/* User-specific links */}
              {userType === 'user' && (
                <>
                  <Link href="/user/offers" className={getLinkClassName('/user/offers')}>
                    Offers
                  </Link>
                  <Link href="/user/cart" className={getLinkClassName('/user/cart')}>
                    Cart
                  </Link>
                  <Link href="/user/fund" className={getLinkClassName('/user/fund')}>
                    Fund Wallet
                  </Link>
                  <Link href="/user/orders" className={getLinkClassName('/user/orders')}>
                    Orders
                  </Link>
                </>
              )}

              {/* Restaurant-specific links */}
              {userType === 'restaurant' && (
                <>
                  <Link href="/restaurant/orders" className={getLinkClassName('/restaurant/orders')}>
                    Orders
                  </Link>
                  <Link href="/restaurant/edit" className={getLinkClassName('/restaurant/edit')}>
                    Edit
                  </Link>
                </>
              )}

              {/* Admin-specific links */}
              {userType === 'admin' && (
                <>
                  <Link href="/admin/dashboard" className={getLinkClassName('/admin/dashboard')}>
                    Dashboard
                  </Link>
                  <Link href="/admin/orders" className={getLinkClassName('/admin/orders')}>
                    Orders
                  </Link>
                </>
              )}

              <Link href="/profile" className={getLinkClassName('/profile')}>
                Profile
              </Link>

              <button onClick={handleLogout} className="hover:text-gray-400 transition-colors duration-200">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex lg:space-x-6">
              <Link href="/signup" className="hover:text-gray-400 transition-colors duration-200">
                Signup
              </Link>
              <Link href="/login" className="hover:text-gray-400 transition-colors duration-200">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
