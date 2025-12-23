import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
    ShieldCheck, Clock, ExternalLink, Search,
    RefreshCcw, AlertCircle, CheckCircle2, Activity,
    X, ImageIcon, Calendar, FileText, User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ManageComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null); // To show details

    const API_BASE_URL = "http://localhost:5000";

    const fetchComplaints = useCallback(async (quiet = false) => {
        if (!quiet) setLoading(true);
        setIsRefreshing(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/complaints/admin/all`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setComplaints(res.data);
        } catch (err) {
            console.error("Fetch failed", err);
        } finally {
            setLoading(false);
            setTimeout(() => setIsRefreshing(false), 600);
        }
    }, []);

    useEffect(() => {
        fetchComplaints();
        const interval = setInterval(() => fetchComplaints(true), 30000);
        return () => clearInterval(interval);
    }, [fetchComplaints]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/api/complaints/admin/update/${id}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
            if (selectedComplaint?._id === id) {
                setSelectedComplaint({ ...selectedComplaint, status: newStatus });
            }
        } catch (err) {
            alert("Update failed");
        }
    };

    const filteredComplaints = complaints.filter(c =>
        c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-6 md:p-10 font-sans">
            {/* Custom Scrollbar Styling */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #ef4444; border-radius: 10px; }
            `}</style>

            <div className="max-w-7xl mx-auto">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-red-500">
                            <ShieldCheck size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Internal Security Command</span>
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Platform <span className="text-red-500 underline decoration-red-500/20">Incidents</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-grow md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search Case ID or User..."
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500/50 transition-all text-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => fetchComplaints(false)}
                            className="p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-red-500/50 transition-all group"
                        >
                            <RefreshCcw size={20} className={`text-slate-500 group-hover:text-red-500 ${isRefreshing ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* --- TABLE --- */}
                <div className="bg-slate-900/20 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-500">
                            <tr>
                                <th className="p-6">Case Details</th>
                                <th className="p-6">Reporter</th>
                                <th className="p-6">Control</th>
                                <th className="p-6 text-right">Review</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredComplaints.map((c) => (
                                <tr key={c._id} className="hover:bg-white/[0.02] transition-all cursor-pointer group" onClick={() => setSelectedComplaint(c)}>
                                    <td className="p-6">
                                        <div className="text-white font-bold text-sm tracking-widest group-hover:text-red-500 transition-colors">{c.complaintId}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-black">{c.type}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-slate-300 font-bold text-sm">{c.userId?.name || "Anonymous"}</div>
                                        <div className="text-[10px] text-slate-600 font-mono">{c.userId?.email}</div>
                                    </td>
                                    <td className="p-6" onClick={(e) => e.stopPropagation()}>
                                        <select
                                            value={c.status}
                                            onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                            className={`bg-slate-950 text-[10px] font-black uppercase outline-none px-3 py-2 border border-white/10 rounded-xl
                                                ${c.status === "Resolved" ? "text-emerald-500" : c.status === "In Review" ? "text-amber-500" : "text-blue-500"}`}
                                        >
                                            <option value="Submitted">Submitted</option>
                                            <option value="In Review">In Review</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="p-3 hover:bg-red-500/10 hover:text-red-500 rounded-xl text-slate-600 transition-all">
                                            <ExternalLink size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- ADMIN DETAIL MODAL --- */}
            <AnimatePresence>
                {selectedComplaint && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedComplaint(null)} className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">

                            {/* Modal Header */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <div>
                                    <p className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Incident Evidence Review</p>
                                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">{selectedComplaint.complaintId}</h2>
                                </div>
                                <button onClick={() => setSelectedComplaint(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-500 transition-colors"><X size={24} /></button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">

                                {/* Image Review */}
                                {/* {selectedComplaint.evidence ? (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <ImageIcon size={14} className="text-red-500" /> Attached Evidence
                                        </p>
                                        <div className="rounded-2xl overflow-hidden border border-white/5 bg-slate-950 p-2">
                                            <img
                                                src={`${API_BASE_URL}/${selectedComplaint.evidence.replace(/\\/g, '/')}`}
                                                alt="Evidence"
                                                className="w-full h-auto max-h-96 object-contain rounded-xl"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-10 border border-dashed border-white/5 rounded-3xl text-center bg-slate-950/30">
                                        <p className="text-[10px] font-black text-slate-700 uppercase">No Image Evidence Provided</p>
                                    </div>
                                )} */}

                                {/* Reporter Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1 flex items-center gap-2"><User size={12} /> Filed By</p>
                                        <p className="text-white font-bold">{selectedComplaint.userId?.name}</p>
                                        <p className="text-[10px] text-slate-500 font-mono">{selectedComplaint.userId?.email}</p>
                                    </div>
                                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1 flex items-center gap-2"><Calendar size={12} /> Incident Date</p>
                                        <p className="text-white font-bold">{new Date(selectedComplaint.incidentDate || selectedComplaint.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Statement */}
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2"><FileText size={12} /> Official Statement</p>
                                    <div className="bg-slate-950/50 p-6 rounded-2xl border-l-2 border-red-500 text-slate-300 italic text-sm">
                                        "{selectedComplaint.description}"
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer - Quick Status Change */}
                            <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                                <div className="text-[10px] font-black text-slate-500 uppercase">Change Status:</div>
                                <div className="flex gap-2">
                                    {["In Review", "Resolved"].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedComplaint._id, status)}
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all 
                                                ${selectedComplaint.status === status
                                                    ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                                    : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageComplaints;