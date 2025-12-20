import React from "react";
import { CheckCircle2, Clock, ShieldQuestion, Search } from "lucide-react";

const ComplaintStatus = () => {
    const cases = [
        { id: "NS-7712", type: "Fraud", date: "2025-05-12", status: "In Review", color: "text-amber-500" },
        { id: "NS-7690", type: "Phishing", date: "2025-04-20", status: "Resolved", color: "text-emerald-500" },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-black text-white tracking-tighter mb-8 uppercase italic">Live Case Tracker</h1>

                <div className="grid gap-6">
                    {cases.map((c) => (
                        <div key={c.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-slate-800/40 transition-all">
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-xl bg-slate-950 border border-white/5 ${c.color}`}>
                                    {c.status === "Resolved" ? <CheckCircle2 /> : <Clock />}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold tracking-widest">CASE #{c.id}</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">{c.type} • Filed on {c.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs font-black uppercase tracking-[0.2em] ${c.color}`}>{c.status}</span>
                                <button className="block text-[10px] text-slate-600 mt-1 hover:text-white transition-colors underline uppercase tracking-widest">View Evidence</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComplaintStatus;