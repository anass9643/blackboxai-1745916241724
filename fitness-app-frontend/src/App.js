import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import WorkoutPlan from './components/WorkoutPlan';
import DietPlan from './components/DietPlan';
import DietTracking from './components/DietTracking';
import ProgressMonitoring from './components/ProgressMonitoring';

function App() {
  const [workoutData, setWorkoutData] = useState(null);

  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Fitness Planner</h1>
        <nav className="mb-6 flex justify-center space-x-6">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/diet-plan" className="text-blue-600 hover:underline">Diet Plan</Link>
          <Link to="/diet-tracking" className="text-blue-600 hover:underline">Diet Tracking</Link>
          <Link to="/progress" className="text-blue-600 hover:underline">Progress</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <UserForm setWorkoutData={setWorkoutData} />
              {workoutData && <WorkoutPlan data={workoutData} />}
            </>
          } />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="/diet-tracking" element={<DietTracking />} />
          <Route path="/progress" element={<ProgressMonitoring />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
