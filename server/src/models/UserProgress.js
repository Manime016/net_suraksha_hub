// import mongoose from "mongoose";

// const userProgressSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },

//     completedChapters: [String],
//     progress: { type: Number, default: 0 },
//     eligibleForTest: { type: Boolean, default: false }
// }, { timestamps: true });

// export default mongoose.model("UserProgress", userProgressSchema);


import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        completedChapters: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ],
        progress: {
            type: Number,
            default: 0
        },
        eligibleForTest: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("UserProgress", userProgressSchema);
