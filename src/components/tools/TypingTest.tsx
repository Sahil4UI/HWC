"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { RotateCcw, Crown, Timer, Keyboard, BarChart2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const SAMPLE_TEXT = "the quick brown fox jumps over the lazy dog while programming in python is fun and rewarding keep coding every day to improve your skills and logic never give up on your dreams be consistent and patient with yourself debugging is part of the process learning to type fast is a superpower for developers focus on accuracy first then speed will come naturally"

// Supports up to 20 mins (1200s)
type TimeMode = 15 | 30 | 60 | 120 | 300 | 600 | 1200

const TIME_OPTIONS = [
    { label: '15s', value: 15 },
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '2m', value: 120 },
    { label: '5m', value: 300 },
    { label: '10m', value: 600 },
    { label: '20m', value: 1200 },
]

export function TypingTest() {
    // Game Config
    const [timeLimit, setTimeLimit] = useState<TimeMode>(30)

    // Game State
    const [text, setText] = useState(SAMPLE_TEXT)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    // Live Stats
    const [charIndex, setCharIndex] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)

    // Analytics
    const [wpmHistory, setWpmHistory] = useState<{ time: number; wpm: number }[]>([])

    // Refs
    const inputRef = useRef<HTMLInputElement>(null)
    const charRefs = useRef<(HTMLSpanElement | null)[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Initial Focus
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Update time left when mode changes
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(timeLimit)
        }
    }, [timeLimit, isActive])

    // Timer Logic (Decoupled from render stats)
    useEffect(() => {
        if (isActive && timeLeft > 0) {
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
    }, [isActive])

    // Capture WPM Snapshot every second (for graph)
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timeElapsed = timeLimit - timeLeft
            // Avoid div by zero
            if (timeElapsed > 0) {
                // Correct characters per minute / 5 = standard WPM formula
                const currentWpm = Math.round(((charIndex - mistakes) / 5) / (timeElapsed / 60))
                setWpm(currentWpm > 0 ? currentWpm : 0)

                // Add to history
                setWpmHistory(prev => [...prev, { time: timeElapsed, wpm: currentWpm > 0 ? currentWpm : 0 }])
            }
        }
    }, [timeLeft])

    const endGame = () => {
        setIsActive(false)
        setIsFinished(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
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

        // Reset styles properly
        charRefs.current.forEach(span => {
            if (span) {
                span.className = "text-slate-600 transition-colors duration-75"
            }
        })
        if (charRefs.current[0]) {
            charRefs.current[0].className = "text-white border-b-2 border-primary transition-colors duration-75"
        }

        setTimeout(() => inputRef.current?.focus(), 10)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return

        if (!isActive) setIsActive(true)

        const { value } = e.target
        const char = value.slice(-1)

        // Backspace handling
        if ((e.nativeEvent as any).inputType === 'deleteContentBackward') {
            if (charIndex > 0) {
                const prevIndex = charIndex - 1
                setCharIndex(prevIndex)

                // Reset styles
                const prevChar = charRefs.current[prevIndex]
                if (prevChar) {
                    prevChar.className = "text-white border-b-2 border-primary transition-colors duration-75"
                }
                const currentChar = charRefs.current[charIndex]
                if (currentChar) {
                    currentChar.className = "text-slate-600 transition-colors duration-75"
                }
            }
            return
        }

        // Normal typing
        const currentChar = charRefs.current[charIndex]
        if (currentChar) {
            // Extend text if we run out (Infinite Scroll effect mock)
            if (charIndex === text.length - 10) {
                setText(prev => prev + " " + SAMPLE_TEXT)
            }

            // Check correctness
            if (char === currentChar.innerText) {
                currentChar.className = "text-green-400 transition-colors duration-75"
            } else {
                currentChar.className = "text-red-500 bg-red-500/20 transition-colors duration-75"
                setMistakes(prev => prev + 1)
            }

            // Move Cursor
            const nextChar = charRefs.current[charIndex + 1]
            if (nextChar) {
                nextChar.className = "text-white border-b-2 border-primary transition-colors duration-75"
            }
            setCharIndex(prev => prev + 1)
        }

        // Calc Accuracy
        const totalTyped = charIndex + 1
        const acc = Math.floor(((totalTyped - mistakes) / totalTyped) * 100)
        setAccuracy(acc > 0 ? acc : 100)
    }

    return (
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[500px]" onClick={() => inputRef.current?.focus()}>

            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 pointer-events-none"
                onChange={handleInput}
                autoFocus
            />

            {isFinished ? (
                <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-500">

                    <div className="text-center mb-12">
                        <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-4xl font-black text-white mb-2">Result</h2>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-[#1e1e24] border border-white/5 p-8 rounded-2xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"></div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">WPM</p>
                            <p className="text-6xl font-black text-white group-hover:scale-110 transition-transform">{wpm}</p>
                        </div>
                        <div className="bg-[#1e1e24] border border-white/5 p-8 rounded-2xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Accuracy</p>
                            <p className="text-6xl font-black text-green-400 group-hover:scale-110 transition-transform">{accuracy}%</p>
                        </div>
                        <div className="bg-[#1e1e24] border border-white/5 p-8 rounded-2xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-rose-500"></div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Mistakes</p>
                            <p className="text-6xl font-black text-red-400 group-hover:scale-110 transition-transform">{mistakes}</p>
                        </div>
                    </div>

                    {/* Graph */}
                    <div className="bg-[#16161a] border border-white/5 rounded-2xl p-6 h-80 mb-10">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <BarChart2 className="h-4 w-4" /> WPM Consistency
                        </p>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={wpmHistory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="time" stroke="#666" hide />
                                <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="wpm"
                                    stroke="#00F3FF"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={resetGame}
                            className="group flex items-center gap-2 bg-white text-black font-black px-10 py-4 rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                        >
                            <RotateCcw className="h-5 w-5 group-hover:-rotate-180 transition-transform duration-500" />
                            Restart Test
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    {/* Mode Selectors */}
                    <div className="flex justify-center mb-16 gap-3 animate-fade-in-down flex-wrap">
                        {TIME_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => { setTimeLimit(opt.value as TimeMode); resetGame(); }}
                                className={`text-sm font-bold font-mono px-4 py-2 rounded-lg transition-all ${timeLimit === opt.value
                                        ? 'text-white bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] scale-105'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="w-full flex justify-between items-end mb-8 px-4 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2 text-yellow-400 font-mono text-2xl font-bold">
                            <Timer className="h-6 w-6" />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                        <div className="text-slate-500 font-mono text-sm uppercase tracking-widest">
                            {isActive ? 'Type to ensure accurate results' : 'Click or Type to Start'}
                        </div>
                    </div>

                    {/* Typing Area */}
                    <div
                        className={`relative w-full font-mono text-2xl md:text-3xl leading-relaxed outline-none select-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}
                    >
                        <div className="text-justify text-slate-600 break-words">
                            {text.split('').map((char, index) => (
                                <span
                                    key={index}
                                    ref={(el) => { charRefs.current[index] = el }}
                                    className={`transition-colors duration-75 ${index === 0 ? 'text-white border-b-2 border-primary' : 'text-slate-600'}`}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
