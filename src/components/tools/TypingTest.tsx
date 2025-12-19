"use client"

import { useState, useEffect, useRef } from 'react'
import { RotateCcw, Crown, Timer, BookOpen, Gamepad2, Keyboard, Zap, Shield, Heart } from 'lucide-react'
import { TYPING_LESSONS, Lesson } from '@/data/typingLessons'
import Image from 'next/image'

const SAMPLE_TEXT = "the quick brown fox jumps over the lazy dog while programming in python is fun and rewarding keep coding every day to improve your skills and logic never give up on your dreams be consistent and patient with yourself debugging is part of the process learning to type fast is a superpower for developers focus on accuracy first then speed will come naturally"

type TimeMode = 15 | 30 | 60 | 120 | 300
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

    // Game Specific State - CYBER DEFENSE
    const [fallingWords, setFallingWords] = useState<{ id: number, text: string, top: number, left: number, isDestroyed: boolean }[]>([])
    const [gameScore, setGameScore] = useState(0)
    const [gameLives, setGameLives] = useState(5)
    const [gameLevel, setGameLevel] = useState(1)
    const [gameInput, setGameInput] = useState("")

    // Refs
    const testInputRef = useRef<HTMLInputElement>(null)
    const gameInputRef = useRef<HTMLInputElement>(null)
    const charRefs = useRef<(HTMLSpanElement | null)[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // INIT Focus
    useEffect(() => {
        if (mode === 'GAME') {
            gameInputRef.current?.focus()
        } else {
            testInputRef.current?.focus()
        }
    }, [mode])

    // Timer Update
    useEffect(() => {
        if (!isActive && mode !== 'GAME') {
            setTimeLeft(timeLimit)
        }
    }, [timeLimit, isActive, mode])

    // Main Timer Loop (Test/Lesson)
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
                    const speed = 0.5 + (gameLevel * 0.1) // Increase speed with level

                    // Move words
                    const moved = prev.map(w => ({ ...w, top: w.top + speed }))

                    // Check collisions (bottom of screen)
                    const survived: typeof prev = []
                    let damageTaken = 0

                    moved.forEach(w => {
                        if (w.top > 90 && !w.isDestroyed) {
                            damageTaken++
                            // Word hit base logic
                        } else if (w.top <= 90 || w.isDestroyed) {
                            if (!w.isDestroyed) survived.push(w)
                            // If destroyed, we remove it from next frame (animation handled by separate state? simplify: just remove for now or keep for anim)
                            // Ideally keep for anim, but for simplicity remove
                        }
                    })

                    if (damageTaken > 0) {
                        setGameLives(l => {
                            const newLives = l - damageTaken
                            if (newLives <= 0) endGame()
                            return newLives
                        })
                    }

                    // Spawn logic
                    if (Math.random() < (0.02 + (gameLevel * 0.005)) && survived.length < (5 + gameLevel)) {
                        const words = ["system", "data", "cyber", "node", "react", "pixel", "grid", "neon", "flux", "core", "bit", "byte", "scan", "hack", "code", "void", "null", "root", "user", "host", "link", "sync", "ping", "load", "save", "edit", "file", "view", "copy", "cut", "paste", "exit"]
                        const newWord = {
                            id: Date.now() + Math.random(),
                            text: words[Math.floor(Math.random() * words.length)],
                            top: 0,
                            left: Math.random() * 80 + 5,
                            isDestroyed: false
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
    }, [isActive, mode, gameLevel])

    // WPM Snapshot (Test Only)
    useEffect(() => {
        if (isActive && timeLeft > 0 && mode !== 'GAME') {
            const timeElapsed = timeLimit - timeLeft
            if (timeElapsed > 0) {
                const currentWpm = Math.round(((charIndex - mistakes) / 5) / (timeElapsed / 60))
                setWpm(currentWpm > 0 ? currentWpm : 0)
            }
        }
    }, [timeLeft])

    const startLesson = (lesson: Lesson) => {
        setActiveLesson(lesson)
        setText(lesson.content)
        setMode("LESSON")
        resetGame("LESSON")
    }

    const endGame = () => {
        setIsActive(false)
        setIsFinished(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }

    const resetGame = (targetMode: TestMode = mode) => {
        setCharIndex(0)
        setMistakes(0)
        setWpm(0)
        setAccuracy(100)
        setTimeLeft(timeLimit)
        setIsActive(false)
        setIsFinished(false)

        // Game Reset
        setGameScore(0)
        setGameLives(5)
        setGameLevel(1)
        setFallingWords([])
        setGameInput("")

        if (targetMode === "TEST") setText(SAMPLE_TEXT)
        // Lesson text persists

        setTimeout(() => {
            if (targetMode === 'GAME') gameInputRef.current?.focus()
            else testInputRef.current?.focus()
        }, 10)
    }

    const handleGameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return
        const val = e.target.value
        setGameInput(val)

        const matchIndex = fallingWords.findIndex(w => w.text === val.trim() && !w.isDestroyed)
        if (matchIndex !== -1) {
            // MATCH FOUND
            // Visual flair: Trigger explosion at word location (simplified here: just remove)
            setFallingWords(prev => prev.filter((_, i) => i !== matchIndex))
            setGameScore(prev => prev + (10 * gameLevel))
            setGameInput("") // Clear

            // Level up check
            if (gameScore > 0 && gameScore % 100 === 0) {
                setGameLevel(l => l + 1)
            }
        }
    }

    const handleTestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return
        if (!isActive) setIsActive(true)

        const { value } = e.target
        const char = value.slice(-1)

        // Native backspace check
        if ((e.nativeEvent as any).inputType === 'deleteContentBackward') {
            if (charIndex > 0) setCharIndex(prev => prev - 1)
            return
        }

        const currentChar = text[charIndex]
        if (char !== currentChar) {
            setMistakes(prev => prev + 1)
        }
        setCharIndex(prev => prev + 1)

        if (charIndex >= text.length - 1) {
            endGame()
        }

        const totalTyped = charIndex + 1
        const acc = Math.floor(((totalTyped - mistakes) / totalTyped) * 100)
        setAccuracy(acc > 0 ? acc : 100)
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col min-h-[600px]">

            {/* Mode Tabs */}
            <div className="flex justify-center flex-wrap gap-4 mb-8 border-b border-white/5 pb-6">
                <button onClick={() => { setMode("TEST"); resetGame("TEST"); }}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${mode === 'TEST' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-slate-500 hover:text-white'}`}>
                    <Timer className="w-4 h-4" /> Speed Test
                </button>
                <button onClick={() => { setMode("LESSON"); resetGame("LESSON"); }}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${mode === 'LESSON' ? 'bg-[#00F3FF] text-black shadow-lg shadow-[#00F3FF]/20' : 'text-slate-500 hover:text-[#00F3FF]'}`}>
                    <BookOpen className="w-4 h-4" /> Lessons
                </button>
                <button onClick={() => { setMode("GAME"); resetGame("GAME"); setIsActive(true); }}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${mode === 'GAME' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-500 hover:text-purple-500'}`}>
                    <Gamepad2 className="w-4 h-4" /> Cyber Defense
                </button>
            </div>

            <div className="flex-1 relative outline-none" onClick={() => mode === 'GAME' ? gameInputRef.current?.focus() : testInputRef.current?.focus()}>

                {/* CONDITIONAL INPUTS TO FIX CONTROLLED/UNCONTROLLED ERROR */}
                {mode === 'GAME' ? (
                    <input
                        ref={gameInputRef}
                        type="text"
                        className="absolute opacity-0 pointer-events-none"
                        value={gameInput}
                        onChange={handleGameInput}
                        autoFocus
                    />
                ) : (
                    <input
                        ref={testInputRef}
                        type="text"
                        className="absolute opacity-0 pointer-events-none"
                        onChange={handleTestInput}
                        autoFocus
                    />
                )}

                {/* GAME UI */}
                {mode === 'GAME' && (
                    <div className="h-[500px] border-2 border-purple-500/30 rounded-3xl bg-[#0a0a0f] relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.1)] group">

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,23,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(18,18,23,0.8)_2px,transparent_2px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(20deg)] opacity-20 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

                        {/* HUD */}
                        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
                            <div className="flex flex-col gap-1">
                                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">Score</div>
                                <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{gameScore}</div>
                            </div>

                            <div className="flex flex-col items-center">
                                <span className="bg-purple-600/20 border border-purple-500/50 text-purple-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 backdrop-blur-md">
                                    Wave {gameLevel}
                                </span>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <div className="text-xs font-bold text-red-400 uppercase tracking-widest">System Integrity</div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Heart key={i} className={`w-6 h-6 ${i < gameLives ? 'text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-slate-800'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Game Over Screen */}
                        {isFinished && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                                <div className="text-center p-10 border border-purple-500/50 bg-black/90 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)]">
                                    <h2 className="text-5xl font-black text-white mb-2 glitch-text">SYSTEM FAILURE</h2>
                                    <p className="text-purple-400 font-mono mb-8">Defenses Breached</p>
                                    <div className="mb-8">
                                        <div className="text-6xl font-black text-white mb-2">{gameScore}</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-500">Final Score</div>
                                    </div>
                                    <button onClick={() => resetGame("GAME")} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 mx-auto">
                                        <RotateCcw className="w-5 h-5" /> Reboot System
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Enemies */}
                        {fallingWords.map(word => (
                            <div
                                key={word.id}
                                className="absolute -translate-x-1/2"
                                style={{ top: `${word.top}%`, left: `${word.left}%` }}
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-purple-600/20 rounded-lg filter blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="font-mono font-black text-lg text-white bg-black/50 border border-purple-500/50 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md flex items-center gap-2">
                                        <span className="text-purple-400 animate-pulse">⚠</span>
                                        {word.text}
                                    </div>
                                    {/* Connecting Line to base (optional cool effect) */}
                                    <div className="absolute top-full left-1/2 w-[1px] h-[500px] bg-gradient-to-b from-purple-500/20 to-transparent -z-10"></div>
                                </div>
                            </div>
                        ))}

                        {/* Player / Input Visual */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 max-w-[90%] z-20">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
                                <div className="relative flex items-center bg-black border border-white/10 rounded-lg px-4 py-3">
                                    <Zap className="w-5 h-5 text-yellow-400 mr-3 animate-pulse" />
                                    <input
                                        value={gameInput}
                                        readOnly
                                        className="w-full bg-transparent text-white text-xl font-mono font-bold focus:outline-none placeholder-slate-700 uppercase tracking-wider"
                                        placeholder="TARGET LOCKED..."
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* LESSON & TEST UI */}
                {mode === 'LESSON' && !isActive && !activeLesson && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
                        {TYPING_LESSONS.map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => startLesson(lesson)}
                                className="bg-[#1e1e24] border border-white/5 p-6 rounded-2xl text-left hover:border-[#00F3FF]/50 hover:bg-white/5 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <BookOpen className="w-24 h-24 text-white -rotate-12 translate-x-4 -translate-y-4" />
                                </div>
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${lesson.difficulty === 'Beginner' ? 'text-green-400' :
                                            lesson.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                        {lesson.difficulty}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 relative z-10">{lesson.title}</h3>
                                <p className="text-slate-400 text-sm font-mono truncate relative z-10">{lesson.content.substring(0, 30)}...</p>
                            </button>
                        ))}
                    </div>
                )}

                {(mode === 'TEST' || (mode === 'LESSON' && activeLesson)) && !isFinished && (
                    <div className="w-full">
                        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-6">
                                <div className="text-yellow-400 font-mono text-2xl font-bold flex items-center gap-2">
                                    <Timer className="h-6 w-6" /> {formatTime(timeLeft)}
                                </div>
                                {mode === 'LESSON' && activeLesson && (
                                    <div className="text-[#00F3FF] font-bold text-lg flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" /> {activeLesson.title}
                                    </div>
                                )}
                            </div>

                            {mode === 'TEST' && (
                                <div className="flex gap-2">
                                    {TIME_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setTimeLimit(opt.value as TimeMode); resetGame("TEST"); }}
                                            className={`text-xs font-bold font-mono px-3 py-1 rounded transition-all ${timeLimit === opt.value ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`relative w-full font-mono text-2xl md:text-3xl leading-relaxed outline-none select-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                            <div className="text-justify text-slate-600 break-words">
                                {text.split('').map((char, index) => {
                                    let colorClass = "text-slate-600"
                                    if (index < charIndex) colorClass = "text-white"
                                    const isCurrent = index === charIndex
                                    return (
                                        <span
                                            key={index}
                                            className={`transition-colors duration-75 ${isCurrent ? 'text-white border-b-2 border-[#00F3FF] bg-[#00F3FF]/10' : colorClass} ${index < charIndex ? 'text-green-400' : ''}`}
                                        >
                                            {char}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {isFinished && mode !== 'GAME' && (
                    <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                        <Crown className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
                        <h2 className="text-5xl font-black text-white mb-8">{mode === 'LESSON' ? 'Lesson Complete' : 'Test Result'}</h2>

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
                            <button onClick={() => resetGame(mode)} className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                                <RotateCcw className="w-5 h-5" /> Retry
                            </button>
                            {mode === 'LESSON' && (
                                <button onClick={() => { setMode("LESSON"); setActiveLesson(null); resetGame("LESSON"); }} className="bg-[#1e1e24] text-white border border-white/20 font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
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
