const { User } = require('../../models/wallet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token that expires in 1 hour
        const token = jwt.sign(
            { id: user._id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration time
        );

        // Store the token and user details in the session
        req.session.token = token;
        req.session.user = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };

        // Log the token (optional, for debugging purposes)
        console.log("Generated Token: ", token);

        // Send response with token and user details
        return res.json({
            message: 'Login successful',
            token,
            user: req.session.user,  // Send user details
        });
    } catch (err) {
        console.error('Error logging in:', err);  // Log errors for debugging
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};
