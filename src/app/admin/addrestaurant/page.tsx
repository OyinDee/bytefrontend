"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddRestaurant = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      setImageLoading(true);
      try {
        const response = await axios.post('https://mongobyte.onrender.com/api/v1/users/upload', {
          image: base64Image,
        });

        setImageUrl(response.data.url); 
        setImageLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image. Please try again.');
        setImageLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({name,
      description,
      location,
      contactNumber,
      email,
      imageUrl,})
    try {
      await axios.post('https://mongobyte.onrender.com/api/v1/restaurants/create', {
        name,
        description,
        location,
        contactNumber,
        email,
        imageUrl,
      });
      router.push('/admin/success');
    } catch (error) {
      setError('Failed to add restaurant. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Restaurant</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Restaurant Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Restaurant Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Location"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block mb-1">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Contact Number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {imageLoading && <p>Uploading image...</p>}
          {imageUrl && <p>Image uploaded successfully.</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-400 transition-colors duration-200"
          disabled={imageLoading || !imageUrl}
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
