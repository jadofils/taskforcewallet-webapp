const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const userRoutes = require('./routes/userRoutes');
const verifyToken = require('./middlewares/authMiddleware');  // Import the middleware
const connectDB = require('./config/db'); // Correct path

dotenv.config(); // Load environment variables from .env file

const app = express();
connectDB(); // Connect to the database before starting the server

const PORT = process.env.PORT || 5000;

// Allow CORS
app.use(cors({
    origin: 'https://taskforcewallet-webapp.onrender.com',  // Adjust this URL if your frontend is hosted elsewhere
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Set up express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'Secret456879489key__fordhvjhssigningsessiondghsjfhkjIDs',  // Secret key for signing session IDs
    resave: false,  // Don't resave session if it's not modified
    saveUninitialized: false,  // Don't save uninitialized sessions
    cookie: { secure: false },  // Set to true if using https
}));

// Middleware for parsing JSON, URL-encoded data, and serving static files
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files

// Routes for user-related actions
app.use('/api/users', userRoutes);

// Protect the /admin-page route using the verifyToken middleware
app.use('/admin-page', verifyToken, (req, res) => {
    console.log(`User ${req.user.id} accessed /admin-page`);
    res.sendFile(path.join(__dirname, '../public/dashboard/dashboard.html')); // Serve protected dashboard
});

// Route to serve the main index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Serve index.html
});

// Custom 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', '404.html')); // Serve 404.html
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at: https://taskforcewallet-webapp.onrender.com`);
    //  console.log(`Server running at http://localhost:${PORT}`);
   // console.log(`Server running at http://localhost:${PORT}`);
});
