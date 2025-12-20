import React from "react";
import { FileText, BookOpen, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";

import {
    TrendingUp, ShieldAlert, BookOpenCheck,
    ArrowUpRight, Zap, Shield,
    Activity, Radio
} from "lucide-react";
import { motion } from "framer-motion";

const UserDashboard = () => {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Hero Header Section */}
            <div className="relative p-8 rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-md">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                    <Radio className="text-emerald-400 animate-pulse" size={120} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                            System Status: Optimal
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Center</span>
                    </h1>
                    <p className="text-slate-400 mt-4 max-w-xl font-medium leading-relaxed">
                        Welcome back, Operative. All neural-links are active. Your security literacy score has increased by <span className="text-emerald-400 font-bold">12%</span> this week.
                    </p>
                </div>
            </div>

            {/* Vibrant Interactive Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardStat
                    label="Cyber Resilience"
                    value="94%"
                    icon={<Activity size={24} />}
                    color="emerald"
                    percentage="+2.4%"
                />
                <DashboardStat
                    label="Threats Neutralized"
                    value="12"
                    icon={<Shield size={24} />}
                    color="cyan"
                    percentage="Stable"
                />
                <DashboardStat
                    label="Field Experience"
                    value="LVL 08"
                    icon={<Zap size={24} />}
                    color="purple"
                    percentage="Top 5%"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Reports Section with Glassmorphism */}
                <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
                    <div className="p-8 rounded-[2.4rem] bg-slate-950 h-full">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                                <ShieldAlert className="text-emerald-500" /> Active Intel
                            </h3>
                            <button className="text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors">
                                View Archive
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-emerald-500/5 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <p className="text-sm font-bold text-slate-300">Identity scan complete: Node_{i} secure</p>
                                    </div>
                                    <ArrowUpRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Training CTA with Neon Punch */}
                <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                    <div className="p-8 rounded-[2.4rem] bg-[#020617] h-full relative overflow-hidden">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -mr-32 -mt-32"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-white mb-2 uppercase italic leading-tight">
                                Neural <br /> Academy
                            </h3>
                            <p className="text-slate-400 font-bold text-sm mb-8 max-w-[250px]">
                                Mastering Zero-Trust Architecture: <span className="text-emerald-400">14 Modules</span> remaining to reach Expert level.
                            </p>

                            <button className="relative group overflow-hidden bg-emerald-500 px-8 py-3 rounded-xl transition-all active:scale-95">
                                <span className="relative z-10 font-black text-slate-950 text-xs uppercase tracking-[0.2em]">Resume Training</span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardStat = ({ label, value, icon, color, percentage }) => {
    const themes = {
        emerald: "from-emerald-500/20 border-emerald-500/20 text-emerald-400",
        cyan: "from-cyan-500/20 border-cyan-500/20 text-cyan-400",
        purple: "from-purple-500/20 border-purple-500/20 text-purple-400"
    };

    return (
        <div className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br to-transparent ${themes[color]} border backdrop-blur-sm group hover:scale-[1.02] transition-all`}>
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-slate-950 border border-white/5 ${themes[color].split(' ')[2]}`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-white/5 rounded-md text-slate-500">
                    {percentage}
                </span >
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">{label}</p>
                <h4 className="text-5xl font-black text-white italic tracking-tighter">{value}</h4>
            </div>
        </div>
    );
};

export default UserDashboard;