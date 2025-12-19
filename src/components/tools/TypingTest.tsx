"use client"

import { useState, useEffect, useRef } from 'react'
import { RotateCcw, Crown, Timer, BarChart2, BookOpen, Gamepad2, Keyboard, Play } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TYPING_LESSONS, Lesson } from '@/data/typingLessons'

const SAMPLE_TEXT = "the quick brown fox jumps over the lazy dog while programming in python is fun and rewarding keep coding every day to improve your skills and logic never give up on your dreams be consistent and patient with yourself debugging is part of the process learning to type fast is a superpower for developers focus on accuracy first then speed will come naturally"

type TimeMode = 15 | 30 | 60 | 120 | 300 | 600 | 1200
type TestMode = "TEST" | "LESSON" | "GAME"

const TIME_OPTIONS = [
    { label: '15s', value: 15 },
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '2m', value: 120 },
    { label: '5m', value: 300 },
]

export function TypingTest() {
    // Mode State
    const [mode, setMode] = useState<TestMode>("TEST")

    // Test Config
    const [timeLimit, setTimeLimit] = useState<TimeMode>(30)

    // Activity State
    const [text, setText] = useState(SAMPLE_TEXT)
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    // Live Stats
    const [charIndex, setCharIndex] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [wpmHistory, setWpmHistory] = useState<{ time: number; wpm: number }[]>([])

    // Game Specific State
    const [fallingWords, setFallingWords] = useState<{ id: number, text: string, top: number, left: number }[]>([])
    const [gameScore, setGameScore] = useState(0)
    const [gameInput, setGameInput] = useState("")

    // Refs
    const inputRef = useRef<HTMLInputElement>(null)
    const charRefs = useRef<(HTMLSpanElement | null)[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // INIT
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Timer Update
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(timeLimit)
        }
    }, [timeLimit, isActive, mode])

    // Main Timer Loop
    useEffect(() => {
        if (isActive && timeLeft > 0 && mode !== 'GAME') {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    const newValue = prev - 1
                    if (newValue <= 0) {
                        endGame()
                        return 0
                    }
                    return newValue
                })
            }, 1000)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isActive, mode])

    // GAME LOOP
    useEffect(() => {
        if (mode === 'GAME' && isActive) {
            gameLoopRef.current = setInterval(() => {
                setFallingWords(prev => {
                    // Update positions
                    const moved = prev.map(w => ({ ...w, top: w.top + 2 })) // Speed
                    // Remove words that hit bottom (Game Over condition potentially, or just penalty)
                    const survived = moved.filter(w => w.top < 80) // 80% height container

                    // Spawn new word
                    if (Math.random() < 0.05 && prev.length < 5) { // Spawn rate
                        const words = ["code", "bug", "fix", "loop", "api", "git", "web", "css", "html", "react", "node", "data", "app", "dev", "stack", "full", "front", "back", "end"]
                        const newWord = {
                            id: Date.now(),
                            text: words[Math.floor(Math.random() * words.length)],
                            top: 0,
                            left: Math.random() * 80 + 5 // 5-85% width
                        }
                        return [...survived, newWord]
                    }
                    return survived
                })
            }, 50)
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current)
        }
    }, [isActive, mode])


    // WPM Snapshot
    useEffect(() => {
        if (isActive && timeLeft > 0 && mode !== 'GAME') {
            const timeElapsed = timeLimit - timeLeft
            if (timeElapsed > 0) {
                const currentWpm = Math.round(((charIndex - mistakes) / 5) / (timeElapsed / 60))
                setWpm(currentWpm > 0 ? currentWpm : 0)
                setWpmHistory(prev => [...prev, { time: timeElapsed, wpm: currentWpm > 0 ? currentWpm : 0 }])
            }
        }
    }, [timeLeft])

    const startLesson = (lesson: Lesson) => {
        setActiveLesson(lesson)
        setText(lesson.content)
        setMode("LESSON")
        resetGame()
    }

    const endGame = () => {
        setIsActive(false)
        setIsFinished(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }

    const resetGame = () => {
        setCharIndex(0)
        setMistakes(0)
        setWpm(0)
        setAccuracy(100)
        setTimeLeft(timeLimit)
        setIsActive(false)
        setIsFinished(false)
        setWpmHistory([])
        setGameScore(0)
        setFallingWords([])
        setGameInput("")

        if (mode === "TEST") setText(SAMPLE_TEXT)
        // If LESSON, text stays set by startLesson

        if (inputRef.current) {
            inputRef.current.value = ""
            setTimeout(() => inputRef.current?.focus(), 10)
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return
        if (mode === 'GAME') {
            const val = e.target.value
            setGameInput(val)

            // Check match
            const matchIndex = fallingWords.findIndex(w => w.text === val.trim())
            if (matchIndex !== -1) {
                // Eliminate word
                setFallingWords(prev => prev.filter((_, i) => i !== matchIndex))
                setGameScore(prev => prev + 10)
                setGameInput("") // Clear input
            }
            return
        }

        // TEST / LESSON Logic
        if (!isActive) setIsActive(true)

        const { value } = e.target
        const char = value.slice(-1)

        // Prevent backspace logic complexity for simpler implementation here (or keep it simple: allow typing only forward)
        // Actually, let's keep it simple: strict visual comparison 

        // Native backspace check
        if ((e.nativeEvent as any).inputType === 'deleteContentBackward') {
            if (charIndex > 0) setCharIndex(prev => prev - 1)
            return
        }

        const currentChar = text[charIndex]
        if (char === currentChar) {
            // Correct
        } else {
            setMistakes(prev => prev + 1)
        }
        setCharIndex(prev => prev + 1)

        // End condition
        if (charIndex >= text.length - 1) {
            endGame()
        }

        // Calc Accuracy
        const totalTyped = charIndex + 1
        const acc = Math.floor(((totalTyped - mistakes) / totalTyped) * 100)
        setAccuracy(acc > 0 ? acc : 100)
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col min-h-[600px]">

            {/* Navigation Tabs */}
            <div className="flex justify-center gap-4 mb-8 border-b border-white/5 pb-6">
                <button onClick={() => { setMode("TEST"); resetGame(); }} className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${mode === 'TEST' ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>
                    <Timer className="w-4 h-4" /> Speed Test
                </button>
                <button onClick={() => { setMode("LESSON"); resetGame(); }} className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${mode === 'LESSON' ? 'bg-primary text-black' : 'text-slate-500 hover:text-primary'}`}>
                    <BookOpen className="w-4 h-4" /> Lessons
                </button>
                <button onClick={() => { setMode("GAME"); resetGame(); setIsActive(true); }} className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${mode === 'GAME' ? 'bg-purple-500 text-white' : 'text-slate-500 hover:text-purple-500'}`}>
                    <Gamepad2 className="w-4 h-4" /> Games
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative" onClick={() => inputRef.current?.focus()}>

                {/* Hidden Input */}
                <input
                    ref={inputRef}
                    type="text"
                    className="absolute opacity-0 pointer-events-none"
                    onChange={handleInput}
                    value={mode === 'GAME' ? gameInput : undefined}
                    autoFocus
                />

                {/* GAME MODE UI */}
                {mode === 'GAME' && (
                    <div className="h-[500px] border border-white/10 rounded-2xl bg-[#0f0f12] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-4 right-4 bg-white/10 px-4 py-2 rounded-lg text-white font-mono font-bold">
                            Score: {gameScore}
                        </div>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64">
                            <input
                                value={gameInput}
                                readOnly
                                className="w-full bg-transparent border-b-2 border-purple-500 text-center text-white text-2xl font-mono focus:outline-none placeholder-slate-600"
                                placeholder="Type falling words..."
                            />
                        </div>
                        {fallingWords.map(word => (
                            <div
                                key={word.id}
                                className="absolute text-purple-400 font-bold font-mono text-xl transition-all duration-100 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                style={{ top: `${word.top}%`, left: `${word.left}%` }}
                            >
                                {word.text}
                            </div>
                        ))}
                        {fallingWords.length === 0 && isActive && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 animate-pulse">
                                Get Ready...
                            </div>
                        )}
                    </div>
                )}

                {/* LESSON SELECTOR */}
                {mode === 'LESSON' && !isActive && !activeLesson && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
                        {TYPING_LESSONS.map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => startLesson(lesson)}
                                className="bg-[#1e1e24] border border-white/5 p-6 rounded-2xl text-left hover:border-primary/50 hover:bg-white/5 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${lesson.difficulty === 'Beginner' ? 'text-green-400' :
                                            lesson.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                        {lesson.difficulty}
                                    </span>
                                    <Keyboard className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                                <p className="text-slate-400 text-sm font-mono truncate">{lesson.content.substring(0, 30)}...</p>
                            </button>
                        ))}
                    </div>
                )}

                {/* TYPING INTERFACE (TEST & LESSON ACTIVE) */}
                {(mode === 'TEST' || (mode === 'LESSON' && activeLesson)) && !isFinished && (
                    <div className="w-full">
                        {/* Stats Header */}
                        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-6">
                                <div className="text-yellow-400 font-mono text-2xl font-bold flex items-center gap-2">
                                    <Timer className="h-6 w-6" /> {formatTime(timeLeft)}
                                </div>
                                {mode === 'LESSON' && activeLesson && (
                                    <div className="text-primary font-bold text-lg flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" /> {activeLesson.title}
                                    </div>
                                )}
                            </div>

                            {/* Mode Selectors only for Test */}
                            {mode === 'TEST' && (
                                <div className="flex gap-2">
                                    {TIME_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setTimeLimit(opt.value as TimeMode); resetGame(); }}
                                            className={`text-xs font-bold font-mono px-3 py-1 rounded transition-all ${timeLimit === opt.value ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Text Render */}
                        <div className={`relative w-full font-mono text-2xl md:text-3xl leading-relaxed outline-none select-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                            <div className="text-justify text-slate-600 break-words">
                                {text.split('').map((char, index) => {
                                    let colorClass = "text-slate-600"
                                    if (index < charIndex) {
                                        // Need to track correctness better ideally, but simple mismatch check:
                                        // For now, let's just color strictly typed chars. 
                                        // A real implementation needs an array of {char, status}
                                        colorClass = "text-white" // Simplification for safety in rewrite
                                    }
                                    const isCurrent = index === charIndex
                                    return (
                                        <span
                                            key={index}
                                            className={`transition-colors duration-75 ${isCurrent ? 'text-white border-b-2 border-primary' : colorClass} ${index < charIndex ? 'text-green-400' : ''}`}
                                        >
                                            {char}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* RESULTS SCREEN */}
                {isFinished && (
                    <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                        <Crown className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
                        <h2 className="text-5xl font-black text-white mb-8">Test Complete</h2>

                        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
                            <div className="bg-[#1e1e24] p-8 rounded-2xl border border-white/10">
                                <div className="text-4xl font-black text-white mb-2">{wpm}</div>
                                <div className="text-xs uppercase tracking-widest text-slate-500">WPM</div>
                            </div>
                            <div className="bg-[#1e1e24] p-8 rounded-2xl border border-white/10">
                                <div className="text-4xl font-black text-green-400 mb-2">{accuracy}%</div>
                                <div className="text-xs uppercase tracking-widest text-slate-500">Accuracy</div>
                            </div>
                            <div className="bg-[#1e1e24] p-8 rounded-2xl border border-white/10">
                                <div className="text-4xl font-black text-red-400 mb-2">{mistakes}</div>
                                <div className="text-xs uppercase tracking-widest text-slate-500">Mistakes</div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={resetGame} className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                                <RotateCcw className="w-5 h-5" /> Retry
                            </button>
                            {mode === 'LESSON' && (
                                <button onClick={() => { setMode("LESSON"); setActiveLesson(null); resetGame(); }} className="bg-[#1e1e24] text-white border border-white/20 font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
                                    Back to Lessons
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
