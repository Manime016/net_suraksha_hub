import express from "express";
import auth from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getUserProgress } from "../controllers/userController.js";

const router = express.Router();

/* ================= USER DASHBOARD ================= */
router.get(
    "/dashboard",
    auth,
    roleMiddleware("user"),
    (req, res) => {
        res.json({
            message: "Welcome User",
            userId: req.user.id
        });
    }
);

/* ================= USER COURSE PROGRESS ================= */
router.get(
    "/progress/:courseId",
    auth,
    getUserProgress
);

export default router;
