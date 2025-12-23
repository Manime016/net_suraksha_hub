// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     Plus, Trash2, Send, BookOpen, X, Eye, HelpCircle,
//     ArrowRight, FileText, Sparkles, Zap, Layout, CheckCircle2, Lock, GraduationCap, Award, RefreshCcw
// } from "lucide-react";

// const ManageStudyMaterial = () => {
//     // --- View States ---
//     const [view, setView] = useState("builder");
//     const [previewData, setPreviewData] = useState(null);
//     const [activePreviewChapter, setActivePreviewChapter] = useState(null);
//     const [completedChapters, setCompletedChapters] = useState([]);
//     const [moduleModes, setModuleModes] = useState({});

//     // --- Test & Score States ---
//     const [isTakingTest, setIsTakingTest] = useState(false);
//     const [userAnswers, setUserAnswers] = useState({});
//     const [testResults, setTestResults] = useState(null); // { score, total, percentage }
//     const [certStatus, setCertStatus] = useState("idle"); // idle, pending, approved

//     // --- Builder States ---
//     const [courseTitle, setCourseTitle] = useState("");
//     const [modules, setModules] = useState([
//         {
//             id: 1,
//             name: "Module 1: Fundamentals",
//             chapters: [{ id: 101, title: "Getting Started", type: "TEXT", content: "" }],
//             questions: [{ id: 201, q: "Sample Question?", options: ["A", "B", "C", "D"], correct: 0 }]
//         }
//     ]);

//     const [inventory, setInventory] = useState(() => {
//         const saved = localStorage.getItem("course_inventory");
//         return saved ? JSON.parse(saved) : [];
//     });

//     // --- Helpers ---
//     const getAllChapters = (course) => course?.modules?.flatMap(m => m.chapters || []) || [];
//     const getAllQuestions = (course) => course?.modules?.flatMap(m => m.questions || []) || [];

//     const calculateProgress = () => {
//         if (!previewData) return 0;
//         const total = getAllChapters(previewData).length;
//         if (total === 0) return 0;
//         return Math.round((completedChapters.length / total) * 100);
//     };

//     const progress = calculateProgress();
//     const isTestUnlocked = progress >= 75;

//     // --- Scoring Logic ---
//     const handleAnswerSelect = (questionId, optionIndex) => {
//         setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
//     };

//     const submitFinalTest = () => {
//         const questions = getAllQuestions(previewData);
//         if (questions.length === 0) return alert("No questions in this course!");

//         let correctCount = 0;
//         questions.forEach(q => {
//             if (userAnswers[q.id] === q.correct) {
//                 correctCount++;
//             }
//         });

//         const percentage = Math.round((correctCount / questions.length) * 100);
//         setTestResults({
//             score: correctCount,
//             total: questions.length,
//             percentage: percentage
//         });
//         setIsTakingTest(false);
//     };

//     const toggleChapterCompletion = (chapterId) => {
//         setCompletedChapters(prev =>
//             prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
//         );
//     };

//     const handlePublish = () => {
//         if (!courseTitle.trim()) return alert("⚠️ ENTER COURSE TITLE");
//         const finalCourse = {
//             id: Date.now(),
//             title: courseTitle,
//             modules: modules.map(m => ({ ...m, questions: m.questions || [] })),
//             date: new Date().toLocaleDateString('en-GB')
//         };
//         const updatedInv = [finalCourse, ...inventory];
//         setInventory(updatedInv);
//         localStorage.setItem("course_inventory", JSON.stringify(updatedInv));
//         setPreviewData(finalCourse);
//         resetState();
//         setActivePreviewChapter(finalCourse.modules[0]?.chapters[0] || null);
//     };

//     const resetState = () => {
//         setCompletedChapters([]);
//         setIsTakingTest(false);
//         setTestResults(null);
//         setUserAnswers({});
//         setCertStatus("idle");
//     };

//     // --- Builder Actions ---
//     const addModule = () => setModules([...modules, { id: Date.now(), name: `Module ${modules.length + 1}`, chapters: [], questions: [] }]);
//     const addChapter = (mId) => setModules(modules.map(m => m.id === mId ? { ...m, chapters: [...(m.chapters || []), { id: Date.now(), title: "", type: "TEXT", content: "" }] } : m));
//     const addQuestion = (mId) => setModules(modules.map(m => m.id === mId ? { ...m, questions: [...(m.questions || []), { id: Date.now(), q: "", options: ["", "", "", ""], correct: 0 }] } : m));
//     const updateQuestion = (mId, qId, field, value) => setModules(modules.map(m => m.id === mId ? { ...m, questions: (m.questions || []).map(q => q.id === qId ? { ...q, [field]: value } : q) } : m));
//     const updateChapter = (mId, cId, field, value) => setModules(modules.map(m => m.id === mId ? { ...m, chapters: (m.chapters || []).map(c => c.id === cId ? { ...c, [field]: value } : c) } : m));

