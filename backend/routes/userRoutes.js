const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/', register);
router.post('/', login);

module.exports = router;
