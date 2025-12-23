// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     CheckCircle2, Clock, AlertCircle, X, Calendar,
//     FileText, Image as ImageIcon, Eye, Search,
//     ShieldCheck, Activity, RefreshCcw
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const ComplaintStatus = () => {
//     const [cases, setCases] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [selectedCase, setSelectedCase] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");

//     const API_BASE_URL = "http://localhost:5000";

//     // --- 1. FETCH DATA FUNCTION ---
//     const fetchMyComplaints = async (quiet = false) => {
//         if (!quiet) setLoading(true);
//         else setIsRefreshing(true);

//         try {
//             const response = await axios.get(`${API_BASE_URL}/api/complaints`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//             });
//             setCases(response.data);
//         } catch (error) {
//             console.error("Fetch error:", error);
//         } finally {
//             setLoading(false);
//             setTimeout(() => setIsRefreshing(false), 600);
//         }
//     };

//     useEffect(() => {
//         fetchMyComplaints();
//     }, []);

//     // --- 2. THEME ENGINE ---
//     const getStatusTheme = (status) => {
//         switch (status) {
//             case "Resolved": return {
//                 color: "text-emerald-500",
//                 bg: "bg-emerald-500/10",
//                 border: "border-emerald-500/20",
//                 icon: <CheckCircle2 size={24} />,
//                 label: "OFFICIAL DECISION: CASE RESOLVED"
//             };
//             case "In Review": return {
//                 color: "text-amber-500",
//                 bg: "bg-amber-500/10",
//                 border: "border-amber-500/20",
//                 icon: <Activity size={24} className="animate-pulse" />,
//                 label: "ADMIN STATUS: UNDER ACTIVE REVIEW"
//             };
//             default: return {
//                 color: "text-blue-500",
//                 bg: "bg-blue-500/10",
//                 border: "border-blue-500/20",
//                 icon: <Clock size={24} />,
//                 label: "STATUS: AWAITING ADMINISTRATIVE ACTION"
//             };
//         }
//     };

//     const filteredCases = cases.filter(c =>
//         c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         c.type.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-[#020617] text-slate-300 p-6 md:p-10 font-sans selection:bg-emerald-500/30">
//             {/* Custom Scrollbar Styles */}
//             <style>{`
//                 .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//                 .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//                 .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
//                 .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
//             `}</style>

//             <div className="max-w-5xl mx-auto">
//                 {/* --- TOP BAR --- */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
//                     <div>
//                         <div className="flex items-center gap-2 mb-2 text-emerald-500">
//                             <ShieldCheck size={18} />
//                             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Personal Case Ledger</span>
//                         </div>
//                         <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Status Center</h1>
//                     </div>

//                     <div className="flex flex-col items-end gap-2 w-full md:w-auto">
//                         {/* Timestamp of last refresh */}
//                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mr-2">
//                             System Sync: {new Date().toLocaleTimeString()}
//                         </span>

//                         <div className="relative w-full md:w-96 flex items-center gap-2">
//                             {/* Search Input */}
//                             <div className="relative flex-grow">
//                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                                 <input
//                                     type="text"
//                                     placeholder="SEARCH CASE ID..."
//                                     className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-black tracking-widest focus:outline-none focus:border-emerald-500/50 transition-all text-white"
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>

//                             {/* --- REFRESH BUTTON (Now on the right) --- */}
//                             <button
//                                 onClick={() => fetchMyComplaints(true)}
//                                 disabled={isRefreshing}
//                                 title="Refresh Ledger"
//                                 className="p-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-emerald-500/50 hover:bg-slate-800 transition-all group active:scale-90"
//                             >
//                                 <RefreshCcw
//                                     size={18}
//                                     className={`text-slate-500 group-hover:text-emerald-500 transition-colors ${isRefreshing ? "animate-spin" : ""}`}
//                                 />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- RECORDS GRID --- */}
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center p-20 gap-4">
//                         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
//                         <p className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Syncing with Mainframe...</p>
//                     </div>
//                 ) : (
//                     <div className="grid gap-4">
//                         {filteredCases.map((c) => (
//                             <motion.div
//                                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                                 key={c._id}
//                                 onClick={() => setSelectedCase(c)}
//                                 className="group bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all cursor-pointer relative overflow-hidden"
//                             >
//                                 <div className="flex items-center gap-6">
//                                     <div className={`p-4 rounded-xl border ${getStatusTheme(c.status).border} ${getStatusTheme(c.status).color}`}>
//                                         {getStatusTheme(c.status).icon}
//                                     </div>
//                                     <div>
//                                         <div className="flex items-center gap-3">
//                                             <h3 className="text-white font-bold tracking-widest text-sm uppercase">#{c.complaintId}</h3>
//                                             <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase ${getStatusTheme(c.status).color} ${getStatusTheme(c.status).border}`}>
//                                                 {c.status}
//                                             </span>
//                                         </div>
//                                         <p className="text-[10px] text-slate-500 uppercase font-black mt-1">{c.type}</p>
//                                     </div>
//                                 </div>
//                                 <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-all">
//                                     <Eye size={18} className="text-slate-400 group-hover:text-white" />
//                                 </div>
//                             </motion.div>
//                         ))}
//                         {filteredCases.length === 0 && (
//                             <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-white/5">
//                                 <AlertCircle className="mx-auto text-slate-700 mb-2" size={32} />
//                                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No matching records found</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* --- DETAILED VIEW MODAL --- */}
//             <AnimatePresence>
//                 {selectedCase && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCase(null)} className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" />
//                         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">

//                             {/* Header */}
//                             <div className="p-8 border-b border-white/5 flex justify-between items-start">
//                                 <div>
//                                     <p className="text-emerald-500 text-[10px] font-black tracking-[0.3em] mb-1 uppercase">Official Incident Log</p>
//                                     <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">#{selectedCase.complaintId}</h2>
//                                 </div>
//                                 <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
//                             </div>

//                             {/* Modal Content */}
//                             <div className="p-8 space-y-6 overflow-y-auto max-h-[65vh] custom-scrollbar">

//                                 {/* ADMIN DECISION BOX */}
//                                 <div className={`p-5 rounded-2xl border ${getStatusTheme(selectedCase.status).border} ${getStatusTheme(selectedCase.status).bg} flex items-center gap-4`}>
//                                     <div className={getStatusTheme(selectedCase.status).color}>
//                                         {getStatusTheme(selectedCase.status).icon}
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] font-black opacity-50 uppercase tracking-widest text-slate-400">Admin Determination</p>
//                                         <p className={`font-black text-sm uppercase ${getStatusTheme(selectedCase.status).color}`}>
//                                             {getStatusTheme(selectedCase.status).label}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* --- IMAGE VIEW SECTION --- */}
//                                 {selectedCase.evidence ? (
//                                     <div className="space-y-3">
//                                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                                             <ImageIcon size={14} className="text-emerald-500" /> Forensic Visual Data
//                                         </p>

