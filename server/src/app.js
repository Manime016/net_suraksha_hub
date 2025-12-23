import express from "express";
import cors from "cors";
import path from "path"; // Add this
import { fileURLToPath } from "url"; // Add this
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// 🛠️ FIX 1: Make uploads folder accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/courses", courseRoutes);


export default app;
