"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface CartMeal {
  customId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Mock demo cart items (to be replaced with localStorage data)
const demoCart: CartMeal[] = [
  {
    customId: 'hgtr56',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, and basil.',
    price: 10.99,
    imageUrl: '/images/fc.jpg',
    quantity: 2,
  },
  {
    customId: 'dsfe43',
    name: 'Chicken Tacos',
    description: 'Spicy chicken with fresh toppings in soft tortillas.',
    price: 9.99,
    imageUrl: '/images/fc.jpg',
    quantity: 3,
  },
];

const CartPage: React.FC = () => {
  const [cartMeals, setCartMeals] = useState<CartMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage or use demoCart
    const storedCart = localStorage.getItem('byteCart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : demoCart;

    setCartMeals(parsedCart);
    setLoading(false);
  }, []);

  const getTotalPrice = () => {
    return cartMeals.reduce((total, meal) => total + meal.price * meal.quantity, 0).toFixed(2);
  };

  const handleRemoveItem = (customId: string) => {
    const updatedCart = cartMeals.filter((meal) => meal.customId !== customId);
    setCartMeals(updatedCart);
    localStorage.setItem('byteCart', JSON.stringify(updatedCart)); // Optionally update localStorage
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    // Add your checkout logic here
  };

  return (
    <main className="min-h-screen bg-white text-black p-4 lg:p-8 py-20">
      <h1 className="text-3xl font-semibold text-yellow-600"></h1>
      
      {loading ? (
        <div className="text-center">
          <p>Loading cart...</p>
        </div>
      ) : cartMeals.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh] text-center">
          <div>
            <p className="text-xl text-gray-600">Your cart is empty, aren&apos;t you hungry?</p>
            <p className="text-gray-500 mt-4">Browse meals and add them to your cart!</p>
          <button
            onClick={()=>{router.push('/user/')}}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200 w-full"
            >
              Browse meals
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {demoCart.map((meal) => (
            <div
              key={meal.customId}
              className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <Image
                src={meal.imageUrl}
                alt={meal.name}
                width={500}
                height={300}
                className="w-full sm:w-1/4 h-40 object-cover rounded-lg"
              />
              <div className="sm:ml-6 w-full sm:w-3/4 my-auto text-center">
                <h2 className="text-xl font-semibold text-black">{meal.name}</h2>
                <p className="mt-1 text-gray-600">{meal.description}</p>
                <p className="mt-2 text-yellow-500 font-semibold">${meal.price.toFixed(2)} x {meal.quantity}</p>
                <p className="mt-1 text-black">
                  Total: ${(meal.price * meal.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(meal.customId)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 w-full"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <p className="text-xl font-semibold text-black">Total Price: <span className="text-yellow-500">${getTotalPrice()}</span></p>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200 w-full"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
