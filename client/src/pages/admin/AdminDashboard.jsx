import React from "react";
import { Users, ShieldAlert, FileCheck, Activity, ArrowUpRight } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                    Admin <span className="text-blue-500 underline decoration-blue-500/30">Terminal</span>
                </h1>
                <p className="text-slate-500 text-sm mt-2 font-mono">System-wide Authority: Level 0 access granted.</p>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AdminStat label="Total Users" value="1,284" icon={<Users className="text-blue-400" />} />
                <AdminStat label="Pending Reports" value="42" icon={<ShieldAlert className="text-red-400" />} />
                <AdminStat label="Test Requests" value="15" icon={<Activity className="text-amber-400" />} />
                <AdminStat label="Certs Issued" value="892" icon={<FileCheck className="text-emerald-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Complaints Preview */}
                <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[2rem] p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Priority Complaints</h3>
                        <button className="text-blue-500 text-xs font-black">VIEW ALL</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-slate-600">#INC-00{i}</span>
                                    <p className="text-sm font-bold text-slate-300">Identity Theft - Node_771</p>
                                </div>
                                <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black rounded-full italic uppercase">Urgent</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-[2rem] p-8 text-white relative overflow-hidden">
                    <Activity className="absolute -bottom-4 -right-4 text-white/10" size={160} />
                    <h3 className="text-xl font-black uppercase italic mb-4">Node Health</h3>
                    <p className="text-blue-100 text-sm mb-8 font-medium">Global encryption layers are performing at 99.9% efficiency.</p>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-black uppercase">
                            <span>Storage</span>
                            <span>64%</span>
                        </div>
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-[64%] h-full bg-white shadow-[0_0_10px_white]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminStat = ({ label, value, icon }) => (
    <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl hover:bg-slate-900 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
            <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        </div>
        <div className="text-3xl font-black text-white italic">{value}</div>
    </div>
);

export default AdminDashboard;