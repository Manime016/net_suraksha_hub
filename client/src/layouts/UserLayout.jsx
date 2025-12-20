import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, BookOpen, Award, Menu, X, ChevronLeft, ChevronRight,
    LogOut, ShieldCheck, PlusCircle, Clock, GraduationCap, Bell, User,
    ShieldAlert, Activity // Added missing icons to prevent crashes
} from "lucide-react";

// The { isAdmin = false } destructured prop fixes the "isAdmin is not defined" error
const UserLayout = ({ isAdmin = false }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Logic to switch menu items based on the isAdmin prop
    const menuItems = isAdmin ? [
        { icon: <LayoutDashboard size={22} />, label: "Admin Overview", to: "/admin-dashboard" },
        { icon: <ShieldAlert size={22} />, label: "Complaints", to: "/admin-dashboard/complaints" },
        { icon: <Activity size={22} />, label: "User Progress", to: "/admin-dashboard/progress" },
        { icon: <BookOpen size={22} />, label: "Test Control", to: "/admin-dashboard/tests" },
        { icon: <Award size={22} />, label: "Certificates", to: "/admin-dashboard/certificates" },
    ] : [
        { icon: <LayoutDashboard size={22} />, label: "Overview", to: "/user-dashboard" },
        { icon: <PlusCircle size={22} />, label: "Raise Complaint", to: "/user-dashboard/raise" },
        { icon: <Clock size={22} />, label: "Status Tracker", to: "/user-dashboard/status" },
        { icon: <BookOpen size={22} />, label: "Academy", to: "/user-dashboard/study" },
        { icon: <GraduationCap size={22} />, label: "Assessment", to: "/user-dashboard/test" },
        { icon: <Award size={22} />, label: "Certificates", to: "/user-dashboard/certificates" },
    ];

    return (
        <div className="flex h-screen bg-[#020617] overflow-hidden">

            {/* --- STATIC COLLAPSIBLE SIDEBAR --- */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? "80px" : "280px" }}
                className="hidden md:flex flex-col bg-slate-950 border-r border-white/5 relative z-50 h-full transition-all duration-300"
            >
                {/* Logo Area */}
                <div className="p-6 h-24 flex items-center overflow-hidden">
                    <div className="flex items-center gap-3 min-w-max">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <ShieldCheck className="text-slate-950" size={24} />
                        </div>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-white font-black tracking-tighter text-2xl italic"
                            >
                                NS<span className="text-emerald-500">.</span>HUB
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                                    }`}
                            >
                                <div className={`${isActive ? "text-emerald-400" : "group-hover:text-emerald-400"}`}>
                                    {item.icon}
                                </div>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="uppercase tracking-[0.2em] text-[10px] font-black whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <motion.div layoutId="active" className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,1)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Collapse Toggle & Logout */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="flex items-center gap-4 w-full p-4 rounded-2xl text-slate-500 hover:text-emerald-400 hover:bg-white/5 transition-all"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        {!isCollapsed && <span className="uppercase tracking-[0.2em] text-[10px] font-black">Minimize</span>}
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-4 w-full p-4 rounded-2xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                        {!isCollapsed && <span className="uppercase tracking-[0.2em] text-[10px] font-black">Terminate</span>}
                    </button>
                </div>
            </motion.aside>

            {/* --- MOBILE SIDEBAR --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
                        />
                        <motion.div
                            initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                            className="fixed inset-y-0 left-0 z-[60] bg-slate-950 w-72 md:hidden p-6"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-white font-black italic">NS.HUB</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400"><X /></button>
                            </div>
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.to} to={item.to}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-4 p-4 text-slate-400 hover:text-emerald-400 uppercase text-[10px] font-black tracking-widest"
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-slate-950/50 backdrop-blur-xl z-40">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-400">
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-full border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {isAdmin ? "Admin Authority Active" : "Secure Node 771_Active"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative p-2 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950" />
                        </div>
                        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black text-white uppercase italic">
                                    {isAdmin ? "Chief_Admin" : "Operative_User"}
                                </p>
                                <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Verified</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center group cursor-pointer hover:border-emerald-500/50 transition-all">
                                <User size={20} className="text-slate-400 group-hover:text-emerald-400" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-6 md:p-12 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserLayout;