"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

const CallbackPage: React.FC = () => {
  const [loading, setLoading] = useState(false); // Default is not loading
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const router = useRouter()
  const verifyPayment = async () => {
    if (typeof reference === 'string') {
      setLoading(true); // Start loading when button is clicked
      setErrorMessage(null); // Clear previous error messages
      try {
        const response = await axios.get(
          `https://mongobyte.onrender.com//api/v1/pay/callback?reference=${reference}`
        );
        const result = response.data;
        console.log(result)
        if (result === 'Payment successful!') {
          setPaymentStatus('Success');
          router.push('/user/profile')
        } else if (result === 'Payment failed.') {
          setPaymentStatus('Failed');
        } else {
          setPaymentStatus('Error');
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Axios error:', error.response?.data);
          setErrorMessage(`Error: ${error.response?.data || error.message}`);
        } else {
          console.error('Unexpected error:', error);
          setErrorMessage('Unexpected error occurred. Please try again later.');
        }
        setPaymentStatus('Error');
      } finally {
        setLoading(false); // Stop loading once request is completed
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Payment Status: {paymentStatus || 'Not Checked'}
        </h1>

        <p className="text-lg mb-6">
          {paymentStatus === 'Success'
            ? 'Your payment was successful! Thank you for your purchase.'
            : paymentStatus === 'Failed'
            ? 'Unfortunately, your payment did not go through. Please try again.'
            : paymentStatus === 'Error'
            ? errorMessage || 'There was an issue with processing your payment. Please contact support if the issue persists.'
            : 'Click the button below to verify your payment.'}
        </p>

        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
          onClick={verifyPayment}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Payment'}
        </button>

        {loading && (
          <div className="flex items-center justify-center mt-4">
            <div className="w-12 h-12 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CallbackPage;
