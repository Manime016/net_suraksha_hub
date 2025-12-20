import React from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const ManageComplaints = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Incident <span className="text-blue-500">Queue</span></h1>

            <div className="overflow-hidden bg-slate-900/40 border border-white/5 rounded-[2rem]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5 uppercase text-[10px] font-black tracking-[0.2em] text-slate-500">
                            <th className="px-8 py-5">Incident ID</th>
                            <th className="px-8 py-5">User Node</th>
                            <th className="px-8 py-5">Type</th>
                            <th className="px-8 py-5">Evidence</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-slate-300">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="px-8 py-5 font-mono text-blue-400">#INC-889{i}</td>
                                <td className="px-8 py-5">User_Alpha_{i}</td>
                                <td className="px-8 py-5 text-xs">Financial Fraud</td>
                                <td className="px-8 py-5">
                                    <button className="flex items-center gap-2 text-[10px] bg-slate-800 px-3 py-1 rounded-lg hover:text-blue-400 transition-all">
                                        <Eye size={14} /> VIEW_PROOFS.JPG
                                    </button>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex justify-end gap-3">
                                        <button className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all"><CheckCircle size={18} /></button>
                                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><XCircle size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageComplaints;