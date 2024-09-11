'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

import { useCallback } from 'react';

const CallbackPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<string>('Not Checked');
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const router = useRouter();

  const verifyPayment = useCallback(async () => {
    if (reference) {
      try {
        const response = await axios.get(
          `https://mongobyte.onrender.com/api/v1/pay/callback?reference=${reference}`
        );
        setPaymentStatus(response.data);
        router.push('/user/profile');
      } catch (error) {
        setPaymentStatus('Error');
      } finally {
        setLoading(false);
      }
    }
  }, [reference, router]);  

  useEffect(() => {
    if (reference) {
      verifyPayment();
    }
  }, [reference, verifyPayment]);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Payment Status: {paymentStatus}
        </h1>

        <p className="text-lg mb-6">
          {paymentStatus === 'Success'
            ? 'Your payment was successful! Thank you for your purchase.'
            : paymentStatus === 'Failed'
            ? 'Unfortunately, your payment did not go through. Please try again.'
            : paymentStatus === 'Error'
            ? 'There was an issue with processing your payment.'
            : 'Click the button below to verify your payment.'}
        </p>

        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
          onClick={verifyPayment}
          disabled={loading || !reference}
        >
          {loading ? 'Verifying...' : 'Verify Payment'}
        </button>
      </div>
    </main>
  );
};

export default CallbackPage;
