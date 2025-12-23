import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    complaintId: { type: String, unique: true }, // Unique Tracking ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // From frontend "Incident Type"
    incidentDate: { type: String },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "In Review", "Resolved", "Dismissed"], // Change 'Submitted' to 'Pending'
        default: "Pending"
    }
}, { timestamps: true });
export default mongoose.model("Complaint", complaintSchema);