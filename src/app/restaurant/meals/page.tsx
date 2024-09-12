"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Meal {
  customId: string;
  name: string;
  description?: string;
  tag?: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
}

const MealsPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    tag: 'regular',
    price: '',
    imageUrl: '',
    availability: 'true',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/meals');
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/meals', {
        name: form.name,
        description: form.description,
        tag: form.tag,
        price: Number(form.price),
        availability: form.availability === 'true',
        imageUrl: form.imageUrl,
      });

      setMeals([...meals, response.data.meal]);
      setForm({
        name: '',
        description: '',
        tag: 'regular',
        price: '',
        imageUrl: '',
        availability: 'true',
      });
    } catch (error) {
      console.error('Error adding meal:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="p-8 bg-white min-h-screen pb-20">
      <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard - Meals</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Current Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.length > 0 ? (
            meals.map(meal => (
              <div
                key={meal.customId}
                className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-black">{meal.name}</h3>
                <p className="text-sm text-gray-700">{meal.description}</p>
                <p className="text-sm text-gray-700">Tag: {meal.tag}</p>
                <p className="text-lg font-bold text-black">Price: ${meal.price}</p>
                <p className="text-sm text-gray-700">
                  Availability: {meal.availability ? 'Available' : 'Not Available'}
                </p>
                {meal.imageUrl && (
                  <div className="mt-4 w-full h-32 relative">
                    <Image
                      src={meal.imageUrl}
                      alt={meal.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No meals available.</p>
          )}
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Add New Meal</h2>
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <label className="block mb-2 text-black font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-black font-semibold">Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-black font-semibold">Tag:</label>
          <select
            name="tag"
            value={form.tag}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="combo">Combo</option>
            <option value="add-on">Add-On</option>
            <option value="regular">Regular</option>
          </select>

          <label className="block mb-2 text-black font-semibold">Price:</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2 text-black font-semibold">Availability:</label>
          <select
            name="availability"
            value={form.availability}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

          <label className="block mb-2 text-black font-semibold">Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-black py-2 rounded font-bold hover:bg-yellow-600 transition-colors"
          >
            {isLoading ? 'Adding...' : 'Add Meal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealsPage;
