const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const { sequelize } = require("./models");

const gamesRoutes = require("./routes/games.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const usersRoutes = require("./routes/users.routes");
const friendsRoutes = require("./routes/friends.routes");
const privateChatRoutes = require("./routes/privateChat.routes");
const libraryRoutes = require("./routes/library.routes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

// Middleware должны быть до routes
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/friends", friendsRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/private-chat", privateChatRoutes);
app.use("/api/library", libraryRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
    });
});

// Socket.IO
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync();
        console.log("Database synced");

        server.listen(PORT, () => {
            console.log(
                `Server is running on http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "Unable to connect to database:",
            error.message
        );
    }
}

startServer();