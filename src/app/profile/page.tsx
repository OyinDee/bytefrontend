"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Profile: React.FC = () => {
  const user = {
    name: "Nezuko Kamado",
    nickname: "nezuko",
    totalBytes: 27,
    byteBalance: 1250,
    transactionHistory: [
      { date: "2024-08-20", description: "Burger Home", amount: -200 },
      { date: "2024-08-15", description: "Deposit", amount: 500 },
      { date: "2024-08-10", description: "Pizza Hut", amount: -300 },
      { date: "2024-08-01", description: "Deposit", amount: 1000 },
    ]
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12 bg-white text-black">
      {/* Profile Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 lg:p-8">
        {/* Profile Header */}
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <Image
              src="/Images/nk.jpg" // Replace with your profile image path
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full border-4 border-yellow-300 mb-4"
            />
            <h1 className="text-3xl font-bold mb-2 lg:text-4xl">{user.name}</h1>
            <p className="text-lg text-gray-700 mb-4 lg:text-xl">@{user.nickname}</p>
            <p className="text-base italic text-gray-600 lg:text-lg">
              &quot;Life is uncertain. Eat dessert first!&quot;
            </p>
          </div>
          
          {/* Profile Details */}
          <div className="mt-6 flex flex-col lg:flex-row lg:justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <svg className="w-6 h-6 text-yellow-300 mr-2 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
              </svg>
              <p className="text-sm lg:text-lg">Has taken {user.totalBytes} total bytes</p>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-300 mr-2 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 20h16V4H4v16zm2-2V6h12v12H6z" />
              </svg>
              <p className="text-xl lg:text-2xl">Byte Balance: {user.byteBalance} 🍔</p>
            </div>
          </div>
        </div>

        {/* Bytes History */}
        <div className="mt-8 w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-3xl">Bytes History</h2>
          <div className="overflow-x-auto">
            {user.transactionHistory.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {user.transactionHistory.map((transaction, index) => (
                  <li key={index} className="py-4 flex items-center justify-between">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
                      {/* Date and Time */}
                      <span className="text-black text-sm lg:text-base lg:w-1/3 text-left">{transaction.date}</span>
                      {/* Details */}
                      <p className="text-black text-sm lg:text-base lg:w-1/3 text-center">{transaction.description}</p>
                      {/* Amount */}
                      <span className={`font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'} lg:w-1/3 text-right lg:text-base`}>
                        {transaction.amount < 0 ? `-${Math.abs(transaction.amount)}` : `+${transaction.amount}`} 🍔
                      </span>
                    </div>
                    <hr className="my-2 border-gray-200" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-black text-center">No transaction history available.</p>
            )}
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-yellow-500 hover:text-yellow-400 font-semibold text-lg lg:text-xl">
            Back to the Feast 🍴
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
