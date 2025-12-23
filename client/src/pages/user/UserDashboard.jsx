import React, { useState } from "react";
import {
    Shield,
    Activity,
    Zap,
    Radio,
    UserCircle,
    LogOut,
    Camera
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const { logout, name } = useAuth();
    const navigate = useNavigate();

    // 🔹 Minimal state additions
    const [showProfile, setShowProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage")
    );

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            localStorage.setItem("profileImage", reader.result);
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* Welcome text (no UI break) */}
            <p className="text-slate-400 font-medium">
                Welcome back,{" "}
                <span className="text-emerald-400 font-bold">
                    {name || "User"}
                </span>.
            </p>

            {/* 🔹 TOP RIGHT PROFILE ICON */}
            {/* <div className="flex justify-end">
                <button
                    onClick={() => setShowProfile(true)}
                    className="text-slate-400 hover:text-emerald-400 transition"
                >
                    <UserCircle size={28} />
                </button>
            </div> */}

            {/* ===== HERO HEADER (UNCHANGED) ===== */}
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
                        Command <span className="text-emerald-400">Center</span>
                    </h1>

                    <p className="text-slate-400 mt-4 max-w-xl font-medium">
                        Operative <span className="text-emerald-400 font-bold">{name || "User"}</span>,
                        all systems are operational.
                    </p>
                </div>
            </div>

            {/* ===== STATS (UNCHANGED) ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardStat
                    label="Cyber Resilience"
                    value="94%"
                    icon={<Activity />}
                    color="emerald"
                    percentage="+2.4%"
                />
                <DashboardStat
                    label="Threats Neutralized"
                    value="12"
                    icon={<Shield />}
                    color="cyan"
                    percentage="Stable"
                />
                <DashboardStat
                    label="Field Experience"
                    value="LVL 08"
                    icon={<Zap />}
                    color="purple"
                    percentage="Top 5%"
                />
            </div>

            {/* 🔹 PROFILE MODAL
            {showProfile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                >
                    <div className="bg-slate-900 p-8 rounded-3xl w-[320px] border border-white/10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <img
                                    src={profileImage || "https://via.placeholder.com/100"}
                                    alt="profile"
                                    className="w-24 h-24 rounded-full object-cover border border-white/10"
                                />
                                <label className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full cursor-pointer">
                                    <Camera size={14} className="text-black" />
                                    <input type="file" hidden onChange={handleImageUpload} />
                                </label>
                            </div>

                            <h3 className="text-white font-black">
                                {name || "User"}
                            </h3>
                            <p className="text-slate-400 text-xs uppercase">User</p>

                            <button
                                onClick={handleLogout}
                                className="mt-4 flex items-center gap-2 px-6 py-2 bg-red-500/20 text-red-400 rounded-xl font-black uppercase text-xs hover:bg-red-500/30"
                            >
                                <LogOut size={16} /> Logout
                            </button>

                            <button
                                onClick={() => setShowProfile(false)}
                                className="text-xs text-slate-500 hover:text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            )} */}
        </div>
    );
};

/* ===== STAT CARD (UNCHANGED STYLE) ===== */
const DashboardStat = ({ label, value, icon, color, percentage }) => {
    const themes = {
        emerald: "from-emerald-500/20 border-emerald-500/20 text-emerald-400",
        cyan: "from-cyan-500/20 border-cyan-500/20 text-cyan-400",
        purple: "from-purple-500/20 border-purple-500/20 text-purple-400"
    };

    return (
        <div className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br to-transparent ${themes[color]} border`}>
            <div className="flex justify-between mb-4">
                <div>{icon}</div>
                <span className="text-xs">{percentage}</span>
            </div>
            <p className="text-xs uppercase">{label}</p>
            <h4 className="text-4xl font-black text-white">{value}</h4>
        </div>
    );
};

export default UserDashboard;
