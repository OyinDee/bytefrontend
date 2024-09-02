"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  imageUrl?: string;
  bio?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
          imageUrl: "/Images/nk.jpg",
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
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (base64Image: string) => {
    try {
      const response = await axios.post('https://mongobyte.onrender.com/api/v1/users/upload', { image: base64Image });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const updateUserProfile = async (imageUrl: string, bio: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const updateProfileResponse = await axios.post(
        'https://mongobyte.onrender.com/api/v1/users/updateProfile',
        { imageUrl, bio },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      if (updateProfileResponse.data.token) {
        localStorage.setItem('token', JSON.stringify(updateProfileResponse.data.token));
        console.log("Token updated");
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);

    try {
      const imageUrl = await uploadImage(selectedImage);
      if (user) {
        await updateUserProfile(imageUrl, bio);
        setUser(prevUser => ({
          ...prevUser!,
          imageUrl
        }));
      }
      setSelectedImage(null); // Clear selected image
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
      await updateUserProfile(user.imageUrl || '', bio);
      setEditingBio(false);
      setUser(prevUser => ({
        ...prevUser!,
        bio
      }));
    }
  };

  const handleEditImage = () => {
    document.getElementById('imageInput')?.click();
  };

  // Function to format phone number
  const formatPhoneNumber = (phoneNumber: number) => {
    return phoneNumber.toString().replace(/^(\+234)/, '0');
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
              src={user.imageUrl || "/Images/nk.jpg"}
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full border-4 border-yellow-300 mb-4 object-cover"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
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
              {selectedImage && !uploading && (
                <button
                  onClick={handleImageUpload}
                  className="mt-2 bg-black text-white p-2 rounded-md hover:bg-black transition-colors duration-200"
                >
                  Save
                </button>
              )}
              {uploading && <p>Uploading...</p>}
            </div>
            <h1 className="text-3xl font-bold mb-2 lg:text-4xl">@{user.username.toLowerCase()}</h1>
            <p className="text-lg text-gray-700 mb-2 lg:text-xl">{user.email}</p>
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
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                {user.bio || "Life is uncertain. Eat dessert first!"}
                <footer className="text-right mt-2">
                  - {user.username}
                </footer>
              </blockquote>
            )}
            <button
              onClick={() => setEditingBio(!editingBio)}
              className="mt-2 text-blue-500 underline"
            >
              {editingBio ? 'Cancel Editing Bio' : 'Edit Bio'}
            </button>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold mb-2">Phone Number</h2>
              <p className="text-lg">{formatPhoneNumber(user.phoneNumber)}</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold mb-2">Total Bytes</h2>
                <p className="text-lg">{user.orderHistory.length}</p>
              </div>
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold mb-2">Byte Balance</h2>
                <p className="text-lg">{user.byteBalance}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Order History</h2>
            <ul className="list-disc pl-5">
            {user.orderHistory.length > 0 ? (
              <ul className="list-disc pl-5">
                {user.orderHistory.map((order, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-bold">{order.date}</span>: {order.description} - {order.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No order history available.</p>
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
