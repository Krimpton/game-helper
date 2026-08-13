const { Op } = require("sequelize");
const {
    User,
    Friendship,
    PrivateMessage,
} = require("../models");

async function checkFriendship(userId, otherUserId) {
    return Friendship.findOne({
        where: {
            status: "accepted",
            [Op.or]: [
                {
                    requesterId: userId,
                    addresseeId: otherUserId,
                },
                {
                    requesterId: otherUserId,
                    addresseeId: userId,
                },
            ],
        },
    });
}

async function getConversation(req, res) {
    try {
        const currentUserId = req.user.id;
        const otherUserId = Number(req.params.userId);

        if (!otherUserId) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        if (currentUserId === otherUserId) {
            return res.status(400).json({
                message: "You cannot open a private chat with yourself",
            });
        }

        const otherUser = await User.findByPk(otherUserId, {
            attributes: ["id", "username", "profileImage"],
        });

        if (!otherUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const friendship = await checkFriendship(
            currentUserId,
            otherUserId
        );

        if (!friendship) {
            return res.status(403).json({
                message: "Private chat is only available between friends",
            });
        }

        const messages = await PrivateMessage.findAll({
            where: {
                [Op.or]: [
                    {
                        senderId: currentUserId,
                        receiverId: otherUserId,
                    },
                    {
                        senderId: otherUserId,
                        receiverId: currentUserId,
                    },
                ],
            },
            order: [["createdAt", "ASC"]],
        });

        return res.json({
            user: otherUser,
            messages,
        });
    } catch (error) {
        console.error(
            "Get private conversation error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to get private conversation",
        });
    }
}

async function sendPrivateMessage(req, res) {
    try {
        const senderId = req.user.id;
        const receiverId = Number(req.params.userId);
        const { message } = req.body;

        if (!receiverId) {
            return res.status(400).json({
                message: "Invalid user ID",
            });
        }

        if (senderId === receiverId) {
            return res.status(400).json({
                message: "You cannot send a private message to yourself",
            });
        }

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Message cannot be empty",
            });
        }

        const receiver = await User.findByPk(receiverId, {
            attributes: ["id", "username", "profileImage"],
        });

        if (!receiver) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const friendship = await checkFriendship(
            senderId,
            receiverId
        );

        if (!friendship) {
            return res.status(403).json({
                message: "Private messages can only be sent to friends",
            });
        }

        const privateMessage = await PrivateMessage.create({
            senderId,
            receiverId,
            message: message.trim(),
        });

        return res.status(201).json({
            message: "Private message sent successfully",
            privateMessage,
        });
    } catch (error) {
        console.error(
            "Send private message error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to send private message",
        });
    }
}

module.exports = {
    getConversation,
    sendPrivateMessage,
};