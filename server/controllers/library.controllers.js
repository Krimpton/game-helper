const { UserGame } = require("../models");

const allowedStatuses = [
    "wishlist",
    "want_to_play",
    "playing",
    "completed",
    "dropped",
];

async function getLibrary(req, res) {
    try {
        const userId = req.user.id;

        const games = await UserGame.findAll({
            where: {
                userId,
            },
            order: [["createdAt", "DESC"]],
        });

        return res.json({
            games,
        });
    } catch (error) {
        console.error("Get library error:", error.message);

        return res.status(500).json({
            message: "Failed to get game library",
        });
    }
}

async function addGame(req, res) {
    try {
        const userId = req.user.id;

        const {
            gameId,
            title,
            image,
            rating,
            released,
            status = "wishlist",
        } = req.body;

        if (!gameId || !title) {
            return res.status(400).json({
                message: "gameId and title are required",
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid game status",
            });
        }

        const existingGame = await UserGame.findOne({
            where: {
                userId,
                rawgGameId: gameId,
            },
        });

        if (existingGame) {
            return res.status(400).json({
                message: "Game is already in your library",
            });
        }

        const game = await UserGame.create({
            userId,
            rawgGameId: gameId,
            title,
            image: image || null,
            rawgRating: rating ?? null,
            released: released || null,
            status,
        });

        return res.status(201).json({
            message: "Game added to library",
            game,
        });
    } catch (error) {
        console.error("Add game error:", error.message);

        return res.status(500).json({
            message: "Failed to add game to library",
        });
    }
}

async function updateGame(req, res) {
    try {
        const userId = req.user.id;
        const libraryGameId = Number(req.params.id);

        const game = await UserGame.findOne({
            where: {
                id: libraryGameId,
                userId,
            },
        });

        if (!game) {
            return res.status(404).json({
                message: "Game not found in library",
            });
        }

        const {
            status,
            personalRating,
            note,
        } = req.body;

        if (
            status !== undefined &&
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                message: "Invalid game status",
            });
        }

        if (
            personalRating !== undefined &&
            personalRating !== null &&
            (
                !Number.isInteger(personalRating) ||
                personalRating < 1 ||
                personalRating > 5
            )
        ) {
            return res.status(400).json({
                message: "Personal rating must be between 1 and 5",
            });
        }

        if (status !== undefined) {
            game.status = status;
        }

        if (personalRating !== undefined) {
            game.personalRating = personalRating;
        }

        if (note !== undefined) {
            game.note = note;
        }

        await game.save();

        return res.json({
            message: "Library game updated",
            game,
        });
    } catch (error) {
        console.error("Update library game error:", error.message);

        return res.status(500).json({
            message: "Failed to update library game",
        });
    }
}

async function removeGame(req, res) {
    try {
        const userId = req.user.id;
        const libraryGameId = Number(req.params.id);

        const game = await UserGame.findOne({
            where: {
                id: libraryGameId,
                userId,
            },
        });

        if (!game) {
            return res.status(404).json({
                message: "Game not found in library",
            });
        }

        await game.destroy();

        return res.json({
            message: "Game removed from library",
        });
    } catch (error) {
        console.error("Remove library game error:", error.message);

        return res.status(500).json({
            message: "Failed to remove game from library",
        });
    }
}

module.exports = {
    getLibrary,
    addGame,
    updateGame,
    removeGame,
};