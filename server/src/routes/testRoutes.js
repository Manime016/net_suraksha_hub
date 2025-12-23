import express from "express";
import auth from "../middleware/authMiddleware.js";
import { submitTest } from "../controllers/testController.js";

const router = express.Router();
router.post("/submit", auth, submitTest);

export default router;
