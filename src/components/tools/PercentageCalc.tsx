"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { Calculator, ArrowRight, Percent } from "lucide-react"

export function PercentageCalc() {
    // State for 3 different modes
    // Mode 1: What is X% of Y?
    const [val1_X, setVal1_X] = useState<number | string>("")
    const [val1_Y, setVal1_Y] = useState<number | string>("")
    const [res1, setRes1] = useState<number | null>(null)

    // Mode 2: X is what % of Y?
    const [val2_X, setVal2_X] = useState<number | string>("")
    const [val2_Y, setVal2_Y] = useState<number | string>("")
    const [res2, setRes2] = useState<number | null>(null)

    // Mode 3: Increase/Decrease from X to Y
    const [val3_X, setVal3_X] = useState<number | string>("")
    const [val3_Y, setVal3_Y] = useState<number | string>("")
    const [res3, setRes3] = useState<number | null>(null)

    // Calculate on change
    useEffect(() => {
        if (val1_X && val1_Y) setRes1((Number(val1_X) / 100) * Number(val1_Y))
        else setRes1(null)
    }, [val1_X, val1_Y])

    useEffect(() => {
        if (val2_X && val2_Y && Number(val2_Y) !== 0) setRes2((Number(val2_X) / Number(val2_Y)) * 100)
        else setRes2(null)
    }, [val2_X, val2_Y])

    useEffect(() => {
        if (val3_X && val3_Y && Number(val3_X) !== 0) {
            setRes3(((Number(val3_Y) - Number(val3_X)) / Number(val3_X)) * 100)
        } else setRes3(null)
    }, [val3_X, val3_Y])

    return (
        <div className="max-w-2xl mx-auto space-y-8">

            {/* Calculator Cards */}
            <div className="space-y-6">

                {/* 1. What is X% of Y? */}
                <div className="bg-[#1e1e24] border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                    <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="bg-indigo-500/20 text-indigo-400 p-1 rounded">1</span> Simple Percentage
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-xl">
                        <span className="text-slate-400 font-mono">What is</span>
                        <input
                            type="number"
                            value={val1_X}
                            onChange={(e) => setVal1_X(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded p-2 w-24 text-center text-white focus:border-indigo-500 outline-none font-bold"
                            placeholder="X"
                        />
                        <span className="text-indigo-400 font-bold">%</span>
                        <span className="text-slate-400 font-mono">of</span>
                        <input
                            type="number"
                            value={val1_Y}
                            onChange={(e) => setVal1_Y(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded p-2 w-24 text-center text-white focus:border-indigo-500 outline-none font-bold"
                            placeholder="Y"
                        />
                        <ArrowRight className="text-slate-600 hidden md:block" />
                        <div className="ml-auto bg-black/40 px-6 py-2 rounded-lg border border-white/10 min-w-[120px] text-center">
                            <span className="text-2xl font-black text-green-400">
                                {res1 !== null ? res1.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. X is what % of Y? */}
                <div className="bg-[#1e1e24] border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-pink-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                    <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="bg-pink-500/20 text-pink-400 p-1 rounded">2</span> Find Percentage
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-xl">
                        <input
                            type="number"
                            value={val2_X}
                            onChange={(e) => setVal2_X(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded p-2 w-24 text-center text-white focus:border-pink-500 outline-none font-bold"
                            placeholder="X"
                        />
                        <span className="text-slate-400 font-mono">is what % of</span>
                        <input
                            type="number"
                            value={val2_Y}
                            onChange={(e) => setVal2_Y(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded p-2 w-24 text-center text-white focus:border-pink-500 outline-none font-bold"
                            placeholder="Y"
                        />
                        <ArrowRight className="text-slate-600 hidden md:block" />
                        <div className="ml-auto bg-black/40 px-6 py-2 rounded-lg border border-white/10 min-w-[120px] text-center flex items-center justify-center gap-1">
                            <span className="text-2xl font-black text-pink-400">
                                {res2 !== null ? res2.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"}
                            </span>
                            <span className="text-sm text-pink-400/50">%</span>
                        </div>
                    </div>
                </div>

                {/* 3. Percentage Change */}
                <div className="bg-[#1e1e24] border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                    <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="bg-cyan-500/20 text-cyan-400 p-1 rounded">3</span> Percentage Change
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-xl">
                        <span className="text-slate-400 font-mono">From</span>
                        <input
                            type="number"
                            value={val3_X}
                            onChange={(e) => setVal3_X(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded p-2 w-24 text-center text-white focus:border-cyan-500 outline-none font-bold"
                            placeholder="Old"
                        />
                        <span className="text-slate-400 font-mono">to</span>
                        <input
                            type="number"
                            value={val3_Y}
                            onChange={(e) => setVal3_Y(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded p-2 w-24 text-center text-white focus:border-cyan-500 outline-none font-bold"
                            placeholder="New"
                        />
                        <ArrowRight className="text-slate-600 hidden md:block" />
                        <div className="ml-auto bg-black/40 px-6 py-2 rounded-lg border border-white/10 min-w-[120px] text-center flex items-center justify-center gap-1">
                            <span className={`text-2xl font-black ${res3 && res3 > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {res3 !== null ? (res3 > 0 ? "+" : "") + res3.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "-"}
                            </span>
                            <span className="text-sm text-slate-500">%</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="text-center">
                <p className="text-xs text-slate-500 font-mono bg-white/5 inline-block px-4 py-2 rounded-full border border-white/10">
                    <Calculator className="h-3 w-3 inline mr-2 text-indigo-400" />
                    Updates instantly as you type
                </p>
            </div>
        </div>
    )
}