//                                         <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] bg-slate-950 p-2">
//                                             <img
//                                                 src={selectedCase.evidence.startsWith('http')
//                                                     ? selectedCase.evidence
//                                                     : `${API_BASE_URL}/${selectedCase.evidence.replace(/\\/g, '/')}`
//                                                 }
//                                                 alt="Evidence"
//                                                 className="w-full h-auto max-h-80 object-contain rounded-xl transition-all duration-500 hover:brightness-110"
//                                                 onError={(e) => {
//                                                     e.target.onerror = null;
//                                                     e.target.src = "https://via.placeholder.com/600x400/0f172a/64748b?text=ATTACHMENT_NOT_FOUND";
//                                                 }}
//                                             />
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="py-12 border border-dashed border-white/5 rounded-3xl text-center bg-slate-950/30">
//                                         <ImageIcon className="mx-auto text-slate-800 mb-2 opacity-20" size={32} />
//                                         <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">No Visual Metadata Attached</p>
//                                     </div>
//                                 )}

//                                 {/* DETAILS GRID */}
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
//                                         <p className="text-[10px] font-black text-slate-500 uppercase mb-1 flex items-center gap-2"><Calendar size={12} /> Reported Date</p>
//                                         <p className="text-white font-bold">{new Date(selectedCase.createdAt).toLocaleDateString()}</p>
//                                     </div>
//                                     <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
//                                         <p className="text-[10px] font-black text-slate-500 uppercase mb-1 flex items-center gap-2"><FileText size={12} /> Case Category</p>
//                                         <p className="text-white font-bold uppercase text-xs">{selectedCase.type}</p>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <p className="text-[10px] font-black text-slate-500 uppercase mb-3 tracking-widest flex items-center gap-2"><Activity size={12} /> My Statement</p>
//                                     <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 text-slate-300 italic text-sm border-l-2 border-emerald-500">
//                                         "{selectedCase.description}"
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Footer */}
//                             <div className="p-4 bg-slate-950/50 text-center border-t border-white/5">
//                                 <p className="text-[9px] font-bold text-slate-700 tracking-[0.4em] uppercase">Secure Information Repository</p>
//                             </div>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default ComplaintStatus;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
    CheckCircle2, Clock, AlertCircle, X, Calendar,
    FileText, Image as ImageIcon, Eye, Search,
    ShieldCheck, Activity, RefreshCcw, LayoutGrid,
    ChevronRight, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ComplaintStatus = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Default to "All" to see everything initially
    const [activeTab, setActiveTab] = useState("All");

    const API_BASE_URL = "http://localhost:5000";

    const fetchMyComplaints = async (quiet = false) => {
        if (!quiet) setLoading(true);
        setIsRefreshing(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE_URL}/api/complaints`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Ensure we are setting an array
            setCases(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
            setTimeout(() => setIsRefreshing(false), 600);
        }
    };

    useEffect(() => {
        fetchMyComplaints();
    }, []);

    // --- EFFECTIVE LOGIC: STATS & TAB FILTERING ---
    const stats = useMemo(() => ({
        total: cases.length,
        pending: cases.filter(c => c.status === "Pending").length,
        review: cases.filter(c => c.status === "In Review").length,
        resolved: cases.filter(c => c.status === "Resolved").length,
    }), [cases]);

    const getStatusTheme = (status) => {
        const s = status?.toLowerCase();
        if (s === "resolved") return {
            color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20",
            icon: <CheckCircle2 size={20} />, label: "CASE RESOLVED"
        };
        if (s === "in review") return {
            color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20",
            icon: <Activity size={20} className="animate-pulse" />, label: "IN REVIEW"
        };
        return {
            color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20",
            icon: <Clock size={20} />, label: "PENDING"
        };
    };

    // FIX: The filter now handles exact string matching with the tabs
    const filteredCases = cases.filter(c => {
        const matchesSearch = c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.type.toLowerCase().includes(searchTerm.toLowerCase());

        // Match the Tab ID exactly with the Backend Status string
        const matchesTab = activeTab === "All" || c.status === activeTab;

        return matchesSearch && matchesTab;
    });

    const tabConfig = [
        { id: "All", label: "All Files", color: "text-white" },
        // { id: "Pending", label: "Pending", color: "text-blue-400" },
        { id: "In Review", label: "In Review", color: "text-amber-400" },
        { id: "Resolved", label: "Resolved", color: "text-emerald-400" },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-10 font-sans selection:bg-emerald-500/30">
            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }`}</style>

            <div className="max-w-6xl mx-auto">
                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-500">
                            <ShieldCheck size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Personal Case Ledger</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Status Center</h1>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="text" placeholder="SEARCH CASE ID..."
                                className="bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-black tracking-widest focus:border-emerald-500/50 outline-none w-full md:w-64 transition-all text-white"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button onClick={() => fetchMyComplaints(true)} className="p-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-emerald-500 transition-all active:scale-95">
                            <RefreshCcw size={18} className={`${isRefreshing ? "animate-spin text-emerald-500" : "text-slate-500"}`} />
                        </button>
                    </div>
                </header>

                {/* --- ANALYTICS / TAB CARDS --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {tabConfig.map((tab) => {
                        const count = tab.id === "All" ? stats.total : stats[tab.id.toLowerCase().replace(" ", "")] || stats.pending;
                        const isSelected = activeTab === tab.id;

                        return (
                            <motion.button
                                key={tab.id}
                                whileHover={{ y: -5 }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`p-5 rounded-[2rem] border text-left transition-all relative overflow-hidden ${isSelected ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className={`text-2xl font-black mb-1 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                                    {tab.id === "All" ? stats.total : (tab.id === "Pending" ? stats.pending : (tab.id === "In Review" ? stats.review : stats.resolved))}
                                </div>
                                <div className={`text-[9px] font-black uppercase tracking-widest ${isSelected ? 'text-emerald-500' : 'text-slate-500'}`}>
                                    {tab.label}
                                </div>
                                {isSelected && <motion.div layoutId="activeGlow" className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
                            </motion.button>
                        );
                    })}
                </div>

                {/* --- RECORDS LIST --- */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            <div className="flex flex-col items-center py-20 gap-4">
                                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Accessing Archives...</p>
                            </div>
                        ) : filteredCases.map((c) => (
                            <motion.div
                                layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                key={c._id} onClick={() => setSelectedCase(c)}
                                className="group bg-slate-900/20 border border-white/5 p-5 rounded-[2.5rem] flex items-center justify-between hover:bg-slate-800/40 hover:border-white/20 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center ${getStatusTheme(c.status).bg} ${getStatusTheme(c.status).color} border ${getStatusTheme(c.status).border} transition-transform group-hover:scale-110`}>
                                        {getStatusTheme(c.status).icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-white font-black tracking-tight text-lg uppercase">#{c.complaintId || 'REF-0000'}</h3>
                                            <span className="text-[9px] bg-white/5 px-3 py-1 rounded-full text-slate-500 font-bold border border-white/5 uppercase tracking-tighter">
                                                {new Date(c.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em]">{c.type}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mr-2">
                                    <div className="text-right hidden md:block">
                                        <div className={`text-[10px] font-black uppercase tracking-widest ${getStatusTheme(c.status).color}`}>
                                            {getStatusTheme(c.status).label}
                                        </div>
                                        <div className="text-[8px] text-slate-600 font-bold uppercase mt-1">Verified Log</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {!loading && filteredCases.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-slate-900/10 rounded-[4rem] border border-dashed border-white/5">
                            <AlertCircle className="mx-auto text-slate-800 mb-4" size={48} />
                            <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.4em]">No matching records in {activeTab} archives</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* --- MODAL --- */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCase(null)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0b1221] border border-white/10 w-full max-w-2xl rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10">

                            <div className="p-10 pb-6 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusTheme(selectedCase.status).color.replace('text', 'bg')}`} />
                                        <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase">Incident Dossier</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">#{selectedCase.complaintId}</h2>
                                </div>
                                <button onClick={() => setSelectedCase(null)} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
                            </div>

                            <div className="px-10 pb-10 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">

                                {/* {selectedCase.evidence ? (
                                    <div className="rounded-[2.5rem] overflow-hidden border border-white/5 bg-black/40 p-2 shadow-inner">
                                        <img
                                            src={selectedCase.evidence.startsWith('http') ? selectedCase.evidence : `${API_BASE_URL}/${selectedCase.evidence.replace(/\\/g, '/')}`}
                                            className="w-full h-72 object-cover rounded-[2rem]"
                                            alt="Forensic Evidence"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/600x400/0b1221/334155?text=IMAGE_NOT_AVAILABLE"}
                                        />
                                    </div>
                                ) : (
                                    <div className="py-16 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-700 bg-white/2">
                                        <ImageIcon size={40} className="mb-3 opacity-20" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">No visual data submitted</span>
                                    </div>
                                )} */}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-[2rem] bg-white/2 border border-white/5">
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><LayoutGrid size={12} /> Classification</div>
                                        <div className="text-white font-bold uppercase text-xs">{selectedCase.type}</div>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-white/2 border border-white/5">
                                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Calendar size={12} /> Entry Date</div>
                                        <div className="text-white font-bold text-xs">{new Date(selectedCase.createdAt).toDateString()}</div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden">
                                    <div className="flex items-center gap-2 mb-4 relative z-10">
                                        <FileText size={16} className="text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">User Statement</span>
                                    </div>
                                    <p className="text-slate-300 text-sm italic leading-relaxed relative z-10">"{selectedCase.description}"</p>
                                    <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-500"><ShieldCheck size={80} /></div>
                                </div>
                            </div>

                            <div className="bg-slate-950/80 p-4 text-center border-t border-white/5">
                                <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.5em]">End of Official Record</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ComplaintStatus;