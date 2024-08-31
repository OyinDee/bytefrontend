"use client";

import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Loader from '../components/Loader'; // Adjust the path as needed
import Link from 'next/link'; // Ensure you import Link for navigation
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios'; // Import axios

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const [errors, setErrors] = useState<string[]>([]); // State for error messages
  const router = useRouter(); // Correct usage of useRouter

  // Form validation function
  const validateForm = () => {
    const newErrors: string[] = [];

    if (!username.trim()) {
      newErrors.push("Username is required.");
    }
    if (!password.trim()) {
      newErrors.push("Password is required.");
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true); // Show loader

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://byte-u1mi.onrender.com/auth/login', {
        username,
        password,
      });

      
      // Redirect based on the response status
      if (response.status === 200) {
        router.push('/signupsuccess'); // Redirect to signup success page
      } else if (response.status === 202) {
        
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        
        localStorage.setItem('byteUser', JSON.stringify(decodedToken));
        
        router.push('/home');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        const { response } = error;
        if (response) {
          const { data } = response;
          setErrors([data.message || "An error occurred. Please try again."]);
        } else {
          setErrors(["Network error. Please check your connection."]);
        }
      } else if (error instanceof Error) {
        // General error handling
        setErrors([error.message || "An error occurred. Please try again."]);
      } else {
        // Fallback for unexpected error types
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
          src="/Images/burger.jpg" // Replace with your burger image path
          alt="Burger Background"
          fill
          style={{ objectFit: 'cover' }} // New prop for styling
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      </div>

      {/* Loader */}
      {isLoading && <Loader />}

      {/* Login Form */}
      <div className={`relative z-10 flex items-center justify-center min-h-screen ${isLoading ? 'hidden' : ''}`}>
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-10 backdrop-blur-xs p-8 rounded-lg shadow-lg w-full max-w-md sm:w-84"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login-to-Byte!</h2>

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="mb-2">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded mt-1"
              placeholder="Enter your username..."
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border text-black border-gray-300 rounded mt-1"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Byte IN!
          </button>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <Link href="/forgot-password">
              <span className="text-blue-400 hover:text-blue-600 font-semibold mt-2 inline-block">
                Forgot Password?
              </span>
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-white">Don&apos;t have an account?</p>
            <Link href="/signup">
              <span className="text-blue-400 hover:text-blue-600 font-semibold mt-2 inline-block">
                Sign Up Now!
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
