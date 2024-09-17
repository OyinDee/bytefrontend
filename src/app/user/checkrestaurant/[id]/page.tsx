"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";

// MealCard Component
interface Meal {
  customId: string;
  name: string;
  description?: string;
  price: number;
  availability: boolean;
  imageUrl?: string;
  tag: "regular" | "combo" | "add-on";
}

interface MealCardProps {
  meal: Meal;
  addToCart: (meal: Meal) => void;
  handleQuantityChange: (meal: Meal, change: number) => void;
  quantity: number;
}

const MealCard: FC<MealCardProps> = ({ meal, addToCart, handleQuantityChange, quantity }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      {meal.imageUrl && (
        <div className="relative w-full h-40 mb-4">
          <Image
            src={meal.imageUrl}
            alt={meal.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
      {meal.description && <p className="text-sm text-gray-600 mb-2">{meal.description}</p>}
      <p className="text-lg font-bold mb-2">${meal.price.toFixed(2)}</p>
      <div className="flex items-center mb-4">
        <button
          onClick={() => handleQuantityChange(meal, -1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4 py-2 border-t border-b border-gray-300">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(meal, 1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCart(meal)}
        className="w-full bg-yellow-500 text-white p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

// RestaurantPage Component
interface Restaurant {
  customId: string;
  name: string;
  description?: string;
  location: string;
  contactNumber?: string;
  imageUrl?: string;
  meals: Meal[];
}

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Map<string, { meal: Meal; quantity: number }>>(new Map());
  const [collapsedSections, setCollapsedSections] = useState({
    regular: false,
    combo: false,
    addon: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(
            `https://mongobyte.onrender.com/api/v1/users/restdetails/${id}`
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

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(new Map(JSON.parse(storedCart)));
    }
  }, []);

  const handleQuantityChange = (meal: Meal, change: number) => {
    setCart(prevCart => {
      const updatedCart = new Map(prevCart);
      const currentItem = updatedCart.get(meal.customId);
      if (currentItem) {
        const newQuantity = Math.max(1, currentItem.quantity + change);
        updatedCart.set(meal.customId, { meal, quantity: newQuantity });
      } else {
        updatedCart.set(meal.customId, { meal, quantity: Math.max(1, change) });
      }
      localStorage.setItem("cart", JSON.stringify(Array.from(updatedCart.entries())));
      return updatedCart;
    });
  };

  const addToCart = (meal: Meal) => {
    setCart(prevCart => {
      const updatedCart = new Map(prevCart);
      const currentItem = updatedCart.get(meal.customId);
      if (currentItem) {
        updatedCart.set(meal.customId, { meal, quantity: currentItem.quantity });
      } else {
        updatedCart.set(meal.customId, { meal, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(Array.from(updatedCart.entries())));
      return updatedCart;
    });
    setNotification(`"${meal.name}" has been added to the cart.`);
    setTimeout(() => setNotification(null), 3000); 
  };

  const toggleSection = (section: "regular" | "combo" | "addon") => {
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
    <div className="p-4 bg-white min-h-screen pb-20">
      <div className="max-w-4xl mx-auto text-black">
        {/* Restaurant Details */}
        <div className="flex items-center mb-4">
          {restaurant?.imageUrl && (
            <div className="relative w-32 h-32 mr-4">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 text-yellow-500">{restaurant?.name}</h1>
            <p className="text-sm text-gray-600 mb-1">{restaurant?.location}</p>
            <p className="text-sm text-gray-600 mb-1">{restaurant?.contactNumber}</p>
            <p className="text-sm text-gray-700">{restaurant?.description}</p>
          </div>
        </div>

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
            className="flex justify-between cursor-pointer bg-black text-white p-4 rounded"
            onClick={() => toggleSection("regular")}
          >
            <h2 className="text-2xl font-semibold">Regular Meals</h2>
            <span>{collapsedSections.regular ? "+" : "-"}</span>
          </div>
          {!collapsedSections.regular && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredMeals?.filter((meal) => meal.tag === "regular").length ? (
                filteredMeals
                  ?.filter((meal) => meal.tag === "regular")
                  .map((meal) => (
                    <MealCard
                      key={meal.customId}
                      meal={meal}
                      addToCart={addToCart}
                      handleQuantityChange={handleQuantityChange}
                      quantity={cart.get(meal.customId)?.quantity || 1}
                    />
                  ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No regular meals available.</p>
              )}
            </div>
          )}
        </section>

        {/* Combo Meals Section */}
        <section className="mb-6">
          <div
            className="flex justify-between cursor-pointer bg-black text-white p-4 rounded"
            onClick={() => toggleSection("combo")}
          >
            <h2 className="text-2xl font-semibold">Combo Meals</h2>
            <span>{collapsedSections.combo ? "+" : "-"}</span>
          </div>
          {!collapsedSections.combo && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredMeals?.filter((meal) => meal.tag === "combo").length ? (
                filteredMeals
                  ?.filter((meal) => meal.tag === "combo")
                  .map((meal) => (
                    <MealCard
                      key={meal.customId}
                      meal={meal}
                      addToCart={addToCart}
                      handleQuantityChange={handleQuantityChange}
                      quantity={cart.get(meal.customId)?.quantity || 1}
                    />
                  ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No combo meals available.</p>
              )}
            </div>
          )}
        </section>

        {/* Add-On Meals Section */}
        <section>
          <div
            className="flex justify-between cursor-pointer bg-black text-white p-4 rounded"
            onClick={() => toggleSection("addon")}
          >
            <h2 className="text-2xl font-semibold">Add-Ons</h2>
            <span>{collapsedSections.addon ? "+" : "-"}</span>
          </div>
          {!collapsedSections.addon && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredMeals?.filter((meal) => meal.tag === "add-on").length ? (
                filteredMeals
                  ?.filter((meal) => meal.tag === "add-on")
                  .map((meal) => (
                    <MealCard
                      key={meal.customId}
                      meal={meal}
                      addToCart={addToCart}
                      handleQuantityChange={handleQuantityChange}
                      quantity={cart.get(meal.customId)?.quantity || 1}
                    />
                  ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No add-ons available.</p>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
