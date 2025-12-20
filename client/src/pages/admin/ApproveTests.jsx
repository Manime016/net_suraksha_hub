import React from "react";
import {
    Activity,
    Key,
    CheckCircle,
    XCircle,
    UserCheck,
    History,
    Lock
} from "lucide-react";
import { motion } from "framer-motion";

const ApproveTests = () => {
    const requests = [
        { id: "REQ-992", name: "Vikas Khanna", modules: "14/14", avgScore: "88%", timeSpent: "14h 20m", status: "Eligible" },
        { id: "REQ-995", name: "Ananya Roy", modules: "14/14", avgScore: "92%", timeSpent: "18h 05m", status: "Eligible" }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                        Test <span className="text-blue-500">Authorization</span>
                    </h1>
                    <p className="text-slate-500 text-xs mt-1 font-mono uppercase">Vetting node eligibility for final assessment</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">02 Requests Pending</span>
                </div>
            </div>

            {/* Request Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {requests.map((req, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={req.id}
                        className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all"
                    >
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Lock size={150} className="text-blue-400" />
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                    <UserCheck size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{req.name}</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">{req.id}</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-blue-500 bg-blue-500/5 px-3 py-1 rounded-md border border-blue-500/10">
                                ELIGIBILITY: OK
                            </span>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Learning</p>
                                <p className="text-sm font-bold text-white">{req.modules}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Avg Score</p>
                                <p className="text-sm font-bold text-emerald-400">{req.avgScore}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center">
                                <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Time Sync</p>
                                <p className="text-sm font-bold text-blue-400">{req.timeSpent}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                                <Key size={16} /> Grant Access Key
                            </button>
                            <button className="px-6 py-4 bg-slate-800 border border-white/5 text-red-500 rounded-2xl hover:bg-red-500/10 hover:border-red-500/20 transition-all group">
                                <XCircle size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-6">
                            <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                <History size={12} /> View Log History
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Authorization Policy Note */}
            <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <p className="text-[10px] text-blue-400/80 leading-relaxed font-medium uppercase tracking-widest">
                    <span className="font-black text-blue-400">Admin Protocol:</span> Granting an access key authorizes the user to proceed to the Final Verified Assessment. Ensure the user has met the 100% module completion requirement before approval.
                </p>
            </div>
        </div>
    );
};

export default ApproveTests;