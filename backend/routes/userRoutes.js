const express = require('express');
const { login } = require('../controllers/user/login');
const { register } = require('../controllers/user/register');
const { updateProfile } = require('../controllers/user/update');
const userSessions = require('../middlewares/userSessions');  // Session validation middleware
const router = express.Router();

// User routes
router.post('/register', register);  // Register route
router.post('/login', login);  // Login route
router.post('/update-profile', userSessions, updateProfile);  // Update profile route with session check
router.get('/get-user-session', userSessions);  // Get session data route

// Optional: Clear session route
router.post('/clear-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to clear session', error: err.message });
        }
        res.status(200).json({ message: 'Session cleared successfully' });
    });
});

module.exports = router;
