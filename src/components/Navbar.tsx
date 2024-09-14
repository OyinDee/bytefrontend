// "use client";

// import { useContext, useState, useEffect } from 'react';
// import {
//   HomeIcon,
//   ShoppingCartIcon,
//   BellIcon,
//   UserIcon,
//   ShoppingBagIcon,
//   PlusCircleIcon,
//   ArrowRightOnRectangleIcon,
//   EllipsisHorizontalIcon,
// } from '@heroicons/react/24/solid';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { AuthContext } from './AuthCheck';

// const Navbar: React.FC = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const authContext = useContext(AuthContext);
//   const [showPrimaryMenu, setShowPrimaryMenu] = useState(true);
//   const [userType, setUserType] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (authContext) {
//       const { isAuthenticated, userType } = authContext;
//       setUserType(userType);
//       setLoading(false);
//     }
//   }, [authContext]);

//   if (loading) {

//   }

//   if (!authContext) {
//     return null; 
//   }

//   const { isAuthenticated, setIsAuthenticated } = authContext;

//   const getLinkClassName = (path: string) => {
//     return pathname === path ? 'text-yellow-400' : 'hover:text-yellow-400 transition-colors duration-200';
//   };

//   const handleLogout = () => {
//     const confirmLogout = confirm("Do you really want to log out?");
//     if (confirmLogout) {
//       alert("Aiit, calm... You have it!");
//       localStorage.removeItem('token');
//       localStorage.removeItem('byteUser');
//       setIsAuthenticated(false);
//       router.push('/login');
//     } else {
//       alert("Thanks, I guess...");
//     }
//   };

//   return (
//     <>
//       <nav className="bg-black p-4">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <Link href="/restaurant/login" className="text-white text-2xl font-bold">
//             Byte!
//           </Link>

//           {!isAuthenticated ? (
//             <div className="fixed bottom-0 inset-x-0 bg-black p-4 md:hidden flex justify-between items-center z-50">
//               <ul className="flex justify-between w-full px-10 text-white">
//                 <li>
//                   <Link href="/signup" className={`flex flex-col items-center ${getLinkClassName('/signup')}`}>
//                     <PlusCircleIcon className="h-5 w-5 mb-1" />
//                     <span className="text-xs">Sign Up</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/login" className={`flex flex-col items-center ${getLinkClassName('/login')}`}>
//                     <UserIcon className="h-5 w-5 mb-1" />
//                     <span className="text-xs">Login</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <div className="fixed bottom-0 inset-x-0 bg-black p-4 md:hidden flex justify-between items-center z-50">
//               {userType === 'restaurant' ? (
//                 <ul className="flex justify-between w-full text-white">
//                   <li>
//                     <Link href="/restaurant/meals" className={`flex flex-col items-center ${getLinkClassName('/restaurant/meals')}`}>
//                       <ShoppingBagIcon className="h-5 w-5 mb-1" />
//                       <span className="text-xs">Meals</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/restaurant/orders" className={`flex flex-col items-center ${getLinkClassName('/restaurant/orders')}`}>
//                       <ShoppingCartIcon className="h-5 w-5 mb-1" />
//                       <span className="text-xs">Orders</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/restaurant/notifications" className={`flex flex-col items-center ${getLinkClassName('/restaurant/notifications')}`}>
//                       <BellIcon className="h-5 w-5 mb-1" />
//                       <span className="text-xs">Notifs</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/restaurant/profile" className={`flex flex-col items-center ${getLinkClassName('/restaurant/profile')}`}>
//                       <UserIcon className="h-5 w-5 mb-1" />
//                       <span className="text-xs">Profile</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <button onClick={handleLogout} className="flex flex-col items-center hover:text-yellow-400 transition-colors duration-200">
//                       <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
//                       <span className="text-xs">Logout</span>
//                     </button>
//                   </li>
//                 </ul>
//               ) : (
//                 <ul className="flex justify-between w-full text-white">
//                   {showPrimaryMenu ? (
//                     <>
//                       <li>
//                         <Link href="/user" className={`flex flex-col items-center ${getLinkClassName('/user')}`}>
//                           <HomeIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Home</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/user/cart" className={`flex flex-col items-center ${getLinkClassName('/user/cart')}`}>
//                           <ShoppingCartIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Cart</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/user/notifications" className={`flex flex-col items-center ${getLinkClassName('/user/notifications')}`}>
//                           <BellIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Notifs</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/user/profile" className={`flex flex-col items-center ${getLinkClassName('/user/profile')}`}>
//                           <UserIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Profile</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <button onClick={() => setShowPrimaryMenu(false)} className="flex flex-col items-center">
//                           <EllipsisHorizontalIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">More</span>
//                         </button>
//                       </li>
//                     </>
//                   ) : (
//                     <>
//                       <li>
//                         <Link href="/user/offers" className={`flex flex-col items-center ${getLinkClassName('/user/offers')}`}>
//                           <ShoppingBagIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Offers</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/user/fund" className={`flex flex-col items-center ${getLinkClassName('/user/fund')}`}>
//                           <PlusCircleIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Fund</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <button onClick={handleLogout} className="flex flex-col items-center hover:text-yellow-400 transition-colors duration-200">
//                           <ArrowRightOnRectangleIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Logout</span>
//                         </button>
//                       </li>
//                       <li>
//                         <button onClick={() => setShowPrimaryMenu(true)} className="flex flex-col items-center">
//                           <EllipsisHorizontalIcon className="h-5 w-5 mb-1" />
//                           <span className="text-xs">Back</span>
//                         </button>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               )}
//             </div>
//           )}

//           <div className="hidden md:flex space-x-8 text-white">
//             {!isAuthenticated ? (
//               <>
//                 <Link href="/signup" className={`text-lg font-semibold ${getLinkClassName('/signup')}`}>
//                   Sign Up
//                 </Link>
//                 <Link href="/login" className={`text-lg font-semibold ${getLinkClassName('/login')}`}>
//                   Login
//                 </Link>
//               </>
//             ) : userType === 'restaurant' ? (
//               <>
//                 <Link href="/restaurant/meals" className={`text-lg font-semibold ${getLinkClassName('/restaurant/meals')}`}>
//                   Meals
//                 </Link>
//                 <Link href="/restaurant/orders" className={`text-lg font-semibold ${getLinkClassName('/restaurant/orders')}`}>
//                   Orders
//                 </Link>
//                 <Link href="/restaurant/notifications" className={`text-lg font-semibold ${getLinkClassName('/restaurant/notifications')}`}>
//                   Notifications
//                 </Link>
//                 <Link href="/restaurant/profile" className={`text-lg font-semibold ${getLinkClassName('/restaurant/profile')}`}>
//                   Profile
//                 </Link>
//                 <button onClick={handleLogout} className="text-lg font-semibold hover:text-yellow-400 transition-colors duration-200">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/user" className={`text-lg font-semibold ${getLinkClassName('/user')}`}>
//                   Home
//                 </Link>
//                 <Link href="/user/cart" className={`text-lg font-semibold ${getLinkClassName('/user/cart')}`}>
//                   Cart
//                 </Link>
//                 <Link href="/user/notifications" className={`text-lg font-semibold ${getLinkClassName('/user/notifications')}`}>
//                   Notifications
//                 </Link>
//                 <Link href="/user/profile" className={`text-lg font-semibold ${getLinkClassName('/user/profile')}`}>
//                   Profile
//                 </Link>
//                 <button onClick={handleLogout} className="text-lg font-semibold hover:text-yellow-400 transition-colors duration-200">
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
