const express = require('express');
const { login } = require('../controllers/user/login');
const { register } = require('../controllers/user/register');
const userSessions = require('../middlewares/userSessions'); // Importing the middleware
const router = express.Router();

// User routes
router.post('/register', register);         // Register route
router.post('/login', login);               // Login route
router.get('/get-session', userSessions);   // Get session route

// Route to clear session (optional)
router.post('/clear-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to clear session', error: err.message });
        }
        res.status(200).json({ message: 'Session cleared successfully' });
    });
});

module.exports = router;
