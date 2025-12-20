import React from "react";
import { Timer, Target, AlertCircle } from "lucide-react";

const Test = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-10 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-12 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Target className="text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" size={40} />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">Assessment Node</h1>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed italic">You are about to start the <span className="text-white">Social Engineering Defense</span> exam. This will lock your browser and finalize your certification eligibility.</p>

                <div className="grid grid-cols-2 gap-4 mb-10 text-left">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Duration</p>
                        <p className="text-sm font-bold flex items-center gap-2"><Timer size={14} /> 30 Minutes</p>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Passing Score</p>
                        <p className="text-sm font-bold">85% Minimum</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button className="w-full py-4 bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.2em] text-xs [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)]">
                        Initialize Exam
                    </button>
                    <div className="flex items-center justify-center gap-2 text-red-500/60">
                        <AlertCircle size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Warning: Session will be monitored</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;