import React, { useEffect, useState } from "react";
import axios from "axios";
import { Award, ShieldCheck, Mail, Lock, XCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

const ApproveCertificates = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/admin/pending-certificates`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setRequests(res.data || []))
            .catch(err => console.error("Fetch failed", err))
            .finally(() => setLoading(false));
    }, []);

    const approveCertificate = async (testResultId) => {
        await axios.post(
            `${API_BASE_URL}/api/admin/approve-certificate`,
            { testResultId },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setRequests(prev => prev.filter(r => r._id !== testResultId));
    };

    const rejectCertificate = async (testResultId) => {
        await axios.post(
            `${API_BASE_URL}/api/admin/reject-certificate`,
            { testResultId },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setRequests(prev => prev.filter(r => r._id !== testResultId));
    };

    if (loading) {
        return <p className="text-slate-400">Loading…</p>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black text-white uppercase italic">
                Certificate <span className="text-blue-500">Approvals</span>
            </h1>

            {requests.length === 0 && (
                <p className="text-slate-500">No pending certificates 🎉</p>
            )}

            {requests.map(req => {
                const isEligible = req.percentage >= 80;

                return (
                    <div
                        key={req._id}
                        className="p-8 bg-slate-900/40 border border-white/5 rounded-2xl flex justify-between items-center"
                    >
                        <div className="flex gap-6 items-center">
                            <Award className="text-blue-500" size={32} />
                            <div>
                                <h4 className="text-white text-lg font-bold">
                                    {req.user?.name || "Unknown User"}
                                </h4>

                                <p className="text-xs text-slate-500 uppercase tracking-widest">
                                    {req.course?.title || "Unknown Course"} • {req.percentage}%
                                </p>

                                <p className="text-xs text-slate-500">
                                    Score: {req.score}/{req.total}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                disabled={!isEligible}
                                onClick={() => approveCertificate(req._id)}
                                className={`px-5 py-2 text-xs font-black uppercase rounded-xl
                                    ${isEligible
                                        ? "bg-emerald-600 text-white hover:bg-emerald-500"
                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                    }`}
                            >
                                {isEligible ? <ShieldCheck size={14} /> : <Lock size={14} />}
                                {isEligible ? "Approve" : "Below 80%"}
                            </button>

                            <button
                                onClick={() => rejectCertificate(req._id)}
                                className="px-5 py-2 text-xs font-black uppercase rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white"
                            >
                                <XCircle size={14} /> Reject
                            </button>

                            <button className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white">
                                <Mail size={16} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ApproveCertificates;
