"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  ShoppingCartIcon,
  BellIcon,
  UserIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../app/user/cartContext'; 

const UserNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showPrimaryMenu, setShowPrimaryMenu] = useState(true);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-yellow-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    const confirmLogout = confirm("Do you really want to log out?");
    if (confirmLogout) {
      alert("Aiit, calm... You have it!");
      localStorage.removeItem('token');
      router.push('/login');
    }
    else{
      alert("Thanks, I guess")
    }
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Byte!
        </Link>
        <div className="fixed bottom-0 inset-x-0 bg-black p-4 md:hidden flex justify-between items-center z-50">
          <ul className="flex justify-between w-full text-white">
            {showPrimaryMenu ? (
              <>
                <li>
                  <Link href="/user" className={`flex flex-col items-center ${getLinkClassName('/user')}`}>
                    <HomeIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user/cart" className={`flex flex-col items-center ${getLinkClassName('/user/cart')}`}>
                    <ShoppingCartIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Cart</span>
                    {itemCount > 0 && (
                      <span className="absolute top-0 right-0 text-xs text-yellow-400 bg-black rounded-full px-2 py-1">{itemCount}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link href="/user/hii" className={`flex flex-col items-center ${getLinkClassName('/user/hii')}`}>
                    <BellIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Notifs</span>
                  </Link>
                </li>
                <li>
                  <button onClick={() => setShowPrimaryMenu(false)} className="flex flex-col items-center hover:text-yellow-400 transition-colors duration-200">
                    <EllipsisHorizontalIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">More</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/user/profile" className={`flex flex-col items-center ${getLinkClassName('/user/profile')}`}>
                    <UserIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user/fund" className={`flex flex-col items-center ${getLinkClassName('/user/fund')}`}>
                    <PlusCircleIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Fund</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex flex-col items-center hover:text-yellow-400 transition-colors duration-200">
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Logout</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowPrimaryMenu(true)} className="flex flex-col items-center hover:text-yellow-400 transition-colors duration-200">
                    <EllipsisHorizontalIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Main</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="hidden md:flex space-x-8 text-white">
          <Link href="/user" className={`text-lg font-semibold ${getLinkClassName('/user')}`}>
            Home
          </Link>
          <Link href="/user/cart" className={`text-lg font-semibold ${getLinkClassName('/user/cart')}`}>
            Cart
            {itemCount > 0 && (
              <span className="ml-2 text-xs text-yellow-400 bg-black rounded-full px-2 py-1">{itemCount}</span>
            )}
          </Link>
          <Link href="/user/hii" className={`text-lg font-semibold ${getLinkClassName('/user/hii')}`}>
            Notifications
          </Link>
          <Link href="/user/profile" className={`text-lg font-semibold ${getLinkClassName('/user/profile')}`}>
            Profile
          </Link>
          <Link href="/user/fund" className={`text-lg font-semibold ${getLinkClassName('/user/fund')}`}>
            Fund
          </Link>
          <button onClick={handleLogout} className="text-lg font-semibold hover:text-yellow-400 transition-colors duration-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
