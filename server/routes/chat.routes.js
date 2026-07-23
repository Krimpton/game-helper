const express = require("express");
const {
    getMessages,
    createMessage,
} = require("../controllers/chat.controller");

const router = express.Router();

router.get("/messages", getMessages);
router.post("/messages", createMessage);

module.exports = router;