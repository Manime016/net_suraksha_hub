import React from "react";
import { Search, Filter, BarChart3, GraduationCap } from "lucide-react";

const UserProgress = () => {
    const users = [
        { id: 1, name: "Aman Sharma", progress: 85, modules: "12/14", status: "Ready", color: "text-emerald-400" },
        { id: 2, name: "Priya Patel", progress: 45, modules: "6/14", status: "Learning", color: "text-blue-400" },
        { id: 3, name: "Rahul Singh", progress: 95, modules: "14/14", status: "Completed", color: "text-purple-400" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">User <span className="text-blue-500">Progress</span></h1>
                    <p className="text-slate-500 text-xs mt-1 uppercase font-bold tracking-widest">Tracking 1,284 Active Operatives</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Search size={16} className="text-slate-500" />
                        <input type="text" placeholder="Search ID..." className="bg-transparent outline-none text-xs text-white w-40" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-[1.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/20 transition-all">
                        <div className="flex items-center gap-4 min-w-[200px]">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 font-black text-blue-500">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{user.name}</h4>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">UID: NS-00{user.id}</p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-md">
                            <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                <span className="text-slate-500">Course Completion</span>
                                <span className="text-white">{user.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${user.progress}%` }}></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <p className="text-[10px] font-black text-slate-500 uppercase">Modules</p>
                                <p className="text-sm font-bold text-white">{user.modules}</p>
                            </div>
                            <div className={`text-right min-w-[100px]`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${user.color}`}>{user.status}</p>
                                <button className="text-[9px] text-slate-600 underline hover:text-white transition-colors">Full Report</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProgress;