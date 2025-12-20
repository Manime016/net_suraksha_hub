import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Registration
router.post("/register", register);

// Login
router.post("/login", login);

// Protected route
router.get("/profile", protect, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// Temporary route to list users (for testing)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
