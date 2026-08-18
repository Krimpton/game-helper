const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
    getLibrary,
    addGame,
    updateGame,
    removeGame,
} = require("../controllers/library.controllers");

const router = express.Router();

router.get("/", authMiddleware, getLibrary);

router.post("/", authMiddleware, addGame);

router.put("/:id", authMiddleware, updateGame);

router.delete("/:id", authMiddleware, removeGame);

module.exports = router;