"use client"

import { useState, useEffect, useRef } from 'react'
import { RotateCcw, Gamepad2, Zap, Shield, Heart, Skull, Swords, Sparkles, Baby, Flame } from 'lucide-react'

type GameType = "CYBER_DEFENSE" | "NEON_RUSH" | "GLYPH_HUNTER" | "BIT_BOSS" | "COSMIC_ZEN" | null

type Particle = {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    life: number
}

export function TypingArcade() {
    // Arcade State
    const [selectedGame, setSelectedGame] = useState<GameType>(null)
    const [gameScore, setGameScore] = useState(0)
    const [gameLives, setGameLives] = useState(3)
    const [gameLevel, setGameLevel] = useState(1)
    const [gameInput, setGameInput] = useState("")
    const [bossHp, setBossHp] = useState(100)
    const [isActive, setIsActive] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [combo, setCombo] = useState(0) // New Combo State

    // Entities for games
    const [entities, setEntities] = useState<{ id: number, text: string, x: number, y: number, life: number, maxLife: number }[]>([])

    // Visual FX State
    const [shake, setShake] = useState(false)

    // Particles State
    const [particles, setParticles] = useState<Particle[]>([])

    // Refs
    const gameInputRef = useRef<HTMLInputElement>(null)
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    // --- EFFECT: Focus Update ---
    useEffect(() => {
        if (isActive) {
            // Force focus
            setTimeout(() => gameInputRef.current?.focus(), 50)
            const interval = setInterval(() => {
                if (document.activeElement !== gameInputRef.current) gameInputRef.current?.focus()
            }, 500)
            return () => clearInterval(interval)
        }
    }, [isActive])

    // --- EFFECT: Game Loop ---
    useEffect(() => {
        if (selectedGame && isActive && !isFinished) {
            gameLoopRef.current = setInterval(() => {
                const now = Date.now()

                // Update Particles
                setParticles(prev => prev.map(p => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    life: p.life - 0.05
                })).filter(p => p.life > 0))

                setEntities(prev => {
                    let next = [...prev]
                    let damageTaken = 0

                    // --- MOVEMENT & LOSS LOGIC ---

                    // 1. NEON RUSH: Shrink life
                    if (selectedGame === 'NEON_RUSH') {
                        next = next.map(e => ({ ...e, life: e.life - 1.5 }))
                        const died = next.filter(e => e.life <= 0)
                        if (died.length > 0) damageTaken += died.length
                        next = next.filter(e => e.life > 0)
                    }

                    // 2. CYBER DEFENSE: Move Down
                    if (selectedGame === 'CYBER_DEFENSE') {
                        const speed = 0.5 + (gameLevel * 0.1)
                        next = next.map(e => ({ ...e, y: e.y + speed }))
                        const breached = next.filter(e => e.y > 90)
                        if (breached.length > 0) damageTaken += breached.length
                        next = next.filter(e => e.y <= 90)
                    }

                    // 3. GLYPH HUNTER: Move Down Slowly
                    if (selectedGame === 'GLYPH_HUNTER') {
                        const speed = 0.15 + (gameLevel * 0.05)
                        next = next.map(e => ({ ...e, y: e.y + speed }))
                        const breached = next.filter(e => e.y > 90)
                        if (breached.length > 0) damageTaken += 1
                        next = next.filter(e => e.y <= 90)
                    }

                    // 4. BIT BOSS: Move Down (Missiles)
                    if (selectedGame === 'BIT_BOSS') {
                        const speed = 0.8 + (gameLevel * 0.1)
                        next = next.map(e => ({ ...e, y: e.y + speed }))
                        const breached = next.filter(e => e.y > 90)
                        if (breached.length > 0) damageTaken += breached.length
                        next = next.filter(e => e.y <= 90)
                    }

                    // 5. COSMIC ZEN: Move Right (Horizontal)
                    if (selectedGame === 'COSMIC_ZEN') {
                        const speed = 0.3
                        next = next.map(e => ({ ...e, x: e.x + speed }))
                        next = next.filter(e => e.x <= 95)
                    }

                    // Apply Damage
                    if (damageTaken > 0) loseLife(damageTaken)

                    // --- SPAWN LOGIC ---
                    const maxEntities = selectedGame === 'NEON_RUSH' ? 3 + gameLevel :
                        selectedGame === 'GLYPH_HUNTER' ? 3 :
                            selectedGame === 'BIT_BOSS' ? 2 + Math.ceil(gameLevel / 2) : 5 + gameLevel

                    const baseRate = selectedGame === 'NEON_RUSH' ? 0.04 :
                        selectedGame === 'GLYPH_HUNTER' ? 0.015 :
                            selectedGame === 'COSMIC_ZEN' ? 0.015 : 0.02

                    const spawnRate = baseRate + (gameLevel * 0.005)

                    if (Math.random() < spawnRate && next.length < maxEntities) {
                        let wordList: string[] = []

                        // Game Word Dictionaries
                        if (selectedGame === 'GLYPH_HUNTER') {
                            wordList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                        } else if (selectedGame === 'BIT_BOSS') {
                            wordList = ["hack", "code", "node", "java", "ruby", "rust", "perl", "bash", "root", "user", "pass", "keys", "host", "port", "ipv4", "ipv6", "data", "file", "disk", "bios"]
                        } else if (selectedGame === 'COSMIC_ZEN') {
                            wordList = ["sky", "sun", "sea", "air", "dew", "fog", "ice", "gem", "joy", "art", "ray", "arc", "hue", "zen", "orb", "now", "fly", "see"]
                        } else {
                            wordList = ["exe", "bin", "opt", "var", "tmp", "dev", "usr", "lib", "etc", "sys", "proc", "run", "log", "man", "git", "ssh", "ftp", "www", "com", "net", "org"]
                        }

                        const word = wordList[Math.floor(Math.random() * wordList.length)]

                        let x = Math.random() * 80 + 5
                        let y = 0

                        if (selectedGame === 'NEON_RUSH') {
                            y = Math.random() * 60 + 10
                        } else if (selectedGame === 'COSMIC_ZEN') {
                            x = -10
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
    }, [isActive, selectedGame, gameLevel])

    // --- HELPER HANDLERS ---
    const createExplosion = (x: number, y: number, color: string) => {
        const newParticles: Particle[] = []
        for (let i = 0; i < 12; i++) {
            newParticles.push({
                id: Math.random(),
                x,
                y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                color,
                life: 1.0
            })
        }
        setParticles(prev => [...prev, ...newParticles])
    }

    const loseLife = (amount: number) => {
        setCombo(0) // Reset Combo on miss
        setGameLives(prev => {
            const newVal = prev - amount
            if (newVal <= 0) {
                endGame()
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
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }

    const startGame = (type: GameType) => {
        // Correctly initialize state synchronously-ish
        setSelectedGame(type)
        setIsActive(true)
        setIsFinished(false)
        setGameScore(0)
        setCombo(0)
        setGameLives(type === 'GLYPH_HUNTER' ? 5 : 3)
        setGameLevel(1)
        setGameInput("")
        setEntities([])
        setParticles([])
        setBossHp(100)

        // Focus hack
        setTimeout(() => gameInputRef.current?.focus(), 100)
    }

    const reset = () => {
        if (selectedGame) startGame(selectedGame)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setGameInput(val)

        const matchIdx = entities.findIndex(e => e.text.toLowerCase() === val.trim().toLowerCase())
        if (matchIdx !== -1) {
            // HIT!
            const target = entities[matchIdx]

            // FX
            const color = selectedGame === 'NEON_RUSH' ? '#22d3ee' :
                selectedGame === 'GLYPH_HUNTER' ? '#4ade80' :
                    selectedGame === 'BIT_BOSS' ? '#ef4444' : '#a855f7'

            createExplosion(target.x, target.y, color)

            setEntities(prev => prev.filter((_, i) => i !== matchIdx))

            // Score with Combo
            const multiplier = 1 + (combo * 0.1)
            setGameScore(s => Math.floor(s + (10 * gameLevel * multiplier)))
            setCombo(c => c + 1)

            setGameInput("")

            if (selectedGame === 'BIT_BOSS') {
                setBossHp(prev => {
                    const damage = 5 + (combo > 5 ? 5 : 0) // Bonus damage
                    const newHp = prev - damage
                    if (newHp <= 0) {
                        setGameLevel(l => l + 1)
                        // Boss Explosion
                        createExplosion(50, 20, '#ff0000')
                        createExplosion(45, 25, '#ff0000')
                        createExplosion(55, 15, '#ff0000')
                        return 100
                    }
                    return newHp
                })
            }

            if (selectedGame !== 'BIT_BOSS' && (gameScore + 10) % 100 === 0) setGameLevel(l => l + 1)
        }
    }

    return (
        <div className={`max-w-6xl mx-auto flex flex-col min-h-[600px] relative z-20 ${shake ? 'animate-shake' : ''}`}>
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
                .animate-shake { animation: shake 0.5s; }
                .animate-shake { animation: shake 0.5s; }
                .game-card { 
                    @apply bg-zinc-900 border-2 border-zinc-700/50 rounded-2xl p-6 transition-all text-left relative overflow-hidden group hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)];
                }
                .game-icon { 
                    @apply w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-inner bg-black/50 border border-white/5; 
                }
                .game-title { 
                    @apply text-2xl font-black text-white mb-2 italic tracking-wide uppercase; 
                }
                .game-desc { 
                    @apply text-zinc-300 font-mono text-sm mb-6 h-12 leading-relaxed font-medium; 
                }
                .game-tag { 
                    @apply text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border shadow-sm inline-block; 
                }
                .btn-primary { 
                    @apply flex items-center bg-white text-black font-black px-8 py-4 rounded-xl hover:scale-105 transition-transform uppercase tracking-wider shadow-lg hover:shadow-white/20; 
                }
                .btn-secondary { 
                    @apply flex items-center bg-black/50 border-2 border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors uppercase tracking-wider; 
                }
                .bg-grid-pattern {
                    background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>

            <div className="w-full">
                {!selectedGame ? (
                    // Game Selection Menu
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in fade-in zoom-in px-4">
                        {/* 1. Cyber Defense */}
                        <button onClick={() => startGame('CYBER_DEFENSE')} className="group relative overflow-hidden bg-zinc-900 border border-purple-500/30 hover:border-purple-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30 group-hover:scale-110 transition-transform">
                                    <Shield className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">Cyber Defense</h3>
                                <p className="text-gray-300 text-sm font-mono mb-6 leading-relaxed min-h-[40px]">Stop viruses from breaching the firewall. Classic mode.</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 bg-purple-500/20 px-3 py-1 rounded border border-purple-500/30">Balanced</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-black transition-colors">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* 2. Neon Rush */}
                        <button onClick={() => startGame('NEON_RUSH')} className="group relative overflow-hidden bg-zinc-900 border border-cyan-500/30 hover:border-cyan-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                                    <Zap className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">Neon Rush</h3>
                                <p className="text-gray-300 text-sm font-mono mb-6 leading-relaxed min-h-[40px]">Targets appear randomly and decay fast. Reflex test!</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded border border-cyan-500/30">Fast Paced</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* 3. Glyph Hunter */}
                        <button onClick={() => startGame('GLYPH_HUNTER')} className="group relative overflow-hidden bg-zinc-900 border border-green-500/30 hover:border-green-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 border border-green-500/30 group-hover:scale-110 transition-transform">
                                    <Baby className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">Glyph Hunter</h3>
                                <p className="text-gray-300 text-sm font-mono mb-6 leading-relaxed min-h-[40px]">Giant letters, slow speed. Perfect for kids & beginners.</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-300 bg-green-500/20 px-3 py-1 rounded border border-green-500/30">Kids Mode</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* 4. Bit Boss */}
                        <button onClick={() => startGame('BIT_BOSS')} className="group relative overflow-hidden bg-zinc-900 border border-red-500/30 hover:border-red-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-red-500/30 group-hover:scale-110 transition-transform">
                                    <Swords className="w-8 h-8 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">Bit Boss</h3>
                                <p className="text-gray-300 text-sm font-mono mb-6 leading-relaxed min-h-[40px]">Defeat the Glitch King! Hard words, missiles, boss fights.</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-300 bg-red-500/20 px-3 py-1 rounded border border-red-500/30">Hardcore</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500 group-hover:text-black transition-colors">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* 5. Cosmic Zen */}
                        <button onClick={() => startGame('COSMIC_ZEN')} className="group relative overflow-hidden bg-zinc-900 border border-indigo-500/30 hover:border-indigo-500 rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] md:col-span-2 lg:col-span-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">Cosmic Zen</h3>
                                <p className="text-gray-300 text-sm font-mono mb-6 leading-relaxed min-h-[40px]">Endless flow in space. No Game Over. Just relax and type.</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded border border-indigo-500/30">Relaxing</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-black transition-colors">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12">
                        {/* Active Game Canvas */}
                        <div className={`relative h-[600px] w-full bg-[#050505] rounded-3xl border-2 overflow-hidden shadow-2xl transition-colors bg-grid-pattern
                            ${selectedGame === 'GLYPH_HUNTER' ? 'border-green-500/20' :
                                selectedGame === 'BIT_BOSS' ? 'border-red-500/20' :
                                    selectedGame === 'COSMIC_ZEN' ? 'border-indigo-500/20' : 'border-white/10'}`}
                            onClick={() => gameInputRef.current?.focus()}>

                            <input
                                ref={gameInputRef}
                                type="text"
                                className="absolute opacity-0 pointer-events-none"
                                value={gameInput}
                                onChange={handleInput}
                                autoFocus
                            />

                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none"></div>
                            {selectedGame === 'COSMIC_ZEN' && <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 animate-pulse"></div>}

                            {/* HUD */}
                            <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-20 pointer-events-none">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Score</div>
                                    <div className="text-4xl font-black text-white drop-shadow-md">{gameScore}</div>
                                    {combo > 2 && (
                                        <div className="text-yellow-400 font-black italic text-xl animate-bounce mt-1 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                                            {combo}x COMBO!
                                        </div>
                                    )}
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
                            {/* PARTICLES RENDER */}
                            {particles.map(p => (
                                <div
                                    key={p.id}
                                    className="absolute rounded-full pointer-events-none"
                                    style={{
                                        left: `${p.x}%`,
                                        top: `${p.y}%`,
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: p.color,
                                        opacity: p.life,
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: `0 0 10px ${p.color}`
                                    }}
                                />
                            ))}

                            {/* ENTITIES RENDER */}
                            {entities.map(e => (
                                <div
                                    key={e.id}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 text-center"
                                    style={{ left: `${e.x}%`, top: `${e.y}%` }}
                                >
                                    {selectedGame === 'NEON_RUSH' && (
                                        <div className="relative flex items-center justify-center transform" style={{ opacity: e.life / 100, scale: `${0.7 + (e.life / 150)}` }}>
                                            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
                                            <div className="relative bg-black border-2 border-cyan-400 text-cyan-400 font-mono font-black text-2xl px-5 py-3 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                                                {e.text}
                                            </div>
                                        </div>
                                    )}

                                    {selectedGame === 'GLYPH_HUNTER' && (
                                        <div className="font-black text-5xl text-white bg-black/40 border-4 border-green-500 w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-pulse">
                                            {e.text}
                                        </div>
                                    )}

                                    {selectedGame === 'BIT_BOSS' && (
                                        <div className="font-mono font-bold text-lg text-white bg-red-950/90 border-2 border-red-500 px-4 py-2 rounded-none shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center gap-2">
                                            <Flame className="w-5 h-5 text-red-500 animate-bounce" /> {e.text}
                                        </div>
                                    )}

                                    {selectedGame === 'COSMIC_ZEN' && (
                                        <div className="font-sans font-medium text-3xl text-indigo-300 drop-shadow-[0_0_15px_rgba(165,180,252,1)] tracking-widest bg-black/20 backdrop-blur px-4 py-1 rounded-full border border-indigo-500/20">
                                            {e.text}
                                        </div>
                                    )}

                                    {(selectedGame === 'CYBER_DEFENSE' || !selectedGame) && (
                                        <div className="font-mono font-black text-xl text-white bg-black/80 border-2 border-purple-500 px-4 py-2 rounded shadow-[0_0_20px_rgba(168,85,247,0.8)]">
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
                                    <div className={`backdrop-blur border-2 px-10 py-4 rounded-2xl text-3xl font-mono font-black text-white uppercase tracking-widest min-w-[300px] text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-colors
                                    ${selectedGame === 'GLYPH_HUNTER' ? 'bg-green-900/60 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.2)]' :
                                            selectedGame === 'BIT_BOSS' ? 'bg-red-900/60 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' :
                                                'bg-black/80 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
                                        {gameInput ? (
                                            <span className="drop-shadow-md">{gameInput}</span>
                                        ) : (
                                            <span className="opacity-30 text-lg animate-pulse">TYPE TO SHOOT</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SEO: How to Play */}
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto w-full">
                            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                                {selectedGame === 'CYBER_DEFENSE' && <Shield className="text-purple-500" />}
                                {selectedGame === 'NEON_RUSH' && <Zap className="text-cyan-500" />}
                                {selectedGame === 'GLYPH_HUNTER' && <Baby className="text-green-500" />}
                                {selectedGame === 'BIT_BOSS' && <Swords className="text-red-500" />}
                                {selectedGame === 'COSMIC_ZEN' && <Sparkles className="text-indigo-500" />}
                                How to Play: {selectedGame.replace('_', ' ')}
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 text-slate-300 leading-relaxed">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">Objective</h3>
                                    <p className="mb-4">
                                        Type the words appearing on screen before they damage you or disappear.
                                        Keep your streak alive to build your <strong>Combo Meter</strong> for massive points!
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 marker:text-primary">
                                        <li>Type correctly to destroy enemies.</li>
                                        <li>Don't let them reach the bottom (or timeout).</li>
                                        <li>Build chains for multiplier bonuses.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">Pro Tips</h3>
                                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                        <p className="italic text-sm text-slate-400">
                                            "Focus on accuracy over raw speed. A missed keystroke breaks your combo and lowers your final score potential!"
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-black text-white">Enter</div>
                                            <div className="text-[10px] uppercase text-slate-500">To Clear</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-black text-white">Bksp</div>
                                            <div className="text-[10px] uppercase text-slate-500">To Correct</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
