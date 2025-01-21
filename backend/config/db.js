const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Check if the .env file was loaded successfully
if (dotenv.error) {
    console.error('Error loading .env:', dotenv.error);
    process.exit(1);
}

// Print environment variables to verify they are loaded correctly
console.log('Environment variables loaded:', {
    envPath: envPath,
    isDotenvLoaded: require.cache[require.resolve('dotenv')] !== undefined,
    processEnvKeys: Object.keys(process.env)
});

const connectDB = async () => {
    try {
        console.log('Attempting to connect with:', {
            PORT: process.env.PORT,
            MONGO_URI: process.env.MONGO_URI,
            JWT_SECRET: process.env.JWT_SECRET
        });

        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
