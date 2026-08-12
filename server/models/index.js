const sequelize = require("../config/database");

const User = require("./User");
const UserGame = require("./UserGame");
const ChatMessage = require("./ChatMessage");
const Friendship = require("./Friendship");
const PrivateMessage = require("./PrivateMessage");

// User games

User.hasMany(UserGame, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

UserGame.belongsTo(User, {
    foreignKey: "userId",
});

// Friendships

User.hasMany(Friendship, {
    foreignKey: "requesterId",
    as: "SentFriendRequests",
    onDelete: "CASCADE",
});

Friendship.belongsTo(User, {
    foreignKey: "requesterId",
    as: "Requester",
});

User.hasMany(Friendship, {
    foreignKey: "addresseeId",
    as: "ReceivedFriendRequests",
    onDelete: "CASCADE",
});

Friendship.belongsTo(User, {
    foreignKey: "addresseeId",
    as: "Addressee",
});

// Private messages

User.hasMany(PrivateMessage, {
    foreignKey: "senderId",
    as: "SentPrivateMessages",
    onDelete: "CASCADE",
});

PrivateMessage.belongsTo(User, {
    foreignKey: "senderId",
    as: "Sender",
});

User.hasMany(PrivateMessage, {
    foreignKey: "receiverId",
    as: "ReceivedPrivateMessages",
    onDelete: "CASCADE",
});

PrivateMessage.belongsTo(User, {
    foreignKey: "receiverId",
    as: "Receiver",
});

module.exports = {
    sequelize,
    User,
    UserGame,
    ChatMessage,
    Friendship,
    PrivateMessage,
};