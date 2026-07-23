const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ChatMessage = sequelize.define("ChatMessage", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Demo User",
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = ChatMessage;