import React, { useEffect, useState } from "react";
import axios from "axios";
import { Award, ShieldCheck, Mail, Lock, XCircle, CheckCircle2, Clock } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

const ApproveCertificates = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("pending"); // Toggle between "pending" and "approved"

    // 1. Unified Fetching Logic
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/api/admin/pending-certificates`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // This now contains ALL certificates with their status (PENDING/APPROVED)
            setRequests(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 2. Action Logic (Approving/Rejecting)
    const handleAction = async (action, certId) => {
        try {
            const token = localStorage.getItem("token");

            // Matches backend route: /api/admin/approve-certificate
            await axios.post(
                `${API_BASE_URL}/api/admin/${action}-certificate`,
                { certificateId: certId }, // Sending the correct key for the backend
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // REFRESH: This moves the student from Pending to Approved tab
            fetchData();
        } catch (err) {
            console.error("Action error:", err.response);
            alert(`Action failed: ${err.response?.data?.message || "Check server connection"}`);
        }
    };

    // 3. Local Filtering based on the current Tab
    const filteredData = requests.filter(req =>
        view === "pending" ? req.status === "PENDING" : req.status === "APPROVED"
    );

    if (loading) return <div className="p-10 text-blue-500 font-bold animate-pulse">LOADING DATA...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <h1 className="text-3xl font-black text-white uppercase italic">
                    Certificate <span className="text-blue-500">Vault</span>
                </h1>

                {/* TAB TOGGLE SYSTEM */}
                <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/10">
                    <button
                        onClick={() => setView("pending")}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${view === 'pending' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-white'}`}
                    >
                        Pending Requests
                    </button>
                    <button
                        onClick={() => setView("approved")}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${view === 'approved' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-500 hover:text-white'}`}
                    >
                        Approved Vault
                    </button>
                </div>
            </div>

            {filteredData.length === 0 ? (
                <div className="py-20 text-center bg-slate-900/20 rounded-3xl border border-dashed border-white/5">
                    <p className="text-slate-500 font-bold uppercase tracking-widest">No {view} records found</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredData.map(req => {
                        const isEligible = req.percentage >= 80;
                        return (
                            <div key={req._id} className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
                                <div className="flex gap-6 items-center">
                                    <div className={`p-4 rounded-2xl ${view === 'pending' ? 'bg-blue-500/10' : 'bg-emerald-500/10'}`}>
                                        <Award className={view === 'pending' ? "text-blue-500" : "text-emerald-500"} size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-lg font-bold">{req.user?.name || "Student"}</h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                                            {req.course?.title} • <span className={isEligible ? "text-emerald-500" : "text-red-500"}>Score: {req.percentage}%</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {view === "pending" ? (
                                        <>
                                            <button
                                                disabled={!isEligible}
                                                onClick={() => handleAction("approve", req._id)}
                                                className={`flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all
                                                    ${isEligible ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}
                                            >
                                                {isEligible ? <ShieldCheck size={14} /> : <Lock size={14} />}
                                                {isEligible ? "Approve" : "Low Score"}
                                            </button>
                                            <button
                                                onClick={() => handleAction("reject", req._id)}
                                                className="p-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                            <CheckCircle2 size={14} /> Verified & Issued
                                        </div>
                                    )}
                                    <button className="p-3 bg-slate-800 rounded-xl text-slate-500 hover:text-white border border-white/5">
                                        <Mail size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ApproveCertificates;