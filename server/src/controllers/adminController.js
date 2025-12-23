
// // import User from "../models/User.js";
// // import Certificate from "../models/Certificate.js";
// // import TestResult from "../models/TestResult.js";

// // // This function gets all users to show in the notification feed
// // export const getAllUsers = async (req, res) => {
// //     try {
// //         const users = await User.find().select("-password").sort({ createdAt: -1 });
// //         res.status(200).json(users);
// //     } catch (error) {
// //         res.status(500).json({ message: "Error fetching users", error: error.message });
// //     }
// // };


// // export const getAdminDashboard = async (req, res) => {
// //     try {
// //         // Only count documents where role is 'user'
// //         const totalUsers = await User.countDocuments({ role: "user" });

// //         res.json({
// //             totalUsers
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error fetching user count" });
// //     }
// // };

// // export const approveCertificate = async (req, res) => {
// //     try {
// //         const { testResultId } = req.body;

// //         // 1️⃣ Fetch test result
// //         const testResult = await TestResult.findById(testResultId);
// //         if (!testResult) {
// //             return res.status(404).json({ message: "Test result not found" });
// //         }

// //         // 2️⃣ Check if user passed
// //         if (!testResult.passed) {
// //             return res.status(400).json({
// //                 message: "User has not passed the test"
// //             });
// //         }

// //         // 3️⃣ Check if certificate already exists
// //         let certificate = await Certificate.findOne({
// //             userId: testResult.userId,
// //             courseId: testResult.courseId
// //         });

// //         if (!certificate) {
// //             certificate = await Certificate.create({
// //                 userId: testResult.userId,
// //                 courseId: testResult.courseId,
// //                 testResultId: testResult._id,
// //                 status: "APPROVED",
// //                 issuedAt: new Date()
// //             });
// //         } else {
// //             certificate.status = "APPROVED";
// //             certificate.issuedAt = new Date();
// //             await certificate.save();
// //         }

// //         res.json({
// //             message: "Certificate approved",
// //             certificate
// //         });

// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Certificate approval failed" });
// //     }
// // };
// import User from "../models/User.js";
// import Certificate from "../models/Certificate.js";
// import TestResult from "../models/TestResult.js";

// /* USERS */
// export const getAllUsers = async (req, res) => {
//     const users = await User.find().select("-password");
//     res.json(users);
// };

// /* DASHBOARD */
// export const getAdminDashboard = async (req, res) => {
//     const totalUsers = await User.countDocuments({ role: "user" });
//     res.json({ totalUsers });
// };

// /* 🔔 FETCH PENDING CERTIFICATES */
// // ✅ GET ALL PASSED TESTS WAITING FOR CERTIFICATE
// // export const getPendingCertificates = async (req, res) => {
// //     try {
// //         const results = await TestResult.find({
// //             passed: true
// //         })
// //             .populate("userId", "name email")
// //             .populate("courseId", "title")
// //             .sort({ createdAt: -1 });

// //         // remove ones already approved
// //         const pending = [];

// //         for (let r of results) {
// //             const cert = await Certificate.findOne({
// //                 testResultId: r._id
// //             });

// //             if (!cert) {
// //                 pending.push(r);
// //             }
// //         }

// //         res.json(pending);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Failed to fetch pending certificates" });
// //     }
// // };


// // /* ✅ APPROVE CERTIFICATE */
// // export const approveCertificate = async (req, res) => {
// //     const { testResultId } = req.body;

// //     const testResult = await TestResult.findById(testResultId);
// //     if (!testResult || !testResult.passed) {
// //         return res.status(400).json({ message: "User not eligible" });
// //     }

// //     const cert = await Certificate.findOne({
// //         userId: testResult.userId,
// //         courseId: testResult.courseId
// //     });

// //     cert.status = "APPROVED";
// //     cert.issuedAt = new Date();
// //     await cert.save();

// //     res.json({ message: "Certificate approved" });
// // };

