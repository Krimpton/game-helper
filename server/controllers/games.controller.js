const {
    getGamesFromRawg,
    getGameDetailsFromRawg,
} = require("../services/rawg.service");

async function getGames(req, res) {
    try {
        const data = await getGamesFromRawg(req.query);

        const games = data.results.map((game) => ({
            id: game.id,
            title: game.name,
            image: game.background_image,
            rating: game.rating,
            released: game.released,
            genres: game.genres?.map((genre) => genre.name),
            platforms: game.platforms?.map((item) => item.platform.name),
        }));

        res.json({
            count: data.count,
            page: Number(req.query.page) || 1,
            results: games,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to fetch games" });
    }
}

async function getGameDetails(req, res) {
    try {
        const { id } = req.params;

        const game = await getGameDetailsFromRawg(id);

        res.json({
            id: game.id,
            title: game.name,
            description: game.description_raw,
            image: game.background_image,
            rating: game.rating,
            released: game.released,
            website: game.website,
            genres: game.genres?.map((genre) => genre.name),
            platforms: game.platforms?.map((item) => item.platform.name),
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to fetch game details" });
    }
}

module.exports = {
    getGames,
    getGameDetails,
};