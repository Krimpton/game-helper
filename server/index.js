const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { sequelize } = require("./models");
const gamesRoutes = require("./routes/games.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();

// Middleware должны быть до routes
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/chat", chatRoutes);


// Проверка сервера
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// Routes
app.use("/api/games", gamesRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync();
        console.log("Database synced");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to database:", error.message);
    }
}

startServer();