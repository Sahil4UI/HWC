"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Search, Bug, Stethoscope, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

const errorRules = [
    {
        regex: /indentationerror|expected an indented block/i,
        title: "IndentationError",
        severity: "Medium",
        explanation: "Python is strict about spaces. Your code lines aren't aligned correctly.",
        fix: "Check 'if', 'for', or 'def' lines. Ensure the next line starts with 4 spaces."
    },
    {
        regex: /syntaxerror|invalid syntax/i,
        title: "SyntaxError",
        severity: "High",
        explanation: "Python didn't understand the grammar of your code. Usually a missing character.",
        fix: "Look for missing colons (:), unclosed parentheses (), or missing quotes."
    },
    {
        regex: /nameerror|name '.*' is not defined/i,
        title: "NameError",
        severity: "Low",
        explanation: "You used a variable name that Python hasn't seen before.",
        fix: "Check for typos (e.g., 'prnt' vs 'print') or define the variable first."
    },
    {
        regex: /typeerror|unsupported operand type/i,
        title: "TypeError",
        severity: "Medium",
        explanation: "You tried to combine incompatible types (like adding text + number).",
        fix: "Convert types first using str() or int(), or check your variable types."
    },
    {
        regex: /zerodivisionerror|division by zero/i,
        title: "ZeroDivisionError",
        severity: "High",
        explanation: "Dividing by zero is impossible in Math (and Python).",
        fix: "Ensure your denominator (bottom number) is not 0."
    },
    {
        regex: /keyerror/i,
        title: "KeyError",
        severity: "Medium",
        explanation: "You asked for a dictionary key that doesn't exist.",
        fix: "Check the exact spelling of the key you are trying to access."
    },
    {
        regex: /indexerror|list index out of range/i,
        title: "IndexError",
        severity: "Medium",
        explanation: "You tried to grab an item from a list position that doesn't exist.",
        fix: "Remember lists start at 0. If list length is 3, max index is 2."
    }
]

import { explainErrorAction } from "@/app/actions/gemini"

export function ErrorExplainer() {
    const [input, setInput] = useState("")
    const [result, setResult] = useState<{ title: string; severity: string; explanation: string; fix: string } | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [error, setError] = useState("")

    const handleExplain = async () => {
        if (!input.trim()) return
        setIsAnalyzing(true)
        setResult(null)
        setError("")

        const response = await explainErrorAction(input)

        if (response.success && response.data) {
            setResult(response.data)
        } else {
            setError(response.error || "Something went wrong. Try again.")
            // Fallback to "Unknown Error" generic state if strict needed
            setResult({
                title: "AI Analysis Failed",
                severity: "Unknown",
                explanation: "Our AI brain is disconnected. check API Key.",
                fix: "Try adding GEMINI_API_KEY to .env.local"
            })
        }
        setIsAnalyzing(false)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* Input Section */}
            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-primary/30 transition-colors h-full flex flex-col">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
                        <Bug className="h-4 w-4 text-red-500" /> Paste Traceback / Error
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Example:\nTraceback (most recent call last):\n  File "main.py", line 1, in <module>\nIndentationError: expected an indented block`}
                        className="w-full flex-1 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm text-gray-700 placeholder:text-gray-400"
                    />
                    <Button
                        onClick={handleExplain}
                        disabled={isAnalyzing || !input}
                        className="mt-6 w-full h-12 text-base shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                    >
                        {isAnalyzing ? "Analyzing Log..." : <><Stethoscope className="mr-2 h-5 w-5" /> Diagnose Error</>}
                    </Button>
                </div>
            </div>

            {/* Diagnosis Report */}
            <div>
                {result ? (
                    <div className="h-full bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col animate-in slide-in-from-right-4 fade-in duration-500">
                        {/* Report Header */}
                        <div className="bg-gray-900 p-6 text-white flex justify-between items-start">
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Diagnosis Report</div>
                                <h3 className="text-2xl font-bold font-mono text-red-400">{result.title}</h3>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${result.severity === "High" ? "bg-red-500/20 text-red-300 border border-red-500/30" :
                                "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                }`}>
                                Severity: {result.severity}
                            </span>
                        </div>

                        {/* Report Body */}
                        <div className="p-8 flex-1 flex flex-col gap-8">

                            <div>
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                                    <Search className="h-5 w-5 text-blue-500" /> Analysis
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-base border-l-4 border-blue-100 pl-4 py-1">
                                    {result.explanation}
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 border border-green-100 mt-auto">
                                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-lg">
                                    <CheckCircle className="h-5 w-5" /> Recommended Fix
                                </h4>
                                <div className="flex items-start gap-3">
                                    <ArrowRight className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                    <p className="text-green-800 font-medium">
                                        {result.fix}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Stethoscope className="h-8 w-8 text-gray-300" />
                        </div>
                        <h4 className="font-bold text-gray-400 text-lg mb-2">Waiting for Input</h4>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Paste your error message on the left to generate a fix report.
                        </p>
                    </div>
                )}
            </div>

        </div>
    )
}
