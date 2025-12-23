// import React, { useState, useEffect } from "react";
// import {
//     Shield, Activity, Cpu, Lock,
//     CheckCircle2, Zap, Sparkles
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Test from "./Test";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";

// const StudyMaterial = () => {
//     const [courses, setCourses] = useState([]);
//     const [activeCourse, setActiveCourse] = useState(null);
//     const [activeChapter, setActiveChapter] = useState(null);

//     // ✅ courseId -> [chapterIds]
//     const [completedChapters, setCompletedChapters] = useState({});

//     const [isTakingTest, setIsTakingTest] = useState(false);
//     const [userAnswers, setUserAnswers] = useState({});
//     const [testResults, setTestResults] = useState(null);
//     const [certStatus, setCertStatus] = useState("idle");

//     /* ================= FETCH COURSES ================= */
//     useEffect(() => {
//         const fetchCourses = async () => {
//             const res = await axios.get(`${API_BASE_URL}/api/courses`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             });
//             setCourses(res.data);
//         };
//         fetchCourses();
//     }, []);

//     /* ================= HELPERS ================= */
//     const getAllChapters = (course) =>
//         course?.modules?.flatMap(m => m.chapters || []) || [];

//     const getAllQuestions = (course) =>
//         course?.modules?.flatMap(m => m.questions || []) || [];

//     const calculateProgress = (course) => {
//         const total = getAllChapters(course).length;
//         const completed = completedChapters[course._id] || [];
//         if (total === 0) return 0;
//         return Math.round((completed.length / total) * 100);
//     };

//     const currentProgress = activeCourse
//         ? calculateProgress(activeCourse)
//         : 0;

//     /* ================= OPEN COURSE ================= */
//     const launchCourse = async (course) => {
//         setActiveCourse(course);
//         setActiveChapter(course.modules[0]?.chapters[0] || null);
//         setIsTakingTest(false);
//         setUserAnswers({});
//         setTestResults(null);
//         setCertStatus("idle");

//         const res = await axios.get(
//             `${API_BASE_URL}/api/user/progress/${course._id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             }
//         );

//         setCompletedChapters(prev => ({
//             ...prev,
//             [course._id]: res.data.completedChapters || []
//         }));
//     };

