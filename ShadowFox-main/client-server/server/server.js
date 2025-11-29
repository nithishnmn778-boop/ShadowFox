// server/server.js

// --- Imports: The tools we need ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads secrets from our .env file

// --- App Initialization: Create our server ---
const app = express();
const PORT = process.env.PORT || 5001; // The port our server will listen on

// --- Middleware: The server's security checkpoints and helpers ---
// A "catchy" way to think of middleware: it's the bouncer at the club door.
// It checks every request before letting it in.
app.use(cors()); // Allows our React app to make requests
app.use(express.json()); // Allows the server to understand JSON payloads

// --- Database Connection: The lifeline to our data ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Phoenix DB Connection: STATUS GREEN. We are live."))
  .catch(err => console.error("Phoenix DB Connection: STATUS RED. Error:", err));

// --- API Routes: The commands the frontend can issue ---
// Placeholder for now, we'll build these next.
app.get('/', (req, res) => {
  res.send('Project Phoenix API is online and awaiting commands.');
});

// --- Server Listener: The final "turn on" switch ---
app.listen(PORT, () => {
  console.log(`Phoenix Engine is roaring on port: ${PORT}`);
});



// server/server.js (add these lines)
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes); // All task routes will be prefixed with /api/tasks