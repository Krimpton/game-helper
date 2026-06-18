const express = require("express");
const {
    getGames,
    getGameDetails,
} = require("../controllers/games.controller");

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGameDetails);

module.exports = router;