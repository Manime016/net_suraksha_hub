import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },

    score: Number,
    total: Number,
    percentage: Number,
    passed: Boolean
}, { timestamps: true });

export default mongoose.model("TestResult", testResultSchema);
