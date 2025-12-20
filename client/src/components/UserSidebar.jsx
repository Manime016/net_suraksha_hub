import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, BookOpen, Award,
    LogOut, ShieldCheck, PlusCircle, Clock, GraduationCap
} from "lucide-react";

const UserSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Overview", to: "/user-dashboard" },
        { icon: <PlusCircle size={20} />, label: "Raise Complaint", to: "/user-dashboard/raise" },
        { icon: <Clock size={20} />, label: "Status Tracker", to: "/user-dashboard/status" },
        { icon: <BookOpen size={20} />, label: "Academy", to: "/user-dashboard/study" },
        { icon: <GraduationCap size={20} />, label: "Assessment", to: "/user-dashboard/test" },
        { icon: <Award size={20} />, label: "Certificates", to: "/user-dashboard/certificates" },
    ];

    return (
        <aside className="w-64 bg-[#030712] border-r border-white/5 flex flex-col h-screen sticky top-0">
            <div className="p-8">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <ShieldCheck className="text-slate-950" size={20} />
                    </div>
                    <span className="text-white font-black tracking-tighter text-lg">NS.HUB</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${location.pathname === item.to
                            ? "bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                            : "text-slate-500 hover:text-white hover:bg-white/5 font-bold"
                            }`}
                    >
                        {item.icon}
                        <span className="text-sm uppercase tracking-widest">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all font-bold text-sm"
                >
                    <LogOut size={20} /> Terminate Session
                </button>
            </div>
        </aside>
    );
};

export default UserSidebar;