//     /* ================= MARK CHAPTER COMPLETE ================= */
//     const markChapterComplete = async () => {
//         try {
//             await axios.post(
//                 `${API_BASE_URL}/api/courses/complete-chapter`,
//                 {
//                     courseId: activeCourse._id,
//                     chapterId: activeChapter._id
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`
//                     }
//                 }
//             );

//             setCompletedChapters(prev => ({
//                 ...prev,
//                 [activeCourse._id]: prev[activeCourse._id]
//                     ? [...new Set([...prev[activeCourse._id], activeChapter._id])]
//                     : [activeChapter._id]
//             }));
//         } catch (err) {
//             console.error("Failed to mark chapter complete", err);
//             alert("Something went wrong");
//         }
//     };

//     /* ================= SUBMIT TEST ================= */
//     const handleTestSubmit = async () => {
//         const res = await axios.post(
//             `${API_BASE_URL}/api/tests/submit`,
//             {
//                 courseId: activeCourse._id,
//                 answers: userAnswers
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             }
//         );

//         setTestResults(res.data);
//     };

//     return (
//         <div className="min-h-screen bg-[#020617] text-slate-300 font-sans overflow-x-hidden">
//             <div className="max-w-7xl mx-auto px-6 py-12">

//                 {/* HEADER */}
//                 <header className="flex justify-between mb-16 border-l-4 border-blue-600 pl-6">
//                     <div>
//                         <div className="flex items-center gap-2 mb-2">
//                             <Shield className="text-blue-500" size={16} />
//                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/80">
//                                 Operator Panel
//                             </span>
//                         </div>
//                         <h1 className="text-5xl font-black text-white uppercase italic">
//                             Academy
//                         </h1>
//                     </div>
//                     <div className="text-right">
//                         <p className="text-[10px] text-slate-500 uppercase font-bold">
//                             Status
//                         </p>
//                         <p className="text-emerald-500 text-xs font-black uppercase flex items-center gap-2">
//                             <Activity size={12} /> Live
//                         </p>
//                     </div>
//                 </header>

//                 {/* COURSE GRID */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {courses.map(course => (
//                         <motion.div
//                             key={course._id}
//                             whileHover={{ y: -5 }}
//                             className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8"
//                         >
//                             <Cpu className="absolute top-6 right-6 text-blue-500/10" size={60} />
//                             <h2 className="text-2xl font-black text-white mb-6 italic uppercase">
//                                 {course.title}
//                             </h2>
//                             <button
//                                 onClick={() => launchCourse(course)}
//                                 className="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-[10px]"
//                             >
//                                 Establish Link
//                             </button>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* COURSE VIEW */}
//             <AnimatePresence>
//                 {activeCourse && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-[#020617] p-6 z-[200]"
//                     >
//                         <div className="bg-slate-950 border border-white/10 rounded-[2.5rem] h-full flex flex-col">

//                             {/* TOP BAR */}
//                             <div className="px-10 py-6 border-b border-white/5 flex justify-between">
//                                 <div>
//                                     <h2 className="text-white font-black italic uppercase">
//                                         {activeCourse.title}
//                                     </h2>
//                                     <p className="text-[10px] text-blue-400 font-black uppercase">
//                                         Progress: {currentProgress}%
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={() => setActiveCourse(null)}
//                                     className="bg-white/5 px-6 py-2 rounded-xl text-xs font-black uppercase"
//                                 >
//                                     Exit
//                                 </button>
//                             </div>

//                             <div className="flex flex-1 overflow-hidden">

//                                 {/* SIDEBAR */}
//                                 <aside className="w-72 bg-slate-950 p-6 border-r border-white/5 overflow-y-auto">
//                                     {activeCourse.modules.map(m => (
//                                         <div key={m._id} className="mb-6">
//                                             <p className="text-[10px] font-black text-slate-600 uppercase mb-2">
//                                                 {m.name}
//                                             </p>
//                                             {m.chapters.map(c => (
//                                                 <button
//                                                     key={c._id}
//                                                     onClick={() => {
//                                                         setActiveChapter(c);
//                                                         setIsTakingTest(false);
//                                                     }}
//                                                     className="w-full flex items-center gap-3 p-3 rounded-xl text-[11px] font-black uppercase hover:bg-white/5"
//                                                 >
//                                                     {completedChapters[activeCourse._id]?.includes(c._id)
//                                                         ? <CheckCircle2 size={14} className="text-cyan-400" />
//                                                         : <Zap size={14} />}
//                                                     {c.title}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     ))}

//                                     <button
//                                         onClick={() => setActiveChapter({ id: "TEST" })}
//                                         className="w-full mt-4 p-4 border-2 border-dashed rounded-xl text-xs font-black uppercase"
//                                     >
//                                         {currentProgress >= 75
//                                             ? <Sparkles size={14} />
//                                             : <Lock size={14} />}
//                                         Final Test
//                                     </button>
//                                 </aside>

//                                 {/* CONTENT */}
//                                 <main className="flex-1 p-12 overflow-y-auto">
//                                     {activeChapter?.id === "TEST" ? (
//                                         <Test
//                                             courseTitle={activeCourse.title}
//                                             onStart={() => setIsTakingTest(true)}
//                                             isTakingTest={isTakingTest}
//                                             questions={getAllQuestions(activeCourse)}
//                                             submitTest={handleTestSubmit}
//                                             userAnswers={userAnswers}
//                                             setUserAnswers={setUserAnswers}
//                                             testResults={testResults}
//                                             certStatus={certStatus}
//                                             setCertStatus={setCertStatus}
//                                         />
//                                     ) : (
//                                         <div>
//                                             <h1 className="text-5xl font-black text-white mb-6 italic">
//                                                 {activeChapter.title}
//                                             </h1>
//                                             <div className="bg-slate-950 p-8 rounded-2xl mb-8">
//                                                 {activeChapter.content}
//                                             </div>
//                                             <button
//                                                 onClick={markChapterComplete}
//                                                 className={`px-10 py-5 rounded-2xl font-black text-xs uppercase
//                                                 ${completedChapters[activeCourse._id]?.includes(activeChapter._id)
//                                                         ? "bg-emerald-500 text-black"
//                                                         : "bg-blue-600 text-white"}`}
//                                             >
//                                                 {completedChapters[activeCourse._id]?.includes(activeChapter._id)
//                                                     ? "Completed ✓"
//                                                     : "Mark as Finished"}
//                                             </button>
//                                         </div>
//                                     )}
//                                 </main>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default StudyMaterial;



