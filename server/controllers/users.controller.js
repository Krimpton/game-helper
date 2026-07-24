const { User } = require("../models");

const allowedProfileFields = [
    "profileImage",
    "banner",
    "aboutMe",
    "favoriteGame",
    "favoriteGenre",
    "favoritePlatform",
    "discord",
    "steam",
    "github",
    "reddit",
];

async function updateMyProfile(req, res) {
    try {
        const updateData = {};

        allowedProfileFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await user.update(updateData);

        return res.json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                banner: user.banner,
                aboutMe: user.aboutMe,
                favoriteGame: user.favoriteGame,
                favoriteGenre: user.favoriteGenre,
                favoritePlatform: user.favoritePlatform,
                discord: user.discord,
                steam: user.steam,
                github: user.github,
                reddit: user.reddit,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        console.error("Update profile error:", error.message);

        return res.status(500).json({
            message: "Failed to update profile",
        });
    }
}

module.exports = {
    updateMyProfile,
};