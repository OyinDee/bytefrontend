"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

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
  profileImage?: string;
  bio?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Store base64 string
  const [uploading, setUploading] = useState(false);
  const [bio, setBio] = useState<string>(''); 
  const [editingBio, setEditingBio] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('https://mongobyte.onrender.com/api/v1/users/getProfile', {
            headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`,
            },
          });
          console.log(response.data)
          setUser(response.data);
          setBio(response.data.bio || '');
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser({
          name: "Nezuko Kamado",
          username: "nezuko",
          phoneNumber: 54678904565,
          totalBytes: 27,
          byteBalance: 1250,
          orderHistory: [
            { date: "2024-08-20", description: "Burger Home", amount: -200 },
            { date: "2024-08-15", description: "Deposit", amount: 500 },
            { date: "2024-08-10", description: "Pizza Hut", amount: -300 },
            { date: "2024-08-01", description: "Deposit", amount: 1000 },
          ],
          profileImage: "/Images/nk.jpg",
          bio: "Life is uncertain. Eat dessert first!"
        });
        setBio("Life is uncertain. Eat dessert first!");
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Store the base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserProfile = async (imageUrl: string, bio: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.post(
        'https://mongobyte.onrender.com/api/v1/users/updateProfile',
        { imageUrl, bio },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(token)}`,
          },
        }
      );

    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Update user profile with the base64 image string
      if (user) {
        await updateUserProfile(selectedImage, bio);

        // Update user state with new image URL (base64 string)
        setUser({
          ...user,
          profileImage: selectedImage
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const saveBio = async () => {
    if (user) {
      await updateUserProfile(user.profileImage || '', bio);
      setEditingBio(false);
      setUser({
        ...user,
        bio: bio
      });
    }
  };

  const handleEditImage = () => {
    document.getElementById('imageInput')?.click();
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative min-h-screen pt-20 pb-20 bg-white text-black">
      <div className="relative z-10 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <div className="flex flex-col items-center text-center relative">
            <div className="relative">
              <Image
                src={user.profileImage || "/Images/nk.jpg"}
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-4 border-yellow-300 mb-4"
              />
              <button
                onClick={handleEditImage}
                className="absolute bottom-0 right-0 bg-yellow-300 text-black p-1 rounded-full shadow-md hover:bg-yellow-400 transition-colors duration-200"
              >
                ✏️
              </button>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {selectedImage && (
                <button
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className={`mt-2 bg-green-500 text-white p-2 rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'} transition-colors duration-200`}
                >
                  {uploading ? 'Uploading...' : 'Save Image'}
                </button>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2 lg:text-4xl">@{user.username.toLowerCase()}</h1>
            <p className="text-lg text-gray-700 mb-4 lg:text-xl">{user.email}</p>
            {editingBio ? (
              <div className="flex flex-col items-center mt-4">
                <input
                  type="text"
                  value={bio}
                  onChange={handleBioChange}
                  className="border border-gray-300 p-2 rounded-md"
                  placeholder="Update your bio..."
                />
                <button
                  onClick={saveBio}
                  className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Save Bio
                </button>
                <button
                  onClick={() => setEditingBio(false)}
                  className="mt-2 text-red-500 underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="text-base italic text-gray-600 lg:text-lg mt-4">
                {user.bio || "Life is uncertain. Eat dessert first!"}
              </p>
            )}
            <button
              onClick={() => setEditingBio(!editingBio)}
              className="mt-2 text-blue-500 underline"
            >
              {editingBio ? 'Cancel Editing Bio' : 'Edit Bio'}
            </button>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row lg:justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <svg className="w-6 h-6 text-yellow-300 mr-2 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0"></path>
              </svg>
              <p className="text-lg">{user.phoneNumber}</p>
            </div>
            <div className="flex items-center mb-4 lg:mb-0">
              <svg className="w-6 h-6 text-yellow-300 mr-2 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 20.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V6H4v14.5C4 22.43 5.57 24 7.5 24h9c1.93 0 3.5-1.57 3.5-3.5V6h-2v14.5zM16.5 4l-4-4-4 4H8v2h8V4h-.5zM7.5 10h9v9h-9v-9zM12 14.5c1.38 0 2.5-1.12 2.5-2.5S13.38 9.5 12 9.5s-2.5 1.12-2.5 2.5S10.62 14.5 12 14.5z"></path>
              </svg>
              <p className="text-lg">{user.totalBytes} Total Bytes</p>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-300 mr-2 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 13h-2V3h2v10zm-1 11c-5.52 0-10-4.48-10-10S6.48 4 12 4s10 4.48 10 10-4.48 10-10 10z"></path>
              </svg>
              <p className="text-lg">{user.byteBalance} Byte Balance</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 lg:text-3xl">Order History</h2>
            <ul className="space-y-4">
              {user.orderHistory.map((transaction, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="font-medium">{transaction.date}</span>
                  <span className="text-gray-600">{transaction.description}</span>
                  <span
                    className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} Bytes
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/dashboard">
              <a className="bg-yellow-300 text-black p-3 rounded-md shadow-lg hover:bg-yellow-400 transition-colors duration-200">
                Back to Dashboard
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
