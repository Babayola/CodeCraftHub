// app.js

const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS module imported

dotenv.config();
const app = express();

// --- Declare the allowedOrigins array ONCE here ---
// This list MUST precisely match the origins your frontend will send
const allowedOrigins = [
    'https://user-auth-api-kszf.onrender.com', // Your API's own URL (optional, but harmless)
    'https://684f0156c5658ebf3ba0848b--stalwart-peony-582742.netlify.app', // <-- YOUR NETLIFY URL (NO TRAILING SLASH)
    'http://localhost:5500', // For local Live Server testing
    'http://127.0.0.1:5500'  // For local Live Server testing
    // If you renamed your Netlify site, also add the new URL here:
    // 'https://your-renamed-site.netlify.app'
];

// --- Apply the CORS middleware here, referencing the allowedOrigins array ---
app.use(cors());

app.use(express.json()); // This should come after CORS for preflight handling
connectDB(); // Call the function to connect to MongoDB

// Mount user routes under /api/users
app.use('/api/users', userRoutes);

// Basic route to confirm API is running
app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

// Export the app instance for server.js
module.exports = app;