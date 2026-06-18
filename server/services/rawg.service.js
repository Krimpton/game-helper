const axios = require("axios");

const RAWG_BASE_URL = process.env.RAWG_BASE_URL;
const RAWG_API_KEY = process.env.RAWG_API_KEY;

async function getGamesFromRawg(query) {
    const response = await axios.get(`${RAWG_BASE_URL}/games`, {
        params: {
            key: RAWG_API_KEY,
            page: query.page || 1,
            page_size: query.page_size || 12,
            search: query.search || undefined,
            genres: query.genres || undefined,
            platforms: query.platforms || undefined,
        },
    });

    return response.data;
}

async function getGameDetailsFromRawg(id) {
    const response = await axios.get(`${RAWG_BASE_URL}/games/${id}`, {
        params: {
            key: RAWG_API_KEY,
        },
    });

    return response.data;
}

module.exports = {
    getGamesFromRawg,
    getGameDetailsFromRawg,
};