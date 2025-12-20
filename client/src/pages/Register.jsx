import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    UserPlus, Mail, Lock, User,
    ChevronLeft, ShieldCheck, Users,
    ShieldAlert, Fingerprint
} from "lucide-react";
import { useState } from "react";

const Register = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "user";
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background High-Tech Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b9810a_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-lg my-12"
            >
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6 transition-colors group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Exit to Terminal
                </Link>

                {/* Registration Container */}
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">

                    {/* Security Badge */}
                    <div className="absolute top-0 right-0 px-8 py-3 bg-emerald-500/10 border-b border-l border-white/10 rounded-bl-3xl">
                        <div className="flex items-center gap-2">
                            <ShieldAlert size={14} className="text-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                                New {role} Node
                            </span>
                        </div>
                    </div>

                    <div className="mb-10 pt-4">
                        <h2 className="text-4xl font-black text-white tracking-tighter mb-2">
                            INITIALIZE<span className="text-emerald-500">_</span>
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">
                            Create your secure identity on the NetSuraksha network.
                        </p>
                    </div>

                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Legal Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Gender Select */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Classification</label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <select className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all cursor-pointer">
                                        <option className="bg-slate-900">Select Gender</option>
                                        <option className="bg-slate-900" value="male">Male</option>
                                        <option className="bg-slate-900" value="female">Female</option>
                                        <option className="bg-slate-900" value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Network Identity (Email)</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    placeholder="operator@netsuraksha.hub"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Security Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    placeholder="Create a strong key"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full relative group mt-6"
                        >
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/40 transition-all opacity-0 group-hover:opacity-100"></div>
                            <div className="relative py-4 bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)]">
                                <Fingerprint size={18} /> Create Node Access
                            </div>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <Link to="/login" className="text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors">
                            Already have access? <span className="text-emerald-500">Authenticate Here</span>
                        </Link>
                        <div className="flex items-center justify-center gap-4 mt-6 opacity-20 grayscale">
                            <ShieldCheck size={24} />
                            <Lock size={24} />
                            <Fingerprint size={24} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;