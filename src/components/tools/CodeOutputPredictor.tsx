"use client"

import { useState } from "react"
import { Eye, EyeOff, Play } from "lucide-react"
import { Button } from "@/components/ui/Button"

const challenges = [
    {
        id: 1,
        title: "Basic Print",
        code: `x = 10\ny = 5\nprint(x + y)`,
        output: "15",
        explanation: [
            "1. Variable x is set to 10.",
            "2. Variable y is set to 5.",
            "3. x + y (10 + 5) equals 15.",
            "4. print() shows 15 on screen."
        ]
    },
    {
        id: 2,
        title: "String Concatenation",
        code: `a = "Hello"\nb = "World"\nprint(a + " " + b)`,
        output: "Hello World",
        explanation: [
            "1. a is 'Hello'.",
            "2. b is 'World'.",
            "3. We join 'Hello' + ' ' (space) + 'World'.",
            "4. Result is 'Hello World'."
        ]
    },
    {
        id: 3,
        title: "List Indexing",
        code: `fruits = ["Apple", "Banana", "Cherry"]\nprint(fruits[1])`,
        output: "Banana",
        explanation: [
            "1. Lists are 0-indexed in Python.",
            "2. Index 0 is Apple.",
            "3. Index 1 is Banana.",
            "4. Index 2 is Cherry.",
            "5. So fruits[1] prints 'Banana'."
        ]
    }
]

export function CodeOutputPredictor() {
    const [activeChallenge, setActiveChallenge] = useState(challenges[0])
    const [showOutput, setShowOutput] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)

    const handleChallengeChange = (challenge: typeof challenges[0]) => {
        setActiveChallenge(challenge)
        setShowOutput(false)
        setShowExplanation(false)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[500px]">

            {/* Left: Code & Controls */}
            <div className="bg-gray-900 p-8 flex flex-col border-r border-gray-800">
                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                    {challenges.map(c => (
                        <button
                            key={c.id}
                            onClick={() => handleChallengeChange(c)}
                            className={`px-3 py-1 text-xs font-mono rounded-full border transition-colors whitespace-nowrap ${activeChallenge.id === c.id
                                    ? "bg-primary text-white border-primary"
                                    : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500"
                                }`}
                        >
                            {c.title}
                        </button>
                    ))}
                </div>

                <div className="flex-1 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap bg-black/30 p-6 rounded-xl border border-gray-800">
                    {activeChallenge.code}
                </div>

                <div className="mt-8 flex gap-4">
                    <Button
                        onClick={() => setShowOutput(!showOutput)}
                        className="flex-1 bg-green-600 hover:bg-green-700 border-none"
                    >
                        {showOutput ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                        {showOutput ? "Hide Output" : "Reveal Output"}
                    </Button>
                </div>

                <p className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    Try to guess the output before clicking Reveal!
                </p>
            </div>

            {/* Right: Output & Logic */}
            <div className="bg-white p-8 flex flex-col">
                <div className="mb-8 p-6 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-center min-h-[120px] flex flex-col items-center justify-center">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Terminal Output</h3>
                    {showOutput ? (
                        <div className="text-2xl font-mono font-bold text-gray-900 animate-in fade-in zoom-in duration-300">
                            {activeChallenge.output}
                        </div>
                    ) : (
                        <div className="text-gray-400 text-sm italic">
                            (Hidden)
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Step-by-Step Logic</h3>
                        <Button
                            size="sm" variant="ghost"
                            onClick={() => setShowExplanation(!showExplanation)}
                            disabled={!showOutput}
                            className={!showOutput ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {showExplanation ? "Hide Steps" : "Show Steps"}
                        </Button>
                    </div>

                    {showExplanation ? (
                        <div className="space-y-3">
                            {activeChallenge.explanation.map((step, i) => (
                                <div key={i} className="flex gap-3 text-sm text-gray-600 animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                                    <span className="font-mono text-primary font-bold">{i + 1}.</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm text-center px-8">
                            {showOutput
                                ? "Click 'Show Steps' to understand how Python got this answer."
                                : "Reveal the output first to unlock the explanation."}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
