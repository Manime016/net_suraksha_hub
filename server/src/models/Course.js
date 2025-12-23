// import mongoose from "mongoose";

// // 🔹 Chapter schema
// const chapterSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });

// // 🔹 Module schema
// const moduleSchema = new mongoose.Schema({
//     name: String,
//     chapters: [chapterSchema]
// });

// // 🔹 Course schema (EXTENDED, NOT BROKEN)
// const courseSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     duration: String,

//     // 🔽 NEW FOR LMS
//     modules: [moduleSchema],
//     published: { type: Boolean, default: true }

// }, { timestamps: true });

// export default mongoose.model("Course", courseSchema);


import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: String,
    content: String
});

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correct: Number
});

const moduleSchema = new mongoose.Schema({
    name: String,
    chapters: [chapterSchema],
    questions: [questionSchema]   // ✅ ADD THIS
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    modules: [moduleSchema],
    published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
