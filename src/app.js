// app.js

const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS module imported

dotenv.config();
const app = express();

// --- ADD THIS CORS CONFIGURATION HERE ---
const allowedOrigins = [
    'https://user-auth-api-kszf.onrender.com', // Your API itself (useful for testing)
    'https://684f0156c5658ebf3ba0848b--stalwart-peony-582742.netlify.app/', // <-- YOUR CURRENT NETLIFY URL
    'http://localhost:5500', // For local Live Server testing
    'http://127.0.0.1:5500'  // For local Live Server testing
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // or if the origin is in our allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    credentials: true, // Allow cookies to be sent (useful for future auth if needed)
    allowedHeaders: ['Content-Type', 'Authorization'] // Explicitly allow headers
}));
// --- END OF CORS CONFIGURATION ---

app.use(express.json()); // This should come after CORS if you also allow preflight requests to pass through CORS
connectDB(); // Call the function to connect to MongoDB
app.use('/api/users', userRoutes); // Mount user routes under /api/users

app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

module.exports = app;