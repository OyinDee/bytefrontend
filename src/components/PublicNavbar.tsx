"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  PlusCircleIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const PublicNavbar: React.FC = () => {
  const pathname = usePathname();

  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-yellow-400 transition-colors duration-200';
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/restaurant/login" className="text-white text-2xl font-bold">
          Byte!
        </Link>
        <div className="fixed bottom-0 inset-x-0 bg-black p-4 md:hidden flex justify-between items-center z-50">
          <ul className="flex justify-between w-full px-10 text-white">
            <li>
              <Link href="/signup" className={`flex flex-col items-center ${getLinkClassName('/signup')}`}>
                <PlusCircleIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Sign Up</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className={`flex flex-col items-center ${getLinkClassName('/login')}`}>
                <UserIcon className="h-5 w-5 mb-1" />
                <span className="text-xs">Login</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex space-x-8 text-white">
          <Link href="/signup" className={`text-lg font-semibold ${getLinkClassName('/signup')}`}>
            Sign Up
          </Link>
          <Link href="/login" className={`text-lg font-semibold ${getLinkClassName('/login')}`}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
