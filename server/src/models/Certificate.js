// import mongoose from "mongoose";

// const certificateSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//     testResultId: { type: mongoose.Schema.Types.ObjectId, ref: "TestResult" },

//     status: {
//         type: String,
//         enum: ["PENDING", "APPROVED"],
//         default: "PENDING"
//     },

//     issuedAt: Date
// }, { timestamps: true });

// export default mongoose.model("Certificate", certificateSchema);

// models/Certificate.js
// import mongoose from "mongoose";

// const certificateSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//     testResultId: { type: mongoose.Schema.Types.ObjectId, ref: "TestResult" },
//     status: {
//         type: String,
//         enum: ["PENDING", "APPROVED"],
//         default: "PENDING"
//     }
// }, { timestamps: true });

// export default mongoose.model("Certificate", certificateSchema);

import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
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
        testResultId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestResult",
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING"
        },
        issuedAt: Date
    },
    { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
