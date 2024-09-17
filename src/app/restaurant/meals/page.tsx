"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

interface Meal {
  customId: string;
  name: string;
  description?: string;
  tag?: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
}

interface DecodedToken {
  restaurant: {
    customId: string;
  };
}

const MealsPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    tag: "regular",
    price: "",
    imageUrl: "",
    availability: true,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);

  const handleDelete = async (customId: string) => {
    if (window.confirm("Delete meal?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://mongobyte.onrender.com/api/v1/meals/${customId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeals(meals.filter((meal) => meal.customId !== customId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (meal: Meal) => {
    setForm({
      name: meal.name,
      description: meal.description || "",
      tag: meal.tag || "regular",
      price: meal.price.toString(),
      imageUrl: meal.imageUrl || "",
      availability: meal.availability,
    });
    setEditingMealId(meal.customId);
    setIsEditing(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const customId = decodedToken.restaurant.customId;
      const fetchMeals = async () => {
        try {
          const response = await axios.get(
            `https://mongobyte.onrender.com/api/v1/restaurants/mymeals/${customId}`
          );
          setMeals(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMeals();
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (base64Image: string) => {
    try {
      const response = await axios.post("https://mongobyte.onrender.com/api/v1/users/upload", {
        image: base64Image,
      });
      return response.data.url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = form.imageUrl;
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode<DecodedToken>(token!);
      const customId = decodedToken.restaurant.customId;

      if (isEditing && editingMealId) {
        await axios.put(
          `https://mongobyte.onrender.com/api/v1/meals/${editingMealId}`,
          {
            name: form.name,
            description: form.description,
            tag: form.tag,
            price: Number(form.price),
            availability: form.availability,
            imageUrl,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMeals(
          meals.map((meal) =>
            meal.customId === editingMealId
              ? { ...meal, ...form, imageUrl, price: Number(form.price) }
              : meal
          )
        );
        setIsEditing(false);
        setEditingMealId(null);
      } else {
        const response = await axios.post(
          `https://mongobyte.onrender.com/api/v1/meals/${customId}/create`,
          {
            name: form.name,
            description: form.description,
            tag: form.tag,
            price: Number(form.price),
            availability: form.availability,
            imageUrl,
          }
        );
        setMeals([...meals, response.data.meal]);
      }
      setForm({
        name: "",
        description: "",
        tag: "regular",
        price: "",
        imageUrl: "",
        availability: false,
      });
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // Toggle availability function
  const toggleAvailability = async (meal: Meal) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://mongobyte.onrender.com/api/v1/meals/${meal.customId}`,
        { availability: !meal.availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeals(
        meals.map((m) =>
          m.customId === meal.customId ? { ...m, availability: !m.availability } : m
        )
      );
    } catch (error) {
      console.error("Failed to update availability:", error);
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen pb-20">
      <div className="max-w-xl mx-auto pb-20 text-black">
        <h2 className="text-xl font-semibold mb-4 text-yellow-500">
          {isEditing ? "Update Meal" : "Add New Meal"}
        </h2>
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-4 rounded-lg">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            className="w-full mb-2 p-2 border rounded"
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Description"
          />
          <select
            name="tag"
            value={form.tag}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="combo">Combo</option>
            <option value="add-on">Add-On</option>
            <option value="regular">Regular</option>
          </select>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            required
            className="w-full mb-2 p-2 border rounded"
            placeholder="Price"
          />
          <select
            name="availability"
            value={form.availability ? "true" : "false"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                availability: e.target.value == "true",
              }))
            }
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-2 p-2 border rounded"
          />
          {selectedImage && (
            <div className="w-full h-32 relative mb-4">
              <Image
                src={selectedImage}
                alt="Selected"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 py-2 rounded font-bold hover:bg-yellow-600"
          >
            {isLoading ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Meal" : "Add Meal"}
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-6">Available Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div key={meal.customId} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{meal.name}</h2>
            <p>{meal.description}</p>
            <p className="font-semibold">${meal.price.toFixed(2)}</p>
            <p className={`font-semibold ${meal.availability ? "text-green-500" : "text-red-500"}`}>
              {meal.availability ? "Available" : "Not Available"}
            </p>

            <button
              onClick={() => toggleAvailability(meal)}
              className={`mt-2 w-full py-2 font-semibold rounded-lg ${
                meal.availability ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {meal.availability ? "Mark as Unavailable" : "Mark as Available"}
            </button>

            <button
              onClick={() => handleEdit(meal)}
              className="mt-2 w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(meal.customId)}
              className="mt-2 w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