// // export const getPendingCertificates = async (req, res) => {
// //     try {
// //         const certificates = await Certificate.find({ status: "PENDING" })
// //             .populate({
// //                 path: "testResultId",
// //                 populate: [
// //                     { path: "userId", select: "name email" },
// //                     { path: "courseId", select: "title" }
// //                 ]
// //             });

// //         const result = certificates
// //             .filter(c => c.testResultId && c.testResultId.courseId)
// //             .map(c => ({
// //                 _id: c.testResultId._id,
// //                 percentage: c.testResultId.percentage,
// //                 score: c.testResultId.score,
// //                 user: c.testResultId.userId,
// //                 course: c.testResultId.courseId
// //             }));

// //         res.json(result);
// //     } catch (err) {
// //         res.status(500).json({ message: "Failed to load pending certificates" });
// //     }
// // };


// // export const rejectCertificate = async (req, res) => {
// //     try {
// //         const { testResultId } = req.body;

// //         const certificate = await Certificate.findOne({ testResultId });
// //         if (!certificate) {
// //             return res.status(404).json({ message: "Certificate not found" });
// //         }

// //         certificate.status = "REJECTED";
// //         await certificate.save();

// //         res.json({ message: "Certificate rejected" });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Reject failed" });
// //     }
// // };


// // import Certificate from "../models/Certificate.js";

// /* ================= ADMIN: PENDING CERTIFICATES ================= */
// // export const getPendingCertificates = async (req, res) => {
// //     try {
// //         const pending = await Certificate.find({ status: "PENDING" })
// //             .populate("userId", "name email")
// //             .populate("courseId", "title")
// //             .populate("testResultId", "score total percentage")
// //             .sort({ createdAt: -1 });

// //         const formatted = pending.map(c => ({
// //             _id: c._id,
// //             user: c.userId,
// //             course: c.courseId,
// //             score: c.testResultId?.score || 0,
// //             total: c.testResultId?.total || 0,
// //             percentage: c.testResultId?.percentage || 0
// //         }));

// //         res.json(formatted);
// //     } catch (err) {
// //         res.status(500).json({ message: "Failed to load pending certificates" });
// //     }
// // };

// /* ================= ADMIN: APPROVE ================= */
// export const approveCertificate = async (req, res) => {
//     const { certificateId } = req.body;

//     const cert = await Certificate.findById(certificateId);
//     if (!cert) return res.status(404).json({ message: "Certificate not found" });

//     cert.status = "APPROVED";
//     cert.issuedAt = new Date();
//     await cert.save();

//     res.json({ message: "Certificate approved" });
// };

// /* ================= ADMIN: REJECT ================= */
// export const rejectCertificate = async (req, res) => {
//     const { certificateId } = req.body;

//     const cert = await Certificate.findById(certificateId);
//     if (!cert) return res.status(404).json({ message: "Certificate not found" });

//     cert.status = "REJECTED";
//     await cert.save();

//     res.json({ message: "Certificate rejected" });
// };

// /* ================= ADMIN: GET ALL CERTIFICATES (PENDING & APPROVED) ================= */
// export const getAllCertificates = async (req, res) => {
//     try {
//         // We remove the { status: "PENDING" } filter to get EVERYTHING
//         const allCertificates = await Certificate.find()
//             .populate("userId", "name email")
//             .populate("courseId", "title")
//             .populate("testResultId", "score total percentage")
//             .sort({ createdAt: -1 });

//         const formatted = allCertificates.map(c => ({
//             _id: c._id,
//             user: c.userId,
//             course: c.courseId,
//             status: c.status, // We need this to filter on the frontend
//             score: c.testResultId?.score || 0,
//             total: c.testResultId?.total || 0,
//             percentage: c.testResultId?.percentage || 0
//         }));

//         res.json(formatted);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to load certificates" });
//     }
// };


// export const getPendingCertificates = async (req, res) => {
//     try {
//         // REMOVED { status: "PENDING" } filter so we get everything
//         const allCerts = await Certificate.find()
//             .populate("userId", "name email")
//             .populate("courseId", "title")
//             .populate("testResultId", "score total percentage")
//             .sort({ createdAt: -1 });

