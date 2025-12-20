import React from "react";
import { motion } from "framer-motion";
import {
    ShieldAlert, Lock, Zap, Activity, Fingerprint,
    Terminal, Globe, MousePointerClick, ShieldCheck,
    ChevronRight, Twitter, Linkedin, Github
} from "lucide-react";
import Navbar from "../components/Navbar";

const Landing = () => {
    return (
        <div className="bg-[#020617] text-slate-300 selection:bg-emerald-500/30 font-sans overflow-x-hidden">
            <Navbar />

            {/* --- HERO: RADAR SCAN SECTION --- */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Ambient Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            <Activity size={14} className="animate-pulse" /> Secure Connection Established
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
                            SHIELDING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CITIZENS.</span>
                        </h1>

                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                            The next-generation protocol for cyber complaint intelligence,
                            identity verification, and safety education.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="px-10 py-5 bg-emerald-500 text-black font-black uppercase tracking-widest text-sm rounded-none hover:bg-emerald-400 transition-all [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                                Initialize Portal
                            </button>
                            <button className="flex items-center gap-3 text-white font-bold text-sm tracking-widest uppercase hover:text-emerald-400 transition-colors">
                                <Terminal size={18} /> View Security Docs
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURE MATRIX (The "Effective" Section) --- */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        {/* Large Interactive Feature */}
                        <div className="md:col-span-2 md:row-span-2 bg-slate-900/40 border border-slate-800 p-12 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                                <Fingerprint size={120} className="text-emerald-500" />
                            </div>
                            <ShieldAlert className="text-emerald-500 mb-8" size={48} />
                            <h3 className="text-4xl font-bold text-white mb-6 italic">Secure Filing Engine</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Proprietary end-to-end encryption for all cyber complaint submissions.
                                Our "Chain of Custody" tech ensures evidence remains tamper-proof for admin review.
                            </p>
                            <ul className="space-y-3">
                                {['Metadata Stripping', 'AES-256 Encryption', 'IP Masking'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-xs font-bold text-emerald-500/80">
                                        <ShieldCheck size={14} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Feature 2: Academy */}
                        <div className="md:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 p-10 rounded-3xl flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 opacity-20">
                                <Globe size={200} />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4">Cyber Academy</h3>
                            <p className="text-emerald-100/80 mb-6 max-w-sm">From Phishing basics to Advanced Network Security. Earn verified credentials vetted by industry leads.</p>
                            <button className="w-fit px-6 py-2 bg-black text-white text-xs font-bold rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                                Explore Courses <ChevronRight size={14} />
                            </button>
                        </div>

                        {/* Feature 3: Admin Flow */}
                        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:bg-slate-800/40 transition-all group">
                            <Zap className="text-yellow-500 mb-6 group-hover:animate-bounce" size={32} />
                            <h4 className="text-xl font-bold text-white mb-2">Instant Alerts</h4>
                            <p className="text-slate-500 text-sm italic">Get notified the second an admin reviews your case.</p>
                        </div>

                        {/* Feature 4: Certificates */}
                        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:bg-slate-800/40 transition-all">
                            <Lock className="text-emerald-500 mb-6" size={32} />
                            <h4 className="text-xl font-bold text-white mb-2">Smart Proof</h4>
                            <p className="text-slate-500 text-sm italic">Every certificate is backed by a unique hash for verification.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- THE "LIVE DATA" STRIP --- */}
            <div className="border-y border-slate-800 bg-slate-900/20 py-10">
                <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2 font-black italic text-2xl"><span>12.4K</span><span className="text-xs text-slate-500 uppercase not-italic">Threats Neutralized</span></div>
                    <div className="flex items-center gap-2 font-black italic text-2xl"><span>99.9%</span><span className="text-xs text-slate-500 uppercase not-italic">Safety Rating</span></div>
                    <div className="flex items-center gap-2 font-black italic text-2xl"><span>24/7</span><span className="text-xs text-slate-500 uppercase not-italic">Admin Vetting</span></div>
                </div>
            </div>

            {/* --- ULTIMATE FOOTER --- */}
            <footer className="pt-24 pb-12 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
                        <div className="max-w-xs">
                            <h2 className="text-2xl font-black text-white tracking-tighter mb-6 flex items-center gap-2">
                                NETSURAKSHA<span className="text-emerald-500 text-4xl">.</span>
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                Building the digital iron-dome for citizen safety and organizational accountability.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={<Twitter size={20} />} />
                                <SocialIcon icon={<Linkedin size={20} />} />
                                <SocialIcon icon={<Github size={20} />} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                            <FooterGroup title="Platform" links={['Incidents', 'Learning', 'Verification']} />
                            <FooterGroup title="Company" links={['Manifesto', 'Privacy', 'Compliance']} />
                            <FooterGroup title="Node" links={['India Central', 'API Status', 'Support']} />
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
                        <p>© 2025 NS.HUB DIGITAL DEFENSE SYSTEM</p>
                        <div className="flex gap-8 items-center">
                            <span className="flex items-center gap-1 text-emerald-500"><MousePointerClick size={12} /> Interaction: Ready</span>
                            <span>Encryption: RSA-4096</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-all rounded-lg">
        {icon}
    </a>
);

const FooterGroup = ({ title, links }) => (
    <div>
        <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">{title}</h4>
        <ul className="space-y-4">
            {links.map(link => (
                <li key={link}><a href="#" className="text-slate-600 text-sm hover:text-emerald-400 transition-colors font-medium">{link}</a></li>
            ))}
        </ul>
    </div>
);

export default Landing;