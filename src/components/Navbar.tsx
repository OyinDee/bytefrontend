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
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from './AuthCheck';
import Cookies from 'js-cookie';

interface Notification {
  id: string;
  message: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { isAuthenticated, userType, setIsAuthenticated, userNotifications, restaurantNotifications } = authContext;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define getLinkClassName inside the component
  const getLinkClassName = (path: string) => {
    return pathname === path ? 'text-yellow-400' : 'hover:text-gray-400 transition-colors duration-200';
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('byteUser');

    setIsAuthenticated(false);
    router.push('/login');
  };

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const notifications = [
    { id: '1', message: 'Someone gave you bytes!' },
    { id: '2', message: 'Message from support' },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-black text-white z-50 shadow-lg lg:hidden" style={{ height: '60px' }}>
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-1 justify-around">
            <ul className="flex items-center w-full justify-around space-x-2">
              {isAuthenticated ? (
                userType === 'user' ? (
                  <>
                    <NavItem href="/user" icon={<HomeIcon className="w-6 h-6" />} label="Home" getLinkClassName={getLinkClassName} />
                    <NavItem href="/user/offers" icon={<ShoppingBagIcon className="w-6 h-6" />} label="Offers" getLinkClassName={getLinkClassName} />
                    <NavItem href="/user/fund" icon={<PlusCircleIcon className="w-6 h-6" />} label="Fund" getLinkClassName={getLinkClassName} />
                    <NavItem href="/user/cart" icon={<ShoppingCartIcon className="w-6 h-6" />} label="Cart" getLinkClassName={getLinkClassName} />
                    <NavItem href="/user/profile" icon={<UserIcon className="w-6 h-6" />} label="Profile" getLinkClassName={getLinkClassName} />
                    <NotificationItem
                      href="/user/notifications"
                      icon={<BellIcon className="w-6 h-6" />}
                      notifications={userNotifications}
                      isDropdownOpen={isDropdownOpen}
                      onClick={handleNotificationClick}
                      label="Notifs"
                    />
                    <NavItem
                      href="#"
                      icon={<ArrowRightOnRectangleIcon className="w-6 h-6" />}
                      label="Logout"
                      getLinkClassName={getLinkClassName}
                      onClick={handleLogout}
                    />
                  </>
                ) : (
                  <>
                    <NavItem href="/restaurant/dashboard" icon={<HomeIcon className="w-6 h-6" />} label="Dashboard" getLinkClassName={getLinkClassName} />
                    <NavItem href="/restaurant/orders" icon={<ShoppingBagIcon className="w-6 h-6" />} label="Orders" getLinkClassName={getLinkClassName} />
                    <NavItem href="/restaurant/menu" icon={<PlusCircleIcon className="w-6 h-6" />} label="Menu" getLinkClassName={getLinkClassName} />
                    <NotificationItem
                      href="/restaurant/notifications"
                      icon={<BellIcon className="w-6 h-6" />}
                      notifications={restaurantNotifications}
                      isDropdownOpen={isDropdownOpen}
                      onClick={handleNotificationClick}
                      label="Notifs"
                    />
                    <NavItem
                      href="#"
                      icon={<ArrowRightOnRectangleIcon className="w-6 h-6" />}
                      label="Logout"
                      getLinkClassName={getLinkClassName}
                      onClick={handleLogout}
                    />
                  </>
                )
              ) : (
                <>
                  <NavItem href="/signup" icon={<PlusCircleIcon className="w-6 h-6" />} label="Signup" getLinkClassName={getLinkClassName} />
                  <NavItem href="/login" icon={<ArrowRightOnRectangleIcon className="w-6 h-6" />} label="Login" getLinkClassName={getLinkClassName} />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Navbar for large screens */}
      <nav className="bg-black text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-6">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <Link href="/restaurant/login" className="text-2xl font-bold text-white">
            Byte
          </Link>
          <div className="hidden lg:flex lg:space-x-6 lg:ml-auto lg:mr-4">
            {isAuthenticated ? (
              userType === 'user' ? (
                <>
                  <NavLink href="/user" label="Home" getLinkClassName={getLinkClassName} />
                  <NavLink href="/user/offers" label="Offers" getLinkClassName={getLinkClassName} />
                  <NavLink href="/user/fund" label="Fund" getLinkClassName={getLinkClassName} />
                  <NavLink href="/user/cart" label="Cart" getLinkClassName={getLinkClassName} />
                  <NavLink href="/user/profile" label="Profile" getLinkClassName={getLinkClassName} />

                  <NavItem
                    href="#"
                    icon={<ArrowRightOnRectangleIcon className="w-6 h-6" />}
                    label="Logout"
                    getLinkClassName={getLinkClassName}
                    onClick={handleLogout}
                  />
                </>
              ) : (
                <>
                  <NavLink href="/restaurant/dashboard" label="Dashboard" getLinkClassName={getLinkClassName} />
                  <NavLink href="/restaurant/orders" label="Orders" getLinkClassName={getLinkClassName} />
                  <NavLink href="/restaurant/menu" label="Menu" getLinkClassName={getLinkClassName} />

                  <NavItem
                    href="#"
                    icon={<ArrowRightOnRectangleIcon className="w-6 h-6" />}
                    label="Logout"
                    getLinkClassName={getLinkClassName}
                    onClick={handleLogout}
                  />
                </>
              )
            ) : (
              <>
                <NavLink href="/signup" label="Signup" getLinkClassName={getLinkClassName} />
                <NavLink href="/login" label="Login" getLinkClassName={getLinkClassName} />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const NavItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  label?: string;
  getLinkClassName: (path: string) => string;
  onClick?: () => void;
}> = ({ href, icon, label, getLinkClassName, onClick }) => (
  <li className="flex items-center justify-center w-16 h-16">
    <Link href={href} onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full ${getLinkClassName(href)}`} aria-label={label}>
      {icon}
      {label && <span className="text-xs mt-1">{label}</span>}
    </Link>
  </li>
);

const NotificationItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  notifications: Notification[];
  isDropdownOpen: boolean;
  onClick: () => void;
  label?: string;
}> = ({ href, icon, notifications, isDropdownOpen, onClick, label }) => (
  <li className="relative flex items-center justify-center w-16 h-16">
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full">
      {icon}
      {label && <span className="text-xs mt-1">{label}</span>}
    </button>
    {notifications.length > 0 && isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20">
        {notifications.map(notification => (
          <a key={notification.id} href={href} className="block px-4 py-2 hover:bg-gray-100">
            {notification.message}
          </a>
        ))}
      </div>
    )}
  </li>
);

const NavLink: React.FC<{ href: string; label: string; getLinkClassName: (path: string) => string }> = ({ href, label, getLinkClassName }) => (
  <Link href={href} className={`flex items-center px-4 py-2 rounded-md ${getLinkClassName(href)}`}>
    {label}
  </Link>
);

export default Navbar;
