import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // 2. Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // 4. Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Send response
        res.json({
            token,
            role: user.role,
            name: user.name
        });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user (role = user by default)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        // 5. Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 6. Send response
        res.status(201).json({
            token,
            role: user.role,
            name: user.name
        });


    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
