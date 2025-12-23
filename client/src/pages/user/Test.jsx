import React, { useState, useEffect } from "react";
import {
    Target,
    Award,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";

const Test = ({
    courseTitle,
    onStart,
    isTakingTest,
    questions = [],
    submitTest,
    userAnswers,
    setUserAnswers,
    testResults,
    certStatus,
    setCertStatus
}) => {
    // Calculate total time: 20s per question
    const timePerQuestion = 20;
    const initialTime = questions.length * timePerQuestion;

    // Timer state
    const [timeLeft, setTimeLeft] = useState(initialTime);

    /* ---------------- TIMER LOGIC ---------------- */
    useEffect(() => {
        let timer;
        if (isTakingTest && !testResults && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isTakingTest && !testResults) {
            // AUTO-TERMINATE SESSION
            submitTest();
        }

        return () => clearInterval(timer);
    }, [isTakingTest, testResults, timeLeft, submitTest]);

    // Reset timer specifically when questions change or test restarts
    useEffect(() => {
        if (!isTakingTest) {
            setTimeLeft(questions.length * timePerQuestion);
        }
    }, [questions.length, isTakingTest]);

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    /* ---------------- RESULT SCREEN ---------------- */
    if (testResults) {
        return (
            <div className="max-w-2xl mx-auto text-center py-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <h2 className="text-8xl font-black text-white italic mb-4">
                        {testResults.percentage}%
                    </h2>

                    {testResults.passed ? (
                        <div className="bg-emerald-500/10 p-12 rounded-[3.5rem] border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                            <Award size={80} className="text-emerald-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-black text-white italic uppercase mb-4">
                                Node Cleared
                            </h3>

                            {certStatus === "pending" ? (
                                <p className="text-emerald-500 font-black animate-pulse uppercase tracking-[0.3em] text-xs">
                                    Transmitting to Admin...
                                </p>
                            ) : certStatus === "approved" ? (
                                <div className="bg-emerald-500 text-slate-950 p-5 rounded-2xl font-black flex items-center justify-center gap-3 italic">
                                    <CheckCircle2 /> CERTIFICATE GRANTED
                                </div>
                            ) : (
                                <button
                                    onClick={() => setCertStatus("pending")}
                                    className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase italic hover:bg-emerald-400 transition-all flex items-center gap-3 mx-auto"
                                >
                                    Claim Certificate <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="bg-red-500/10 p-10 rounded-[3rem] border border-red-500/20">
                            <p className="text-white font-bold mb-6 uppercase tracking-widest">
                                Failure: Threshold Not Met
                            </p>
                            <button
                                onClick={() => {
                                    setUserAnswers({});
                                    setCertStatus("idle");
                                    onStart();
                                }}
                                className="bg-red-500 text-white px-10 py-4 rounded-xl font-black uppercase italic hover:bg-red-600 transition-colors"
                            >
                                Re-initialize Session
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        );
    }

    /* ---------------- ACTIVE TEST SCREEN ---------------- */
    if (isTakingTest) {
        const isCritical = timeLeft < 20; // Last 20 seconds warning

        return (
            <div className="max-w-3xl mx-auto pb-20">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6 sticky top-0 bg-[#020617]/90 backdrop-blur-md z-20 pt-4">
                    <h2 className="text-2xl font-black text-white uppercase italic">
                        Active Assessment
                    </h2>

                    {/* DYNAMIC TIMER */}
                    <div className={`flex items-center gap-4 px-6 py-2 rounded-2xl border transition-all duration-500 ${isCritical ? "bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "bg-slate-900 border-white/10"
                        }`}>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Time Remaining</p>
                            <p className={`text-xl font-mono font-black ${isCritical ? "text-red-500 animate-pulse" : "text-blue-500"}`}>
                                {formatTime(timeLeft)}
                            </p>
                        </div>
                        <Clock className={isCritical ? "text-red-500" : "text-slate-500"} size={24} />
                    </div>
                </div>

                <div className="space-y-6 text-left">
                    {questions.map((q, i) => (
                        <div key={q._id} className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors">
                            <p className="text-white font-bold mb-6 text-lg">
                                <span className="text-blue-500 mr-2">{i + 1}.</span> {q.q}
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                                {q.options.map((opt, oi) => (
                                    <button
                                        key={oi}
                                        onClick={() => setUserAnswers({ ...userAnswers, [q._id]: oi })}
                                        className={`p-5 rounded-2xl border text-sm text-left transition-all
                                            ${userAnswers[q._id] === oi
                                                ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                                                : "bg-slate-950 border-white/5 text-slate-400 hover:border-blue-500/50"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={submitTest}
                        className="w-full py-6 bg-emerald-500 text-slate-950 font-black uppercase italic text-lg rounded-3xl hover:bg-white transition-all transform active:scale-[0.98]"
                    >
                        Verify Data & Terminate
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------- START SCREEN ---------------- */
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-xl w-full bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-12 text-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                    <Target className="text-emerald-500" size={40} />
                </div>
                <h1 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tight">
                    Assessment Node
                </h1>
                <p className="text-slate-500 text-sm mb-10 italic">
                    Certification module for: <span className="text-white font-bold">{courseTitle}</span>
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10 text-left">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Pass Mark</p>
                        <p className="text-sm font-bold text-white">80%</p>
                    </div>
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Items</p>
                        <p className="text-sm font-bold text-white">{questions.length} Units</p>
                    </div>
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-blue-500/60 uppercase mb-1">Allocated</p>
                        <p className="text-sm font-bold text-blue-400">{formatTime(initialTime)}</p>
                    </div>
                </div>

                <button
                    onClick={onStart}
                    className="w-full py-5 bg-emerald-500 text-slate-950 font-black uppercase italic rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
                >
                    <Zap size={20} fill="currentColor" /> Initialize Exam
                </button>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-3 text-amber-500/50 uppercase text-[8px] font-black tracking-[0.2em]">
                    <AlertTriangle size={14} /> Warning: Timer active (20s / unit)
                </div>
            </div>
        </div>
    );
};

export default Test;