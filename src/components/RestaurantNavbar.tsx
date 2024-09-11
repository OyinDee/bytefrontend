"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  ShoppingBagIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const RestaurantNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

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
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/restaurant" className="text-white text-2xl font-bold">
          Byte!
        </Link>
        <div className="fixed bottom-0 inset-x-0 bg-black p-4 md:hidden flex justify-between items-center z-50">
          <ul className="flex justify-between w-full text-white">
            <li>
              <Link href="/restaurant/dashboard" className={`flex flex-col items-center ${getLinkClassName('/restaurant/dashboard')}`}>
                <HomeIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/restaurant/meals" className={`flex flex-col items-center ${getLinkClassName('/restaurant/meals')}`}>
                <ShoppingBagIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Meals</span>
              </Link>
            </li>
            <li>
              <Link href="/restaurant/notifications" className={`flex flex-col items-center ${getLinkClassName('/restaurant/notifications')}`}>
                <BellIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Notifications</span>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex flex-col items-center hover:text-yellow-400 transition-colors duration-200">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex space-x-8 text-white">
          <Link href="/restaurant/dashboard" className={`text-lg font-semibold ${getLinkClassName('/restaurant/dashboard')}`}>
            Dashboard
          </Link>
          <Link href="/restaurant/meals" className={`text-lg font-semibold ${getLinkClassName('/restaurant/meals')}`}>
            Meals
          </Link>
          <Link href="/restaurant/notifications" className={`text-lg font-semibold ${getLinkClassName('/restaurant/notifications')}`}>
            Notifications
          </Link>
          <button onClick={handleLogout} className="text-lg font-semibold hover:text-yellow-400 transition-colors duration-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
