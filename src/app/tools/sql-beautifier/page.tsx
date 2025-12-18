"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { Button } from "@/components/ui/Button"
import { Copy, Database, Play, Sparkles, Trash2, CheckCircle } from "lucide-react"
import { format } from "sql-formatter"

export default function SqlBeautifier() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [language, setLanguage] = useState("sql")
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState("")

    const handleFormat = () => {
        if (!input.trim()) return

        try {
            setError("")
            const formatted = format(input, {
                language: language as any, // dialect
                tabWidth: 4,
                keywordCase: "upper",
                linesBetweenQueries: 2,
            })
            setOutput(formatted)
        } catch (err) {
            setError("Invalid SQL syntax. Please check your query.")
            setOutput(input) // fallback
        }
    }

    const handleCopy = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleClear = () => {
        setInput("")
        setOutput("")
        setError("")
    }

    return (
        <ToolLayout
            title="SQL Beautifier & Formatter"
            subtitle="Transform messy SQL queries into clean, readable code instantly. Supports Standard SQL, PostgreSQL, MySQL and more."
        >
            <div className="space-y-6">

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4 border border-white/10 rounded-none">
                    <div className="flex items-center gap-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-black border border-white/20 text-white text-sm px-4 py-2 rounded-none focus:border-primary focus:outline-none"
                        >
                            <option value="sql">Standard SQL</option>
                            <option value="postgresql">PostgreSQL</option>
                            <option value="mysql">MySQL</option>
                            <option value="bigquery">Google BigQuery</option>
                            <option value="snowflake">Snowflake</option>
                        </select>
                        <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                            // Select Dialect
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleClear}
                            align="center"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={handleFormat}
                            className="bg-primary text-black hover:bg-white font-bold uppercase tracking-widest"
                        >
                            <Sparkles className="mr-2 h-4 w-4" /> Beautify SQL
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
                    {/* Input */}
                    <div className="relative h-full flex flex-col">
                        <div className="bg-white/5 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest border border-white/10 border-b-0 flex justify-between">
                            <span>Input Query</span>
                            <span className="text-primary text-[10px]">{input.length} chars</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your nasty, unformatted SQL query here..."
                            className="flex-1 bg-black/60 border border-white/10 p-4 font-mono text-sm text-slate-300 focus:outline-none focus:border-primary/50 resize-none font-ligature placeholder:text-slate-700"
                        />
                    </div>

                    {/* Output */}
                    <div className="relative h-full flex flex-col">
                        <div className="bg-white/5 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest border border-white/10 border-b-0 flex justify-between">
                            <span>Formatted Result</span>
                            {copied ? (
                                <span className="text-green-400 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Copied</span>
                            ) : (
                                <button onClick={handleCopy} className="hover:text-white flex items-center gap-1 transition-colors">
                                    <Copy className="h-3 w-3" /> Copy
                                </button>
                            )}
                        </div>
                        <div className="relative flex-1 bg-[#0a0a0a] border border-white/10 p-4 overflow-auto group">
                            {error ? (
                                <div className="text-red-400 font-mono text-sm p-4 border border-red-500/20 bg-red-500/5">
                                    <AlertTriangle className="h-4 w-4 inline-block mr-2" />
                                    {error}
                                </div>
                            ) : (
                                <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                                    {output || <span className="text-slate-700 select-none">// Formatted result will appear here...</span>}
                                </pre>
                            )}

                            {/* Copy overlay button for ease */}
                            {output && (
                                <Button
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    size="sm"
                                >
                                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </ToolLayout>
    )
}

function AlertTriangle({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}
