```
"use client"

import { useState, useEffect } from "react"
import { PRACTICE_DATA, Question, TechCategory } from "@/data/practiceQuestions"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/Button"
import { Play, CheckCircle, ChevronDown, ChevronRight, Terminal, AlertCircle, Trophy, Code2, Layout, Zap } from "lucide-react"

export function PracticeEngine() {
    // Safe Initialization
    const initialTech = PRACTICE_DATA?.[0] || null;
    const initialTopic = initialTech?.topics?.[0] || null;
    const initialQuestion = initialTopic?.questions?.[0] || null;

    // State
    const [activeTech, setActiveTech] = useState<TechCategory | null>(initialTech)
    const [activeQuestion, setActiveQuestion] = useState<Question | null>(initialQuestion)
    const [code, setCode] = useState(initialQuestion?.initialCode || "")
    const [textAnswer, setTextAnswer] = useState("")
    const [output, setOutput] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "incorrect">("IDLE")
    const [expandedTopic, setExpandedTopic] = useState<string>(initialTopic?.title || "")
    
    // Persistence
    const [solvedIds, setSolvedIds] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("practice_solved")
        if (saved) setSolvedIds(JSON.parse(saved))
    }, [])

    if (!activeTech || !activeQuestion) {
        return <div className="p-10 text-center text-slate-400 animate-pulse">Loading Arena...</div>
    }

    const handleQuestionSelect = (q: Question) => {
        setActiveQuestion(q)
        setCode(q.initialCode || "")
        setTextAnswer("")
        setOutput("")
        setStatus(solvedIds.includes(q.id) ? "SUCCESS" : "IDLE")
    }

    const markSolved = (id: string) => {
        if (!solvedIds.includes(id)) {
            const newSolved = [...solvedIds, id]
            setSolvedIds(newSolved)
            localStorage.setItem("practice_solved", JSON.stringify(newSolved))
        }
    }

    const runCode = async () => {
        if (!activeQuestion.language) return
        setIsRunning(true)
        setOutput("Running...")
        setStatus("IDLE")

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: activeQuestion.language,
                    version: activeQuestion.language === 'python' ? '3.10.0' : '10.2.0', // Basic version fallback
                    files: [{ content: code }]
                })
            })
            const data = await response.json()
            const runOutput = (data.run.stdout || "") + (data.run.stderr || "")
            setOutput(runOutput.trim())

            if (activeQuestion.expectedOutput && runOutput.trim() === activeQuestion.expectedOutput.trim()) {
                setStatus("SUCCESS")
                markSolved(activeQuestion.id)
            } else {
                setStatus("incorrect")
            }

        } catch (e) {
            setOutput("Error running code.")
        } finally {
            setIsRunning(false)
        }
    }

    const checkTextAnswer = () => {
        if (activeQuestion.validationRegex) {
            if (activeQuestion.validationRegex.test(textAnswer.trim())) {
                setStatus("SUCCESS")
                markSolved(activeQuestion.id)
            } else {
                setStatus("incorrect")
            }
        }
    }

    // Stats
    const totalQuestions = activeTech.topics.reduce((acc, t) => acc + t.questions.length, 0)
    const solvedCount = activeTech.topics.reduce((acc, t) => acc + t.questions.filter(q => solvedIds.includes(q.id)).length, 0)
    const progressPercent = Math.round((solvedCount / totalQuestions) * 100) || 0

    return (
        <div className="flex flex-col gap-6">
            
            {/* 1. Tech Selector (Top Bar) - Premium Tabs */}
            <div className="flex flex-wrap gap-2 justify-center bg-black/40 p-2 rounded-2xl backdrop-blur-md border border-white/5">
                {PRACTICE_DATA.map(tech => (
                    <button
                        key={tech.id}
                        onClick={() => { setActiveTech(tech); setActiveQuestion(tech.topics[0].questions[0]); setCode(tech.topics[0].questions[0].initialCode || ""); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold tracking-wide relative overflow-hidden group ${
    activeTech.id === tech.id
        ? 'bg-white text-black shadow-lg scale-100'
        : 'text-slate-400 hover:text-white hover:bg-white/10'
} `}
                    >
                        <span className="text-xl relative z-10">{tech.icon}</span>
                        <span className="relative z-10">{tech.title}</span>
                        {activeTech.id === tech.id && <div className="absolute inset-0 bg-white/20 blur-lg"></div>}
                    </button>
                ))}
            </div>

            {/* 2. Main Interface */}
            <div className="h-[85vh] flex flex-col lg:flex-row gap-0 border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0f0f12] text-slate-200 font-sans backdrop-blur-sm">
                
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 bg-[#121215] border-r border-white/5 flex flex-col">
                    
                    {/* Progress Header */}
                    <div className="p-6 border-b border-white/5 bg-[#18181b]">
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-yellow-500" /> Progress
                            </h3>
                            <span className="text-xs text-white font-mono bg-white/10 px-2 py-1 rounded">{solvedCount}/{totalQuestions}</span>
                        </div>
                        <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out" style={{ width: `${ progressPercent}%` }}></div>
                        </div>
                    </div>

                    {/* Question List */}
                    <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {activeTech.topics.map(topic => (
                            <div key={topic.title} className="mb-2">
                                <button 
                                    onClick={() => setExpandedTopic(expandedTopic === topic.title ? "" : topic.title)}
                                    className={`flex items-center w-full text-left p-3 rounded-lg text-sm font-bold transition-all ${ expandedTopic === topic.title ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-slate-300' } `}
                                >
                                    {expandedTopic === topic.title ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2 opacity-50" />}
                                    {topic.title}
                                </button>
                                
                                {expandedTopic === topic.title && (
                                    <div className="mt-1 space-y-1 pl-4 border-l border-white/5 ml-4">
                                        {topic.questions.map(q => {
                                            const isSolved = solvedIds.includes(q.id)
                                            return (
                                                <button 
                                                    key={q.id}
                                                    onClick={() => handleQuestionSelect(q)}
                                                    className={`group flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-xs transition-all ${
    activeQuestion.id === q.id
        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 font-bold border border-blue-500/30'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
} `}
                                                >
                                                    <span className="truncate flex-1">{q.title}</span>
                                                    {isSolved && <CheckCircle className="h-3 w-3 text-green-500 ml-2" />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Area: Split Setup */}
                <div className="flex-1 flex flex-col relative">
                    
                    {/* Header: Problem Desc */}
                    <div className="p-8 border-b border-white/5 bg-[#121215] shadow-sm z-10 flex-shrink-0">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3 tracking-tight">
                                {activeQuestion.title}
                                {solvedIds.includes(activeQuestion.id) && <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold border border-green-500/20">Solved</span>}
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-lg ${
    activeQuestion.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-900/20' :
        activeQuestion.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-900/20' :
            'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-900/20'
} `}>
                                {activeQuestion.difficulty}
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm max-w-2xl">{activeQuestion.description}</p>
                    </div>

                    {/* Editor / Input Area */}
                    <div className="flex-1 bg-[#1e1e24] relative flex flex-col overflow-hidden">
                        {activeQuestion.type === 'code' ? (
                             <div className="flex-1 relative flex flex-col">
                                 {/* Editor Toolbar */}
                                 <div className="h-10 bg-[#18181b] border-b border-white/5 flex items-center justify-between px-4">
                                     <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                         <Code2 className="h-3 w-3" /> Editor Mode ({activeQuestion.language})
                                     </div>
                                     <Button size="sm" onClick={runCode} disabled={isRunning} className="bg-white text-black hover:bg-slate-200 font-bold h-7 px-4 text-[10px] uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
                                        {isRunning ? <div className="animate-spin h-3 w-3 border-2 border-black border-t-transparent rounded-full"/> : <Play className="h-3 w-3 fill-current" />}
                                        Run Code
                                     </Button>
                                 </div>

                                 <div className="flex-1 relative">
                                     <Editor
                                        height="100%"
                                        language={activeQuestion.language}
                                        theme="vs-dark"
                                        value={code}
                                        onChange={(val) => setCode(val || "")}
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 15,
                                            padding: { top: 20 },
                                            scrollBeyondLastLine: false,
                                            fontFamily: "'JetBrains Mono', monospace",
                                            lineHeight: 1.5,
                                            smoothScrolling: true,
                                            cursorBlinking: "smooth"
                                        }}
                                     />
                                 </div>
                             </div>
                        ) : (
                            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[#0f0f12]">
                                <div className="w-full max-w-lg bg-[#18181b] p-8 rounded-2xl border border-white/5 shadow-2xl">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Your Answer</label>
                                    <input 
                                        type="text" 
                                        value={textAnswer}
                                        onChange={(e) => setTextAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && checkTextAnswer()}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 font-mono text-center text-lg mb-6"
                                        placeholder="Type answer here..."
                                    />
                                    <Button onClick={checkTextAnswer} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]">
                                        Submit Answer
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Output Console (Only for Code) */}
                        {activeQuestion.type === 'code' && (
                            <div className="h-1/3 min-h-[150px] border-t border-white/10 bg-[#0a0a0c] flex flex-col shadow-inner">
                                 <div className="px-4 py-2 bg-[#121215] text-[10px] font-bold text-slate-500 uppercase flex justify-between items-center border-b border-white/5">
                                     <span className="flex items-center gap-2"><Terminal className="h-3 w-3" /> Console Output</span>
                                     <span className="text-slate-600 font-mono">Expected: <span className="text-emerald-500/70">{activeQuestion.expectedOutput?.replace(/\n/g, ' ')}</span></span>
                                 </div>
                                 <div className="flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-white/10">
                                     <pre className={`font-mono text-xs leading-relaxed ${ status === 'incorrect' && output ? 'text-rose-400' : status === 'SUCCESS' ? 'text-emerald-400' : 'text-slate-300' } `}>
                                         {output || <span className="text-slate-700 italic opacity-50">Run code to see output...</span>}
                                     </pre>
                                 </div>
                            </div>
                        )}
                    </div>

                    {/* Status Bar */}
                     <div className={`absolute bottom-6 right-6 px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 transition-all duration-500 transform ${
    status === 'SUCCESS' ? 'translate-y-0 opacity-100 bg-emerald-500 text-black border-emerald-400' :
        status === 'incorrect' ? 'translate-y-0 opacity-100 bg-rose-600 text-white border-rose-500' :
            'translate-y-10 opacity-0'
} `}>
                         {status === 'SUCCESS' && <CheckCircle className="h-5 w-5" />}
                         {status === 'incorrect' && <AlertCircle className="h-5 w-5" />}
                         <span className="font-bold text-sm">
                            {status === 'SUCCESS' ? "Correct! Well done." : "Wrong Answer. Try again!"}
                         </span>
                     </div>
                </div>
            </div>
        </div>
    )
}
```
