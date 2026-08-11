const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
    sendFriendRequest,
    getIncomingRequests,
    acceptFriendRequest,
    getFriends,
    declineFriendRequest, removeFriend,
} = require("../controllers/friends.controller");

const router = express.Router();

router.post("/requests", authMiddleware, sendFriendRequest);

router.get("/requests", authMiddleware, getIncomingRequests);

router.put(
    "/requests/:id/accept",
    authMiddleware,
    acceptFriendRequest
);

router.get("/", authMiddleware, getFriends);

router.delete("/requests/:id", authMiddleware, declineFriendRequest);

router.delete(
    "/:userId",
    authMiddleware,
    removeFriend
);

module.exports = router;