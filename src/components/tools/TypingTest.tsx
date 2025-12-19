"use client"

import { useState, useEffect, useRef } from 'react'
import { RotateCcw, Crown, Timer, Gamepad2, Zap, Shield, Heart, Skull, Target, Flame, Baby, Swords, Globe, Sparkles } from 'lucide-react'

const SAMPLE_TEXT = "the quick brown fox jumps over the lazy dog while programming in python is fun and rewarding keep coding every day to improve your skills and logic never give up on your dreams be consistent and patient with yourself debugging is part of the process learning to type fast is a superpower for developers focus on accuracy first then speed will come naturally"

type TimeMode = 15 | 30 | 60 | 120
type TestMode = "TEST" | "ARCADE"
type GameType = "CYBER_DEFENSE" | "NEON_RUSH" | "GLYPH_HUNTER" | "BIT_BOSS" | "COSMIC_ZEN" | null

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
    const [bossHp, setBossHp] = useState(100) // For Bit Boss

    // Entities for games
    const [entities, setEntities] = useState<{ id: number, text: string, x: number, y: number, life: number, maxLife: number, velX?: number, velY?: number }[]>([])

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

                    // --- MOVEMENT & LOSS LOGIC ---

                    // 1. NEON RUSH: Shrink life
                    if (selectedGame === 'NEON_RUSH') {
                        next = next.map(e => ({ ...e, life: e.life - 1.5 })) // Faster decay
                        const died = next.filter(e => e.life <= 0)
                        if (died.length > 0) loseLife(died.length)
                        next = next.filter(e => e.life > 0)
                    }

                    // 2. CYBER DEFENSE: Move Down
                    if (selectedGame === 'CYBER_DEFENSE') {
                        const speed = 0.5 + (gameLevel * 0.1)
                        next = next.map(e => ({ ...e, y: e.y + speed }))
                        const breached = next.filter(e => e.y > 90)
                        if (breached.length > 0) loseLife(breached.length)
                        next = next.filter(e => e.y <= 90)
                    }

                    // 3. GLYPH HUNTER: Move Down Slowly
                    if (selectedGame === 'GLYPH_HUNTER') {
                        const speed = 0.2 + (gameLevel * 0.05) // Slow
                        next = next.map(e => ({ ...e, y: e.y + speed }))
                        const breached = next.filter(e => e.y > 90)
                        // Kids mode: No damage? Or minimal. Let's make it forgiving.
                        // Just remove them, no damage. "Endless fun" unless they miss like 10 in a row?
                        // Let's add gentle life loss.
                        if (breached.length > 0) loseLife(1)
                        next = next.filter(e => e.y <= 90)
                    }

                    // 4. BIT BOSS: Move Down (Missiles)
                    if (selectedGame === 'BIT_BOSS') {
                        const speed = 0.8 + (gameLevel * 0.1) // Fast!
                        next = next.map(e => ({ ...e, y: e.y + speed }))
                        const breached = next.filter(e => e.y > 90)
                        if (breached.length > 0) loseLife(breached.length)
                        next = next.filter(e => e.y <= 90)
                    }

                    // 5. COSMIC ZEN: Move Right (Horizontal)
                    if (selectedGame === 'COSMIC_ZEN') {
                        const speed = 0.3 // Constant
                        next = next.map(e => ({ ...e, x: e.x + speed }))
                        // No damage on exit
                        next = next.filter(e => e.x <= 95)
                    }

                    // --- SPAWN LOGIC ---
                    const maxEntities = selectedGame === 'NEON_RUSH' ? 3 + gameLevel :
                        selectedGame === 'GLYPH_HUNTER' ? 3 :
                            selectedGame === 'BIT_BOSS' ? 2 + Math.ceil(gameLevel / 2) : 5 + gameLevel

                    const baseRate = selectedGame === 'NEON_RUSH' ? 0.04 :
                        selectedGame === 'GLYPH_HUNTER' ? 0.02 :
                            selectedGame === 'COSMIC_ZEN' ? 0.015 : 0.02

                    const spawnRate = baseRate + (gameLevel * 0.005)

                    if (Math.random() < spawnRate && next.length < maxEntities) {
                        let wordList: string[] = []

                        if (selectedGame === 'GLYPH_HUNTER') {
                            wordList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "cat", "dog", "fun", "run"]
                        } else if (selectedGame === 'BIT_BOSS') {
                            wordList = ["sudo", "rm -rf", "kill", "process", "daemon", "kernel", "buffer", "memory", "stack", "overflow", "syntax", "error", "fatal", "null", "void", "panic", "abort", "retry", "catch", "throw"]
                        } else if (selectedGame === 'COSMIC_ZEN') {
                            wordList = ["breathe", "flow", "calm", "space", "star", "moon", "galaxy", "nebula", "orbit", "drift", "pulse", "glow", "shine", "peace", "zen", "mind", "soul", "light"]
                        } else {
                            // Default (Cyber Defense / Neon Rush)
                            wordList = ["run", "hit", "bug", "zap", "zip", "exe", "bin", "hex", "ram", "cpu", "gpu", "net", "web", "bot", "git", "bash", "sudo", "echo", "void", "null", "true", "false", "init", "load", "kill", "exit"]
                        }

                        const word = wordList[Math.floor(Math.random() * wordList.length)]

                        // Position logic
                        let x = Math.random() * 80 + 5
                        let y = 0

                        if (selectedGame === 'NEON_RUSH') {
                            y = Math.random() * 60 + 10
                        } else if (selectedGame === 'COSMIC_ZEN') {
                            x = -10 // Start off screen left
                            y = Math.random() * 80 + 10
                        }

                        next.push({
                            id: now + Math.random(),
                            text: word,
                            x,
                            y,
                            life: 100,
                            maxLife: 100
                        })
                    }

                    return next
                })
            }, 50)
        }
        return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current) }
    }, [isActive, mode, selectedGame, gameLevel])

    // --- HELPER HANDLERS ---
    const loseLife = (amount: number) => {
        setGameLives(prev => {
            const newVal = prev - amount
            if (newVal <= 0) {
                endGame() // Game Over
                return 0
            }
            return newVal
        })
        setShake(true)
        setTimeout(() => setShake(false), 200)
    }

    const endGame = () => {
        setIsActive(false)
        setIsFinished(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }

    const reset = () => {
        setIsActive(false)
        setIsFinished(false)
        setGameScore(0)
        setGameLives(selectedGame === 'GLYPH_HUNTER' ? 5 : 3)
        setGameLevel(1)
        setGameInput("")
        setEntities([])
        setBossHp(100)

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
            setIsActive(true)
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

            // Bit Boss Damage Logic
            if (selectedGame === 'BIT_BOSS') {
                setBossHp(prev => {
                    const damage = 5
                    const newHp = prev - damage
                    if (newHp <= 0) {
                        // Boss Defeated (Level Up)
                        setGameLevel(l => l + 1)
                        // Visual Flair for Boss Death could go here
                        return 100 // Reset HP for next level
                    }
                    return newHp
                })
            }

            // Standard Level Up Check
            if (selectedGame !== 'BIT_BOSS' && (gameScore + 10) % 100 === 0) setGameLevel(l => l + 1)
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
                <button onClick={() => { setMode("TEST"); setSelectedGame(null); reset(); }} className={`nav-btn ${mode === 'TEST' ? 'active-test' : ''}`}>
                    <Timer className="w-5 h-5" /> Speed Test
                </button>
                <button onClick={() => { setMode("ARCADE"); setSelectedGame(null); setIsActive(false); }} className={`nav-btn ${mode === 'ARCADE' ? 'active-arcade' : ''}`}>
                    <Gamepad2 className="w-5 h-5" /> Arcade Area
                </button>
            </div>

            {/* --- ARCADE AREA --- */}
            {mode === 'ARCADE' && (
                <div className="w-full">
                    {!selectedGame ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto animate-in fade-in zoom-in">
                            {/* 1. Cyber Defense */}
                            <button onClick={() => { setSelectedGame('CYBER_DEFENSE'); reset(); }} className="game-card border-purple-500/30 hover:border-purple-500 hover:shadow-purple-500/20 group">
                                <div className="game-icon bg-purple-500/10 group-hover:bg-purple-500/20"><Shield className="w-12 h-12 text-purple-500" /></div>
                                <h3 className="game-title">Cyber Defense</h3>
                                <p className="game-desc">Stop viruses from breaching the firewall. Classic mode.</p>
                                <span className="game-tag text-purple-300 bg-purple-500/20 border-purple-500/30">Balanced</span>
                            </button>

                            {/* 2. Neon Rush */}
                            <button onClick={() => { setSelectedGame('NEON_RUSH'); reset(); }} className="game-card border-cyan-500/30 hover:border-cyan-500 hover:shadow-cyan-500/20 group">
                                <div className="game-icon bg-cyan-500/10 group-hover:bg-cyan-500/20"><Zap className="w-12 h-12 text-cyan-400" /></div>
                                <h3 className="game-title">Neon Rush</h3>
                                <p className="game-desc">Targets appear randomly and decay fast. Reflex test!</p>
                                <span className="game-tag text-cyan-300 bg-cyan-500/20 border-cyan-500/30">Fast Paced</span>
                            </button>

                            {/* 3. Glyph Hunter (Kids) */}
                            <button onClick={() => { setSelectedGame('GLYPH_HUNTER'); reset(); }} className="game-card border-green-500/30 hover:border-green-500 hover:shadow-green-500/20 group">
                                <div className="game-icon bg-green-500/10 group-hover:bg-green-500/20"><Baby className="w-12 h-12 text-green-400" /></div>
                                <h3 className="game-title">Glyph Hunter</h3>
                                <p className="game-desc">Giant letters, slow speed. Perfect for kids & beginners.</p>
                                <span className="game-tag text-green-300 bg-green-500/20 border-green-500/30">Kids Mode</span>
                            </button>

                            {/* 4. Bit Boss (Pro) */}
                            <button onClick={() => { setSelectedGame('BIT_BOSS'); reset(); }} className="game-card border-red-500/30 hover:border-red-500 hover:shadow-red-500/20 group">
                                <div className="game-icon bg-red-500/10 group-hover:bg-red-500/20"><Swords className="w-12 h-12 text-red-500" /></div>
                                <h3 className="game-title">Bit Boss</h3>
                                <p className="game-desc">Defeat the Glitch King! Hard words, missiles, boss fights.</p>
                                <span className="game-tag text-red-300 bg-red-500/20 border-red-500/30">Hardcore</span>
                            </button>

                            {/* 5. Cosmic Zen (Chill) */}
                            <button onClick={() => { setSelectedGame('COSMIC_ZEN'); reset(); }} className="game-card border-indigo-500/30 hover:border-indigo-500 hover:shadow-indigo-500/20 group md:col-span-2 lg:col-span-1">
                                <div className="game-icon bg-indigo-500/10 group-hover:bg-indigo-500/20"><Sparkles className="w-12 h-12 text-indigo-400" /></div>
                                <h3 className="game-title">Cosmic Zen</h3>
                                <p className="game-desc">Endless flow in space. No Game Over. Just relax and type.</p>
                                <span className="game-tag text-indigo-300 bg-indigo-500/20 border-indigo-500/30">Relaxing</span>
                            </button>
                        </div>
                    ) : (
                        // Active Game Canvas
                        <div className={`relative h-[600px] w-full bg-[#050505] rounded-3xl border-2 overflow-hidden shadow-2xl transition-colors
                            ${selectedGame === 'GLYPH_HUNTER' ? 'border-green-500/20' :
                                selectedGame === 'BIT_BOSS' ? 'border-red-500/20' :
                                    selectedGame === 'COSMIC_ZEN' ? 'border-indigo-500/20' : 'border-white/10'}`}>

                            <input
                                ref={gameInputRef}
                                type="text"
                                className="absolute opacity-0 pointer-events-none"
                                value={gameInput}
                                onChange={handleArcadeInput}
                                autoFocus
                            />

                            {/* Background FX based on Mode */}
                            {selectedGame === 'COSMIC_ZEN' && <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 animate-pulse"></div>}

                            {/* HUD */}
                            <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-20 pointer-events-none">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Score</div>
                                    <div className="text-4xl font-black text-white drop-shadow-md">{gameScore}</div>
                                </div>

                                {selectedGame === 'BIT_BOSS' && (
                                    <div className="flex-1 px-12">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Bit Boss HP</span>
                                            <span className="text-white font-mono text-xs">{bossHp}/100</span>
                                        </div>
                                        <div className="h-4 w-full bg-red-900/30 rounded-full overflow-hidden border border-red-500/30">
                                            <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${bossHp}%` }}></div>
                                        </div>
                                    </div>
                                )}

                                {selectedGame !== 'COSMIC_ZEN' && (
                                    <div className="flex gap-2">
                                        {[...Array(selectedGame === 'GLYPH_HUNTER' ? 5 : 3)].map((_, i) => (
                                            <Heart key={i} className={`w-8 h-8 ${i < gameLives ? 'text-red-500 fill-red-500 animate-pulse' : 'text-slate-800'}`} />
                                        ))}
                                    </div>
                                )}
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
                                    style={{ left: `${e.x}%`, top: `${e.y}%` }}
                                >
                                    {selectedGame === 'NEON_RUSH' && (
                                        <div className="relative flex items-center justify-center transform" style={{ opacity: e.life / 100, scale: `${0.5 + (e.life / 200)}` }}>
                                            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
                                            <div className="relative bg-black border-2 border-cyan-400 text-cyan-400 font-mono font-bold text-xl px-4 py-2 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                                                {e.text}
                                            </div>
                                        </div>
                                    )}

                                    {selectedGame === 'GLYPH_HUNTER' && (
                                        <div className="font-black text-4xl text-white bg-black/40 border-2 border-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                                            {e.text}
                                        </div>
                                    )}

                                    {selectedGame === 'BIT_BOSS' && (
                                        <div className="font-mono font-bold text-sm text-red-200 bg-red-950/80 border border-red-500 px-3 py-1 rounded-none shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-2">
                                            <Flame className="w-4 h-4 text-red-500" /> {e.text}
                                        </div>
                                    )}

                                    {selectedGame === 'COSMIC_ZEN' && (
                                        <div className="font-sans font-medium text-2xl text-indigo-300 drop-shadow-[0_0_10px_rgba(165,180,252,0.8)] tracking-widest">
                                            {e.text}
                                        </div>
                                    )}

                                    {(selectedGame === 'CYBER_DEFENSE' || !selectedGame) && (
                                        <div className="font-mono font-bold text-lg text-white bg-black/80 border border-purple-500 px-3 py-1 rounded shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                                            <span className="text-purple-400 mr-2">☠</span>{e.text}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Bit Boss Avatar */}
                            {selectedGame === 'BIT_BOSS' && (
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
                                    <Skull className="w-96 h-96 text-red-600 animate-pulse" />
                                </div>
                            )}

                            {/* Player Input Display */}
                            {!isFinished && (
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                                    <div className={`backdrop-blur border px-8 py-3 rounded-xl text-2xl font-mono font-bold text-white uppercase tracking-widest min-w-[200px] text-center shadow-2xl transition-colors
                                        ${selectedGame === 'GLYPH_HUNTER' ? 'bg-green-900/40 border-green-500/30' :
                                            selectedGame === 'BIT_BOSS' ? 'bg-red-900/40 border-red-500/30' :
                                                'bg-black/50 border-white/20'}`}>
                                        {gameInput || <span className="opacity-30 text-base">TYPE TO SHOOT</span>}
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
                    <input ref={testInputRef} type="text" className="absolute opacity-0 pointer-events-none" onChange={handleTestInput} autoFocus />

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
            )}

            {/* Global Styles for Utility Classes */}
            <style jsx>{`
                .nav-btn { @apply flex items-center gap-2 px-8 py-3 rounded-full font-bold text-slate-500 transition-all hover:bg-white/5; }
                .active-test { @apply bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105; }
                .active-arcade { @apply bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105; }
                .btn-primary { @apply flex items-center bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform; }
                .btn-secondary { @apply flex items-center bg-transparent border border-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors; }
                .game-card { @apply bg-black border rounded-3xl p-8 transition-all text-left relative overflow-hidden; }
                .game-icon { @apply w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors; }
                .game-title { @apply text-2xl font-black text-white mb-2 italic; }
                .game-desc { @apply text-slate-400 font-mono text-sm mb-6 h-12; }
                .game-tag { @apply text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border; }
            `}</style>
        </div>
    )
}
