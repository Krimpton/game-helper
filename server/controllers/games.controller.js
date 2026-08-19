const {
    getGamesFromIgdb,
    getGameDetailsFromIgdb,
} = require("../services/igdb.service");

async function getGames(req, res) {
    try {
        const data = await getGamesFromIgdb(req.query);

        return res.json({
            count: data.results.length,
            page: Number(req.query.page) || 1,
            results: data.results,
        });
    } catch (error) {
        console.error(
            "IGDB games error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            message: "Failed to fetch games",
        });
    }
}

async function getGameDetails(req, res) {
    try {
        const { id } = req.params;

        const game = await getGameDetailsFromIgdb(id);

        if (!game) {
            return res.status(404).json({
                message: "Game not found",
            });
        }

        return res.json(game);
    } catch (error) {
        console.error(
            "IGDB game details error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            message: "Failed to fetch game details",
        });
    }
}

module.exports = {
    getGames,
    getGameDetails,
};