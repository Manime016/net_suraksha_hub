import UserProgress from "../models/UserProgress.js";

export const getUserProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params;

        const progress = await UserProgress.findOne({ userId, courseId });

        if (!progress) {
            return res.json({ completedChapters: [] });
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch progress" });
    }
};
