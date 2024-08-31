import React, { useState } from 'react';

interface Meal {
    name: string;
    image: string;
    price: number;
    per: string;
    countable: boolean;
    count?: number;
    available: boolean;
}

const MealManagement: React.FC = () => {
    const [meal, setMeal] = useState<Meal>({
        name: '',
        image: '',
        price: 0,
        per: 'piece',
        countable: false,
        count: undefined,
        available: false,
    });

    const [meals, setMeals] = useState<Meal[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setMeal(prevState => ({ ...prevState, [name]: target.checked }));
        } else if (type === 'number') {
            setMeal(prevState => ({ ...prevState, [name]: parseFloat(value) }));
        } else if (type === 'file') {
            const target = e.target as HTMLInputElement;
            const files = target.files;
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setMeal(prevState => ({ ...prevState, image: reader.result as string }));
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            setMeal(prevState => ({ ...prevState, [name]: value }));
        }

        setErrors(prevState => ({ ...prevState, [name]: '' }));
    };

    const validateMeal = () => {
        const newErrors: { [key: string]: string } = {};

        if (!meal.name) newErrors.name = 'Name is required';
        if (!meal.image) newErrors.image = 'Image is required';
        if (meal.price <= 0) newErrors.price = 'Price must be greater than zero';
        if (!meal.per) newErrors.per = 'Unit (per) is required';
        if (meal.countable && (!meal.count || meal.count <= 0)) newErrors.count = 'Count is required for countable items';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateMeal()) {
            setMeals(prevMeals => [...prevMeals, meal]);
            setMeal({
                name: '',
                image: '',
                price: 0,
                per: 'piece',
                countable: false,
                count: undefined,
                available: false,
            });
        }
    };

    const handleSubmit = () => {
        if (meals.length > 0) {
            console.log('Meals to be submitted:', meals);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center py-4 space-y-6 sm:space-y-8">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-8">Meal Management</h2>

            {/* Meal Form */}
            <div className="sm:w-96 max-w-sm sm:max-w-xl space-y-4 sm:space-y-6">
                {/* Name Input */}
                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={meal.name}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-2">Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-2 sm:py-2 px-2 sm:px-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
                    {meal.image && (
                        <img src={meal.image} alt="Preview" className="mt-2 sm:mt-4 w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-md border border-gray-300" />
                    )}
                </div>

                {/* Price Input */}
                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-2">Price (in Bytes):</label>
                    <input
                        type="number"
                        name="price"
                        value={meal.price}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Price in Bytes"
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                </div>

                {/* Per Input */}
                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-2">Per:</label>
                    <select
                        name="per"
                        value={meal.per}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <option value="piece">Piece</option>
                        <option value="plate">Plate</option>
                        <option value="bowl">Bowl</option>
                        <option value="spoon">Spoon</option>
                        <option value="cup">Cup</option>
                        <option value="slice">Slice</option>
                        <option value="bag">Bag</option>
                    </select>
                    {errors.per && <span className="text-red-500 text-sm">{errors.per}</span>}
                </div>

                {/* Countable Checkbox */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <label className="block text-base sm:text-lg font-semibold">Countable:</label>
                    <input
                        type="checkbox"
                        name="countable"
                        checked={meal.countable}
                        onChange={handleChange}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>

                {/* Count Input */}
                {meal.countable && (
                    <div>
                        <label className="block text-base sm:text-lg font-semibold mb-2">Count:</label>
                        <input
                            type="number"
                            name="count"
                            value={meal.count || ''}
                            onChange={handleChange}
                            className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        {errors.count && <span className="text-red-500 text-sm">{errors.count}</span>}
                    </div>
                )}

                {/* Available Checkbox */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <label className="block text-base sm:text-lg font-semibold">Available:</label>
                    <input
                        type="checkbox"
                        name="available"
                        checked={meal.available}
                        onChange={handleChange}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
            </div>

            {/* Save and Submit Buttons */}
            <div className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-6">
                <button
                    onClick={handleSave}
                    className="bg-black text-white font-bold py-2 sm:py-2 px-6 sm:px-8 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400"
                >
                    Save Meal
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white font-bold py-2 sm:py-2 px-6 sm:px-8 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400"
                >
                    Send to DB
                </button>
            </div>

            {/* Meal List */}
            {meals.length > 0 && (
                <div className="w-full max-w-sm sm:max-w-xl mt-4 sm:mt-8">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4">Meals to be Submitted:</h3>
                    <ul className="space-y-3 sm:space-y-4">
                        {meals.map((m, index) => (
                            <li key={index} className="p-4 sm:p-6 border border-gray-300 rounded-lg">
                                <p className="font-semibold text-lg sm:text-xl mb-1">{m.name}</p>
                                <img src={m.image} alt={m.name} className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-md mb-2 sm:mb-4" />
                                <p><span className="font-semibold">Price:</span> {m.price} Bytes</p>
                                <p><span className="font-semibold">Per:</span> {m.per}</p>
                                <p><span className="font-semibold">Countable:</span> {m.countable ? 'Yes' : 'No'}</p>
                                {m.countable && <p><span className="font-semibold">Count:</span> {m.count}</p>}
                                <p><span className="font-semibold">Available:</span> {m.available ? 'Yes' : 'No'}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MealManagement;
