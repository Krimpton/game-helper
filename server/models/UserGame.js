const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserGame = sequelize.define("UserGame", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rawgGameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    rawgRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    released: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(
            "wishlist",
            "want_to_play",
            "playing",
            "completed",
            "dropped"
        ),
        allowNull: false,
        defaultValue: "wishlist",
    },
    personalRating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = UserGame;