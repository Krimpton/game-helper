const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
    getConversation,
    sendPrivateMessage,
} = require("../controllers/privateChat.controller");

const router = express.Router();

router.get("/:userId", authMiddleware, getConversation);

router.post("/:userId", authMiddleware, sendPrivateMessage);

module.exports = router;