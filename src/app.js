const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
connectDB(); // Call the function to connect to MongoDB
app.use('/api/users', userRoutes); // Mount user routes under /api/users

app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

module.exports = app;