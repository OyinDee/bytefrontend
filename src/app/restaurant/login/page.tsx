"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
        localStorage.setItem('token', token)
        localStorage.setItem('byteUser', JSON.stringify(restaurant))

        router.push('/restaurant/dashboard');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Restaurant Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantLogin;
