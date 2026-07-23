const { ChatMessage } = require("../models");

async function getMessages(req, res) {
    try {
        const messages = await ChatMessage.findAll({
            order: [["createdAt", "ASC"]],
            limit: 50,
        });

        return res.json(messages);
    } catch (error) {
        console.error("Get chat messages error:", error.message);

        return res.status(500).json({
            message: "Failed to get chat messages",
        });
    }
}

async function createMessage(req, res) {
    try {
        const username = req.body.username?.trim() || "Demo User";
        const message = req.body.message?.trim();

        if (!message) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        const chatMessage = await ChatMessage.create({
            username,
            message,
        });

        return res.status(201).json({
            message: "Message created successfully",
            chatMessage,
        });
    } catch (error) {
        console.error("Create chat message error:", error.message);

        return res.status(500).json({
            message: "Failed to create chat message",
        });
    }
}

module.exports = {
    getMessages,
    createMessage,
};