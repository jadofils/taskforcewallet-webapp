// Middleware to get session data
function userSessions(req, res) {
    if (req.session.user) {
        res.status(200).json({ sessions: req.session });
    } else {
        res.status(404).json({ message: 'No active sessions found' });
    }
}

module.exports = userSessions;  // Export the function
