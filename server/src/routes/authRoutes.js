import express from "express";
import { login, register } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";
import User from "../models/User.js"
const router = express.Router();

// LOGIN
router.post("/login", login);

// REGISTER
router.post("/register", register);

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("name email role");

    res.json({
        name: user.name,
        email: user.email,
        role: user.role
    });
});
export default router;



