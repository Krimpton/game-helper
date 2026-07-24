const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aboutMe: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    favoriteGame: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favoriteGenre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favoritePlatform: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    discord: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    steam: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reddit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;