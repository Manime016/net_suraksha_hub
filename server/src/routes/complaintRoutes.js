
import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/authMiddleware.js";
import Complaint from "../models/Complaint.js";
import {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

// ✅ Improved Multer Storage (Keeps file extensions like .jpg/.png)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// --- USER ROUTES ---
router.post("/", auth, upload.single("evidence"), createComplaint);
router.get("/", auth, getMyComplaints);

// --- ADMIN ROUTES ---
router.get("/admin/all", auth, getAllComplaints);
router.patch("/admin/update/:id", auth, updateComplaintStatus);

// Live Feed for Admin Dashboard
router.get("/admin/live-feed", auth, async (req, res) => {
    try {
        const latestComplaints = await Complaint.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(latestComplaints);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;