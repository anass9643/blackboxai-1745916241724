import React from 'react';

const WorkoutPlan = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Workout Plan</h2>
      <p><strong>BMI:</strong> {data.bmi}</p>
      <p className="mt-2"><strong>Plan:</strong> {data.plan}</p>
    </div>
  );
};

export default WorkoutPlan;
