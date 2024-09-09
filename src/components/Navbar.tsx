"use client";

import { useContext, useState, useMemo } from 'react';
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
import NavLink from './Navlink';

// Define the Notification type
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
                  <NavItem href="/user" icon={<HomeIcon />} label="Home" getLinkClassName={getLinkClassName} />
                  <NavItem href="/user/offers" icon={<ShoppingBagIcon />} label="Offers" getLinkClassName={getLinkClassName} />
                  <NavItem href="/user/fund" icon={<PlusCircleIcon />} label="Fund" getLinkClassName={getLinkClassName} />
                  <NavItem href="/user/cart" icon={<ShoppingCartIcon />} label="Cart" getLinkClassName={getLinkClassName} />
                  <NavItem href="/user/profile" icon={<UserIcon />} label="Profile" getLinkClassName={getLinkClassName} />
                  <NotificationItem
                    href="/user/notifications"
                    icon={<BellIcon />}
                    notifications={userNotifications}
                    isDropdownOpen={isDropdownOpen}
                    onClick={handleNotificationClick}
                  />
                  <LogoutButton onClick={handleLogout} />
                </>
              ) : (
                <>
                  <NavItem href="/restaurant/dashboard" icon={<HomeIcon />} label="Dashboard" getLinkClassName={getLinkClassName} />
                  <NavItem href="/restaurant/orders" icon={<ShoppingBagIcon />} label="Orders" getLinkClassName={getLinkClassName} />
                  <NavItem href="/restaurant/menu" icon={<PlusCircleIcon />} label="Menu" getLinkClassName={getLinkClassName} />
                  <NotificationItem
                    href="/restaurant/notifications"
                    icon={<BellIcon />}
                    notifications={restaurantNotifications}
                    isDropdownOpen={isDropdownOpen}
                    onClick={handleNotificationClick}
                  />
                  <LogoutButton onClick={handleLogout} />
                </>
              )
            ) : (
              <>
                {/* Mobile version of Signup and Login */}
                <NavItem href="/signup" icon={<PlusCircleIcon />} label="Signup" getLinkClassName={getLinkClassName} />
                <NavItem href="/login" icon={<ArrowRightOnRectangleIcon />} label="Login" getLinkClassName={getLinkClassName} />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

    {/* Navbar for large screens */}
    <nav className="bg-black text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-6">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-white">
          Byte {/* Updated app name */}
        </Link>
        <div className="hidden lg:flex lg:space-x-6">
          {isAuthenticated ? (
            userType === 'user' ? (
              <>
                <NavLink href="/user" label="Home" getLinkClassName={getLinkClassName} />
                <NavLink href="/user/offers" label="Offers" getLinkClassName={getLinkClassName} />
                <NavLink href="/user/fund" label="Fund" getLinkClassName={getLinkClassName} />
                <NavLink href="/user/cart" label="Cart" getLinkClassName={getLinkClassName} />
                <NavLink href="/user/profile" label="Profile" getLinkClassName={getLinkClassName} />
                <NotificationButton
                  href="/user/notifications"
                  icon={<BellIcon />}
                  notifications={userNotifications}
                  isDropdownOpen={isDropdownOpen}
                  onClick={handleNotificationClick}
                />
              </>
            ) : (
              <>
                <NavLink href="/restaurant/dashboard" label="Dashboard" getLinkClassName={getLinkClassName} />
                <NavLink href="/restaurant/orders" label="Orders" getLinkClassName={getLinkClassName} />
                <NavLink href="/restaurant/menu" label="Menu" getLinkClassName={getLinkClassName} />
                <NotificationButton
                  href="/restaurant/notifications"
                  icon={<BellIcon />}
                  notifications={restaurantNotifications}
                  isDropdownOpen={isDropdownOpen}
                  onClick={handleNotificationClick}
                />
              </>
            )
          ) : (
        <>
        <Link href="/signup" className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
          Signup
        </Link>
        <Link href="/login" className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
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

const NavItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  getLinkClassName: (path: string) => string;
}> = ({ href, icon, label, getLinkClassName }) => (
  <li className="flex flex-col items-center">
    <Link href={href} className={`flex flex-col items-center ${getLinkClassName(href)}`}>
      <div className="w-6 h-6">{icon}</div> {/* Added consistent size */}
      <span className="text-xs">{label}</span>
    </Link>
  </li>
);


const NotificationItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  notifications: Notification[];
  isDropdownOpen: boolean;
  onClick: () => void;
}> = ({ href, icon, notifications, isDropdownOpen, onClick }) => (
  <li className="flex flex-col items-center relative">
    <button onClick={onClick} className="flex flex-col items-center">
      <div className="w-6 h-6">{icon}</div> {/* Consistent size */}
      {notifications.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          {notifications.length}
        </span>
      )}
      <span className="text-xs">Notifications</span>
    </button>
    {isDropdownOpen && (
      <div className="absolute top-full right-0 bg-white text-black shadow-lg mt-2 w-48 rounded-lg overflow-hidden">
        <ul className="divide-y">
          {notifications.map((notification) => (
            <li key={notification.id} className="p-2 text-sm">{notification.message}</li>
          ))}
        </ul>
      </div>
    )}
  </li>
);


const NotificationButton: React.FC<{
  href: string;
  icon: React.ReactNode;
  notifications: Notification[];
  isDropdownOpen: boolean;
  onClick: () => void;
}> = ({ href, icon, notifications, isDropdownOpen, onClick }) => {
  const pathname = usePathname(); // Correctly using the hook

  return (
    <div className="relative">
      <button onClick={onClick} className="flex flex-col items-center">
        <div className="w-6 h-6">{icon}</div> {/* Consistent size */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{notifications.length}</span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute top-full right-0 bg-white text-black shadow-lg mt-2 w-48 rounded-lg overflow-hidden">
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-2 text-sm">{notification.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


const LogoutButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="text-lg font-semibold hover:text-gray-400 transition-colors duration-200">
    Logout
  </button>
);

export default Navbar;
