const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Friendship = sequelize.define("Friendship", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    addresseeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("pending", "accepted"),
        allowNull: false,
        defaultValue: "pending",
    },
});

module.exports = Friendship;