import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        progress: { type: Number, default: 0 },
        eligibleForTest: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
