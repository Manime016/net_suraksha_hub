import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ChevronLeft,
    Fingerprint,
    AlertCircle
} from "lucide-react";
import { useState } from "react";
import { loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";


const Login = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const role = searchParams.get("role") || "user";

    const { login } = useAuth();

    // States
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await loginApi({
                email,
                password
            });

            // Save token + role
            login(res.data.token, res.data.role, res.data.name);


            // Redirect based on backend role
            if (res.data.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -top-48 -left-24"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 transition-colors group"
                >
                    <ChevronLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-transform"
                    />{" "}
                    Back to Terminal
                </Link>

                <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col items-center mb-10 pt-4">
                        <div className="w-16 h-16 bg-slate-800 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6">
                            <Fingerprint className="text-emerald-500" size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter text-center uppercase">
                            {role} Access
                        </h2>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-wider"
                        >
                            <AlertCircle size={18} /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                Identity
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500"
                                    size={18}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                Access Key
                            </label>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500"
                                    size={18}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-emerald-500/50"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)]"
                        >
                            <ShieldCheck size={18} /> Initiate Session
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">
                            Secure Authentication Enabled
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
