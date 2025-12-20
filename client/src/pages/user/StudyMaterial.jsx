import React from "react";
import { PlayCircle, FileText, Download, Bookmark } from "lucide-react";

const StudyMaterial = () => {
    const modules = [
        { title: "Phishing Protocols", duration: "15 mins", level: "Beginner", tags: ["Email", "Security"] },
        { title: "Social Engineering 101", duration: "45 mins", level: "Advanced", tags: ["Psychology", "Defense"] },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Cyber Academy</h1>
                        <p className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Level 04 Operator</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {modules.map((m) => (
                        <div key={m.title} className="bg-slate-900/20 border border-white/5 rounded-[2rem] p-8 hover:border-emerald-500/30 transition-all relative overflow-hidden group">
                            <Bookmark className="absolute top-8 right-8 text-slate-800 group-hover:text-emerald-500" size={20} />
                            <div className="flex gap-2 mb-4">
                                {m.tags.map(t => <span key={t} className="text-[8px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md">{t}</span>)}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 italic">{m.title}</h2>
                            <div className="flex items-center gap-6 text-slate-500 text-xs font-bold mb-8">
                                <span className="flex items-center gap-1"><PlayCircle size={14} /> {m.duration}</span>
                                <span>• {m.level}</span>
                            </div>
                            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all">
                                Launch Module
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudyMaterial;