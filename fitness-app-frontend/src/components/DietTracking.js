import React, { useState } from 'react';
import axios from 'axios';

const DietTracking = () => {
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [meals, setMeals] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/diet-tracking', {
        userId,
        date,
        meals,
      });
      setMessage('Diet tracking data saved successfully.');
      setMeals('');
    } catch (err) {
      setError('Failed to save diet tracking data. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Diet Tracking</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Meals (describe your meals)</label>
          <textarea
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
        >
          Save Diet Tracking
        </button>
      </form>
    </div>
  );
};

export default DietTracking;
