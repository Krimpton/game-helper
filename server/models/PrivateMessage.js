const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PrivateMessage = sequelize.define("PrivateMessage", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = PrivateMessage;