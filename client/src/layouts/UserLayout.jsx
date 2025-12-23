// import React, { useState, useRef, useEffect } from "react";
// import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     LayoutDashboard, BookOpen, Award, Menu,
//     ChevronLeft, ChevronRight, LogOut, ShieldCheck,
//     PlusCircle, Clock, GraduationCap, Bell,
//     ShieldAlert, Activity, Camera, X, Settings, Search,
//     CheckCircle2, Info, AlertTriangle
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const UserLayout = ({ isAdmin = false }) => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [showProfile, setShowProfile] = useState(false);
//     const [showNotifications, setShowNotifications] = useState(false);

//     const [profileImage, setProfileImage] = useState(
//         localStorage.getItem("profileImage") || null
//     );

//     const location = useLocation();
//     const navigate = useNavigate();
//     const { logout, name } = useAuth();

//     // Dummy Notifications Data
//     const notifications = [
//         { id: 1, title: "Identity Verified", desc: "Your document check is complete.", time: "2m ago", type: "success", icon: <CheckCircle2 size={16} /> },
//         { id: 2, title: "New Course", desc: "Security Protocol 101 is now live.", time: "1h ago", type: "info", icon: <Info size={16} /> },
//         { id: 3, title: "Login Alert", desc: "New login from Chrome on Windows.", time: "3h ago", type: "warning", icon: <AlertTriangle size={16} /> },
//     ];

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const base64String = reader.result;
//             localStorage.setItem("profileImage", base64String);
//             setProfileImage(base64String);
//         };
//         reader.readAsDataURL(file);
//     };

//     const menuItems = isAdmin ? [
//         { icon: <LayoutDashboard size={20} />, label: "Overview", to: "/admin-dashboard" },
//         { icon: <ShieldAlert size={20} />, label: "Complaints", to: "/admin-dashboard/complaints" },
//         { icon: <Activity size={20} />, label: "User Progress", to: "/admin-dashboard/progress" },
//         { icon: <BookOpen size={20} />, label: "Test Control", to: "/admin-dashboard/tests" },
//         { icon: <Award size={20} />, label: "Certificates", to: "/admin-dashboard/certificates" },
//     ] : [
//         { icon: <LayoutDashboard size={20} />, label: "Overview", to: "/user-dashboard" },
//         { icon: <PlusCircle size={20} />, label: "Raise Complaint", to: "/user-dashboard/raise" },
//         { icon: <Clock size={20} />, label: "Status Tracker", to: "/user-dashboard/status" },
//         { icon: <BookOpen size={20} />, label: "Academy", to: "/user-dashboard/study" },
//         { icon: <GraduationCap size={20} />, label: "Assessment", to: "/user-dashboard/test" },
//         { icon: <Award size={20} />, label: "Certificates", to: "/user-dashboard/certificates" },
//     ];

//     return (
//         <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">

//             {/* ===== SIDEBAR ===== */}
//             <motion.aside
//                 initial={false}
//                 animate={{ width: isCollapsed ? "100px" : "280px" }}
//                 className="hidden md:flex flex-col bg-slate-950 border-r border-white/[0.05] h-full z-30"
//             >
//                 <div className="p-8 h-24 flex items-center">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
//                             <ShieldCheck className="text-slate-950" size={24} />
//                         </div>
//                         {!isCollapsed && (
//                             <span className="text-white font-black text-xl tracking-tighter italic">
//                                 NS<span className="text-emerald-500">.</span>HUB
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 <nav className="flex-1 px-4 space-y-1.5 mt-4">
//                     {menuItems.map(item => (
//                         <Link
//                             key={item.to}
//                             to={item.to}
//                             className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${location.pathname === item.to
//                                     ? "bg-emerald-500 text-slate-950 font-bold"
//                                     : "text-slate-500 hover:text-white hover:bg-white/5"
//                                 }`}
//                         >
//                             <span className="shrink-0">{item.icon}</span>
//                             {!isCollapsed && (
//                                 <span className="uppercase tracking-widest text-[10px] font-black">
//                                     {item.label}
//                                 </span>
//                             )}
//                         </Link>
//                     ))}
//                 </nav>

//                 <div className="p-6">
//                     <button
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                         className="flex items-center justify-center w-full p-3 rounded-xl border border-white/10 text-slate-500 hover:text-emerald-400 transition-colors"
//                     >
//                         {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//                     </button>
//                 </div>
//             </motion.aside>

