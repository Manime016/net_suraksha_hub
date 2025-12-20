import React from "react";
import { Award, Download, ShieldCheck, Mail } from "lucide-react";

const ApproveCertificates = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Certificate <span className="text-blue-500">Issuance</span></h1>

            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden">
                <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Pending Final Signature</span>
                    <span className="text-[10px] px-2 py-1 bg-amber-500/10 text-amber-500 rounded font-black uppercase tracking-widest">08 Requests</span>
                </div>

                <div className="divide-y divide-white/5">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-blue-500">
                                    <Award size={32} />
                                </div>
                                <div>
                                    <h4 className="text-white text-lg font-bold tracking-tight">Karan Mehra</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Phishing Defense Specialist • Score: 98%</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">
                                    <ShieldCheck size={14} /> Sign & Issue
                                </button>
                                <button className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all border border-white/5">
                                    <Mail size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApproveCertificates;