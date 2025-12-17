"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"

const methodData = {
    string: {
        label: "String Methods",
        variable: 'text = "Hello World"',
        methods: [
            { name: ".upper()", desc: "Converts to uppercase", result: '"HELLO WORLD"' },
            { name: ".lower()", desc: "Converts to lowercase", result: '"hello world"' },
            { name: ".replace('World', 'Python')", desc: "Replaces part of the string", result: '"Hello Python"' },
            { name: ".split(' ')", desc: "Splits into a list", result: '["Hello", "World"]' }
        ]
    },
    list: {
        label: "List Methods",
        variable: 'numbers = [1, 2, 3]',
        methods: [
            { name: ".append(4)", desc: "Adds item to the end", result: '[1, 2, 3, 4]' },
            { name: ".pop()", desc: "Removes last item", result: '[1, 2]' },
            { name: ".reverse()", desc: "Reverses order", result: '[3, 2, 1]' },
            { name: ".clear()", desc: "Removes all items", result: '[]' }
        ]
    }
}

type DataType = keyof typeof methodData

export function MethodPlayground() {
    const [activeType, setActiveType] = useState<DataType>("string")
    const [selectedMethod, setSelectedMethod] = useState<number | null>(null)

    const currentData = methodData[activeType]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Helper Side */}
            <div className="md:col-span-1 space-y-4">
                <h3 className="font-bold text-gray-700 mb-2">Select Type:</h3>
                <div className="flex flex-col gap-2">
                    {(Object.keys(methodData) as DataType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => { setActiveType(type); setSelectedMethod(null); }}
                            className={`px-4 py-3 rounded-xl text-left font-medium transition-all ${activeType === type
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {methodData[type].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Interaction Side */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="mb-6 bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-sm">
                    {currentData.variable}
                </div>

                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Choose a Method:</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {currentData.methods.map((method, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedMethod(index)}
                            className={`p-3 rounded-lg border text-left text-sm font-mono transition-all ${selectedMethod === index
                                    ? "border-primary bg-primary/5 ring-1 ring-primary text-primary"
                                    : "border-gray-200 hover:border-primary/50 text-gray-700"
                                }`}
                        >
                            {method.name.split('(')[0]}
                        </button>
                    ))}
                </div>

                {/* Result Area */}
                <div className={`relative overflow-hidden rounded-xl bg-gray-50 border border-gray-200 p-6 transition-all duration-500 ${selectedMethod !== null ? 'opacity-100 translate-y-0' : 'opacity-50 blur-sm'}`}>
                    {selectedMethod !== null ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-mono text-gray-900 font-bold">{currentData.methods[selectedMethod].name}</span>
                                <ArrowRight className="h-4 w-4" />
                                <span>{currentData.methods[selectedMethod].desc}</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-inner">
                                <span className="text-xs text-gray-400 block mb-1">Result:</span>
                                <span className="font-mono text-lg font-bold text-primary">
                                    {currentData.methods[selectedMethod].result}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 text-sm py-4">
                            Select a method above to see what it does.
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
