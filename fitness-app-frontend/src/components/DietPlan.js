import React, { useState } from 'react';
import axios from 'axios';

const DietPlan = () => {
  const [goal, setGoal] = useState('fat burn');
  const [diet, setDiet] = useState('');
  const [error, setError] = useState('');

  const fetchDietPlan = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/diet-plan', { goal });
      setDiet(response.data.diet);
    } catch (err) {
      setError('Failed to fetch diet plan. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Get Diet Plan</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Select Goal</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="fat burn">Fat Burn</option>
          <option value="weight loss">Weight Loss</option>
          <option value="muscle gain">Muscle Gain</option>
        </select>
      </div>
      <button
        onClick={fetchDietPlan}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Get Diet Plan
      </button>
      {diet && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Diet Plan:</h3>
          <p>{diet}</p>
        </div>
      )}
    </div>
  );
};

export default DietPlan;
