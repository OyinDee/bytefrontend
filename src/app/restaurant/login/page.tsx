"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
const RestaurantLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');  
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://mongobyte.onrender.com/api/v1/restaurants/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, restaurant } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('byteUser', JSON.stringify(restaurant));

        router.push('/restaurant/dashboard');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

      <div className="absolute inset-0 overflow-hidden">
      <Image
          src="/Images/burger.jpg" 
          alt="Burger Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">Login to Your Restaurant</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Welcome back! Please log in to continue.
          </p>
        </div>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 text-black shadow-sm"
              placeholder="Enter your email..."
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 text-black shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 shadow-md transition duration-200 ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-sm font-medium text-yellow-400 hover:text-yellow-500">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantLogin;
