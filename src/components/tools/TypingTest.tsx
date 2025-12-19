"use client"

import { useState, useEffect, useRef } from 'react'
import { RotateCcw, Crown, Timer, Gamepad2, Zap, Shield, Heart, Skull, Target, Flame } from 'lucide-react'

const SAMPLE_TEXT = "the quick brown fox jumps over the lazy dog while programming in python is fun and rewarding keep coding every day to improve your skills and logic never give up on your dreams be consistent and patient with yourself debugging is part of the process learning to type fast is a superpower for developers focus on accuracy first then speed will come naturally"

type TimeMode = 15 | 30 | 60 | 120
type TestMode = "TEST" | "ARCADE"
type GameType = "CYBER_DEFENSE" | "NEON_RUSH" | null

const TIME_OPTIONS = [
    { label: '15s', value: 15 },
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '2m', value: 120 },
]

export function TypingTest() {
    // Mode State
    const [mode, setMode] = useState<TestMode>("TEST")
    const [selectedGame, setSelectedGame] = useState<GameType>(null)

    // Test Config
    const [timeLimit, setTimeLimit] = useState<TimeMode>(30)

    // Activity State
    const [text, setText] = useState(SAMPLE_TEXT)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    // Live Stats (Test Mode)
    const [charIndex, setCharIndex] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)

    // Arcade State
    const [gameScore, setGameScore] = useState(0)
    const [gameLives, setGameLives] = useState(3)
    const [gameLevel, setGameLevel] = useState(1)
    const [gameInput, setGameInput] = useState("")

    // Entities for games
    const [entities, setEntities] = useState<{ id: number, text: string, x: number, y: number, life: number, maxLife: number }[]>([])

    // Visual FX State
    const [shake, setShake] = useState(false)

    // Refs
    const testInputRef = useRef<HTMLInputElement>(null)
    const gameInputRef = useRef<HTMLInputElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // --- EFFECT: Focus Management ---
    useEffect(() => {
        if (mode === 'ARCADE' && selectedGame) {
            gameInputRef.current?.focus()
        } else if (mode === 'TEST') {
            testInputRef.current?.focus()
        }
    }, [mode, selectedGame])

    // --- EFFECT: Timer (Test Mode) ---
    useEffect(() => {
        if (!isActive && mode === 'TEST') setTimeLeft(timeLimit)
    }, [timeLimit, isActive, mode])

    useEffect(() => {
        if (isActive && timeLeft > 0 && mode === 'TEST') {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) { endGame(); return 0; }
                    return prev - 1
                })
            }, 1000)
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [isActive, mode])

    // --- EFFECT: Game Loop ---
    useEffect(() => {
        if (mode === 'ARCADE' && selectedGame && isActive && !isFinished) {
            gameLoopRef.current = setInterval(() => {
                setEntities(prev => {
                    let next = [...prev]
                    const now = Date.now()

                    // NEON RUSH LOGIC: Shrink life
                    if (selectedGame === 'NEON_RUSH') {
                        next = next.map(e => ({ ...e, life: e.life - 1 }))
                        // Damage logic
                        const died = next.filter(e => e.life <= 0)
                        if (died.length > 0) {
                            setGameLives(l => {
                                const newVal = l - died.length
                                if (newVal <= 0) endGame()
                                return newVal
                            })
                            // Trigger Shake
                            setShake(true)
                            setTimeout(() => setShake(false), 200)
                        }
                        next = next.filter(e => e.life > 0)
                    }

                    // CYBER DEFENSE LOGIC: Move Down
                    if (selectedGame === 'CYBER_DEFENSE') {
                        const speed = 0.5 + (gameLevel * 0.1)
                        next = next.map(e => ({ ...e, y: e.y + speed }))

                        const breached = next.filter(e => e.y > 90)
                        if (breached.length > 0) {
                            setGameLives(l => {
                                const newVal = l - breached.length
                                if (newVal <= 0) endGame()
                                return newVal
                            })
                            setShake(true)
                            setTimeout(() => setShake(false), 200)
                        }
                        next = next.filter(e => e.y <= 90)
                    }

                    // SPAWN LOGIC
                    const maxEntities = selectedGame === 'NEON_RUSH' ? 3 + gameLevel : 5 + gameLevel
                    const spawnRate = selectedGame === 'NEON_RUSH' ? 0.03 + (gameLevel * 0.01) : 0.02 + (gameLevel * 0.005)

                    if (Math.random() < spawnRate && next.length < maxEntities) {
                        const words = ["run", "hit", "bug", "zap", "zip", "exe", "bin", "hex", "ram", "cpu", "gpu", "net", "web", "bot", "git", "bash", "sudo", "echo", "void", "null", "true", "false", "init", "load", "kill", "exit"]
                        const word = words[Math.floor(Math.random() * words.length)]

                        // Position logic
                        let x = Math.random() * 80 + 5
                        let y = 0 // Top for Cyber Defense

                        if (selectedGame === 'NEON_RUSH') {
                            y = Math.random() * 60 + 10 // Random Y for Neon Rush
                        }

                        next.push({
                            id: now + Math.random(),
                            text: word,
                            x,
                            y,
                            life: 100, // 100% life for Neon Rush
                            maxLife: 100
                        })
                    }

                    return next
                })
            }, 50)
        }
        return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current) }
    }, [isActive, mode, selectedGame, gameLevel])

    // --- HANDLERS ---
    const endGame = () => {
        setIsActive(false)
        setIsFinished(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }

    const reset = () => {
        // Common
        setIsActive(false)
        setIsFinished(false)
        setGameScore(0)
        setGameLives(3)
        setGameLevel(1)
        setGameInput("")
        setEntities([])

        // Test Specific
        setCharIndex(0)
        setMistakes(0)
        setWpm(0)
        setAccuracy(100)
        setTimeLeft(timeLimit)

        if (mode === 'TEST') {
            setText(SAMPLE_TEXT)
            setTimeout(() => testInputRef.current?.focus(), 10)
        } else if (mode === 'ARCADE' && selectedGame) {
            setIsActive(true) // Auto-start arcade game on select/retry
            setTimeout(() => gameInputRef.current?.focus(), 10)
        }
    }

    const handleArcadeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setGameInput(val)

        const matchIdx = entities.findIndex(e => e.text === val.trim())
        if (matchIdx !== -1) {
            // HIT!
            setEntities(prev => prev.filter((_, i) => i !== matchIdx))
            setGameScore(s => s + (10 * gameLevel))
            setGameInput("")

            // Level Up Check
            if ((gameScore + 10) % 100 === 0) setGameLevel(l => l + 1)
        }
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

        // Real-time WPM/Acc update only occasionally for perf? keeping detailed here for responsiveness
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
        <div className={`max-w-6xl mx-auto flex flex-col min-h-[600px] ${shake ? 'animate-shake' : ''}`}>
            <style jsx>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
                .animate-shake { animation: shake 0.5s; }
            `}</style>

            {/* Top Navigation */}
            <div className="flex justify-center gap-6 mb-8 border-b border-white/5 pb-6">
                <button
                    onClick={() => { setMode("TEST"); setSelectedGame(null); reset(); }}
                    className={`nav-btn ${mode === 'TEST' ? 'active-test' : ''}`}
                >
                    <Timer className="w-5 h-5" /> Speed Test
                </button>
                <button
                    onClick={() => { setMode("ARCADE"); setSelectedGame(null); setIsActive(false); }}
                    className={`nav-btn ${mode === 'ARCADE' ? 'active-arcade' : ''}`}
                >
                    <Gamepad2 className="w-5 h-5" /> Arcade Area
                </button>
            </div>

            {/* --- ARCADE AREA --- */}
            {mode === 'ARCADE' && (
                <div className="w-full">
                    {!selectedGame ? (
                        // Game Selection Menu
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-in fade-in zoom-in">
                            <button
                                onClick={() => { setSelectedGame('CYBER_DEFENSE'); reset(); }}
                                className="group relative overflow-hidden bg-black border border-purple-500/30 rounded-3xl p-8 hover:border-purple-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all text-left"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity"></div>
                                <Shield className="w-16 h-16 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-3xl font-black text-white mb-2 italic">CYBER DEFENSE</h3>
                                <p className="text-purple-300 font-mono mb-6">Stop viruses from breaching the firewall. Classic falling words defense.</p>
                                <div className="flex gap-2">
                                    <span className="badge-purple">Classic</span>
                                    <span className="badge-purple">Survival</span>
                                </div>
                            </button>

                            <button
                                onClick={() => { setSelectedGame('NEON_RUSH'); reset(); }}
                                className="group relative overflow-hidden bg-black border border-cyan-500/30 rounded-3xl p-8 hover:border-cyan-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all text-left"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity"></div>
                                <Zap className="w-16 h-16 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-3xl font-black text-white mb-2 italic">NEON RUSH</h3>
                                <p className="text-cyan-300 font-mono mb-6">Reflex test. Targets appear randomly and decay fast. Destroy them before they vanish!</p>
                                <div className="flex gap-2">
                                    <span className="badge-cyan">Fast Paced</span>
                                    <span className="badge-cyan">Reflexes</span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        // Active Game Canvas
                        <div className="relative h-[600px] w-full bg-[#050505] rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl">
                            <input
                                ref={gameInputRef}
                                type="text"
                                className="absolute opacity-0 pointer-events-none"
                                value={gameInput}
                                onChange={handleArcadeInput}
                                autoFocus
                            />

                            {/* HUD */}
                            <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-20 pointer-events-none">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Score</div>
                                    <div className="text-4xl font-black text-white drop-shadow-md">{gameScore}</div>
                                </div>
                                <div className="flex gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <Heart key={i} className={`w-8 h-8 ${i < gameLives ? 'text-red-500 fill-red-500 animate-pulse' : 'text-slate-800'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Game Over Overlay */}
                            {isFinished && (
                                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in">
                                    <div className="text-center">
                                        <Skull className="w-24 h-24 text-red-500 mx-auto mb-4 animate-bounce" />
                                        <h2 className="text-6xl font-black text-white mb-2 glitch-text">GAME OVER</h2>
                                        <div className="text-2xl font-mono text-slate-400 mb-8">Score: <span className="text-white">{gameScore}</span></div>
                                        <div className="flex gap-4 justify-center">
                                            <button onClick={reset} className="btn-primary">
                                                <RotateCcw className="w-5 h-5 mr-2" /> Play Again
                                            </button>
                                            <button onClick={() => { setSelectedGame(null); setIsActive(false); }} className="btn-secondary">
                                                Exit to Menu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ENTITIES RENDER */}
                            {entities.map(e => (
                                <div
                                    key={e.id}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                                    style={{
                                        left: `${e.x}%`,
                                        top: `${selectedGame === 'CYBER_DEFENSE' ? e.y : e.y}%` // Both use Y, but Neon Rush Y is static after spawn usually, but logic kept same structure
                                    }}
                                >
                                    {selectedGame === 'NEON_RUSH' ? (
                                        // Neon Rush Entity Style
                                        <div
                                            className="relative flex items-center justify-center"
                                            style={{ opacity: e.life / 100, transform: `scale(${0.5 + (e.life / 200)})` }}
                                        >
                                            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
                                            <div className="relative bg-black border-2 border-cyan-400 text-cyan-400 font-mono font-bold text-xl px-4 py-2 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                                                {e.text}
                                            </div>
                                            {/* Circular Progress (Life) - Simplified as border or scale */}
                                        </div>
                                    ) : (
                                        // Cyber Defense Entity Style
                                        <div className="font-mono font-bold text-lg text-white bg-black/80 border border-purple-500 px-3 py-1 rounded shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                                            <span className="text-purple-400 mr-2">☠</span>{e.text}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Player Input Display */}
                            {!isFinished && (
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                                    <div className="bg-black/50 backdrop-blur border border-white/20 px-8 py-3 rounded-xl text-2xl font-mono font-bold text-white uppercase tracking-widest min-w-[200px] text-center shadow-2xl">
                                        {gameInput || <span className="opacity-30">TYPE TO SHOOT</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* --- SPEED TEST AREA --- */}
            {mode === 'TEST' && (
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

                    {/* Test Results Overlay */}
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
                            let color = "text-slate-600"
                            if (i < charIndex) color = "text-white"
                            if (i < charIndex && text[i] !== char /* Simplified here, ideally track user input array */) {
                                // We actually need to track what user TYPED to show errors red
                                // For this simplified version, let's just show cursor
                            }
                            return (
                                <span key={i} className={`${color} ${i === charIndex ? 'border-b-2 border-primary text-white animate-pulse' : ''}`}>{char}</span>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Global Styles for Utility Classes */}
            <style jsx>{`
                .nav-btn {
                    @apply flex items-center gap-2 px-8 py-3 rounded-full font-bold text-slate-500 transition-all hover:bg-white/5;
                }
                .active-test {
                    @apply bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105;
                }
                .active-arcade {
                    @apply bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105;
                }
                .btn-primary {
                    @apply flex items-center bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform;
                }
                .btn-secondary {
                    @apply flex items-center bg-transparent border border-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors;
                }
                .badge-purple {
                    @apply text-[10px] font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30;
                }
                .badge-cyan {
                    @apply text-[10px] font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30;
                }
            `}</style>
        </div>
    )
}