//     return (
//         <div className="min-h-screen bg-[#020617] text-slate-300 p-6 md:p-12 font-sans selection:bg-blue-500/30">

//             <AnimatePresence>
//                 {previewData && (
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#020617] flex flex-col p-4 md:p-10">
//                         <div className="bg-slate-900 border border-white/10 rounded-[3rem] flex-1 flex flex-col overflow-hidden shadow-2xl">

//                             {/* PREVIEW HEADER */}
//                             <div className="p-8 border-b border-white/5 bg-slate-900/80 flex justify-between items-center">
//                                 <div className="flex items-center gap-5">
//                                     <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Layout size={24} /></div>
//                                     <div className="text-left">
//                                         <h2 className="text-white font-black italic uppercase tracking-tighter text-3xl">{previewData.title}</h2>
//                                         <p className="text-[10px] text-blue-400 font-black uppercase tracking-[.3em]">Course Progress: {progress}%</p>
//                                     </div>
//                                 </div>
//                                 <button onClick={() => { setPreviewData(null); resetState(); }} className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all">EXIT PREVIEW</button>
//                             </div>

//                             <div className="flex-1 flex overflow-hidden">
//                                 {/* SIDEBAR */}
//                                 <div className="w-80 bg-slate-950/50 p-8 overflow-y-auto hidden lg:block border-r border-white/5 text-left">
//                                     {previewData.modules?.map((m, mIdx) => (
//                                         <div key={mIdx} className="mb-8">
//                                             <p className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest pl-2">{m.name}</p>
//                                             <div className="space-y-1">
//                                                 {m.chapters?.map((c, ci) => (
//                                                     <button key={ci} onClick={() => { setActivePreviewChapter(c); setIsTakingTest(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all ${activePreviewChapter?.id === c.id && !isTakingTest ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}>
//                                                         {completedChapters.includes(c.id) ? <CheckCircle2 size={14} className="text-cyan-400" /> : <Zap size={14} />}
//                                                         {c.title || "Untitled Unit"}
//                                                     </button>
//                                                 ))}
//                                                 {mIdx === previewData.modules.length - 1 && (
//                                                     <button onClick={() => { setActivePreviewChapter({ id: 'TEST' }); setIsTakingTest(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold mt-4 border border-dashed ${activePreviewChapter?.id === 'TEST' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-white/10 text-slate-500'}`}>
//                                                         {isTestUnlocked ? <Sparkles size={14} className="text-yellow-400" /> : <Lock size={14} />}
//                                                         Final Assessment
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* CONTENT AREA */}
//                                 <div className="flex-1 bg-[#020617]/50 p-12 md:p-20 overflow-y-auto text-left">
//                                     {activePreviewChapter?.id === 'TEST' ? (
//                                         <div className="max-w-3xl mx-auto">
//                                             {isTakingTest ? (
//                                                 /* --- TEST MODE --- */
//                                                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
//                                                     <div className="mb-10 text-center">
//                                                         <h2 className="text-4xl font-black text-white italic uppercase">Assessment</h2>
//                                                         <p className="text-slate-500 text-sm mt-2">Required Score: 80% to earn certificate</p>
//                                                     </div>
//                                                     {getAllQuestions(previewData)?.map((q, i) => (
//                                                         <div key={q.id} className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5">
//                                                             <p className="text-white font-bold mb-6 text-lg">{i + 1}. {q?.q || "Question?"}</p>
//                                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                                 {q?.options?.map((opt, oi) => (
//                                                                     <button
//                                                                         key={oi}
//                                                                         onClick={() => handleAnswerSelect(q.id, oi)}
//                                                                         className={`p-5 rounded-2xl border transition-all text-sm text-left ${userAnswers[q.id] === oi ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-blue-500'}`}
//                                                                     >
//                                                                         {opt}
//                                                                     </button>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                     <button onClick={submitFinalTest} className="w-full bg-emerald-500 text-white py-6 rounded-3xl font-black uppercase italic shadow-2xl hover:bg-emerald-400 transition-colors">Submit My Answers</button>
//                                                 </motion.div>
//                                             ) : testResults ? (
//                                                 /* --- RESULTS MODE --- */
//                                                 <div className="text-center py-10">
//                                                     <div className="mb-8">
//                                                         <h2 className="text-8xl font-black text-white italic mb-2">{testResults.percentage}%</h2>
//                                                         <p className="text-slate-500 font-bold uppercase tracking-widest">Your Score: {testResults.score}/{testResults.total}</p>
//                                                     </div>

