const express = require("express");
const { updateMyProfile } = require("../controllers/users.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.put("/me", authMiddleware, updateMyProfile);

module.exports = router;