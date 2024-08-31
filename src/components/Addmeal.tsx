import React, { useState } from 'react';
import axios from 'axios';

const AddMeal: React.FC = () => {
  const [meal, setMeal] = useState({
    name: '',
    image: '',
    countable: false,
    count: 0,
    available: true,
    price: 0,
    per: 'piece',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setMeal({
      ...meal,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Assuming the backend server endpoint is '/api/meals'
      const response = await axios.post('/api/meals', meal);
      console.log('Meal added:', response.data);

      // Reset the form after submission
      setMeal({
        name: '',
        image: '',
        countable: false,
        count: 0,
        available: true,
        price: 0,
        per: 'piece',
      });
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  return (
    <div className="form-container" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Meal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name of Meal</label>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={meal.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={meal.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Per (e.g., spoon, piece)</label>
          <input
            type="text"
            name="per"
            value={meal.per}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Is it Countable?</label>
          <input
            type="checkbox"
            name="countable"
            checked={meal.countable}
            onChange={handleChange}
          />
        </div>
        {meal.countable && (
          <div className="form-group">
            <label>Count</label>
            <input
              type="number"
              name="count"
              value={meal.count}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="form-group">
          <label>Available</label>
          <input
            type="checkbox"
            name="available"
            checked={meal.available}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Meal</button>
      </form>
    </div>
  );
};

export default AddMeal;
