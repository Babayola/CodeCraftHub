const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ADD THIS LINE
console.log('Current Working Directory:', process.cwd());

dotenv.config();

const connectDB = async () => {
    try {
        console.log('Attempting to connect with MONGODB_URI:', process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;