//                                                     {testResults.percentage >= 80 ? (
//                                                         <div className="bg-emerald-500/10 border border-emerald-500/20 p-12 rounded-[3.5rem] relative overflow-hidden">
//                                                             <Award className="text-emerald-500 mx-auto mb-6" size={64} />
//                                                             <h3 className="text-3xl font-black text-white uppercase italic mb-4">You Passed!</h3>

//                                                             {certStatus === "approved" ? (
//                                                                 <div className="bg-emerald-500 text-white p-6 rounded-2xl font-black italic flex items-center justify-center gap-3">
//                                                                     <CheckCircle2 /> CERTIFICATE GRANTED BY ADMIN
//                                                                 </div>
//                                                             ) : certStatus === "pending" ? (
//                                                                 <div className="text-emerald-500 font-black uppercase tracking-tighter">
//                                                                     <p className="mb-4">Request Sent. Waiting for Admin...</p>
//                                                                     {/* SIMULATION BUTTON FOR DEMO */}
//                                                                     <button onClick={() => setCertStatus("approved")} className="text-[10px] opacity-30 hover:opacity-100 underline text-white">Admin Mock: Click to Approve</button>
//                                                                 </div>
//                                                             ) : (
//                                                                 <button onClick={() => setCertStatus("pending")} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase italic flex items-center gap-3 mx-auto shadow-xl hover:scale-105 transition-all">
//                                                                     Claim Certificate <ArrowRight size={20} />
//                                                                 </button>
//                                                             )}
//                                                         </div>
//                                                     ) : (
//                                                         <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[3.5rem]">
//                                                             <HelpCircle className="text-red-500 mx-auto mb-6" size={64} />
//                                                             <p className="text-white font-bold text-xl mb-6">Score too low for certification.</p>
//                                                             <button onClick={() => { setIsTakingTest(true); setTestResults(null); setUserAnswers({}); }} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase italic flex items-center gap-2 mx-auto">
//                                                                 <RefreshCcw size={16} /> Try Again
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ) : (
//                                                 /* --- START TEST SCREEN --- */
//                                                 <div className="text-center py-20">
//                                                     <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${isTestUnlocked ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-800 border-white/5 text-slate-600'}`}>
//                                                         {isTestUnlocked ? <GraduationCap size={48} /> : <Lock size={48} />}
//                                                     </div>
//                                                     <h2 className="text-5xl font-black text-white italic uppercase mb-4">Final Assessment</h2>
//                                                     {isTestUnlocked ? (
//                                                         <>
//                                                             <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">Ready to verify your knowledge? You need 80% to pass.</p>
//                                                             <button onClick={() => setIsTakingTest(true)} className="bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black uppercase italic flex items-center gap-3 mx-auto shadow-xl hover:scale-105 transition-all">Start Exam <ArrowRight size={20} /></button>
//                                                         </>
//                                                     ) : (
//                                                         <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 inline-block">
//                                                             <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Locked Section</p>
//                                                             <p className="text-slate-600 text-xs mt-2">Complete 75% of Units to Unlock | Current: {progress}%</p>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ) : activePreviewChapter && (
//                                         <div className="max-w-3xl mx-auto">
//                                             <h1 className="text-6xl font-black text-white italic mb-10 uppercase tracking-tighter">{activePreviewChapter.title || "Untitled Unit"}</h1>
//                                             <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-12 mb-10 min-h-[300px] text-lg whitespace-pre-wrap">{activePreviewChapter.content || "No content provided."}</div>
//                                             <button onClick={() => toggleChapterCompletion(activePreviewChapter.id)} className={`px-10 py-5 rounded-2xl font-black text-xs uppercase italic transition-all ${completedChapters.includes(activePreviewChapter.id) ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-600 text-white'}`}>
//                                                 {completedChapters.includes(activePreviewChapter.id) ? "✓ Completed" : "Mark as Finished"}
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* --- BUILDER (ARCHITECT) --- */}
//             <div className="max-w-6xl mx-auto">
//                 <div className="flex gap-12 mb-20 border-b border-white/5">
//                     <button onClick={() => setView("builder")} className={`text-[10px] font-black uppercase tracking-[.4em] pb-6 ${view === 'builder' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-700'}`}>01. Architect</button>
//                     <button onClick={() => setView("inventory")} className={`text-[10px] font-black uppercase tracking-[.4em] pb-6 ${view === 'inventory' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-700'}`}>02. Inventory</button>
//                 </div>

