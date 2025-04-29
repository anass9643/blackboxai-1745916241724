import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressMonitoring = () => {
  const [userId, setUserId] = useState('');
  const [progressData, setProgressData] = useState([]);
  const [error, setError] = useState('');

  const fetchProgress = async () => {
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
      setProgressData(response.data);
    } catch (err) {
      setError('Failed to fetch progress data. Please try again.');
    }
  };

  const data = {
    labels: progressData.map(entry => entry.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: progressData.map(entry => entry.weight),
        fill: false,
        borderColor: 'rgb(37, 99, 235)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Progress Monitoring</h2>
      <div className="mb-4">
        <label className="block mb-1">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        onClick={fetchProgress}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition mb-4"
      >
        Fetch Progress
      </button>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {progressData.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No progress data available. Please enter your User ID and fetch progress.</p>
      )}
    </div>
  );
};

export default ProgressMonitoring;
