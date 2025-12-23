// import Course from "../models/Course.js";
// import TestResult from "../models/TestResult.js";

// export const submitTest = async (req, res) => {
//     try {
//         const { courseId, answers } = req.body;
//         const userId = req.user.id;

//         // 1️⃣ Fetch course
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ message: "Course not found" });
//         }

//         // 2️⃣ Collect all questions
//         const questions = [];
//         course.modules.forEach(module => {
//             if (module.questions) {
//                 module.questions.forEach(q => questions.push(q));
//             }
//         });

//         if (questions.length === 0) {
//             return res.status(400).json({ message: "No test questions found" });
//         }

//         // 3️⃣ Calculate score
//         let score = 0;

//         questions.forEach(q => {
//             const userAnswer = answers[q._id.toString()];
//             const correctAnswer = Number(q.correct);

//             if (Number(userAnswer) === correctAnswer) {
//                 score++;
//             }

//         });


//         const total = questions.length;
//         const percentage = Math.round((score / total) * 100);
//         const passed = percentage >= 80;

//         // 4️⃣ Save result
//         const result = await TestResult.create({
//             userId,
//             courseId,
//             score,
//             total,
//             percentage,
//             passed
//         });

//         // 5️⃣ Return result
//         res.json(result);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Test submission failed" });
//     }
// };

import Course from "../models/Course.js";
import TestResult from "../models/TestResult.js";
import Certificate from "../models/Certificate.js";

export const submitTest = async (req, res) => {
    try {
        const { courseId, answers } = req.body;
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // collect all questions
        const questions = [];
        course.modules.forEach(m => {
            m.questions?.forEach(q => questions.push(q));
        });

        if (questions.length === 0) {
            return res.status(400).json({ message: "No test questions found" });
        }

        let score = 0;

        questions.forEach(q => {
            if (Number(answers[q._id]) === Number(q.correct)) {
                score++;
            }
        });

        const total = questions.length;
        const percentage = Math.round((score / total) * 100);
        const passed = percentage >= 80;

        // save test result
        const result = await TestResult.create({
            userId,
            courseId,
            score,
            total,
            percentage,
            passed
        });

        // 🔥 CREATE CERTIFICATE IF PASSED
        if (passed) {
            await Certificate.create({
                userId,
                courseId,
                testResultId: result._id,
                status: "PENDING"
            });
        }

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Test submission failed" });
    }
};
