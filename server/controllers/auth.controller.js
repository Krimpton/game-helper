const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

function createToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        }
    );
}

function setAuthCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

async function register(req, res) {
    try {
        const username = req.body.username?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }

        if (username.length < 3) {
            return res.status(400).json({
                message: "Username must be at least 3 characters long",
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Please provide a valid email address",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username },
                ],
            },
        });

        if (existingUser?.email === email) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        if (existingUser?.username === username) {
            return res.status(409).json({
                message: "Username is already taken",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            passwordHash,
        });

        const token = createToken(user);
        setAuthCookie(res, token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Registration error:", error.message);

        return res.status(500).json({
            message: "Registration failed",
        });
    }
}

async function login(req, res) {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = createToken(user);
        setAuthCookie(res, token);

        return res.json({
            message: "Logged in successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            message: "Login failed",
        });
    }
}

function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    return res.json({
        message: "Logged out successfully",
    });
}

function me(req, res) {
    return res.json({
        user: req.user,
    });
}

module.exports = {
    register,
    login,
    logout,
    me,
};