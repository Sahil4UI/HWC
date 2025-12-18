"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Play, Pause, Square, Volume2, Mic, Languages, Download, Loader2 } from "lucide-react"
import { downloadTTSAction } from "@/app/actions/tts"

export function TextToSpeech() {
    const [text, setText] = useState("")
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [selectedVoice, setSelectedVoice] = useState<string>("")
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

    useEffect(() => {
        const loadVoices = () => {
            const vs = window.speechSynthesis.getVoices()
            setVoices(vs)
            // Default to Google Hindi or first found
            const hindi = vs.find(v => v.lang.includes('hi') || v.name.includes('Hindi'))
            if (hindi) setSelectedVoice(hindi.name)
            else if (vs.length > 0) setSelectedVoice(vs[0].name)
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
    }, [])

    const handlePlay = () => {
        if (isPaused) {
            window.speechSynthesis.resume()
            setIsPaused(false)
            setIsSpeaking(true)
            return
        }

        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel()

        const u = new SpeechSynthesisUtterance(text)
        const voice = voices.find(v => v.name === selectedVoice)
        if (voice) {
            u.voice = voice
            // Slow down slightly for Hindi if needed, but default 1 is usually fine
            // u.rate = 0.9 
        }

        u.onend = () => {
            setIsSpeaking(false)
            setIsPaused(false)
        }

        setUtterance(u)
        window.speechSynthesis.speak(u)
        setIsSpeaking(true)
    }

    const handlePause = () => {
        window.speechSynthesis.pause()
        setIsPaused(true)
    }

    const handleStop = () => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        setIsPaused(false)
    }

    const handleDownload = async () => {
        if (text.length > 200) {
            alert("Free download limit is ~200 characters. Please shorten text.")
            return
        }

        setIsDownloading(true)
        const voice = voices.find(v => v.name === selectedVoice)
        // Extract language code (e.g., 'hi-IN' -> 'hi')
        const langCode = voice?.lang.split('-')[0] || 'en'

        const res = await downloadTTSAction(text, langCode)

        if (res.success && res.audio) {
            const link = document.createElement('a')
            link.href = res.audio
            link.download = `speech-${Date.now()}.mp3`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            alert("Download Failed: " + res.error)
        }
        setIsDownloading(false)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[#1e1e24] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Decorative gradients */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="p-6 md:p-10 relative z-10">

                    {/* Controls Header */}
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Mic className="text-pink-500" /> Text to Speech
                            </h2>
                            <p className="text-slate-400 font-mono text-sm mt-1">Convert text to natural sounding audio instantly.</p>
                        </div>

                        {/* Voice Selector */}
                        <div className="flex items-center gap-3 bg-black/40 p-2 rounded-xl border border-white/10">
                            <Languages className="text-slate-400 h-5 w-5 ml-2" />
                            <select
                                value={selectedVoice}
                                onChange={(e) => setSelectedVoice(e.target.value)}
                                className="bg-transparent text-slate-200 border-none outline-none text-sm font-medium min-w-[250px] cursor-pointer max-w-[300px]"
                            >
                                <optgroup label="Hindi (Recommended)">
                                    {voices.filter(v => v.lang.includes('hi') || v.name.includes('Hindi')).map(v => (
                                        <option key={v.name} value={v.name} className="bg-[#1e1e24]">{v.name} (Hindi)</option>
                                    ))}
                                </optgroup>
                                <optgroup label="English">
                                    {voices.filter(v => v.lang.includes('en') && !v.name.includes('Hindi')).sort((a, b) => a.name.localeCompare(b.name)).map(v => (
                                        <option key={v.name} value={v.name} className="bg-[#1e1e24]">{v.name} ({v.lang})</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Other Languages">
                                    {voices.filter(v => !v.lang.includes('hi') && !v.name.includes('Hindi') && !v.lang.includes('en')).map(v => (
                                        <option key={v.name} value={v.name} className="bg-[#1e1e24]">{v.name} ({v.lang})</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    {/* Text Area & Visualizer */}
                    <div className="relative mb-8">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something here (English or Hindi)..."
                            className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-6 text-slate-200 text-lg leading-relaxed resize-none focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all font-sans placeholder:text-slate-600 relative z-10"
                        />
                        <div className={`absolute bottom-4 right-4 text-xs font-mono px-2 py-1 rounded bg-black/60 z-20 ${text.length > 200 ? 'text-red-400 border border-red-500/50' : 'text-slate-500'}`}>
                            {text.length} / 200 chars for Download
                        </div>

                        {/* Audio Visualizer (CSS Animation) */}
                        {isSpeaking && !isPaused && (
                            <div className="absolute bottom-6 left-6 flex items-end gap-1 h-8 z-20">
                                <div className="w-1 bg-pink-500 animate-[bounce_0.5s_infinite] rounded-full h-full"></div>
                                <div className="w-1 bg-purple-500 animate-[bounce_0.7s_infinite] rounded-full h-2/3"></div>
                                <div className="w-1 bg-indigo-500 animate-[bounce_0.6s_infinite] rounded-full h-3/4"></div>
                                <div className="w-1 bg-blue-500 animate-[bounce_0.8s_infinite] rounded-full h-1/2"></div>
                                <div className="w-1 bg-cyan-500 animate-[bounce_0.4s_infinite] rounded-full h-4/5"></div>
                            </div>
                        )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-center gap-4">
                        {!isSpeaking || isPaused ? (
                            <Button
                                onClick={handlePlay}
                                disabled={!text}
                                size="lg"
                                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold h-14 px-10 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-transform hover:scale-105"
                            >
                                <Play className="fill-white h-5 w-5 mr-2" />
                                {isPaused ? "Resume" : "Speak Now"}
                            </Button>
                        ) : (
                            <Button
                                onClick={handlePause}
                                size="lg"
                                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-14 px-10 rounded-full"
                            >
                                <Pause className="fill-black h-5 w-5 mr-2" /> Pause
                            </Button>
                        )}

                        <Button
                            onClick={handleStop}
                            disabled={!isSpeaking}
                            size="lg"
                            variant="outline"
                            className="border-white/20 text-slate-300 hover:bg-white/10 h-14 w-14 rounded-full p-0 flex items-center justify-center"
                        >
                            <Square className="fill-current h-4 w-4" />
                        </Button>

                        <Button
                            onClick={handleDownload}
                            disabled={!text || text.length > 200 || isDownloading}
                            size="lg"
                            variant="outline"
                            className="order-last ml-2 border-green-500/30 text-green-400 hover:bg-green-500/10 h-14 px-6 rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Download MP3 (External)"
                        >
                            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            <span className="hidden sm:inline">{isDownloading ? "Saving..." : "MP3"}</span>
                        </Button>
                    </div>

                    <div className="mt-8 text-center space-y-2">
                        <p className="text-xs text-slate-600 uppercase tracking-widest font-bold">
                            Powered by Web Speech API • No Limits • 100% Free
                        </p>
                        <p className="text-[10px] text-slate-700">
                            *Download uses Google TTS fallback. Quality may vary from browser voice.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
