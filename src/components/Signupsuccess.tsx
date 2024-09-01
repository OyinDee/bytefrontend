"use client";

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignUpSuccess: React.FC = () => {
  const route = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send verification code to backend
      const response = await axios.get('https://mongobyte.onrender.com/api/v1/verify-email', { params: { code: verificationCode } });
      if (response.status === 200) {
        route.push('/login');
      } else {
        setErrors(["Unexpected response from server."]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          const { data } = response;
          setErrors([data.message || "An error occurred. Please try again."]);
        } else {
          setErrors(["Network error. Please check your connection."]);
        }
      } else if (error instanceof Error) {
        setErrors([error.message || "An error occurred. Please try again."]);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/burger.jpg"
          alt="Burger Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Verification Form */}
      <div className="text-black relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-10 backdrop-blur-xs p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Sign Up Successful!</h2>
          <p className="text-white mb-4">Congratulations! Your account has been created.</p>
          <p className="text-white mb-6">Please enter the verification code sent to your email:</p>

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="mb-2">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter verification code"
                required
                disabled={isLoading} // Disable input while loading
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>

          <div className="mt-4">
            <Link href="/signup" className="w-full text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
