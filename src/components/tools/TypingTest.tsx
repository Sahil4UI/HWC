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
    const [typedChars, setTypedChars] = useState("")
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
        setTypedChars("") // Clear typed history
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
        // We need to handle backspace properly by taking the value directly if controlled, 
        // OR essentially since we used a hidden input that clears, we can't easily sync state.
        // Actually, simpler approach: The input value IS the history?
        // Let's rely on the input event type for backspace support if we want or just append.
        // BUT the previous implementation used `absolute opacity-0` input which triggers onChange. 
        // To support backspace, we should just let the hidden input hold the value?

        // Wait, the previous implementation was: 
        // <input ... value="" onChange=... /> (it didn't have value prop set to state properly in the viewed code?? No, it was uncontrolled or always reset?)
        // The viewed code had: <input ... onChange={handleTestInput} /> with NO value prop.
        // This means `e.target.value` contains ONLY the newly typed char (or full string if not cleared).

        // Let's use LAST char from the event if we assume the input is cumulative?
        // Actually safer: Append char to state.

        const inputType = (e.nativeEvent as any).inputType

        if (inputType === 'deleteContentBackward') {
            setTypedChars(prev => prev.slice(0, -1))
            return
        }

        const char = value.slice(-1) // Get last char typed
        const nextIndex = typedChars.length

        if (nextIndex >= text.length) {
            endGame()
            return
        }

        // Update Stats
        if (char !== text[nextIndex]) {
            setMistakes(p => p + 1)
        }

        setTypedChars(prev => prev + char)

        // Real-time WPM Calc
        const total = nextIndex + 1
        const currentMistakes = (char !== text[nextIndex]) ? mistakes + 1 : mistakes
        const acc = Math.floor(((total - currentMistakes) / total) * 100)
        setAccuracy(acc > 0 ? acc : 100)

        const elapsed = timeLimit - timeLeft
        if (elapsed > 0) {
            // Standard WPM formula: (Characters / 5) / TimeInMinutes
            const w = Math.round((total / 5) / (elapsed / 60))
            setWpm(w > 0 ? w : 0)
        }

        // Reset input value manually to avoid growing string? 
        // Actually best to keep input controlled value = typedChars to allow native backspace handling?
        // Let's DO that.
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
                    className="absolute opacity-0 -z-10" // Moved behind
                    value={typedChars} // Controlled Input
                    onChange={(e) => {
                        if (!isActive && !isFinished) setIsActive(true)
                        setTypedChars(e.target.value)

                        // Recalculate mistakes from scratch based on full string to be accurate on backspace
                        let errs = 0
                        for (let i = 0; i < e.target.value.length; i++) {
                            if (e.target.value[i] !== text[i]) errs++
                        }
                        setMistakes(errs)

                        if (e.target.value.length >= text.length) endGame()
                    }}
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
                    {text.split('').map((char, i) => {
                        const isTyped = i < typedChars.length
                        const isCorrect = isTyped && typedChars[i] === char
                        const isCurrent = i === typedChars.length

                        return (
                            <span key={i} className={`
                                ${!isTyped ? 'text-slate-600' : isCorrect ? 'text-white' : 'text-red-500 bg-red-500/10'} 
                                ${isCurrent ? 'border-b-2 border-primary text-primary animate-pulse' : ''}
                            `}>
                                {char}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