//                 {view === "builder" ? (
//                     <div>
//                         <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
//                             <div className="flex-1 text-left">
//                                 <p className="text-[10px] font-black uppercase text-blue-500 tracking-[.5em] mb-4">Course Builder</p>
//                                 <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="ENTER TITLE..." className="w-full bg-transparent text-8xl font-black text-white outline-none italic placeholder:text-slate-900 uppercase" />
//                             </div>
//                             <button onClick={handlePublish} className="bg-white text-black px-12 py-6 rounded-full font-black hover:bg-blue-600 hover:text-white transition-all italic uppercase flex items-center gap-3 shrink-0">Publish & Preview <Send size={18} /></button>
//                         </div>

//                         <div className="space-y-12 pb-40">
//                             {modules.map((mod, mIdx) => (
//                                 <div key={mod.id} className="bg-slate-900/40 border border-white/5 rounded-[3.5rem] p-12 text-left">
//                                     <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
//                                         <input className="bg-transparent text-4xl font-black text-white outline-none flex-1 uppercase italic" value={mod.name} onChange={(e) => { const m = [...modules]; m[mIdx].name = e.target.value; setModules(m); }} />
//                                         <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
//                                             <button onClick={() => setModuleModes({ ...moduleModes, [mod.id]: 'LESSON' })} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${moduleModes[mod.id] !== 'TEST' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Lessons</button>
//                                             <button onClick={() => setModuleModes({ ...moduleModes, [mod.id]: 'TEST' })} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${moduleModes[mod.id] === 'TEST' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Test Form</button>
//                                         </div>
//                                     </div>

//                                     {moduleModes[mod.id] === 'TEST' ? (
//                                         <div className="space-y-6">
//                                             {(mod.questions || []).map((q, qi) => (
//                                                 <div key={q.id} className="bg-slate-950 p-8 rounded-3xl border border-white/5">
//                                                     <input className="w-full bg-transparent text-white font-bold mb-6 outline-none border-b border-white/5 pb-2" placeholder="Question Text..." value={q.q} onChange={(e) => updateQuestion(mod.id, q.id, 'q', e.target.value)} />
//                                                     <div className="grid grid-cols-2 gap-4">
//                                                         {q.options.map((opt, oi) => (
//                                                             <div key={oi} className={`flex items-center gap-3 p-3 rounded-xl border ${q.correct === oi ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/5'}`}>
//                                                                 <input type="radio" checked={q.correct === oi} onChange={() => updateQuestion(mod.id, q.id, 'correct', oi)} />
//                                                                 <input className="bg-transparent text-xs text-slate-300 outline-none w-full" placeholder={`Option ${oi + 1}`} value={opt} onChange={(e) => {
//                                                                     const newOpts = [...q.options]; newOpts[oi] = e.target.value; updateQuestion(mod.id, q.id, 'options', newOpts);
//                                                                 }} />
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                             <button onClick={() => addQuestion(mod.id)} className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">+ Add Test Question</button>
//                                         </div>
//                                     ) : (
//                                         <div className="space-y-6">
//                                             {(mod.chapters || []).map((ch, cIdx) => (
//                                                 <div key={ch.id} className="bg-slate-950 p-8 rounded-3xl border border-white/5">
//                                                     <input className="bg-transparent text-xl font-bold text-white mb-6 outline-none w-full" placeholder="Unit Title..." value={ch.title} onChange={(e) => updateChapter(mod.id, ch.id, 'title', e.target.value)} />
//                                                     <textarea className="w-full bg-[#020617] rounded-2xl p-6 text-sm text-slate-400 outline-none h-32 border border-white/5" placeholder="Content..." value={ch.content} onChange={(e) => updateChapter(mod.id, ch.id, 'content', e.target.value)} />
//                                                 </div>
//                                             ))}
//                                             <button onClick={() => addChapter(mod.id)} className="text-[10px] font-black text-blue-500 uppercase">+ Add Unit</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <button onClick={addModule} className="w-full py-20 border-2 border-dashed border-slate-900 rounded-[3.5rem] font-black text-slate-800 hover:text-blue-500 transition-all text-xl uppercase">+ Add Module</button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                         {inventory.map(item => (
//                             <div key={item.id} className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 flex flex-col justify-between min-h-[400px] text-left">
//                                 <h3 className="text-4xl font-black text-white italic uppercase">{item.title}</h3>
//                                 <button onClick={() => {
//                                     setPreviewData(item);
//                                     resetState();
//                                     setActivePreviewChapter(item.modules?.[0]?.chapters?.[0] || null);
//                                 }} className="mt-12 bg-white text-black py-5 rounded-2xl font-black uppercase italic flex items-center justify-center gap-3">Start Preview <ArrowRight size={14} /></button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageStudyMaterial;




