"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCart } from "../../cartContext";
import { Meal } from "@/components/types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Restaurant {
  customId: string;
  name: string;
  description?: string;
  location: string;
  contactNumber?: string;
  imageUrl?: string;
  meals: Meal[];
}

// Define a type for the section keys
type Section = "regular" | "combo" | "addon";

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<Section, boolean>>({
    regular: false,
    combo: false,
    addon: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(
            `https://mongobyte.onrender.com/api/v1/api/v1/users/restdetails/${id}`
          );
          setRestaurant(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError("Error fetching restaurant details.");
          } else {
            setError("An unexpected error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchRestaurant();
    }
  }, [id]);

  const toggleSection = (section: Section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filteredMeals = restaurant?.meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white min-h-screen">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="max-w-4xl mx-auto text-black">
        <h1 className="text-3xl font-bold mb-4 text-yellow-500">
          {restaurant?.name}
        </h1>
        {restaurant?.imageUrl && (
          <div className="relative w-full h-60 mb-4">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        )}
        <p className="text-lg mb-4">{restaurant?.description}</p>
        <p className="text-sm text-gray-600">Location: {restaurant?.location}</p>
        <p className="text-sm text-gray-600">
          Contact: {restaurant?.contactNumber}
        </p>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Regular Meals Section */}
        <section className="mb-6">
          <div
            className="flex justify-between cursor-pointer bg-yellow-500 text-white p-4 rounded"
            onClick={() => toggleSection("regular")}
          >
            <h2 className="text-2xl font-semibold">Regular Meals</h2>
            <span>{collapsedSections.regular ? "+" : "-"}</span>
          </div>
          {!collapsedSections.regular && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredMeals
                ?.filter((meal) => meal.tag === "regular")
                .map((meal) => (
                  <MealCard key={meal.customId} meal={meal} />
                ))}
            </div>
          )}
        </section>

        {/* Combo Meals Section */}
        <section className="mb-6">
          <div
            className="flex justify-between cursor-pointer bg-yellow-500 text-white p-4 rounded"
            onClick={() => toggleSection("combo")}
          >
            <h2 className="text-2xl font-semibold">Combo Meals</h2>
            <span>{collapsedSections.combo ? "+" : "-"}</span>
          </div>
          {!collapsedSections.combo && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredMeals
                ?.filter((meal) => meal.tag === "combo")
                .map((meal) => (
                  <MealCard key={meal.customId} meal={meal} />
                ))}
            </div>
          )}
        </section>

        {/* Add-ons Section */}
        <section className="mb-6">
          <div
            className="flex justify-between cursor-pointer bg-yellow-500 text-white p-4 rounded"
            onClick={() => toggleSection("addon")}
          >
            <h2 className="text-2xl font-semibold">Add-ons</h2>
            <span>{collapsedSections.addon ? "+" : "-"}</span>
          </div>
          {!collapsedSections.addon && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredMeals
                ?.filter((meal) => meal.tag === "add-on")
                .map((meal) => (
                  <MealCard key={meal.customId} meal={meal} />
                ))}
            </div>
          )}
          
        </section>
      </div>
    </div>
  );
};

const MealCard = ({ meal }: { meal: Meal }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(meal);
    toast.success(`${meal.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      {meal.imageUrl && (
        <div className="relative w-full h-40 mb-4">
          <Image
            src={meal.imageUrl}
            alt={meal.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
      <p className="text-sm mb-2">{meal.description}</p>
      <p className="text-lg font-bold mb-2">${meal.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default RestaurantPage;
