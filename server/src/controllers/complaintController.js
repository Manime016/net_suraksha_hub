// import Complaint from "../models/Complaint.js";

// export const createComplaint = async (req, res) => {
//     try {
//         // 1. Destructure incidentDate from req.body
//         const { type, description, incidentDate } = req.body;

//         const newComplaint = new Complaint({
//             complaintId: `NSH-${Math.floor(1000 + Math.random() * 9000)}`,
//             userId: req.user.id, // Matches authMiddleware req.user
//             type,
//             description,
//             incidentDate,
//             evidence: req.file ? req.file.path : null,
//             status: "Pending" // Explicitly set to match Schema and Frontend
//         });

//         await newComplaint.save();
//         res.status(201).json(newComplaint);
//     } catch (error) {
//         console.error("Backend Error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getMyComplaints = async (req, res) => {
//     try {
//         // 2. Query using userId to match your Schema
//         const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
//         res.json(complaints);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching complaints" });
//     }
// };
// export const getAllComplaints = async (req, res) => {
//     try {
//         const complaints = await Complaint.find()
//             .populate("userId", "name email")
//             .sort({ createdAt: -1 });
//         res.json(complaints);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch complaints" });
//     }
// };

// export const updateComplaintStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const { id } = req.params;

//         const updated = await Complaint.findByIdAndUpdate(
//             id,
//             { status },
//             { new: true }
//         );
//         res.json(updated);
//     } catch (error) {
//         res.status(500).json({ message: "Status update failed" });
//     }
// };


import Complaint from "../models/Complaint.js";
import path from "path";

/**
 * @desc Create a new complaint with local file upload
 */
export const createComplaint = async (req, res) => {
    try {
        const { type, description, incidentDate } = req.body;

        const newComplaint = new Complaint({
            // Generates a unique tracking ID
            complaintId: `NSH-${Math.floor(1000 + Math.random() * 9000)}`,
            userId: req.user.id,
            type,
            description,
            incidentDate,
            // req.file.path stores local path (e.g., 'uploads/image.jpg')
            evidence: req.file ? req.file.path : null,
            status: "Pending"
        });

        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "System failure during incident logging." });
    }
};

/**
 * @desc Get only the complaints belonging to the logged-in user
 */
export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId: req.user.id })
            .sort({ createdAt: -1 }); // Newest first
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve personal archives." });
    }
};

/**
 * @desc Get ALL complaints (For Admin Dashboard)
 */
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("userId", "name email") // Attaches user details to the complaint
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch global ledger." });
    }
};

/**
 * @desc Update status (Admin function to resolve or review cases)
 */
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body; // Expecting "In Review", "Resolved", or "Dismissed"
        const { id } = req.params;

        // Validation to ensure status matches your frontend/schema exactly
        const validStatuses = ["Pending", "In Review", "Resolved", "Dismissed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status state." });
        }

        const updated = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Returns the document AFTER the update
        );

        if (!updated) {
            return res.status(404).json({ message: "Complaint record not found." });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Operational failure during status transition." });
    }
};