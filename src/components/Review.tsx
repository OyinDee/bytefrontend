// app/feedback-review.tsx
"use client";

import React, { useState } from 'react';

const FeedbackReview: React.FC = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the review submission logic here
    alert('Review submitted!');
  };

  return (
    <div className="relative min-h-screen mt-24 bg-white text-black py-12">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Feedback Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Leave a Review</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="rating" className="block text-lg font-semibold mb-2">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="review" className="block text-lg font-semibold mb-2">Review</label>
              <textarea
                id="review"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReview;
