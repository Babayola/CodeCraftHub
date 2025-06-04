const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
connectDB(); // Call the function to connect to MongoDB
app.use('/api/users', userRoutes); // Mount user routes under /api/users

module.exports = app;