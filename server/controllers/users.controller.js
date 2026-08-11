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

async function uploadProfileImage(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const imagePath = `/uploads/profile/${req.file.filename}`;

        user.profileImage = imagePath;
        await user.save();

        return res.json({
            message: "Profile image uploaded successfully",
            profileImage: imagePath,
        });
    } catch (error) {
        console.error("Profile image upload error:", error.message);

        return res.status(500).json({
            message: "Failed to upload profile image",
        });
    }
}

async function uploadBanner(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const imagePath = `/uploads/profile/${req.file.filename}`;

        user.banner = imagePath;
        await user.save();

        return res.json({
            message: "Banner uploaded successfully",
            banner: imagePath,
        });
    } catch (error) {
        console.error("Banner upload error:", error.message);

        return res.status(500).json({
            message: "Failed to upload banner",
        });
    }
}

module.exports = {
    updateMyProfile,
    uploadProfileImage,
    uploadBanner,
};