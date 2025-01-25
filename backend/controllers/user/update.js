// Controller for updating the user's profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.session.user._id;  // Retrieve the user ID from session
        const profilePath = req.file ? `/uploads/profiles/${req.file.filename}` : null;

        if (!profilePath) {
            return res.status(400).json({ message: 'No profile picture provided' });
        }

        // Update the user's profile picture in the database
        const user = await User.findByIdAndUpdate(
            userId,
            { profile: profilePath },
            { new: true }  // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with updated user data
        res.json({
            message: 'Profile picture updated successfully',
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                profile: user.profile,
            },
        });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateProfile };
