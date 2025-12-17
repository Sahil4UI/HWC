"use client"

import { useState, useEffect } from "react"
import { Play, RotateCcw, Monitor } from "lucide-react"
import { Button } from "@/components/ui/Button"

const loopExamples = [
    {
        name: "Simple Range",
        code: "for i in range(5):",
        iterations: [
            { i: 0, output: "Iteration 1 (i=0)" },
            { i: 1, output: "Iteration 2 (i=1)" },
            { i: 2, output: "Iteration 3 (i=2)" },
            { i: 3, output: "Iteration 4 (i=3)" },
            { i: 4, output: "Iteration 5 (i=4)" },
        ]
    },
    {
        name: "Step Range",
        code: "for i in range(0, 10, 2):",
        iterations: [
            { i: 0, output: "Step 0 (Start)" },
            { i: 2, output: "Step 2 (+2)" },
            { i: 4, output: "Step 4 (+2)" },
            { i: 6, output: "Step 6 (+2)" },
            { i: 8, output: "Step 8 (+2)" },
        ]
    },
    {
        name: "While Loop",
        code: "x = 3\nwhile x > 0:\n    print(x)\n    x = x - 1",
        iterations: [
            { i: 3, output: "x is 3. Prints 3. x becomes 2." },
            { i: 2, output: "x is 2. Prints 2. x becomes 1." },
            { i: 1, output: "x is 1. Prints 1. x becomes 0." },
            { i: 0, output: "x is 0. Loop Ends." },
        ]
    }
]

export function LoopVisualizer() {
    const [selectedLoop, setSelectedLoop] = useState(loopExamples[0])
    const [currentStep, setCurrentStep] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)

    const startSimulation = () => {
        if (isPlaying) return
        setIsPlaying(true)
        setCurrentStep(-1)

        let step = 0
        const interval = setInterval(() => {
            if (step < selectedLoop.iterations.length) {
                setCurrentStep(step)
                step++
            } else {
                clearInterval(interval)
                setIsPlaying(false)
            }
        }, 1200)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                        Select Pattern
                    </h3>
                    <div className="flex flex-col gap-3">
                        {loopExamples.map((loop, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setSelectedLoop(loop); setCurrentStep(-1); setIsPlaying(false); }}
                                className={`p-4 rounded-xl text-left text-sm font-semibold transition-all shadow-sm ${selectedLoop.name === loop.name
                                    ? "bg-primary text-white shadow-primary/30 transform scale-[1.02]"
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {loop.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-[#1e1e24] p-5 rounded-2xl font-mono text-sm relative group overflow-hidden shadow-lg shadow-gray-900/10">
                    <div className="absolute top-0 right-0 p-2 bg-white/5 rounded-bl-xl text-xs text-white/40 uppercase tracking-widest font-bold">
                        Python
                    </div>
                    <pre className="text-pink-400 relative z-10">{selectedLoop.code}</pre>
                </div>

                <Button
                    onClick={startSimulation}
                    disabled={isPlaying}
                    className={`w-full h-12 text-lg font-bold shadow-lg ${isPlaying ? "bg-gray-300 text-gray-500" : "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 transition-all text-white shadow-green-600/30"}`}
                >
                    {isPlaying ? "Running Loop..." : <><Play className="mr-2 h-5 w-5 fill-current" /> Visualize</>}
                </Button>
            </div>

            {/* Visualizer Display */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col min-h-[500px]">
                    <div className="grid grid-cols-10 bg-gray-50/80 p-5 font-bold text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100 backdrop-blur-sm sticky top-0 z-10">
                        <div className="col-span-2">Iteration</div>
                        <div className="col-span-3">Variable</div>
                        <div className="col-span-5">Action</div>
                    </div>

                    <div className="divide-y divide-gray-100 flex-1 overflow-y-auto max-h-[500px] scroll-smooth relative">
                        {selectedLoop.iterations.map((iter, idx) => (
                            <div
                                key={idx}
                                className={`grid grid-cols-10 p-5 transition-all duration-700 items-center ${currentStep === idx
                                    ? "bg-blue-50/50 scale-[1.02] border-l-[6px] border-l-primary shadow-sm z-10"
                                    : idx > currentStep
                                        ? "opacity-20 grayscale blur-[1px]"
                                        : "opacity-40"
                                    }`}
                            >
                                <div className="col-span-2 font-mono text-gray-400 font-bold text-lg">#{idx + 1}</div>
                                <div className="col-span-3 font-mono text-primary font-bold text-xl">
                                    {selectedLoop.name.includes("While") ? `x = ${iter.i}` : `i = ${iter.i}`}
                                </div>
                                <div className="col-span-5 text-gray-700 font-medium">
                                    {iter.output}
                                </div>

                                {currentStep === idx && (
                                    <div className="absolute right-4 animate-pulse">
                                        <Monitor className="h-5 w-5 text-primary" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {currentStep === -1 && !isPlaying && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                                <RotateCcw className="h-16 w-16 mb-6 opacity-20" />
                                <p className="text-lg font-medium text-gray-400">Ready to start?</p>
                                <p className="text-sm">Click "Visualize" to run the loop.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}
