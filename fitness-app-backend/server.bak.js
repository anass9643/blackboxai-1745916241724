const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Helper function to read data from JSON file
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { progress: [], dietTracking: [] };
  }
}

// Helper function to write data to JSON file
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Endpoint to calculate BMI and generate workout plan
app.post('/api/workout-plan', (req, res) => {
  const { height, weight, age, gender, goal } = req.body;
  if (!height || !weight || !goal) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const bmi = weight / ((height / 100) ** 2);
  // Simple workout plan logic based on BMI and goal
  let plan = 'General fitness plan';
<thinking>
The attempt to overwrite server.js failed due to an unknown error, possibly a permission or file lock issue.

I will try to create a new file with the updated server.js content under a temporary name (e.g., server.temp.js) in the backend directory.

If successful, I can rename or replace the original server.js after.

I will create the new file now.
</thinking>

<create_file>
<path>fitness-app-backend/server.temp.js</path>
<content>
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Helper function to read data from JSON file
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { progress: [], dietTracking: [] };
  }
}

// Helper function to write data to JSON file
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Endpoint to calculate BMI and generate workout plan
app.post('/api/workout-plan', (req, res) => {
  const { height, weight, age, gender, goal } = req.body;
  if (!height || !weight || !goal) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const bmi = weight / ((height / 100) ** 2);
  // Simple workout plan logic based on BMI and goal
  let plan = 'General fitness plan';
  if (goal === 'fat burn') {
    plan = 'Cardio focused workout plan';
  } else if (goal === 'weight loss') {
    plan = 'Calorie deficit and cardio plan';
  } else if (goal === 'muscle gain') {
    plan = 'Strength training and protein rich diet plan';
  }
  res.json({ bmi: bmi.toFixed(2), plan });
});

// Endpoint to get diet plan based on goal
app.post('/api/diet-plan', (req, res) => {
  const { goal } = req.body;
  let diet = 'Balanced diet';
  if (goal === 'fat burn') {
    diet = 'Low carb, high protein diet';
  } else if (goal === 'weight loss') {
    diet = 'Calorie deficit diet';
  } else if (goal === 'muscle gain') {
    diet = 'High protein, calorie surplus diet';
  }
  res.json({ diet });
});

// Endpoint to track diet (save diet tracking data)
app.post('/api/diet-tracking', (req, res) => {
  const { userId, date, meals } = req.body;
  if (!userId || !date || !meals) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const data = readData();
  data.dietTracking.push({ userId, date, meals });
  writeData(data);
  res.json({ message: 'Diet tracking data saved' });
});

// Endpoint to track progress (save progress data)
app.post('/api/progress', (req, res) => {
  const { userId, weight, date } = req.body;
  if (!userId || !weight || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const data = readData();
  data.progress.push({ userId, weight, date });
  writeData(data);
  res.json({ message: 'Progress recorded', weight, date });
});

// Endpoint to get progress data for a user
app.get('/api/progress/:userId', (req, res) => {
  const userId = req.params.userId;
  const data = readData();
  const userProgress = data.progress.filter(p => p.userId === userId);
  res.json(userProgress);
});

// Serve frontend static files
const buildPath = path.join(__dirname, '../fitness-app-frontend/build');
app.use(express.static(buildPath));

// Fallback route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
