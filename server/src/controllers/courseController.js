import Course from "../models/Course.js";
import UserProgress from "../models/UserProgress.js";

// ✅ MUST BE NAMED EXPORT
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};


// export const completeChapter = async (req, res) => {
//     const { courseId, chapterId } = req.body;
//     const userId = req.user.id;

//     // 🛑 SAFETY CHECK 1
//     const course = await Course.findById(courseId);
//     if (!course) {
//         return res.status(404).json({ message: "Course not found" });
//     }

//     let progressDoc = await UserProgress.findOne({ userId, courseId });

//     if (!progressDoc) {
//         progressDoc = await UserProgress.create({
//             userId,
//             courseId,
//             completedChapters: []
//         });
//     }

//     if (!progressDoc.completedChapters.includes(chapterId)) {
//         progressDoc.completedChapters.push(chapterId);
//     }

//     // 🛑 SAFETY CHECK 2
//     const totalChapters = course.modules.reduce(
//         (sum, m) => sum + (m.chapters?.length || 0),
//         0
//     );

//     if (totalChapters === 0) {
//         return res.status(400).json({ message: "No chapters found in course" });
//     }

//     const progress = Math.round(
//         (progressDoc.completedChapters.length / totalChapters) * 100
//     );

//     progressDoc.progress = progress;
//     progressDoc.eligibleForTest = progress >= 75;

//     await progressDoc.save();
//     res.json(progressDoc);
// };


export const completeChapter = async (req, res) => {
    try {
        const { courseId, chapterId } = req.body;
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const totalChapters = course.modules.reduce(
            (sum, m) => sum + (m.chapters?.length || 0),
            0
        );

        let progress = await UserProgress.findOne({ userId, courseId });

        if (!progress) {
            progress = await UserProgress.create({
                userId,
                courseId,
                completedChapters: [chapterId]
            });
        } else {
            if (!progress.completedChapters.includes(chapterId)) {
                progress.completedChapters.push(chapterId);
            }
        }

        progress.progress = Math.round(
            (progress.completedChapters.length / totalChapters) * 100
        );

        progress.eligibleForTest = progress.progress >= 75;

        await progress.save();

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update progress" });
    }
};

export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to create course" });
    }
};

export const addQuestions = async (req, res) => {
    const { courseId, moduleId, questions } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
        return res.status(404).json({ message: "Module not found" });
    }

    module.questions.push(...questions);
    await course.save();

    res.json({ message: "Questions added successfully" });
};