//             {/* ===== MAIN CONTENT ===== */}
//             <div className="flex-1 flex flex-col relative">

//                 <header className="h-24 px-8 flex items-center justify-between border-b border-white/[0.05] bg-slate-950/50 backdrop-blur-md z-20">

//                     <div className="flex items-center flex-1 max-w-md mr-8">
//                         <div className="relative w-full hidden sm:block">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                             <input
//                                 type="text"
//                                 placeholder="Search terminal..."
//                                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-5">
//                         {/* NOTIFICATION SECTION */}
//                         <div className="relative">
//                             <button
//                                 onClick={() => setShowNotifications(!showNotifications)}
//                                 className={`relative p-3 rounded-2xl border transition-all group ${showNotifications ? 'bg-emerald-500 border-emerald-500' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
//                             >
//                                 <Bell size={20} className={showNotifications ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'} />
//                                 {!showNotifications && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse" />}
//                             </button>

//                             {/* DROPDOWN MENU */}
//                             <AnimatePresence>
//                                 {showNotifications && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                         className="absolute right-0 mt-4 w-80 bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-50"
//                                     >
//                                         <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
//                                             <h4 className="text-xs font-black uppercase tracking-widest text-white">Notifications</h4>
//                                             <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">3 New</span>
//                                         </div>
//                                         <div className="max-h-[400px] overflow-y-auto">
//                                             {notifications.map((n) => (
//                                                 <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors flex gap-4">
//                                                     <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center 
//                                                         ${n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
//                                                             n.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
//                                                                 'bg-blue-500/10 text-blue-500'}`}>
//                                                         {n.icon}
//                                                     </div>
//                                                     <div className="flex-1">
//                                                         <div className="flex justify-between items-start mb-0.5">
//                                                             <p className="text-xs font-bold text-white leading-none">{n.title}</p>
//                                                             <span className="text-[9px] text-slate-500 font-medium">{n.time}</span>
//                                                         </div>
//                                                         <p className="text-[11px] text-slate-400 leading-tight">{n.desc}</p>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors bg-white/5">
//                                             Clear All Logs
//                                         </button>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>

//                         {/* Profile Pill */}
//                         <div
//                             onClick={() => setShowProfile(true)}
//                             className="flex items-center gap-3 pl-4 pr-1.5 py-1.5 bg-slate-900 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/50 transition-all group"
//                         >
//                             <div className="text-right hidden md:block">
//                                 <p className="text-[10px] font-black text-white uppercase italic tracking-tighter">
//                                     {name || "Agent"}
//                                 </p>
//                                 <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Authorized</p>
//                             </div>
//                             <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
//                                 <img
//                                     src={profileImage || `https://ui-avatars.com/api/?name=${name}&background=10b981&color=fff`}
//                                     alt="profile"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 <main className="flex-1 overflow-y-auto p-8 lg:p-12">
//                     <div className="max-w-7xl mx-auto">
//                         <Outlet />
//                     </div>
//                 </main>
//             </div>

//             {/* ===== PROFILE OVERLAY (Same as before) ===== */}
//             <AnimatePresence>
//                 {showProfile && (
//                     <motion.div
//                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
//                             className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 relative shadow-2xl"
//                         >
//                             <button onClick={() => setShowProfile(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X /></button>
//                             <div className="flex flex-col items-center">
//                                 <div className="relative mb-6">
//                                     <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-emerald-500 p-1 bg-slate-800">
//                                         <img
//                                             src={profileImage || `https://ui-avatars.com/api/?name=${name}&background=10b981&color=fff`}
//                                             className="w-full h-full rounded-[1.7rem] object-cover"
//                                             alt="profile"
//                                         />
//                                     </div>
//                                     <label className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-2xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
//                                         <Camera size={18} className="text-slate-950" />
//                                         <input type="file" hidden onChange={handleImageUpload} />
//                                     </label>
//                                 </div>
//                                 <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">{name}</h3>
//                                 <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Access Level: {isAdmin ? "Admin" : "Standard"}</p>
//                                 <div className="w-full space-y-3 mb-4">
//                                     <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold border border-white/5"><Settings size={18} /> Settings</button>
//                                     <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all text-sm font-black uppercase tracking-widest"><LogOut size={18} /> Logout</button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default UserLayout;



