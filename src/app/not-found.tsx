// app/not-found.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/burger.jpg" // Replace with your burger image path
          alt="Burger Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex pt-5  flex-col items-center justify-center min-h-screen text-center p-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-xs p-8 rounded-lg shadow-xl max-w-lg mx-auto animate-fadeIn">
          <h1 className="text-8xl font-extrabold mb-4 text-red-500 animate-bounce">404</h1>
          <p className="text-3xl font-semibold mb-4 text-yellow-300 animate-pulse">Oops! This page is a culinary mystery!</p>
          <p className="text-lg mb-6 text-white">
            Our search through the cosmic kitchen of the internet found nothing but empty plates and crumbled napkins.
          </p>
          <p className="text-lg mb-6 text-white">
            Perhaps it took a vacation to a remote food truck or is hiding behind a mountain of nachos.
          </p>
          <p className="text-lg mb-6 text-white">
            So, grab a fork, take a bite of the unexpected, and follow the link below to return to the delightful dishes we have prepared for you.
          </p>
          <Link href="/" className="text-blue-400 hover:text-blue-600 font-semibold text-lg mt-4 inline-block animate-pulse">
            🍔 Return to the Feast
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
