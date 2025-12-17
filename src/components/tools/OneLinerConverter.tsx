"use client"

import { useState } from "react"
import { ArrowDown, ArrowRight, Wand2, Copy, Check, Code2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

const examples = [
    {
        name: "Simple List Creation",
        input: `numbers = []\nfor i in range(10):\n    numbers.append(i)`,
        output: `numbers = [i for i in range(10)]`,
        desc: "Basic loop to list mapping"
    },
    {
        name: "Filter with If",
        input: `evens = []\nfor x in range(20):\n    if x % 2 == 0:\n        evens.append(x)`,
        output: `evens = [x for x in range(20) if x % 2 == 0]`,
        desc: "Filtering items conditionally"
    },
    {
        name: "Modify Items",
        input: `squares = []\nfor num in numbers:\n    squares.append(num * num)`,
        output: `squares = [num * num for num in numbers]`,
        desc: "Transforming items during iteration"
    }
]

export function OneLinerConverter() {
    const [input, setInput] = useState(examples[0].input)
    const [output, setOutput] = useState("")
    const [copied, setCopied] = useState(false)
    const [isConverting, setIsConverting] = useState(false)

    const convertToOneLiner = () => {
        setIsConverting(true)
        setOutput("")

        setTimeout(() => {
            const foundExample = examples.find(e => e.input.replace(/\s/g, '') === input.replace(/\s/g, ''))

            if (foundExample) {
                setOutput(foundExample.output)
            } else {
                // Slightly smarter heuristic fallback
                if (input.includes("append")) {
                    // Try to extract var name
                    const loopVar = input.match(/for\s+(\w+)\s+in/)?.[1] || "x"
                    setOutput(`# Auto-generated One-Liner (Approximation):\nresult = [${loopVar} ... for ${loopVar} in iterable]`)
                } else {
                    setOutput("# Oops! This pattern is too complex for me yet.\n# Try the examples on the left!")
                }
            }
            setIsConverting(false)
        }, 800)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Examples Sidebar */}
            <div className="md:col-span-3 flex flex-col gap-3">
                <h3 className="font-bold text-gray-500 text-xs uppercase tracking-widest px-2">Load Example</h3>
                {examples.map((ex, i) => (
                    <button
                        key={i}
                        onClick={() => { setInput(ex.input); setOutput(""); }}
                        className="p-3 text-left rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all group"
                    >
                        <div className="font-bold text-gray-800 text-sm group-hover:text-primary transition-colors">{ex.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{ex.desc}</div>
                    </button>
                ))}
            </div>

            {/* Main Converter Area */}
            <div className="md:col-span-9 grid grid-cols-1 gap-6">

                {/* Visual Flow Container */}
                <div className="bg-gray-50 rounded-3xl p-2 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                        {/* Input Box */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Code2 className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-bold text-gray-600">Verbose Code</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-40 p-0 border-0 focus:ring-0 resize-none font-mono text-sm text-gray-600 leading-relaxed bg-transparent"
                                spellCheck={false}
                            />
                        </div>

                        {/* Output Box */}
                        <div className={`rounded-2xl p-6 transition-all duration-500 relative flex flex-col ${output ? "bg-[#1e1e24] shadow-2xl shadow-purple-900/20" : "bg-gray-100/50 border-2 border-dashed border-gray-200"}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-sm font-bold ${output ? "text-green-400" : "text-gray-400"}`}>
                                    {output ? "✨ One-Liner Result" : "Result Area"}
                                </span>
                                {output && (
                                    <button onClick={copyToClipboard} className="text-gray-400 hover:text-white transition-colors">
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                )}
                            </div>

                            {isConverting ? (
                                <div className="flex-1 flex items-center justify-center text-purple-500 animate-pulse font-mono text-sm">
                                    <Wand2 className="h-5 w-5 mr-2 animate-spin-slow" /> Compressing...
                                </div>
                            ) : output ? (
                                <pre className="font-mono text-sm text-white break-all whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2">
                                    {output}
                                </pre>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                                    Waiting for magic...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    onClick={convertToOneLiner}
                    disabled={isConverting}
                    className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-600/20 rounded-2xl border-0"
                >
                    {isConverting ? "Working..." : <>Convert to One-Liner <ArrowRight className="ml-2 h-5 w-5" /></>}
                </Button>

            </div>

        </div>
    )
}
