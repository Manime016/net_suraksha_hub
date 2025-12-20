import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";



const app = express();

// Middlewares
app.use(express.json());  // ← THIS IS REQUIRED
app.use(cors());

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.get("/api/auth/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// Health check
app.get("/", (req, res) => {
    res.send("Backend running ✅");
});

export default app;
