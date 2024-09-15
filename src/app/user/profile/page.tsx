"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface Transaction {
  date: string;
  description: string;
  amount: number;
}

interface User {
  name: string;
  username: string;
  email?: string;
  phoneNumber: number;
  totalBytes: number;
  byteBalance: number;
  orderHistory: Transaction[];
  imageUrl?: string;
  bio?: string;
  location?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bio, setBio] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://mongobyte.onrender.com/api/v1/users/getProfile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const decodedToken = jwtDecode<any>(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('byteUser', JSON.stringify(decodedToken.user));
          setUser(decodedToken.user);
          setBio(decodedToken.user.bio || '');
          setLocation(decodedToken.user.location || '');
          setLoading(false);
        } catch (error) {
          setError('Failed to load user data. Please try again later.');
          setLoading(false);
        }
      } else {
        setError('No user token found. Please log in.');
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    try {
      const response = await axios.post('https://mongobyte.onrender.com/api/v1/users/upload', { image: selectedImage });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const updateUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      let imageUrl = user?.imageUrl;
      if (selectedImage) {
        imageUrl = await handleImageUpload();
      }

      await axios.post(
        'https://mongobyte.onrender.com/api/v1/users/updateProfile',
        { imageUrl, bio, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((prevUser) => ({
        ...prevUser!,
        imageUrl,
        bio,
        location,
      }));
      setIsModalOpen(false); // Close modal after successful update
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500"><p>{error}</p></div>;
  }

  return (
    <div className="relative min-h-screen pt-5 pb-20 bg-white text-black">
      <div className="relative z-10 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <div className="flex flex-col items-center text-center relative">
            <div className="relative">
              <Image
                src={user?.imageUrl || "/Images/nk.jpg"}
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-4 border-yellow-300 mb-4 object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 lg:text-4xl">@{user?.username.toLowerCase()}</h1>
            <p className="text-lg text-gray-700 mb-2 lg:text-xl">{user?.email}</p>
            <p className="text-gray-600">{user?.location || "Unknown Location"}</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              {user?.bio || "Life is uncertain. Eat dessert first!"}
            </blockquote>

            {/* Floating icon */}
            <button
              onClick={openModal}
              className="absolute top-4 right-4 bg-yellow-300 p-2 rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              ✏️
            </button>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold mb-2">Phone Number</h2>
              <p className="text-lg">{user?.phoneNumber}</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold mb-2">Total Bytes</h2>
                <p className="text-lg">{user?.orderHistory.length}</p>
              </div>
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold mb-2">Byte Balance</h2>
                <p className="text-lg">{user?.byteBalance}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {user?.orderHistory.map((transaction, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg">
                  <p>{transaction.date}</p>
                  <p className="font-semibold">{transaction.description}</p>
                  <p className="text-green-600">{transaction.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl mb-4">Edit Profile</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <input
              type="text"
              placeholder="Update your bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Update your location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={updateUserProfile}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
