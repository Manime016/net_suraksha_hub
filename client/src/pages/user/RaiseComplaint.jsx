import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Upload, Send, Lock, AlertTriangle } from "lucide-react";
// Correct relative path
import UserSidebar from "../../components/UserSidebar";
const RaiseComplaint = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 flex">
            {/* Sidebar would go here */}
            <div className="flex-1 p-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Incident Reporting</h1>
                            <p className="text-slate-500 text-sm italic underline decoration-emerald-500/50">SECURE CHANNEL: RSA-4096 ACTIVE</p>
                        </div>
                    </div>

                    <form className="space-y-6 bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Incident Type</label>
                                <select className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-emerald-500 outline-none transition-all">
                                    <option>Financial Fraud</option>
                                    <option>Identity Theft</option>
                                    <option>Social Media Harassment</option>
                                    <option>Data Breach</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date of Incident</label>
                                <input type="date" className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-emerald-500 outline-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Detailed Description</label>
                            <textarea rows="5" placeholder="Describe the event sequences..." className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-emerald-500 outline-none" />
                        </div>

                        <div className="border-2 border-dashed border-white/10 rounded-[1.5rem] p-10 flex flex-col items-center justify-center group hover:border-emerald-500/50 transition-all cursor-pointer bg-slate-950/30">
                            <Upload className="text-slate-600 group-hover:text-emerald-500 mb-4 transition-colors" size={40} />
                            <p className="text-sm font-bold text-slate-500">Drag evidence files here or <span className="text-emerald-500">Browse</span></p>
                            <p className="text-[10px] text-slate-700 mt-2 uppercase tracking-widest">Max Size: 25MB (Encrypted on upload)</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Lock className="text-emerald-500" size={18} />
                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Anonymity Shield Active</span>
                            </div>
                            <button type="submit" className="px-8 py-3 bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-xs rounded-lg hover:bg-emerald-400 flex items-center gap-2 transition-all">
                                SUBMIT REPORT <Send size={16} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default RaiseComplaint;