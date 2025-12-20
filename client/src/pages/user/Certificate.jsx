import React from "react";
import { motion } from "framer-motion";
import {
    Award,
    Download,
    ExternalLink,
    ShieldCheck,
    Search,
    CheckCircle,
    FileBadge
} from "lucide-react";

const Certificate = () => {
    const certifications = [
        {
            id: "CERT-9921-X",
            title: "Cyber Hygiene Specialist",
            date: "Dec 12, 2025",
            issuer: "NetSuraksha Authority",
            status: "Verified",
            grade: "A+"
        },
        {
            id: "CERT-8840-B",
            title: "Advanced Phishing Defense",
            date: "Nov 05, 2025",
            issuer: "Cyber Defense Hub",
            status: "Verified",
            grade: "A"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-10">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-[2px] w-8 bg-emerald-500"></div>
                            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">Credentials Ledger</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Verified <br /> Achievements</h1>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-500 uppercase">Trust Score</p>
                            <p className="text-2xl font-black text-white tracking-tighter">98.2</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
                            <ShieldCheck className="text-emerald-500" size={20} />
                        </div>
                    </div>
                </div>

                {/* Certificate Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-all rounded-3xl"></div>

                            <div className="relative bg-[#0b1224] border border-white/10 p-8 rounded-[2.5rem] overflow-hidden">
                                {/* Hologram Badge */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>

                                <div className="flex justify-between items-start mb-10">
                                    <div className="p-4 bg-slate-900 rounded-2xl border border-white/5">
                                        <FileBadge className="text-emerald-500" size={32} />
                                    </div>
                                    <div className="text-right">
                                        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                            <CheckCircle size={10} /> {cert.status}
                                        </span>
                                        <p className="text-slate-600 text-[9px] mt-2 font-mono uppercase">{cert.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-8">
                                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
                                        {cert.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">{cert.issuer}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mb-8">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Issue Date</p>
                                        <p className="text-sm font-bold text-slate-300">{cert.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Final Grade</p>
                                        <p className="text-sm font-bold text-white">{cert.grade}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-3 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:bg-emerald-400 transition-all active:scale-95">
                                        <Download size={14} /> Download PDF
                                    </button>
                                    <button className="w-12 h-11 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Locked/Empty State Card */}
                    <div className="bg-slate-900/10 border-2 border-dashed border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center opacity-50">
                        <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mb-4">
                            <Award className="text-slate-700" size={30} />
                        </div>
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Next Node Locked</h3>
                        <p className="text-slate-600 text-[10px] mt-2 max-w-[200px] uppercase tracking-tighter">Complete the "Advanced Encryption" module to unlock this certificate.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Certificate;