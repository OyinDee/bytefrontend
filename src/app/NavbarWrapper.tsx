"use client";

import RestaurantNavbar from '@/components/RestaurantNavbar';
import UserNavbar from '@/components/UserNavbar';
import PublicNavbar from '@/components/PublicNavbar';
import { usePathname } from 'next/navigation';

export default function NavbarWrapper() {
  const pathname = usePathname();

  const renderNavbar = () => {
    if (pathname.startsWith('/restaurant') && pathname != '/restaurant/login') {
      return <RestaurantNavbar />;
    } else if (pathname.startsWith('/user')) {
      return <UserNavbar />;
    }else if(pathname == '/not-found'){
      
    } 
    else {
      return <PublicNavbar />;
    }
  };

  return <>{renderNavbar()}</>;
}
