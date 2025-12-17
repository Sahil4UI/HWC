"use client"

import { useState } from "react"
import { ArrowRight, Check, X, Play } from "lucide-react"
import { Button } from "@/components/ui/Button"

const comparisons = [
    {
        id: "append-extend",
        title: "append() vs extend()",
        method1: "append()",
        method2: "extend()",
        description: "Both add items to a list, but in very different ways.",
        scenario: "You have a shopping list: ['Milk', 'Eggs']\nYou want to add: ['Bread', 'Butter']",
        example1: {
            code: `cart.append(['Bread', 'Butter'])`,
            result: `['Milk', 'Eggs', ['Bread', 'Butter']]`,
            note: "Adds the whole list as ONE item (nested list)."
        },
        example2: {
            code: `cart.extend(['Bread', 'Butter'])`,
            result: `['Milk', 'Eggs', 'Bread', 'Butter']`,
            note: "Adds EACH item from the new list individually."
        }
    },
    {
        id: "sort-sorted",
        title: "sort() vs sorted()",
        method1: "sort()",
        method2: "sorted()",
        description: "One changes the original list, the other creates a new one.",
        scenario: "You have numbers: [3, 1, 2]",
        example1: {
            code: `nums.sort()\nprint(nums)`,
            result: `[1, 2, 3] (Original Changed)`,
            note: "In-place change. Returns None."
        },
        example2: {
            code: `new_nums = sorted(nums)\nprint(nums)`,
            result: `[3, 1, 2] (Original Unchanged)`,
            note: "Creates a NEW list. Original stays messy."
        }
    },
    {
        id: "remove-pop",
        title: "remove() vs pop()",
        method1: "remove()",
        method2: "pop()",
        description: "How do you want to delete? By value or by position?",
        scenario: "List: ['A', 'B', 'C']",
        example1: {
            code: `list.remove('B')`,
            result: `['A', 'C']`,
            note: "Deletes the first item that matches 'B'."
        },
        example2: {
            code: `item = list.pop(1)`,
            result: `Returns 'B'`,
            note: "Deletes item at index 1 and GIVES it to you."
        }
    }
]

export function MethodDifference() {
    const [activeComp, setActiveComp] = useState(comparisons[0])
    const [runOutput, setRunOutput] = useState<string | null>(null)

    const runSimulation = (result: string) => {
        setRunOutput("Running...")
        setTimeout(() => {
            setRunOutput(result)
        }, 500)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar Selector */}
            <div className="lg:col-span-1 flex flex-col gap-2">
                {comparisons.map((comp) => (
                    <button
                        key={comp.id}
                        onClick={() => setActiveComp(comp)}
                        className={`p-4 rounded-xl text-left border transition-all ${activeComp.id === comp.id
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-white border-gray-200 hover:border-primary/50 text-gray-700"
                            }`}
                    >
                        <span className="text-xs opacity-70 uppercase tracking-widest block mb-1">Compare</span>
                        <span className="font-bold">{comp.title}</span>
                    </button>
                ))}
            </div>

            {/* Main Comparison Area */}
            <div className="lg:col-span-3 space-y-8">

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeComp.title}</h2>
                    <p className="text-gray-500">{activeComp.description}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center text-yellow-800 text-sm font-medium">
                    Scenario: {activeComp.scenario}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Method 1 Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="bg-gray-50 p-4 border-b border-gray-200 text-center font-bold text-gray-700 font-mono">
                            {activeComp.method1}
                        </div>
                        <div className="p-6 space-y-4 flex-1">
                            <div className="bg-gray-900 p-3 rounded-lg text-white font-mono text-sm relative group">
                                {activeComp.example1.code}
                            </div>

                            <Button
                                onClick={() => runSimulation(activeComp.example1.result)}
                                variant="outline"
                                size="sm"
                                className="w-full border-dashed border-gray-300 hover:border-primary hover:text-primary"
                            >
                                <Play className="mr-2 h-3 w-3" /> Run Code
                            </Button>

                            {runOutput === activeComp.example1.result && (
                                <div className="bg-black text-green-400 font-mono text-sm p-3 rounded-lg border-l-4 border-green-500 animate-in fade-in slide-in-from-top-2">
                                    <div className="text-[10px] text-gray-500 uppercase mb-1">Output</div>
                                    {runOutput}
                                </div>
                            )}

                            <div className="flex gap-2 items-start text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-auto">
                                <span className="text-blue-500 font-bold">Note:</span>
                                {activeComp.example1.note}
                            </div>
                        </div>
                    </div>

                    {/* Method 2 Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="bg-gray-50 p-4 border-b border-gray-200 text-center font-bold text-gray-700 font-mono">
                            {activeComp.method2}
                        </div>
                        <div className="p-6 space-y-4 flex-1">
                            <div className="bg-gray-900 p-3 rounded-lg text-white font-mono text-sm">
                                {activeComp.example2.code}
                            </div>

                            <Button
                                onClick={() => runSimulation(activeComp.example2.result)}
                                variant="outline"
                                size="sm"
                                className="w-full border-dashed border-gray-300 hover:border-primary hover:text-primary"
                            >
                                <Play className="mr-2 h-3 w-3" /> Run Code
                            </Button>

                            {runOutput === activeComp.example2.result && (
                                <div className="bg-black text-green-400 font-mono text-sm p-3 rounded-lg border-l-4 border-green-500 animate-in fade-in slide-in-from-top-2">
                                    <div className="text-[10px] text-gray-500 uppercase mb-1">Output</div>
                                    {runOutput}
                                </div>
                            )}

                            <div className="flex gap-2 items-start text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-auto">
                                <span className="text-blue-500 font-bold">Note:</span>
                                {activeComp.example2.note}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
