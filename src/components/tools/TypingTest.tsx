"use client"

import { useState, useEffect, useRef } from 'react'
import { RotateCcw, Crown, Timer } from 'lucide-react'

const SAMPLE_TEXT = "the quick brown fox jumps over the lazy dog while programming in python is fun and rewarding keep coding every day to improve your skills and logic never give up on your dreams be consistent and patient with yourself debugging is part of the process learning to type fast is a superpower for developers focus on accuracy first then speed will come naturally"

type TimeMode = 15 | 30 | 60 | 120

const TIME_OPTIONS = [
    { label: '15s', value: 15 },
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '2m', value: 120 },
]

export function TypingTest() {
    // Test Config
    const [timeLimit, setTimeLimit] = useState<TimeMode>(30)

    // Activity State
    const [text, setText] = useState(SAMPLE_TEXT)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    // Live Stats
    const [charIndex, setCharIndex] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)

    // Refs
    const testInputRef = useRef<HTMLInputElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // --- EFFECT: Timer ---
    useEffect(() => {
        if (!isActive) setTimeLeft(timeLimit)
    }, [timeLimit, isActive])

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) { endGame(); return 0; }
                    return prev - 1
                })
            }, 1000)
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [isActive])

    // --- HANDLERS ---
    const endGame = () => {
        setIsActive(false)
        setIsFinished(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const reset = () => {
        setIsActive(false)
        setIsFinished(false)
        setCharIndex(0)
        setMistakes(0)
        setWpm(0)
        setAccuracy(100)
        setTimeLeft(timeLimit)
        setText(SAMPLE_TEXT)
        setTimeout(() => testInputRef.current?.focus(), 10)
    }

    const handleTestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return
        if (!isActive) setIsActive(true)

        const { value } = e.target
        const char = value.slice(-1)

        if ((e.nativeEvent as any).inputType === 'deleteContentBackward') {
            if (charIndex > 0) setCharIndex(p => p - 1)
            return
        }

        if (text[charIndex] !== char) setMistakes(p => p + 1)
        setCharIndex(p => p + 1)

        if (charIndex >= text.length - 1) endGame()

        const total = charIndex + 1
        const acc = Math.floor(((total - mistakes) / total) * 100)
        setAccuracy(acc > 0 ? acc : 100)

        const elapsed = timeLimit - timeLeft
        if (elapsed > 0) {
            const w = Math.round(((total - mistakes) / 5) / (elapsed / 60))
            setWpm(w > 0 ? w : 0)
        }
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col min-h-[600px]">
            {/* Note: Removed game CSS logic/styles as they are now in TypingArcade */}
            <style jsx>{`
                .btn-primary { @apply flex items-center bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform; }
            `}</style>

            <div className="w-full relative" onClick={() => testInputRef.current?.focus()}>
                <input
                    ref={testInputRef}
                    type="text"
                    className="absolute opacity-0 pointer-events-none"
                    onChange={handleTestInput}
                    autoFocus
                />

                {/* Test Header */}
                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                    <div className="text-yellow-400 font-mono text-3xl font-bold flex items-center gap-2">
                        <Timer className="w-8 h-8" /> {formatTime(timeLeft)}
                    </div>
                    <div className="flex gap-2">
                        {TIME_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => { setTimeLimit(opt.value as TimeMode); reset(); }}
                                className={`px-3 py-1 rounded font-mono font-bold text-xs transition-colors ${timeLimit === opt.value ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Test Results */}
                {isFinished && (
                    <div className="absolute inset-0 z-10 bg-[#0a0a0f]/95 flex flex-col items-center justify-center animate-in fade-in zoom-in">
                        <Crown className="w-20 h-20 text-yellow-500 mb-6" />
                        <div className="grid grid-cols-3 gap-12 text-center mb-12">
                            <div><div className="text-6xl font-black text-white">{wpm}</div><div className="text-slate-500 uppercase tracking-widest text-sm">WPM</div></div>
                            <div><div className="text-6xl font-black text-green-400">{accuracy}%</div><div className="text-slate-500 uppercase tracking-widest text-sm">ACC</div></div>
                            <div><div className="text-6xl font-black text-red-400">{mistakes}</div><div className="text-slate-500 uppercase tracking-widest text-sm">ERR</div></div>
                        </div>
                        <button onClick={reset} className="btn-primary"><RotateCcw className="w-4 h-4 mr-2" /> Restart Test</button>
                    </div>
                )}

                {/* Text Area */}
                <div className={`text-2xl font-mono leading-relaxed transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                    {text.split('').map((char, i) => (
                        <span key={i} className={`${i < charIndex ? 'text-white' : 'text-slate-600'} ${i === charIndex ? 'border-b-2 border-primary text-white animate-pulse' : ''}`}>{char}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}
