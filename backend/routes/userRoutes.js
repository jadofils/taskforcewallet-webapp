const express = require('express');
const {login } = require('../controllers/user/login');
const {register } = require('../controllers/user/register');

const router = express.Router();

// User routes
router.post('/register', register); // Register route
router.post('/login', login);       // Login route

module.exports = router;
