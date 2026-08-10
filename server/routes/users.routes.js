const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    updateMyProfile,
    uploadProfileImage,
    uploadBanner,
} = require("../controllers/users.controller");

const router = express.Router();

router.put("/me", authMiddleware, updateMyProfile);

router.post(
    "/me/profile-image",
    authMiddleware,
    upload.single("image"),
    uploadProfileImage
);

router.post(
    "/me/banner",
    authMiddleware,
    upload.single("image"),
    uploadBanner
);

module.exports = router;