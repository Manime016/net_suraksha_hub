

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Shield, LayoutGrid, X, QrCode, Printer, Edit2, Medal, Award, CheckCircle, RefreshCcw } from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const Certificate = () => {
    const [certifications, setCertifications] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const [scale, setScale] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // New State
    const [studentName, setStudentName] = useState("");

    // 1. Reusable fetch function
    const fetchData = async (isManual = false) => {
        if (isManual) setIsRefreshing(true);
        try {
            const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
            const [userRes, certRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/auth/me`, config),
                axios.get(`${API_BASE_URL}/api/certificates/my`, config)
            ]);
            setStudentName(userRes.data?.name || userRes.data?.user?.name || "RAVI BASAVARAJ");
            setCertifications(certRes.data || []);
        } catch (err) {
            console.error("Data fetch error", err);
        } finally {
            setLoading(false);
            if (isManual) setTimeout(() => setIsRefreshing(false), 600); // Small delay for visual feedback
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (!selectedCert) return;
        const handleResize = () => {
            // Keep the same scaling logic for the preview window
            const scaleW = (window.innerWidth * 0.9) / 1000;
            const scaleH = (window.innerHeight * 0.7) / 700;
            setScale(Math.min(scaleW, scaleH, 1));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [selectedCert]);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-8 relative overflow-hidden font-sans">
            {/* ELITE BACKGROUND AMBIANCE */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>


            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-10 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">System Online</span>
                        </div>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                            NetSuraksha<span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">Hub</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* REFRESH BUTTON ADDED HERE */}
                        <button
                            onClick={() => fetchData(true)}
                            disabled={isRefreshing}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all active:scale-90 group"
                        >
                            <RefreshCcw
                                size={20}
                                className={`${isRefreshing ? "animate-spin text-emerald-500" : "text-slate-500 group-hover:text-emerald-400"}`}
                            />
                        </button>

                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                            <div className="text-right">
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Session</p>
                                <p className="text-sm font-black text-white uppercase tracking-tight">{studentName || "USER_VERIFIED"}</p>
                            </div>
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <ShieldCheck className="text-emerald-500" size={20} />
                            </div>
                        </div>
                    </div>
                </header>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        <div className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
                            Accessing Secure Vault...
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certifications.map((cert) => (
                            <div
                                key={cert._id}
                                onClick={() => cert.status === "APPROVED" && setSelectedCert(cert)}
                                className={`relative group p-8 rounded-[2rem] border transition-all duration-500 
                            ${cert.status === "APPROVED"
                                        ? "bg-slate-900/40 border-white/5 cursor-pointer hover:border-emerald-500/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] hover:-translate-y-2"
                                        : "bg-slate-950/40 border-white/5 opacity-50 grayscale cursor-not-allowed"}`}
                            >
                                {/* Interactive Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className={`p-4 rounded-2xl transition-all duration-500 shadow-xl 
                                    ${cert.status === "APPROVED"
                                                ? "bg-white/5 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110"
                                                : "bg-slate-800 text-slate-500"}`}>
                                            <Medal size={28} strokeWidth={1.5} />
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border block mb-2
                                        ${cert.status === "APPROVED"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                                                    : "bg-slate-800 text-slate-500 border-white/5"}`}>
                                                {cert.status}
                                            </span>
                                            <span className="text-[8px] font-mono text-slate-600 uppercase">REF_ID: {cert._id?.slice(-8)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
                                            {cert.title || cert.courseTitle}
                                        </h3>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-2">
                                                    {[1, 2].map(i => (
                                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                                            <Shield size={10} className="text-slate-500" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Verified Asset</span>
                                            </div>

                                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:translate-x-1 transition-transform">
                                                Open <LayoutGrid size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Accent - Top Right Corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex flex-col items-center justify-start pt-12 bg-slate-950/98 backdrop-blur-xl print:bg-white print:p-0 print:justify-center"
                    >
                        {/* FIXED CONTROL BAR - Separated from the certificate to prevent overlap */}
                        <div className="w-full flex justify-between items-center mb-10 max-w-[1000px] px-8 print:hidden">
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl uppercase font-black text-xs tracking-widest flex items-center gap-3 transition-all border border-white/10"
                            >
                                <X size={20} /> Exit Preview
                            </button>

                            <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-5 py-2.5 rounded-full border border-emerald-500/20 flex items-center gap-2">
                                <Edit2 size={12} /> DOUBLE CLICK NAME TO EDIT
                            </div>

                            <button
                                onClick={() => window.print()}
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center gap-3 transition-all transform active:scale-95"
                            >
                                <Printer size={20} /> Download PDF
                            </button>
                        </div>

                        {/* CERTIFICATE SCALE WRAPPER - Exact same logic, improved design */}
                        <div style={{ transform: `scale(${scale})` }} className="origin-top print:transform-none">
                            <div id="printable-area" className="final-cert-canvas">

                                {/* Professional Decorative Layers */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.03]" />
                                <div className="layer-outer-border" />
                                <div className="layer-inner-border" />

                                {/* Corner Geometry */}
                                <div className="corner-geo tl" />
                                <div className="corner-geo tr" />
                                <div className="corner-geo bl" />
                                <div className="corner-geo br" />

                                <div className="cert-main-content">
                                    {/* Top Branding */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative mb-4">
                                            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center rotate-45 border-2 border-emerald-500 shadow-xl">
                                                <ShieldCheck className="text-emerald-500 -rotate-45" size={45} />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center border-2 border-white">
                                                <CheckCircle className="text-white" size={14} />
                                            </div>
                                        </div>
                                        <h2 className="text-[14px] font-black uppercase tracking-[0.6em] text-slate-800">NetSuraksha Hub Authority</h2>
                                        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mt-2" />
                                    </div>

                                    {/* Recipient Section */}
                                    <div className="my-8">
                                        <p className="font-serif italic text-2xl text-slate-500 mb-2">This is to certify that</p>
                                        <input
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            spellCheck="false"
                                            className="cert-name-input"
                                            placeholder="RECIPIENT NAME"
                                        />
                                        <div className="w-3/4 h-[1px] bg-slate-200 mx-auto mt-2" />
                                    </div>

                                    {/* Course Section */}
                                    <div className="mb-10">
                                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Has successfully attained professional mastery in</p>
                                        <div className="inline-block px-12 py-5 bg-slate-50 border-y-2 border-slate-900">
                                            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
                                                {selectedCert.title || selectedCert.courseTitle || "CYBERSECURITY ANALYST"}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Footer Section */}
                                    <div className="cert-footer-grid">
                                        <div className="flex flex-col items-start border-l-4 border-emerald-600 pl-5">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Issue</span>
                                            <span className="text-lg font-bold text-slate-900">December 23, 2025</span>
                                        </div>

                                        <div className="flex flex-col items-center relative">
                                            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm mb-2">
                                                <QrCode size={55} className="text-slate-900" />
                                            </div>
                                            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Verification ID: {selectedCert._id?.toUpperCase().slice(-8) || "NSH-9921"}</span>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            {/* Dummy Signature Area */}
                                            <div className="relative w-48 text-center">
                                                <p className="signature-font">N. Suraksha</p>
                                                <div className="w-full h-[2px] bg-slate-900 mt-[-10px]" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Director of Certification</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

                .final-cert-canvas {
                    width: 1000px;
                    height: 700px;
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                    color: #0f172a;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                }

                .layer-outer-border { position: absolute; inset: 20px; border: 10px double #0f172a; }
                .layer-inner-border { position: absolute; inset: 40px; border: 1px solid rgba(16, 185, 129, 0.2); }

                .corner-geo { position: absolute; width: 100px; height: 100px; border-color: #059669; border-style: solid; }
                .tl { top: 0; left: 0; border-width: 15px 0 0 15px; }
                .tr { top: 0; right: 0; border-width: 15px 15px 0 0; }
                .bl { bottom: 0; left: 0; border-width: 0 0 15px 15px; }
                .br { bottom: 0; right: 0; border-width: 0 15px 15px 0; }

                .cert-main-content {
                    position: relative;
                    z-index: 10;
                    height: 100%;
                    padding: 80px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    text-align: center;
                }

                .cert-name-input {
                    width: 100%;
                    text-align: center;
                    font-size: 72px;
                    font-weight: 900;
                    text-transform: uppercase;
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #0f172a;
                    font-style: italic;
                    letter-spacing: -0.02em;
                }

                .cert-footer-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    align-items: end;
                }

                .signature-font {
                    font-family: 'Great Vibes', cursive;
                    font-size: 38px;
                    color: #1e293b;
                    margin: 0;
                }

                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 0 !important;
                    }
                    html, body {
                        width: 100% !important;
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }
                    body * { visibility: hidden !important; }
                    #printable-area, #printable-area * {
                        visibility: visible !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    #printable-area {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) !important;
                        width: 297mm;
                        height: 210mm;
                        margin: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }
                    .cert-main-content { padding: 15mm; }
                }
            `}</style>
        </div >
    );
};

export default Certificate;