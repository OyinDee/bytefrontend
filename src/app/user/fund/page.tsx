"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const FundPage: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [fee, setFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [bytes, setBytes] = useState<number>(0); 
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<'fund' | 'transfer'>('fund'); // To switch between tabs
  const [user, setUser] = useState<{ byteBalance: number } | null>(null);

  const router = useRouter(); // Initialize router for redirection

  const NAIRA_TO_BYTES_RATE = 0.1;

  useEffect(() => {
    const savedUser = localStorage.getItem('byteUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser && parsedUser.user) {
        setUser(parsedUser.user); // Safely set user if it exists
      } else {
       console.log("Not found") // Redirect to login if no user is found
      }
    } else {
      router.push('/login'); // Redirect to login if no user is found
    }
  }, [router]);

  // Handles input change and fee calculation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
    if (isNaN(inputAmount) || inputAmount <= 0) {
      setAmount('');
      setFee(0);
      setTotal(0);
      setBytes(0); // Reset bytes
    } else {
      const calculatedFee = inputAmount * 0.03; // 3% fee
      const calculatedTotal = inputAmount + calculatedFee;
      const calculatedBytes = inputAmount * NAIRA_TO_BYTES_RATE; // Calculate bytes
      setAmount(inputAmount);
      setFee(calculatedFee);
      setTotal(calculatedTotal);
      setBytes(calculatedBytes);
    }
  };

  const handleContinue = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      alert('Authentication token not found. Please log in again.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://mongobyte.onrender.com/api/v1/pay/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`, // Send the token in the header
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        // Handle errors
        alert(`Error: ${data.message || 'An error occurred'}`);
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Display a loading message or spinner while fetching user data
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black p-4 lg:p-8 py-20">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-700">Byte Balance: <span className="text-yellow-600">B{Number(user.byteBalance)}</span></p>
        </div>

        <div className="flex mb-4">
          <button
            onClick={() => setTab('fund')}
            className={`flex-1 py-2 font-semibold ${tab === 'fund' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md`}
          >
            Fund
          </button>
          <button
            onClick={() => setTab('transfer')}
            className={`flex-1 py-2 font-semibold ${tab === 'transfer' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md`}
          >
            Transfer
          </button>
        </div>

        {tab === 'fund' ? (
          <div>
            <h1 className="text-2xl font-semibold text-center text-yellow-600">Fund Your Account</h1>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="fundAmount" className="block text-lg font-medium text-gray-700">
                  Enter Amount to Fund
                </label>
                <input
                  type="number"
                  id="fundAmount"
                  onChange={handleAmountChange}
                  value={amount === '' ? '' : amount}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter amount"
                />
              </div>

              {amount !== '' && (
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-700">
                    <span className="text-gray-500">Funding Amount:</span> ₦{amount.toFixed(2)}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <span className="text-gray-500">Fee (3%):</span> ₦{fee.toFixed(2)}
                  </p>
                  <p className="text-lg font-semibold text-yellow-600">
                    <span className="text-gray-700">Total Amount:</span> ₦{total.toFixed(2)}
                  </p>
                  <p className="text-lg font-medium text-gray-700 mt-2">
                    <span className="text-gray-500">In Bytes:</span> B{bytes.toFixed(2)}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
                disabled={amount === '' || total <= 0 || loading}
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-center text-yellow-600">Transfer Bytes</h1>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="transferAmount" className="block text-lg font-medium text-gray-700">
                  Enter Amount to Transfer
                </label>
                <input
                  type="number"
                  id="transferAmount"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label htmlFor="recipient" className="block text-lg font-medium text-gray-700">
                  Recipient Username
                </label>
                <input
                  type="text"
                  id="recipient"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter recipient's username"
                />
              </div>

              <button
                type="button"
                className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
                // Add transfer logic here
              >
                Transfer
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default FundPage;
