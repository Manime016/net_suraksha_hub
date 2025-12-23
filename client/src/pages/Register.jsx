import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    UserPlus,
    Mail,
    Lock,
    User,
    ChevronLeft,
    ShieldCheck,
    Users,
    ShieldAlert,
    Fingerprint
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/authService";

const Register = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const role = searchParams.get("role") || "user";

    const { login } = useAuth();

    // STATES
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await API.post("/auth/register", {
                name,
                email,
                password
            });

            // Auto login after register
            login(res.data.token, res.data.role, res.data.name);


            if (res.data.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

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
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6 transition-colors group"
                >
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

                    {/* ERROR */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold uppercase tracking-wider">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                    Legal Name
                                </label>
                                <div className="relative group">
                                    <User
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                    Classification
                                </label>
                                <div className="relative group">
                                    <Users
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors"
                                        size={18}
                                    />
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                Network Identity (Email)
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors"
                                    size={18}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="operator@netsuraksha.hub"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                Security Key
                            </label>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors"
                                    size={18}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong key"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading} className="w-full relative group mt-6">
                            <div className="relative py-4 bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all">
                                <Fingerprint size={18} />
                                {loading ? "Creating..." : "Create Node Access"}
                            </div>
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <Link
                            to="/login"
                            className="text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors"
                        >
                            Already have access? <span className="text-emerald-500">Authenticate Here</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
