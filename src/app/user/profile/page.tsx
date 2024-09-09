"use client";

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
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [bio, setBio] = useState<string>('');
  const [editingBio, setEditingBio] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to manage error

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/getProfile', {
            headers: {
              'Authorization': `Bearer ${JSON.parse(token)}`,
            },
          });
          console.log(response.data)
          const decodedToken = jwtDecode<any>(response.data.token);   
          localStorage.setItem('token', JSON.stringify(response.data.token))

          localStorage.setItem('byteUser', JSON.stringify(decodedToken))
          setUser(decodedToken.user);
          setBio(decodedToken.user.bio || '');
          setLoading(false); // Stop loading once data is fetched
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data. Please try again later.');
          setLoading(false); // Stop loading on error
        }
      } else {
        setLoading(false); // Stop loading if no token is found
        setError('No user token found. Please log in.');
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
        const decodedToken = jwtDecode<any>(updateProfileResponse.data.token);   
        localStorage.setItem('byteUser', JSON.stringify(decodedToken))
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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500"><p>{error}</p></div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen"><p>User data is not available.</p></div>;
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
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {user.orderHistory.map((transaction, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <p className="text-gray-700">{transaction.date}</p>
                  <p className="font-semibold">{transaction.description}</p>
                  <p className="text-green-600">{transaction.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