//         const formatted = allCerts.map(c => ({
//             _id: c._id,
//             user: c.userId,
//             course: c.courseId,
//             status: c.status, // THIS IS NOW INCLUDED
//             score: c.testResultId?.score || 0,
//             total: c.testResultId?.total || 0,
//             percentage: c.testResultId?.percentage || 0
//         }));

//         res.json(formatted);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to load certificates" });
//     }
// };



// // // Add this to adminController.js
// // export const getApprovedCertificates = async (req, res) => {
// //     try {
// //         const approved = await Certificate.find({ status: "APPROVED" })
// //             .populate("userId", "name email")
// //             .populate("courseId", "title")
// //             .populate("testResultId", "score total percentage")
// //             .sort({ updatedAt: -1 }); // Show most recently approved first

// //         const formatted = approved.map(c => ({
// //             _id: c._id,
// //             user: c.userId,
// //             course: c.courseId,
// //             status: c.status,
// //             score: c.testResultId?.score || 0,
// //             total: c.testResultId?.total || 0,
// //             percentage: c.testResultId?.percentage || 0
// //         }));

// //         res.json(formatted);
// //     } catch (err) {
// //         res.status(500).json({ message: "Failed to load approved vault" });
// //     }
// // };

// // export const getPendingCertificates = async (req, res) => {
// //     try {
// //         // We removed { status: "PENDING" } so it finds BOTH Pending and Approved
// //         const certificates = await Certificate.find()
// //             .populate("userId", "name email")
// //             .populate("courseId", "title")
// //             .populate("testResultId", "score total percentage")
// //             .sort({ updatedAt: -1 }); // Show most recent changes first

// //         const formatted = certificates.map(c => ({
// //             _id: c._id,
// //             user: c.userId,
// //             course: c.courseId,
// //             status: c.status, // THIS IS CRITICAL: The frontend needs this to show the student in the Approved tab
// //             score: c.testResultId?.score || 0,
// //             total: c.testResultId?.total || 0,
// //             percentage: c.testResultId?.percentage || 0
// //         }));

// //         res.json(formatted);
// //     } catch (err) {
// //         res.status(500).json({ message: "Failed to load certificates" });
// //     }
// // };


import User from "../models/User.js";
import Certificate from "../models/Certificate.js";
import TestResult from "../models/TestResult.js";
import bcrypt from "bcryptjs";

/* ================= USERS ================= */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

/* ================= DASHBOARD ================= */
export const getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
};

/* ================= FETCH ALL CERTIFICATES (PENDING & APPROVED) ================= */
export const getPendingCertificates = async (req, res) => {
    try {
        // Fetch ALL so frontend can toggle between tabs without re-fetching
        const allCerts = await Certificate.find()
            .populate("userId", "name email")
            .populate("courseId", "title")
            .populate("testResultId", "score total percentage")
            .sort({ createdAt: -1 });

        const formatted = allCerts.map(c => ({
            _id: c._id,
            user: c.userId,
            course: c.courseId,
            status: c.status,
            score: c.testResultId?.score || 0,
            total: c.testResultId?.total || 0,
            percentage: c.testResultId?.percentage || 0
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: "Failed to load certificates from database" });
    }
};

/* ================= APPROVE ACTION ================= */
export const approveCertificate = async (req, res) => {
    try {
        const { certificateId } = req.body;

        const cert = await Certificate.findById(certificateId);
        if (!cert) return res.status(404).json({ message: "Certificate not found" });

        cert.status = "APPROVED";
        cert.issuedAt = new Date();
        await cert.save();

        res.json({ message: "Certificate successfully approved" });
    } catch (error) {
        res.status(500).json({ message: "Approval failed" });
    }
};

/* ================= REJECT ACTION ================= */
export const rejectCertificate = async (req, res) => {
    try {
        const { certificateId } = req.body;

        const cert = await Certificate.findById(certificateId);
        if (!cert) return res.status(404).json({ message: "Certificate not found" });

        cert.status = "REJECTED";
        await cert.save();

        res.json({ message: "Certificate rejected" });
    } catch (error) {
        res.status(500).json({ message: "Reject failed" });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create the admin
        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};