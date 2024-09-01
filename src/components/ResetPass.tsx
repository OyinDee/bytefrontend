"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios"; // Import axios and AxiosError

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // To manage different steps in the process
  const [errors, setErrors] = useState<string[]>([]); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const router = useRouter();

  // Form validation function
  const validateForm = () => {
    const newErrors: string[] = [];

    if (step === 1 && !email.trim()) {
      newErrors.push("Email is required.");
    } else if (step === 2) {
      if (!resetCode.trim()) {
        newErrors.push("Reset code is required.");
      }
      if (!newPassword.trim()) {
        newErrors.push("New password is required.");
      }
      if (newPassword !== confirmPassword) {
        newErrors.push("Passwords do not match.");
      }
    }

    return newErrors;
  };

  // Handle reset code request
  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);

    try {
      const response = await axios.post("https://mongobyte.onrender.com/api/v1/auth/request-reset-code", { email });

      if (response.status === 200) {
        setStep(2); // Proceed to the next step if successful
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

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsLoading(true);

    try {
      const response = await axios.post("https://mongobyte.onrender.com/api/v1/auth/reset-password", {
        email,
        resetCode,
        newPassword,
      });

      if (response.status === 200) {
        router.push("/login"); // Redirect to login on success
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

      {/* Loader */}
      {isLoading && <div className="loader">Loading...</div>}

      <div className={`relative z-10 flex items-center justify-center min-h-screen ${isLoading ? 'hidden' : ''}`}>
        <form
          onSubmit={step === 1 ? handleRequestResetCode : handleResetPassword}
          className="bg-white bg-opacity-10 backdrop-blur-xs p-8 rounded-lg shadow-lg w-full max-w-md sm:w-84"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {step === 1 ? "Request Reset Code" : "Reset Password"}
          </h2>

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="mb-2">{error}</li>
                ))}
              </ul>
            </div>
          )}

          {step === 1 ? (
            <div className="mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border text-black border-gray-300 rounded mt-1"
                placeholder="Enter your email address"
                required
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  id="resetCode"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="w-full p-2 border text-black border-gray-300 rounded mt-1"
                  placeholder="Enter reset code"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border text-black border-gray-300 rounded mt-1"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border text-black border-gray-300 rounded mt-1"
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {step === 1 ? "Request Reset Code" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