import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Trash2, Send, BookOpen, X, Eye, HelpCircle,
    ArrowRight, FileText, Sparkles, Zap, Layout, CheckCircle2, Lock, GraduationCap, Award, RefreshCcw
} from "lucide-react";
import { getCourses, createCourse } from "../../services/courseService";

const ManageStudyMaterial = () => {
    // --- View States ---
    const [view, setView] = useState("builder");
    const [previewData, setPreviewData] = useState(null);
    const [activePreviewChapter, setActivePreviewChapter] = useState(null);
    const [completedChapters, setCompletedChapters] = useState([]);
    const [moduleModes, setModuleModes] = useState({});

    // --- Test & Score States ---
    const [isTakingTest, setIsTakingTest] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [testResults, setTestResults] = useState(null); // { score, total, percentage }
    const [certStatus, setCertStatus] = useState("idle"); // idle, pending, approved

    // --- Builder States ---
    const [courseTitle, setCourseTitle] = useState("");
    const [modules, setModules] = useState([]);


    const [inventory, setInventory] = useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getCourses();
                setInventory(res.data);
            } catch (err) {
                console.error("Failed to load courses", err);
            }
        };

        fetchCourses();
    }, []);

    // --- Helpers ---
    const getAllChapters = (course) => course?.modules?.flatMap(m => m.chapters || []) || [];
    const getAllQuestions = (course) => course?.modules?.flatMap(m => m.questions || []) || [];

    const calculateProgress = () => {
        if (!previewData) return 0;
        const total = getAllChapters(previewData).length;
        if (total === 0) return 0;
        return Math.round((completedChapters.length / total) * 100);
    };

    const progress = calculateProgress();
    const isTestUnlocked = progress >= 75;

    // --- Scoring Logic ---
    const handleAnswerSelect = (questionId, optionIndex) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const submitFinalTest = () => {
        const questions = getAllQuestions(previewData);
        if (questions.length === 0) return alert("No questions in this course!");

        let correctCount = 0;
        questions.forEach(q => {
            if (userAnswers[q.id] === q.correct) {
                correctCount++;
            }
        });

        const percentage = Math.round((correctCount / questions.length) * 100);
        setTestResults({
            score: correctCount,
            total: questions.length,
            percentage: percentage
        });
        setIsTakingTest(false);
    };

    const toggleChapterCompletion = (chapterId) => {
        setCompletedChapters(prev =>
            prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
        );
    };

    const handlePublish = async () => {
        if (!courseTitle.trim()) return alert("⚠️ ENTER COURSE TITLE");

        try {
            const payload = {
                title: courseTitle,
                modules: modules.map(m => ({
                    name: m.name,
                    chapters: m.chapters.map(c => ({
                        title: c.title,
                        content: c.content
                    })),
                    questions: m.questions.map(q => ({
                        question: q.q,
                        options: q.options,
                        correct: q.correct
                    }))
                }))
            };

            const res = await createCourse(payload);

            // Update UI with real backend response
            setInventory(prev => [res.data, ...prev]);
            setPreviewData(res.data);

            resetState();
            setCourseTitle("");
            setModules([]);
            setActivePreviewChapter(res.data.modules?.[0]?.chapters?.[0] || null);

        } catch (err) {
            console.error("Publish failed", err);
            alert("Failed to publish course");
        }
    };


    const resetState = () => {
        setCompletedChapters([]);
        setIsTakingTest(false);
        setTestResults(null);
        setUserAnswers({});
        setCertStatus("idle");
    };

    // --- Builder Actions ---
    const addModule = () => setModules([...modules, { id: Date.now(), name: `Module ${modules.length + 1}`, chapters: [], questions: [] }]);
    const addChapter = (mId) => setModules(modules.map(m => m.id === mId ? { ...m, chapters: [...(m.chapters || []), { id: Date.now(), title: "", type: "TEXT", content: "" }] } : m));
    const addQuestion = (mId) => setModules(modules.map(m => m.id === mId ? { ...m, questions: [...(m.questions || []), { id: Date.now(), q: "", options: ["", "", "", ""], correct: 0 }] } : m));
    const updateQuestion = (mId, qId, field, value) => setModules(modules.map(m => m.id === mId ? { ...m, questions: (m.questions || []).map(q => q.id === qId ? { ...q, [field]: value } : q) } : m));
    const updateChapter = (mId, cId, field, value) => setModules(modules.map(m => m.id === mId ? { ...m, chapters: (m.chapters || []).map(c => c.id === cId ? { ...c, [field]: value } : c) } : m));

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 p-6 md:p-12 font-sans selection:bg-blue-500/30">

            <AnimatePresence>
                {previewData && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#020617] flex flex-col p-4 md:p-10">
                        <div className="bg-slate-900 border border-white/10 rounded-[3rem] flex-1 flex flex-col overflow-hidden shadow-2xl">

                            {/* PREVIEW HEADER */}
                            <div className="p-8 border-b border-white/5 bg-slate-900/80 flex justify-between items-center">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Layout size={24} /></div>
                                    <div className="text-left">
                                        <h2 className="text-white font-black italic uppercase tracking-tighter text-3xl">{previewData.title}</h2>
                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[.3em]">Course Progress: {progress}%</p>
                                    </div>
                                </div>
                                <button onClick={() => { setPreviewData(null); resetState(); }} className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all">EXIT PREVIEW</button>
                            </div>

                            <div className="flex-1 flex overflow-hidden">
                                {/* SIDEBAR */}
                                <div className="w-80 bg-slate-950/50 p-8 overflow-y-auto hidden lg:block border-r border-white/5 text-left">
                                    {previewData.modules?.map((m, mIdx) => (
                                        <div key={mIdx} className="mb-8">
                                            <p className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest pl-2">{m.name}</p>
                                            <div className="space-y-1">
                                                {m.chapters?.map((c, ci) => (
                                                    <button key={ci} onClick={() => { setActivePreviewChapter(c); setIsTakingTest(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all ${activePreviewChapter?.id === c.id && !isTakingTest ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}>
                                                        {completedChapters.includes(c.id) ? <CheckCircle2 size={14} className="text-cyan-400" /> : <Zap size={14} />}
                                                        {c.title || "Untitled Unit"}
                                                    </button>
                                                ))}
                                                {mIdx === previewData.modules.length - 1 && (
                                                    <button onClick={() => { setActivePreviewChapter({ id: 'TEST' }); setIsTakingTest(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold mt-4 border border-dashed ${activePreviewChapter?.id === 'TEST' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-white/10 text-slate-500'}`}>
                                                        {isTestUnlocked ? <Sparkles size={14} className="text-yellow-400" /> : <Lock size={14} />}
                                                        Final Assessment
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CONTENT AREA */}
                                <div className="flex-1 bg-[#020617]/50 p-12 md:p-20 overflow-y-auto text-left">
                                    {activePreviewChapter?.id === 'TEST' ? (
                                        <div className="max-w-3xl mx-auto">
                                            {isTakingTest ? (
                                                /* --- TEST MODE --- */
                                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                                                    <div className="mb-10 text-center">
                                                        <h2 className="text-4xl font-black text-white italic uppercase">Assessment</h2>
                                                        <p className="text-slate-500 text-sm mt-2">Required Score: 80% to earn certificate</p>
                                                    </div>
                                                    {getAllQuestions(previewData)?.map((q, i) => (
                                                        <div key={q.id} className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5">
                                                            <p className="text-white font-bold mb-6 text-lg">{i + 1}. {q?.q || "Question?"}</p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {q?.options?.map((opt, oi) => (
                                                                    <button
                                                                        key={oi}
                                                                        onClick={() => handleAnswerSelect(q.id, oi)}
                                                                        className={`p-5 rounded-2xl border transition-all text-sm text-left ${userAnswers[q.id] === oi ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-950 border-white/5 text-slate-400 hover:border-blue-500'}`}
                                                                    >
                                                                        {opt}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button onClick={submitFinalTest} className="w-full bg-emerald-500 text-white py-6 rounded-3xl font-black uppercase italic shadow-2xl hover:bg-emerald-400 transition-colors">Submit My Answers</button>
                                                </motion.div>
                                            ) : testResults ? (
                                                /* --- RESULTS MODE --- */
                                                <div className="text-center py-10">
                                                    <div className="mb-8">
                                                        <h2 className="text-8xl font-black text-white italic mb-2">{testResults.percentage}%</h2>
                                                        <p className="text-slate-500 font-bold uppercase tracking-widest">Your Score: {testResults.score}/{testResults.total}</p>
                                                    </div>

                                                    {testResults.percentage >= 80 ? (
                                                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-12 rounded-[3.5rem] relative overflow-hidden">
                                                            <Award className="text-emerald-500 mx-auto mb-6" size={64} />
                                                            <h3 className="text-3xl font-black text-white uppercase italic mb-4">You Passed!</h3>

                                                            {certStatus === "approved" ? (
                                                                <div className="bg-emerald-500 text-white p-6 rounded-2xl font-black italic flex items-center justify-center gap-3">
                                                                    <CheckCircle2 /> CERTIFICATE GRANTED BY ADMIN
                                                                </div>
                                                            ) : certStatus === "pending" ? (
                                                                <div className="text-emerald-500 font-black uppercase tracking-tighter">
                                                                    <p className="mb-4">Request Sent. Waiting for Admin...</p>
                                                                    {/* SIMULATION BUTTON FOR DEMO */}
                                                                    <button onClick={() => setCertStatus("approved")} className="text-[10px] opacity-30 hover:opacity-100 underline text-white">Admin Mock: Click to Approve</button>
                                                                </div>
                                                            ) : (
                                                                <button onClick={() => setCertStatus("pending")} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase italic flex items-center gap-3 mx-auto shadow-xl hover:scale-105 transition-all">
                                                                    Claim Certificate <ArrowRight size={20} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[3.5rem]">
                                                            <HelpCircle className="text-red-500 mx-auto mb-6" size={64} />
                                                            <p className="text-white font-bold text-xl mb-6">Score too low for certification.</p>
                                                            <button onClick={() => { setIsTakingTest(true); setTestResults(null); setUserAnswers({}); }} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase italic flex items-center gap-2 mx-auto">
                                                                <RefreshCcw size={16} /> Try Again
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                /* --- START TEST SCREEN --- */
                                                <div className="text-center py-20">
                                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border ${isTestUnlocked ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-800 border-white/5 text-slate-600'}`}>
                                                        {isTestUnlocked ? <GraduationCap size={48} /> : <Lock size={48} />}
                                                    </div>
                                                    <h2 className="text-5xl font-black text-white italic uppercase mb-4">Final Assessment</h2>
                                                    {isTestUnlocked ? (
                                                        <>
                                                            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">Ready to verify your knowledge? You need 80% to pass.</p>
                                                            <button onClick={() => setIsTakingTest(true)} className="bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black uppercase italic flex items-center gap-3 mx-auto shadow-xl hover:scale-105 transition-all">Start Exam <ArrowRight size={20} /></button>
                                                        </>
                                                    ) : (
                                                        <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 inline-block">
                                                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Locked Section</p>
                                                            <p className="text-slate-600 text-xs mt-2">Complete 75% of Units to Unlock | Current: {progress}%</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : activePreviewChapter && (
                                        <div className="max-w-3xl mx-auto">
                                            <h1 className="text-6xl font-black text-white italic mb-10 uppercase tracking-tighter">{activePreviewChapter.title || "Untitled Unit"}</h1>
                                            <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-12 mb-10 min-h-[300px] text-lg whitespace-pre-wrap">{activePreviewChapter.content || "No content provided."}</div>
                                            <button onClick={() => toggleChapterCompletion(activePreviewChapter.id)} className={`px-10 py-5 rounded-2xl font-black text-xs uppercase italic transition-all ${completedChapters.includes(activePreviewChapter.id) ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-600 text-white'}`}>
                                                {completedChapters.includes(activePreviewChapter.id) ? "✓ Completed" : "Mark as Finished"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- BUILDER (ARCHITECT) --- */}
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-12 mb-20 border-b border-white/5">
                    <button onClick={() => setView("builder")} className={`text-[10px] font-black uppercase tracking-[.4em] pb-6 ${view === 'builder' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-700'}`}>01. Architect</button>
                    <button onClick={() => setView("inventory")} className={`text-[10px] font-black uppercase tracking-[.4em] pb-6 ${view === 'inventory' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-700'}`}>02. Inventory</button>
                </div>

                {view === "builder" ? (
                    <div>
                        <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
                            <div className="flex-1 text-left">
                                <p className="text-[10px] font-black uppercase text-blue-500 tracking-[.5em] mb-4">Course Builder</p>
                                <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="ENTER TITLE..." className="w-full bg-transparent text-8xl font-black text-white outline-none italic placeholder:text-slate-900 uppercase" />
                            </div>
                            <button onClick={handlePublish} className="bg-white text-black px-12 py-6 rounded-full font-black hover:bg-blue-600 hover:text-white transition-all italic uppercase flex items-center gap-3 shrink-0">Publish & Preview <Send size={18} /></button>
                        </div>

                        <div className="space-y-12 pb-40">
                            {modules.map((mod, mIdx) => (
                                <div key={mod.id} className="bg-slate-900/40 border border-white/5 rounded-[3.5rem] p-12 text-left">
                                    <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                                        <input className="bg-transparent text-4xl font-black text-white outline-none flex-1 uppercase italic" value={mod.name} onChange={(e) => { const m = [...modules]; m[mIdx].name = e.target.value; setModules(m); }} />
                                        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
                                            <button onClick={() => setModuleModes({ ...moduleModes, [mod.id]: 'LESSON' })} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${moduleModes[mod.id] !== 'TEST' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Lessons</button>
                                            <button onClick={() => setModuleModes({ ...moduleModes, [mod.id]: 'TEST' })} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase ${moduleModes[mod.id] === 'TEST' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Test Form</button>
                                        </div>
                                    </div>

                                    {moduleModes[mod.id] === 'TEST' ? (
                                        <div className="space-y-6">
                                            {(mod.questions || []).map((q, qi) => (
                                                <div key={q.id} className="bg-slate-950 p-8 rounded-3xl border border-white/5">
                                                    <input className="w-full bg-transparent text-white font-bold mb-6 outline-none border-b border-white/5 pb-2" placeholder="Question Text..." value={q.q} onChange={(e) => updateQuestion(mod.id, q.id, 'q', e.target.value)} />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {q.options.map((opt, oi) => (
                                                            <div key={oi} className={`flex items-center gap-3 p-3 rounded-xl border ${q.correct === oi ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/5'}`}>
                                                                <input type="radio" checked={q.correct === oi} onChange={() => updateQuestion(mod.id, q.id, 'correct', oi)} />
                                                                <input className="bg-transparent text-xs text-slate-300 outline-none w-full" placeholder={`Option ${oi + 1}`} value={opt} onChange={(e) => {
                                                                    const newOpts = [...q.options]; newOpts[oi] = e.target.value; updateQuestion(mod.id, q.id, 'options', newOpts);
                                                                }} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <button onClick={() => addQuestion(mod.id)} className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">+ Add Test Question</button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {(mod.chapters || []).map((ch, cIdx) => (
                                                <div key={ch.id} className="bg-slate-950 p-8 rounded-3xl border border-white/5">
                                                    <input className="bg-transparent text-xl font-bold text-white mb-6 outline-none w-full" placeholder="Unit Title..." value={ch.title} onChange={(e) => updateChapter(mod.id, ch.id, 'title', e.target.value)} />
                                                    <textarea className="w-full bg-[#020617] rounded-2xl p-6 text-sm text-slate-400 outline-none h-32 border border-white/5" placeholder="Content..." value={ch.content} onChange={(e) => updateChapter(mod.id, ch.id, 'content', e.target.value)} />
                                                </div>
                                            ))}
                                            <button onClick={() => addChapter(mod.id)} className="text-[10px] font-black text-blue-500 uppercase">+ Add Unit</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button onClick={addModule} className="w-full py-20 border-2 border-dashed border-slate-900 rounded-[3.5rem] font-black text-slate-800 hover:text-blue-500 transition-all text-xl uppercase">+ Add Module</button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {inventory.map(item => (
                            <div key={item.id} className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 flex flex-col justify-between min-h-[400px] text-left">
                                <h3 className="text-4xl font-black text-white italic uppercase">{item.title}</h3>
                                <button onClick={() => {
                                    setPreviewData(item);
                                    resetState();
                                    setActivePreviewChapter(item.modules?.[0]?.chapters?.[0] || null);
                                }} className="mt-12 bg-white text-black py-5 rounded-2xl font-black uppercase italic flex items-center justify-center gap-3">Start Preview <ArrowRight size={14} /></button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageStudyMaterial;