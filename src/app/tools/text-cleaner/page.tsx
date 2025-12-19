"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"
import { Button } from "@/components/ui/Button"
import { Eraser, Sparkles, Check, Copy, Wand2, Briefcase, Smile, Keyboard } from "lucide-react"
import { cleanTextAction } from "@/app/actions/gemini"

export default function TextCleaner() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [loading, setLoading] = useState(false)
    const [activeMode, setActiveMode] = useState<'grammar' | 'simplify' | 'professional' | 'remove_special' | null>(null)

    const handleAction = async (mode: 'grammar' | 'simplify' | 'professional' | 'remove_special') => {
        if (!input.trim()) return
        setLoading(true)
        setActiveMode(mode)
        setOutput("")

        const result = await cleanTextAction(input, mode)

        if (result.success && result.data) {
            setOutput(result.data)
        } else {
            setOutput("Error: " + (result.error || "Failed to process text. Check API Key."))
        }
        setLoading(false)
        setActiveMode(null)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
    }

    const tools = [
        { id: 'grammar', label: 'Fix Grammar', icon: Check, color: 'text-green-400', border: 'hover:border-green-400/50' },
        { id: 'simplify', label: 'Simplify Text', icon: Smile, color: 'text-yellow-400', border: 'hover:border-yellow-400/50' },
        { id: 'professional', label: 'Make Professional', icon: Briefcase, color: 'text-blue-400', border: 'hover:border-blue-400/50' },
        { id: 'remove_special', label: 'Remove Emojis/Symbols', icon: Eraser, color: 'text-red-400', border: 'hover:border-red-400/50' },
    ] as const

    return (
        <ToolLayout
            title="AI Text Cleaner & Fixer"
            subtitle="Instantly fix grammar, rephrase for professionalism, or strip unwanted characters using Gemini AI."
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">

                {/* Input Column */}
                <div className="flex flex-col gap-4 h-full">
                    <div className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Keyboard className="h-4 w-4" /> Input Text
                        </span>
                        <span className="text-xs text-slate-600 font-mono">{input.length} chars</span>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your rough draft, messy email, or broken English here..."
                        className="flex-1 bg-black/40 border border-white/10 p-6 text-slate-300 resize-none focus:outline-none focus:border-primary/50 text-base leading-relaxed"
                    />

                    {/* Action Bar */}
                    <div className="grid grid-cols-2 gap-3">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => handleAction(tool.id)}
                                disabled={loading || !input}
                                className={`flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 ${tool.border} transition-all hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading && activeMode === tool.id ? (
                                    <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span>
                                ) : (
                                    <tool.icon className={`h-4 w-4 ${tool.color}`} />
                                )}
                                <span className="text-sm font-bold text-slate-200">{tool.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Output Column */}
                <div className="flex flex-col gap-4 h-full">
                    <div className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="h-4 w-4" /> AI Output
                        </span>
                        {output && (
                            <button onClick={copyToClipboard} className="text-xs font-bold text-white hover:text-primary flex items-center gap-2 transition-colors">
                                <Copy className="h-3 w-3" /> Copy
                            </button>
                        )}
                    </div>
                    <div className="flex-1 bg-black/80 border border-white/10 p-6 relative group overflow-auto">
                        {output ? (
                            <p className="text-white text-base leading-relaxed whitespace-pre-wrap animate-in fade-in duration-500">
                                {output}
                            </p>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                                <Wand2 className="h-12 w-12 mb-4" />
                                <p className="text-sm font-mono text-center max-w-xs">
                                    Select an AI tool from the left to transform your text instantly.
                                </p>
                            </div>
                        )}

                        {/* Empty State / Loading */}
                        {loading && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-10">
                                <span className="flex items-center gap-2 text-primary font-bold animate-pulse">
                                    <Sparkles className="h-5 w-5" /> Processing with Gemini...
                                </span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <ToolContent
                toolName="AI Text Cleaner"
                howToUse={[
                    { title: "Input Text", desc: "Type any text, email draft, or messy paragraph." },
                    { title: "Choose Action", desc: "Select 'Fix Grammar', 'Professional', or 'Simplify'." },
                    { title: "Copy", desc: "Get the polished result instantly." }
                ]}
                whyUse={[
                    "Professionalism: Send error-free emails and reports.",
                    "Privacy: Text processing happens safely via our AI.",
                    "Speed: Fix grammar faster than manual checking."
                ]}
            />
        </ToolLayout>
    )
}
