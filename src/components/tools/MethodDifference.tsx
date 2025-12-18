"use client"

import { useState } from "react"
import { ArrowRight, SplitSquareHorizontal, Code2, Sparkles, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { explainMethodDifferenceAction } from "@/app/actions/gemini"

const LANGUAGES = [
    "Python", "JavaScript", "Java", "C++", "C#", "Go", "Ruby", "Swift", "PHP", "Rust", "Dart"
]

export function MethodDifference() {
    const [lang, setLang] = useState("Python")
    const [method1, setMethod1] = useState("")
    const [method2, setMethod2] = useState("")
    const [result, setResult] = useState<{ title: string; explanation: string; keyDistinction: string; codeExample: string } | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleCompare = async () => {
        if (!method1.trim() || !method2.trim()) return
        setLoading(true)
        setError("")
        setResult(null)

        const response = await explainMethodDifferenceAction(lang, method1, method2)

        if (response.success && response.data) {
            setResult(response.data)
        } else {
            setError(response.error || "Failed to compare. Ensure API Key is set.")
            // Fallback for demo
            if (response.error === "API Key Missing") {
                setError("Please add GEMINI_API_KEY to .env.local")
            }
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto">

            {/* Input Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>

                    {/* Method 1 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Method 1</label>
                        <input
                            type="text"
                            value={method1}
                            onChange={(e) => setMethod1(e.target.value)}
                            placeholder="e.g. map"
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                        />
                    </div>

                    {/* Method 2 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Method 2</label>
                        <input
                            type="text"
                            value={method2}
                            onChange={(e) => setMethod2(e.target.value)}
                            placeholder="e.g. forEach"
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={handleCompare}
                        disabled={loading || !method1 || !method2}
                        size="lg"
                        className="w-full md:w-auto min-w-[200px] h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                Analyzing...
                            </span>
                        ) : (
                            <>
                                <SplitSquareHorizontal className="mr-2 h-5 w-5" /> Compare Methods
                            </>
                        )}
                    </Button>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4" /> {error}
                    </div>
                )}
            </div>

            {/* Result Section */}
            {result && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-500 border border-indigo-100">
                    <div className="bg-indigo-600 p-6 text-white flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-lg">
                            <SplitSquareHorizontal className="h-8 w-8 text-indigo-100" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-1">Comparison Result</div>
                            <h3 className="text-2xl font-black">{result.title}</h3>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-indigo-500" /> Explanation
                            </h4>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {result.explanation}
                            </p>

                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                <h5 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Key Distinction</h5>
                                <p className="text-gray-800 font-medium">
                                    {result.keyDistinction}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Code2 className="h-4 w-4 text-green-500" /> Code Example
                            </h4>
                            <div className="bg-[#1e1e24] p-4 rounded-xl overflow-auto border border-gray-800 shadow-inner">
                                <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                                    <code>{result.codeExample}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!result && !loading && !error && (
                <div className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    <SplitSquareHorizontal className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Enter two methods above to see the magic.</p>
                </div>
            )}

        </div>
    )
}
