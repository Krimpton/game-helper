const { Op } = require("sequelize");
const { User, Friendship } = require("../models");

async function sendFriendRequest(req, res) {
    try {
        const requesterId = req.user.id;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required",
            });
        }

        const addresseeId = Number(userId);

        if (requesterId === addresseeId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself",
            });
        }

        const addressee = await User.findByPk(addresseeId, {
            attributes: ["id", "username", "profileImage"],
        });

        if (!addressee) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const existingFriendship = await Friendship.findOne({
            where: {
                [Op.or]: [
                    {
                        requesterId,
                        addresseeId,
                    },
                    {
                        requesterId: addresseeId,
                        addresseeId: requesterId,
                    },
                ],
            },
        });

        if (existingFriendship) {
            if (existingFriendship.status === "accepted") {
                return res.status(400).json({
                    message: "You are already friends",
                });
            }

            return res.status(400).json({
                message: "A pending friend request already exists",
            });
        }

        const friendship = await Friendship.create({
            requesterId,
            addresseeId,
            status: "pending",
        });

        return res.status(201).json({
            message: "Friend request sent successfully",
            request: {
                id: friendship.id,
                status: friendship.status,
                user: addressee,
                createdAt: friendship.createdAt,
            },
        });
    } catch (error) {
        console.error("Send friend request error:", error.message);

        return res.status(500).json({
            message: "Failed to send friend request",
        });
    }
}

async function getIncomingRequests(req, res) {
    try {
        const userId = req.user.id;

        const requests = await Friendship.findAll({
            where: {
                addresseeId: userId,
                status: "pending",
            },
            include: [
                {
                    model: User,
                    as: "Requester",
                    attributes: ["id", "username", "profileImage"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        return res.json({
            requests: requests.map((request) => ({
                id: request.id,
                status: request.status,
                sender: request.Requester,
                createdAt: request.createdAt,
            })),
        });
    } catch (error) {
        console.error("Get friend requests error:", error.message);

        return res.status(500).json({
            message: "Failed to get friend requests",
        });
    }
}

async function acceptFriendRequest(req, res) {
    try {
        const userId = req.user.id;
        const requestId = Number(req.params.id);

        const friendship = await Friendship.findOne({
            where: {
                id: requestId,
                addresseeId: userId,
                status: "pending",
            },
        });

        if (!friendship) {
            return res.status(404).json({
                message: "Friend request not found",
            });
        }

        friendship.status = "accepted";
        await friendship.save();

        return res.json({
            message: "Friend request accepted",
            friendship: {
                id: friendship.id,
                requesterId: friendship.requesterId,
                addresseeId: friendship.addresseeId,
                status: friendship.status,
            },
        });
    } catch (error) {
        console.error("Accept friend request error:", error.message);

        return res.status(500).json({
            message: "Failed to accept friend request",
        });
    }
}

async function getFriends(req, res) {
    try {
        const userId = req.user.id;

        const friendships = await Friendship.findAll({
            where: {
                status: "accepted",
                [Op.or]: [
                    { requesterId: userId },
                    { addresseeId: userId },
                ],
            },
            include: [
                {
                    model: User,
                    as: "Requester",
                    attributes: ["id", "username", "profileImage"],
                },
                {
                    model: User,
                    as: "Addressee",
                    attributes: ["id", "username", "profileImage"],
                },
            ],
        });

        const friends = friendships.map((friendship) => {
            if (friendship.requesterId === userId) {
                return friendship.Addressee;
            }

            return friendship.Requester;
        });

        return res.json({
            friends,
        });
    } catch (error) {
        console.error("Get friends error:", error.message);

        return res.status(500).json({
            message: "Failed to get friends",
        });
    }
}

async function declineFriendRequest(req, res) {
    try {
        const userId = req.user.id;
        const requestId = Number(req.params.id);

        const friendship = await Friendship.findOne({
            where: {
                id: requestId,
                addresseeId: userId,
                status: "pending",
            },
        });

        if (!friendship) {
            return res.status(404).json({
                message: "Friend request not found",
            });
        }

        await friendship.destroy();

        return res.json({
            message: "Friend request declined",
        });
    } catch (error) {
        console.error("Decline friend request error:", error.message);

        return res.status(500).json({
            message: "Failed to decline friend request",
        });
    }
}

async function removeFriend(req, res) {
    try {
        const userId = req.user.id;
        const friendId = Number(req.params.userId);

        if (!friendId) {
            return res.status(400).json({
                message: "Invalid friend user ID",
            });
        }

        const friendship = await Friendship.findOne({
            where: {
                status: "accepted",
                [Op.or]: [
                    {
                        requesterId: userId,
                        addresseeId: friendId,
                    },
                    {
                        requesterId: friendId,
                        addresseeId: userId,
                    },
                ],
            },
        });

        if (!friendship) {
            return res.status(404).json({
                message: "Friendship not found",
            });
        }

        await friendship.destroy();

        return res.json({
            message: "Friend removed successfully",
        });
    } catch (error) {
        console.error("Remove friend error:", error.message);

        return res.status(500).json({
            message: "Failed to remove friend",
        });
    }
}

module.exports = {
    sendFriendRequest,
    getIncomingRequests,
    acceptFriendRequest,
    getFriends,
    declineFriendRequest,
    removeFriend,
};