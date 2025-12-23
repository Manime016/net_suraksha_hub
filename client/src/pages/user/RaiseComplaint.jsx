import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Upload, Send, Lock, File, X, CheckCircle } from "lucide-react";
import complaintService from "../../services/complaintService";
import axios from "axios";

const RaiseComplaint = () => {
    // 1. State Management
    const [formData, setFormData] = useState({
        type: "Financial Fraud",
        incidentDate: "",
        description: "",
    });
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // 2. Handle Text Inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Drag & Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // 4. Submit to Backend using Service
    // 4. Submit to Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append("type", formData.type);
        data.append("incidentDate", formData.incidentDate);
        data.append("description", formData.description);

        // This name "evidence" MUST match upload.single("evidence") in your backend routes
        if (file) {
            data.append("evidence", file);
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/complaints",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );



            // Trigger the success toast
            setShowSuccess(true);

            // Reset form fields
            setFormData({
                type: "Financial Fraud",
                incidentDate: "",
                description: "",
            });
            setFile(null);

            // Hide success toast after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (err) {
            console.error("Frontend Error:", err);
            // Updated error message for Cloudinary setup
            alert(err.response?.data?.message || "Cloud submission failed. Please check your internet or file size.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 flex">
            <div className="flex-1 p-10 relative">

                {/* Success Toast Overlay */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="absolute top-10 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                        >
                            <CheckCircle size={20} /> REPORT SUBMITTED SUCCESSFULLY
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Incident Reporting</h1>
                            <p className="text-slate-500 text-sm italic">SECURE CHANNEL ACTIVE</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">

                        {/* Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Incident Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-emerald-500 outline-none"
                                    required
                                >
                                    <option>Financial Fraud</option>
                                    <option>Identity Theft</option>
                                    <option>Social Media Harassment</option>
                                    <option>Data Breach</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date of Incident</label>
                                <input
                                    type="date"
                                    name="incidentDate"
                                    value={formData.incidentDate}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-emerald-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-emerald-500 outline-none"
                                placeholder="Provide as much detail as possible..."
                                required
                            />
                        </div>

                        {/* DRAG & DROP ZONE */}
                        {/* <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('fileInput').click()}
                            className={`border-2 border-dashed rounded-[1.5rem] p-10 flex flex-col items-center justify-center transition-all cursor-pointer 
                                ${isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-slate-950/30 hover:border-emerald-500/50'}`}
                        >
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileSelect} />

                            {file ? (
                                <div className="flex items-center gap-3 bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                                    <File className="text-emerald-500" />
                                    <span className="text-sm font-bold text-white">{file.name}</span>
                                    <X className="text-red-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); setFile(null); }} size={18} />
                                </div>
                            ) : (
                                <>
                                    <Upload className={`${isDragging ? 'text-emerald-400' : 'text-slate-600'} mb-4`} size={40} />
                                    <p className="text-sm font-bold text-slate-500">Drag evidence files here or <span className="text-emerald-500">Browse</span></p>
                                </>
                            )}
                        </div> */}

                        {/* Footer / Submit */}
                        <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Lock className="text-emerald-500" size={18} />
                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest tracking-tighter">Encrypted Channel</span>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-3 bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-lg flex items-center gap-2 transition-all 
                                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'}`}
                            >
                                {isSubmitting ? "Processing..." : "SUBMIT REPORT"} <Send size={16} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default RaiseComplaint;