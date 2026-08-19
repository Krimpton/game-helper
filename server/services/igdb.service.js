const axios = require("axios");

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
    const now = Date.now();

    if (accessToken && now < tokenExpiresAt) {
        return accessToken;
    }

    const response = await axios.post(
        process.env.TWITCH_TOKEN_URL,
        null,
        {
            params: {
                client_id: process.env.IGDB_CLIENT_ID,
                client_secret: process.env.IGDB_CLIENT_SECRET,
                grant_type: "client_credentials",
            },
        }
    );

    accessToken = response.data.access_token;

    tokenExpiresAt =
        now + (response.data.expires_in - 60) * 1000;

    return accessToken;
}

async function igdbRequest(endpoint, query) {
    const token = await getAccessToken();

    const response = await axios.post(
        `${process.env.IGDB_BASE_URL}/${endpoint}`,
        query,
        {
            headers: {
                "Client-ID": process.env.IGDB_CLIENT_ID,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
        }
    );

    return response.data;
}

function normalizeImage(url) {
    if (!url) {
        return null;
    }

    return `https:${url.replace("t_thumb", "t_cover_big")}`;
}

function normalizeGame(game) {
    return {
        id: game.id,
        title: game.name,

        image: normalizeImage(game.cover?.url),

        rating:
            typeof game.rating === "number"
                ? Number((game.rating / 20).toFixed(1))
                : 0,

        released: game.first_release_date
            ? new Date(game.first_release_date * 1000)
                .toISOString()
                .split("T")[0]
            : null,

        genres:
            game.genres?.map((genre) => genre.name) || [],

        platforms:
            game.platforms?.map(
                (platform) => platform.name
            ) || [],
    };
}

async function getGamesFromIgdb(query = {}) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.page_size) || 12;

    const limit = Math.min(pageSize, 50);
    const offset = (page - 1) * limit;

    let igdbQuery = `
        fields
            name,
            rating,
            total_rating_count,
            first_release_date,
            cover.url,
            genres.name,
            platforms.name;
    `;

    if (query.search) {
        const search = String(query.search).replace(
            /"/g,
            '\\"'
        );

        igdbQuery += `
            search "${search}";
        `;
    } else {
        igdbQuery += `
    where cover != null
            & rating != null
            & total_rating_count >= 20;
    sort total_rating_count desc;
        `;
    }

    igdbQuery += `
        limit ${limit};
        offset ${offset};
    `;

    const games = await igdbRequest(
        "games",
        igdbQuery
    );

    return {
        results: games.map(normalizeGame),
    };
}

async function getGameDetailsFromIgdb(id) {
    const numericId = Number(id);

    if (!numericId) {
        return null;
    }

    const query = `
        fields
            name,
            summary,
            rating,
            total_rating_count,
            first_release_date,
            cover.url,
            genres.name,
            platforms.name,
            websites.url;

        where id = ${numericId};
        limit 1;
    `;

    const games = await igdbRequest("games", query);

    if (!games.length) {
        return null;
    }

    const game = games[0];

    return {
        ...normalizeGame(game),
        description: game.summary || "",
        website: game.websites?.[0]?.url || null,
    };
}

module.exports = {
    getGamesFromIgdb,
    getGameDetailsFromIgdb,
};