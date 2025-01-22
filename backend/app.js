const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db'); // Correct path

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Connect to the database before starting the server

const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON, URL-encoded data, and serving static files
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files

// Routes
app.use('/api/users', userRoutes);


// Route to serve the main index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Serve index.html from the public folder
});

// Custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', '404.html')); // Serve 404.html from the public folder
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
 console.log(`Server running at http://localhost:${PORT}`);
  //  console.log(`Server running at https://taskforcewallet-webapp.onrender.com`);
});
