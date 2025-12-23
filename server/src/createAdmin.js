import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();


const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // CHANGE THESE 👇
        const adminEmail = "admin@netsuraksha.com";
        const adminPassword = "Admin@123";

        // Check if admin already exists
        const exists = await User.findOne({ email: adminEmail });
        if (exists) {
            console.log("⚠️ Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.create({
            name: "System Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Admin created successfully");
        console.log("📧 Email:", adminEmail);
        console.log("🔑 Password:", adminPassword);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
