"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCart } from "../../cartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Meal } from "@/components/types";

interface Restaurant {
  customId: string;
  name: string;
  description?: string;
  location: string;
  contactNumber?: string;
  imageUrl?: string;
  meals: Meal[];
}

type Section = "regular" | "combo" | "add-on";

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState<Record<Section, boolean>>({
    regular: false,
    combo: false,
    "add-on": false,
  });

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(
            `https://mongobyte.onrender.com/api/v1/users/restdetails/${id}`
          );
          setRestaurant(response.data);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
          toast.error("Error fetching restaurant details.");
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

  const filteredMeals = (tag: Section) => {
    return restaurant?.meals.filter((meal) => meal.tag === tag) || [];
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white min-h-screen">
      <ToastContainer />
      <div className="max-w-4xl mx-auto text-black">
        {/* Restaurant Info */}
        {restaurant && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-yellow-500">{restaurant.name}</h1>
                <p className="text-gray-700">{restaurant.location}</p>
                <p className="text-gray-500">{restaurant.contactNumber}</p>
              </div>
              {restaurant.imageUrl && (
                <div className="relative w-20 h-20">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              )}
            </div>

            {/* Collapsible Sections */}
            {(["regular", "combo", "add-on"] as Section[]).map((section) => (
              <div key={section}>
                <button
                  className="w-full text-left py-2 bg-yellow-500 text-white px-4 rounded-md mb-2"
                  onClick={() => toggleSection(section)}
                >
                  {section.toUpperCase()} MEALS
                </button>
                {!collapsedSections[section] && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMeals(section).map((meal) => (
                      <MealCard key={meal.customId} meal={meal} restaurantId={restaurant.customId} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const MealCard = ({ meal, restaurantId }: { meal: Meal; restaurantId: string }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent quantity from going below 1
  };

  const handleAddToCart = () => {
    addToCart({ ...meal, restaurantId }, quantity);
    toast.success(`${meal.name} (x${quantity}) added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
      <p className="text-lg font-bold mb-2">B{meal.price.toFixed(2)}</p>
      <div className="flex items-center mb-4">
        <button
          onClick={handleDecrease}
          className="bg-yellow-500 text-white py-1 px-2 rounded-l hover:bg-yellow-600"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          readOnly
          className="w-16 p-2 border-t border-b border-gray-300 text-center"
        />
        <button
          onClick={handleIncrease}
          className="bg-yellow-500 text-white py-1 px-2 rounded-r hover:bg-yellow-600"
        >
          +
        </button>
      <button
        onClick={handleAddToCart}
        className="bg-yellow-500 w-full ml-4 text-white py-2 px-4 rounded hover:bg-yellow-600"
      >
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default RestaurantPage;
