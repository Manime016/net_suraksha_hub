import express from "express"; // Import ONLY ONCE
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

// Ensure this path is correct based on where your functions live!
import {
    getMyCertificates,
    getPendingCertificates,
    approveCertificate,
    rejectCertificate
} from "../controllers/certificateController.js";

const router = express.Router();

/* --- ROUTES --- */
router.get("/my", auth, getMyCertificates);
router.get("/pending-certificates", auth, role("admin"), getPendingCertificates);
router.post("/approve-certificate", auth, role("admin"), approveCertificate);
router.post("/reject-certificate", auth, role("admin"), rejectCertificate);

export default router;