import React, { useState, useEffect } from "react";
import {
    Shield, Activity, Cpu, Lock,
    CheckCircle2, Zap, Sparkles, ChevronRight, Target, RefreshCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Test from "./Test";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const StudyMaterial = () => {
    const [courses, setCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);
    const [activeChapter, setActiveChapter] = useState(null);
    const [completedChapters, setCompletedChapters] = useState({});
    const [isTakingTest, setIsTakingTest] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [testResults, setTestResults] = useState(null);
    const [certStatus, setCertStatus] = useState("idle");
    const [loadingProgress, setLoadingProgress] = useState(false);

    /* ================= FETCH ALL COURSES ================= */
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/courses`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setCourses(res.data);
            } catch (err) {
                console.error("Failed to fetch courses", err);
            }
        };
        fetchCourses();
    }, []);

    /* ================= HELPERS ================= */
    const getAllChapters = (course) => course?.modules?.flatMap(m => m.chapters || []) || [];
    const getAllQuestions = (course) => course?.modules?.flatMap(m => m.questions || []) || [];

    const calculateProgress = (course) => {
        if (!course) return 0;
        const total = getAllChapters(course).length;
        const completed = completedChapters[course._id] || [];
        if (total === 0) return 0;
        return Math.round((completed.length / total) * 100);
    };

    /* ================= OPEN COURSE & SYNC PROGRESS ================= */
    const launchCourse = async (course) => {
        setLoadingProgress(true);
        // Reset Test States
        setIsTakingTest(false);
        setUserAnswers({});
        setTestResults(null);
        setCertStatus("idle");

        try {
            const res = await axios.get(`${API_BASE_URL}/api/user/progress/${course._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            // Update completed chapters for THIS specific course
            setCompletedChapters(prev => ({
                ...prev,
                [course._id]: res.data.completedChapters || []
            }));

            setActiveCourse(course);
            // Default to first chapter
            if (course.modules?.[0]?.chapters?.[0]) {
                setActiveChapter(course.modules[0].chapters[0]);
            }
        } catch (err) {
            console.error("Error syncing progress", err);
            setActiveCourse(course); // Still open even if progress fails
        } finally {
            setLoadingProgress(false);
        }
    };

    /* ================= MARK CHAPTER COMPLETE ================= */
    const markChapterComplete = async () => {
        if (!activeCourse || !activeChapter) return;
        try {
            await axios.post(`${API_BASE_URL}/api/courses/complete-chapter`, {
                courseId: activeCourse._id,
                chapterId: activeChapter._id
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setCompletedChapters(prev => ({
                ...prev,
                [activeCourse._id]: [...new Set([...(prev[activeCourse._id] || []), activeChapter._id])]
            }));
        } catch (err) {
            console.error("Failed to save progress", err);
            alert("Connection lost. Progress not saved.");
        }
    };

    /* ================= SUBMIT TEST ================= */
    const handleTestSubmit = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/tests/submit`, {
                courseId: activeCourse._id,
                answers: userAnswers
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setTestResults(res.data);
        } catch (err) {
            console.error("Test submission failed", err);
        }
    };
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchCourses = async (isManual = false) => {
        if (isManual) setIsRefreshing(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/courses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setCourses(res.data);
        } catch (err) {
            console.error("Failed to fetch courses", err);
        } finally {
            if (isManual) setTimeout(() => setIsRefreshing(false), 600);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* HEADER */}
                <header className="flex justify-between items-end mb-16 border-l-4 border-blue-600 pl-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="text-blue-500" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500/80">
                                Global Academy Interface
                            </span>
                        </div>
                        <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter">
                            Learning<span className="text-blue-600">Lab</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* REFRESH / SYNC BUTTON */}
                        <button
                            onClick={() => fetchCourses(true)}
                            disabled={isRefreshing}
                            className="flex flex-col items-end gap-1 group transition-all active:scale-95 disabled:opacity-50"
                        >
                            <span className="text-[10px] text-slate-500 uppercase font-black group-hover:text-blue-400">Database Sync</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold ${isRefreshing ? "text-blue-400" : "text-slate-600"}`}>
                                    {isRefreshing ? "SYNCING..." : "READY"}
                                </span>
                                <div className="p-2 rounded-lg bg-blue-600/5 border border-white/5 group-hover:border-blue-500/30">
                                    <RefreshCcw
                                        size={16}
                                        className={`${isRefreshing ? "animate-spin text-blue-500" : "text-slate-500"}`}
                                    />
                                </div>
                            </div>
                        </button>

                        <div className="text-right hidden md:block">
                            <p className="text-[10px] text-slate-500 uppercase font-black mb-1">System Load</p>
                            <p className="text-emerald-500 text-xs font-black uppercase flex items-center justify-end gap-2">
                                <Activity size={14} className="animate-pulse" /> Optimal
                            </p>
                        </div>
                    </div>
                </header>

                {/* COURSE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <motion.div
                            key={course._id}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative bg-slate-900/30 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden transition-all hover:border-blue-500/50"
                        >
                            <Cpu className="absolute -bottom-4 -right-4 text-white/5 group-hover:text-blue-500/10 transition-colors" size={120} />
                            <h2 className="text-2xl font-black text-white mb-6 italic uppercase leading-tight">
                                {course.title}
                            </h2>
                            <button
                                onClick={() => launchCourse(course)}
                                className="w-full py-4 bg-white hover:bg-blue-600 hover:text-white text-black rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                            >
                                Start Training <ChevronRight size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* FULLSCREEN LEARNING INTERFACE */}
            <AnimatePresence>
                {activeCourse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#020617] p-4 md:p-8 z-[200]"
                    >
                        <div className="bg-slate-950 border border-white/10 rounded-[3rem] h-full flex flex-col overflow-hidden shadow-2xl">

                            {/* TOP BAR */}
                            <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                                <div>
                                    <h2 className="text-white font-black italic uppercase tracking-widest flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                        {activeCourse.title}
                                    </h2>
                                    <p className="text-[10px] text-blue-400 font-black uppercase mt-1">
                                        Completion Level: {calculateProgress(activeCourse)}%
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveCourse(null)}
                                    className="bg-white/5 hover:bg-red-500/20 hover:text-red-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all border border-white/10"
                                >
                                    Disconnect
                                </button>
                            </div>

                            <div className="flex flex-1 overflow-hidden">
                                {/* SIDEBAR */}
                                <aside className="w-80 bg-black/40 border-r border-white/5 overflow-y-auto p-6 custom-scrollbar">
                                    {activeCourse.modules.map((m, mIdx) => (
                                        <div key={m._id} className="mb-8">
                                            <p className="text-[10px] font-black text-slate-600 uppercase mb-4 tracking-[0.2em] flex items-center gap-2">
                                                <span className="text-blue-500">0{mIdx + 1}</span> {m.name}
                                            </p>
                                            <div className="space-y-1">
                                                {m.chapters.map(c => {
                                                    const isDone = completedChapters[activeCourse._id]?.includes(c._id);
                                                    const isActive = activeChapter?._id === c._id;
                                                    return (
                                                        <button
                                                            key={c._id}
                                                            onClick={() => {
                                                                setActiveChapter(c);
                                                                setIsTakingTest(false);
                                                            }}
                                                            className={`w-full flex items-center gap-3 p-4 rounded-2xl text-[11px] font-bold uppercase transition-all
                                                                ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
                                                        >
                                                            {isDone ? <CheckCircle2 size={14} className={isActive ? "text-white" : "text-emerald-500"} /> : <Zap size={14} className="opacity-30" />}
                                                            <span className="truncate">{c.title}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-8 pt-8 border-t border-white/5">
                                        <button
                                            onClick={() => {
                                                setActiveChapter({ _id: "FINAL_EXAM" }); // Fixed ID
                                                setIsTakingTest(false);
                                            }}
                                            className={`w-full p-5 border-2 border-dashed rounded-[2rem] text-[11px] font-black uppercase flex items-center justify-center gap-3 transition-all
                                                ${calculateProgress(activeCourse) >= 75
                                                    ? 'border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white'
                                                    : 'border-white/10 text-slate-700 cursor-not-allowed'}`}
                                        >
                                            {calculateProgress(activeCourse) >= 75 ? <Sparkles size={16} /> : <Lock size={16} />}
                                            Knowledge Validation
                                        </button>
                                    </div>
                                </aside>

                                {/* CONTENT AREA */}
                                <main className="flex-1 overflow-y-auto p-12 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.1),transparent)]">
                                    <AnimatePresence mode="wait">
                                        {activeChapter?._id === "FINAL_EXAM" ? (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="test-view">
                                                <Test
                                                    courseTitle={activeCourse.title}
                                                    onStart={() => setIsTakingTest(true)}
                                                    isTakingTest={isTakingTest}
                                                    questions={getAllQuestions(activeCourse)}
                                                    submitTest={handleTestSubmit}
                                                    userAnswers={userAnswers}
                                                    setUserAnswers={setUserAnswers}
                                                    testResults={testResults}
                                                    certStatus={certStatus}
                                                    setCertStatus={setCertStatus}
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={activeChapter?._id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="max-w-4xl mx-auto"
                                            >
                                                <div className="mb-12">
                                                    <span className="text-blue-500 font-black text-xs uppercase tracking-widest">Chapter Content</span>
                                                    <h1 className="text-6xl font-black text-white mt-2 mb-6 italic uppercase tracking-tighter">
                                                        {activeChapter?.title}
                                                    </h1>
                                                </div>

                                                <div className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] mb-12 text-lg leading-relaxed text-slate-400 shadow-inner">
                                                    {activeChapter?.content || "No content available for this module."}
                                                </div>

                                                <button
                                                    onClick={markChapterComplete}
                                                    disabled={completedChapters[activeCourse._id]?.includes(activeChapter?._id)}
                                                    className={`px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                                                    ${completedChapters[activeCourse._id]?.includes(activeChapter?._id)
                                                            ? "bg-emerald-500 text-black"
                                                            : "bg-blue-600 text-white hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"}`}
                                                >
                                                    {completedChapters[activeCourse._id]?.includes(activeChapter?._id)
                                                        ? "Synchronization Complete ✓"
                                                        : "Mark as Finished"}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </main>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default StudyMaterial;