import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, BookOpen, Award, ChevronLeft, ChevronRight,
    LogOut, ShieldCheck, PlusCircle, Clock, GraduationCap, Bell,
    ShieldAlert, Activity, Camera, X, Settings, Search, FileText,
    CheckCircle2, User, UserCircle, UserPlus
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import axios from "axios";

const UserLayout = ({ isAdmin = false }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, name } = useAuth();
    const API_BASE_URL = "http://localhost:5000";

    // --- Helper: Format DB Timestamps ---
    const formatTimeAgo = (dateString) => {
        const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return new Date(dateString).toLocaleDateString();
    };

    // --- Core: Fetch Real Data from Backend ---
    // --- Core: Fetch Different Data for Admin vs User ---
    const fetchLiveActivity = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        let allLogs = [];

        try {
            if (isAdmin) {
                // --- ADMIN VIEW: Show everything (Complaints + Logins) ---
                const [compRes, userRes] = await Promise.allSettled([
                    axios.get(`${API_BASE_URL}/api/complaints/admin/all`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${API_BASE_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } })
                ]);

                if (compRes.status === 'fulfilled') {
                    const complaints = compRes.value.data.slice(0, 5).map(c => ({
                        id: c._id,
                        title: "New Complaint",
                        desc: `Case #${c.complaintId || 'N/A'}: ${c.type}`,
                        time: formatTimeAgo(c.createdAt),
                        type: "warning",
                        icon: <ShieldAlert size={16} />,
                        rawTime: new Date(c.createdAt)
                    }));
                    allLogs.push(...complaints);
                }

                if (userRes.status === 'fulfilled') {
                    const users = userRes.value.data.slice(0, 3).map(u => ({
                        id: u._id,
                        title: "System Login",
                        desc: `${u.name || u.email} accessed terminal`,
                        time: formatTimeAgo(u.createdAt),
                        type: "success",
                        icon: <UserCircle size={16} />,
                        rawTime: new Date(u.createdAt)
                    }));
                    allLogs.push(...users);
                }
            } else {
                // USER VIEW
                const res = await axios.get(`${API_BASE_URL}/api/complaints`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // DEBUG: Look at this in your Browser Console (F12)
                console.log("RAW DATA FROM DB:", res.data);

                const statusLogs = res.data
                    .filter(c => {
                        console.log(`Checking Case #${c.complaintId}: Status is "${c.status}"`);
                        return c.status !== 'Submitted';
                    })
                    .map(c => ({
                        id: c._id,
                        title: c.status === 'Resolved' ? "Case Resolved" : "Status Updated",
                        desc: `Case #${c.complaintId}: Now ${c.status}`,
                        time: formatTimeAgo(c.updatedAt),
                        type: c.status === 'Resolved' ? "success" : "warning",
                        icon: c.status === 'Resolved' ? <CheckCircle2 size={16} /> : <Clock size={16} />,
                        rawTime: new Date(c.updatedAt)
                    }));

                allLogs = statusLogs;
            }

            setNotifications(allLogs.sort((a, b) => b.rawTime - a.rawTime));
        } catch (e) {
            console.warn("Notification sync failed");
        }
    }, [isAdmin]); // Re-run if role changes

    useEffect(() => {
        fetchLiveActivity();
        const interval = setInterval(fetchLiveActivity, 30000); // Sync every 30s
        return () => clearInterval(interval);
    }, [fetchLiveActivity]);

    const handleClearAll = () => setNotifications([]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const menuItems = isAdmin ? [
        { icon: <LayoutDashboard size={20} />, label: "Overview", to: "/admin-dashboard" },
        { icon: <ShieldAlert size={20} />, label: "Complaints", to: "/admin-dashboard/complaints" },
        { icon: <FileText size={20} />, label: "Study Materials", to: "/admin-dashboard/materials" },
        // { icon: <Activity size={20} />, label: "User Progress", to: "/admin-dashboard/progress" },
        { icon: <BookOpen size={20} />, label: "Certificate Approval", to: "/admin-dashboard/tests" },
        { icon: <UserPlus size={20} />, label: "Add Admin", to: "/admin-dashboard/add-admin" },

    ] : [
        { icon: <LayoutDashboard size={20} />, label: "Overview", to: "/user-dashboard" },
        { icon: <PlusCircle size={20} />, label: "Raise Case", to: "/user-dashboard/raise" },
        { icon: <Clock size={20} />, label: "Tracker", to: "/user-dashboard/status" },
        { icon: <BookOpen size={20} />, label: "Academy", to: "/user-dashboard/study" },
        // { icon: <GraduationCap size={20} />, label: "Assessment", to: "/user-dashboard/test" },
        { icon: <Award size={20} />, label: "Credentials", to: "/user-dashboard/certificates" },
    ];

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
            {/* SIDEBAR */}
            <motion.aside
                animate={{ width: isCollapsed ? "100px" : "280px" }}
                className="hidden md:flex flex-col bg-slate-950 border-r border-white/[0.05] z-30"
            >
                <div className="p-8 h-24 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="text-slate-950" size={24} />
                    </div>
                    {!isCollapsed && <span className="text-white font-black text-xl italic tracking-tighter uppercase">NS<span className="text-emerald-500">.</span>HUB</span>}
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
                    {menuItems.map(item => (
                        <Link key={item.to} to={item.to} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === item.to ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>
                            <span className="shrink-0">{item.icon}</span>
                            {!isCollapsed && <span className="uppercase tracking-widest text-[10px] font-black">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-6">
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center justify-center w-full p-3 rounded-xl border border-white/10 text-slate-500 hover:text-emerald-400">
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>
            </motion.aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col relative">
                <header className="h-24 px-8 flex items-center justify-between border-b border-white/[0.05] bg-slate-950/50 backdrop-blur-md z-20">
                    <div className="flex items-center flex-1 max-w-md">
                        <div className="relative w-full hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input type="text" placeholder="Search system logs..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-all text-white" />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        {/* NOTIFICATION FEED */}
                        <div className="relative">
                            <button onClick={() => setShowNotifications(!showNotifications)} className={`relative p-3 rounded-2xl border transition-all ${showNotifications ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}>
                                <Bell size={20} />
                                {notifications.length > 0 && !showNotifications && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse" />}
                            </button>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-4 w-85 bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-50">
                                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Live System Feed</h4>
                                            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-bold uppercase">{notifications.length} Logs</span>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto no-scrollbar">
                                            {notifications.length > 0 ? (
                                                notifications.map(n => (
                                                    <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.02] flex gap-4 transition-colors">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                                            {n.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-center mb-0.5">
                                                                <p className="text-xs font-bold text-white leading-none">{n.title}</p>
                                                                <span className="text-[9px] text-slate-500 font-medium">{n.time}</span>
                                                            </div>
                                                            <p className="text-[11px] text-slate-400 truncate tracking-tight">{n.desc}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-12 text-center text-[10px] font-black text-slate-600 uppercase italic tracking-widest">No Pending Alerts</div>
                                            )}
                                        </div>
                                        <button onClick={handleClearAll} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white bg-white/5 transition-colors">Clear All Activity</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* PROFILE PILL */}
                        <div onClick={() => setShowProfile(true)} className="flex items-center gap-3 pl-4 pr-1.5 py-1.5 bg-slate-900 border border-white/10 rounded-2xl cursor-pointer hover:border-emerald-500/50 transition-all">
                            <div className="text-right hidden md:block">
                                <p className="text-[10px] font-black text-white uppercase italic tracking-tighter leading-none">{name || "Agent"}</p>
                                <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Authorized</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                                <img src={profileImage || `https://ui-avatars.com/api/?name=${name}&background=10b981&color=fff`} className="w-full h-full object-cover" alt="profile" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto"><Outlet /></div>
                </main>
            </div>

            {/* PROFILE OVERLAY */}
            <AnimatePresence>
                {showProfile && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 relative shadow-2xl">
                            <button onClick={() => setShowProfile(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X /></button>
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-emerald-500 p-1 bg-slate-800 mb-6">
                                    <img src={profileImage || `https://ui-avatars.com/api/?name=${name}&background=10b981&color=fff`} className="w-full h-full rounded-[1.7rem] object-cover" alt="profile" />
                                </div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">{name}</h3>
                                <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">{isAdmin ? "Administrator" : "User Terminal"}</p>
                                <div className="w-full space-y-3">
                                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all text-sm font-black uppercase tracking-widest">
                                        <LogOut size={18} /> Terminate Session
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserLayout;