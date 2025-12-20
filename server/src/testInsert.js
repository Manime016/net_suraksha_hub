import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
    name: "Test User",
    email: "test@test.com",
    password: "123456",
    role: "user",
});

console.log("User inserted ✅");
process.exit();
