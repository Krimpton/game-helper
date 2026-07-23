const sequelize = require("../config/database");
const User = require("./User");
const UserGame = require("./UserGame");
const ChatMessage = require("./ChatMessage");

User.hasMany(UserGame, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

UserGame.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = {
    sequelize,
    User,
    UserGame,
    ChatMessage,
};