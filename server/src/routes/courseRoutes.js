import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
    getCourses,
    completeChapter,
    createCourse
} from "../controllers/courseController.js";
import { addQuestions } from "../controllers/courseController.js";

const router = express.Router();

router.get("/", auth, getCourses);
router.post("/", auth, createCourse);              // create course
router.post("/complete-chapter", auth, completeChapter);
router.post("/add-questions", auth, addQuestions);


export default router;




