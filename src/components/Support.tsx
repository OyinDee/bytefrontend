// app/help-support.tsx
"use client";

import React from 'react';
import Link from 'next/link';

const HelpSupport: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-24 bg-white text-black py-12">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* FAQs Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">How do I place an order?</h2>
              <p className="text-gray-600">To place an order, browse our restaurant listings, select your items, and proceed to checkout.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">What payment methods are accepted?</h2>
              <p className="text-gray-600">We accept credit cards, debit cards, and other popular payment methods, but the best method is by funding your wallet and using bytes for purchase. </p>
            </div>
            {/* Add more FAQs as needed */}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">For any inquiries or support, please reach out to us:</p>
          <p className="text-gray-600 mb-2">Email: <a href="mailto:iceysh.ts@gmail.com" className="text-blue-500">iceysh.ts@gmail.com</a></p>
          <p className="text-gray-600">Phone: +234-808-6321-931</p>
        </div>

        {/* Support Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Submit a Request</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required></textarea>
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
