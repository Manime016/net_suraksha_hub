import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, ShieldCheck, UserPlus, Fingerprint, LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null); // 'login' or 'register'
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    // Handle Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (type) => {
        setActiveDropdown(activeDropdown === type ? null : type);
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 20 } },
        exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${scrolled
                ? "bg-[#020617]/80 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* --- LOGO: Futuristic Style --- */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full group-hover:bg-emerald-500/40 transition-all"></div>
                        <div className="relative w-11 h-11 bg-slate-900 border border-emerald-500/30 rounded-xl flex items-center justify-center shadow-2xl group-hover:border-emerald-400 transition-all">
                            <ShieldCheck className="text-emerald-500 group-hover:scale-110 transition-transform" size={24} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-xl tracking-tighter leading-none">
                            NETSURAKSHA<span className="text-emerald-500">.</span>
                        </span>
                        <span className="text-[10px] text-emerald-500/60 font-bold tracking-[0.2em] uppercase">Security Hub</span>
                    </div>
                </Link>

                {/* --- NAVIGATION LINKS --- */}
                <div className="flex gap-8 items-center">
                    {/* Login Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('login')}
                            className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all ${activeDropdown === 'login' ? "text-emerald-400" : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <Fingerprint size={16} />
                            Login
                            <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'login' ? "rotate-180 text-emerald-400" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {activeDropdown === 'login' && (
                                <motion.div
                                    variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                                    className="absolute right-0 mt-6 w-56 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2 backdrop-blur-2xl"
                                >
                                    <div className="px-4 py-2 mb-1 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">Authentication</div>
                                    <DropdownLink to="/login?role=user" icon={<User size={16} />} label="User Portal" sub="Access your cases" />
                                    <DropdownLink to="/login?role=admin" icon={<LayoutDashboard size={16} />} label="Admin Node" sub="System management" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Register Button: Cyber Shape */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('register')}
                            className="group relative px-6 py-2.5 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-widest overflow-hidden transition-all active:scale-95 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <UserPlus size={16} />
                                Register
                            </span>
                            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 opacity-20"></div>
                        </button>

                        <AnimatePresence>
                            {activeDropdown === 'register' && (
                                <motion.div
                                    variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                                    className="absolute right-0 mt-6 w-60 bg-[#0f172a] border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2 backdrop-blur-2xl"
                                >
                                    <div className="px-4 py-2 mb-1 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">New Connection</div>
                                    <DropdownLink to="/register?role=user" icon={<UserPlus size={16} />} label="User Registration" sub="Join the network" />
                                    {/* <DropdownLink to="/register?role=admin" icon={<ShieldCheck size={16} />} label="Admin Request" sub="Special access" /> */}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- ENHANCED DROPDOWN ITEM ---
const DropdownLink = ({ to, icon, label, sub }) => (
    <Link
        to={to}
        className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all group"
    >
        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-bold leading-none mb-1">{label}</span>
            <span className="text-[10px] text-slate-600 font-medium group-hover:text-emerald-500/50 transition-colors uppercase tracking-tighter">{sub}</span>
        </div>
    </Link>
);

export default Navbar;