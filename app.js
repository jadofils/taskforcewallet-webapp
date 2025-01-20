const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./backend/routes/userRoutes');
const connectDB = require('./backend/config/db'); // Correct path

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Connect to the database before starting the server

const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Adjusted path
// Routes
app.use('/api/users', userRoutes);

// Route for ge
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjusted path
});
//now nodemon done
// Custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); // Adjusted path
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
