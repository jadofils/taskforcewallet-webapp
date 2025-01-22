const { User } = require('../../models/wallet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new 
// 
exports.register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, username } = req.body;

        // Validate required fields
        if (!username || !email || !password || !firstname || !lastname) {
            return res.status(400).json({ success: false, message: 'All fields are required.Try To register' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, username, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error registering user', error: err.message });
    }
};

