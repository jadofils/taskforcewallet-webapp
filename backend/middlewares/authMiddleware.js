const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.session.token;  // Get token from session

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log('Verified user:', req.user);
        next();
    } catch (err) {
        console.log('Invalid or expired token');
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
