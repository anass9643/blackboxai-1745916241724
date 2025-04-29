import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ setWorkoutData }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal: 'fat burn',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/workout-plan', {
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        age: parseInt(formData.age),
        gender: formData.gender,
        goal: formData.goal,
      });
      setWorkoutData(response.data);
    } catch (err) {
      setError('Failed to fetch workout plan. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block mb-1">Height (cm)</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-1">Goal</label>
        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="fat burn">Fat Burn</option>
          <option value="weight loss">Weight Loss</option>
          <option value="muscle gain">Muscle Gain</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Get Workout Plan
      </button>
    </form>
  );
};

export default UserForm;
