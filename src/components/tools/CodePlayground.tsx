"use client"

import { useState } from "react"
import { Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/Button"

const defaultCode = `# Write your Python code here
name = "Student"
print("Hello, " + name + "!")
print("Welcome to coding.")
`

export function CodePlayground() {
    const [code, setCode] = useState(defaultCode)
    const [output, setOutput] = useState<string[] | null>(null)
    const [isRunning, setIsRunning] = useState(false)

    const runCode = () => {
        setIsRunning(true)
        setOutput(null)

        // Simulate network delay for "real" feel
        setTimeout(() => {
            let simulatedOutput: string[] = []

            // enhanced simulation logic
            const lines = code.split('\n');
            let hasOutput = false;

            lines.forEach(line => {
                const printMatch = line.match(/^\s*print\s*\((.*)\)\s*$/);
                if (printMatch) {
                    hasOutput = true;
                    let content = printMatch[1];

                    // Simple string handling: remove quotes if present on both ends
                    if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
                        content = content.slice(1, -1);
                    }
                    // Variable substitution simulation for "name"
                    const nameMatch = code.match(/name\s*=\s*["']([^"']+)["']/);
                    const nameVal = nameMatch ? nameMatch[1] : "Student";

                    // Handle simple concatenation like "Hello " + name
                    if (content.includes('+')) {
                        const parts = content.split('+').map(p => p.trim());
                        const joined = parts.map(p => {
                            if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
                                return p.slice(1, -1);
                            }
                            if (p === 'name') return nameVal;
                            return p;
                        }).join('');
                        content = joined;
                    } else if (content === 'name') {
                        content = nameVal;
                    }

                    simulatedOutput.push(content);
                }
            });

            if (!hasOutput) {
                if (code.includes('print')) {
                    simulatedOutput.push("Syntax Error: Ensure you used print(\"text\") correctly.");
                } else {
                    simulatedOutput.push(">> No output. Did you forget to print() something?");
                }
            }

            setOutput(simulatedOutput)
            setIsRunning(false)
        }, 600)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200 rounded-xl overflow-hidden shadow-lg h-[500px]">

            {/* Editor Side */}
            <div className="flex flex-col bg-[#1e1e24] text-white">
                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d35] border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400">main.py</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCode(defaultCode)}
                            className="p-1 hover:bg-white/10 rounded transition-colors" title="Reset Code"
                        >
                            <RotateCcw className="h-3 w-3 text-gray-400" />
                        </button>
                        <Button
                            size="sm"
                            onClick={runCode}
                            disabled={isRunning}
                            className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white border-none"
                        >
                            {isRunning ? "Running..." : <><Play className="mr-1 h-3 w-3" /> Run</>}
                        </Button>
                    </div>
                </div>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 w-full bg-[#1e1e24] p-4 font-mono text-sm resize-none focus:outline-none"
                    spellCheck={false}
                />
            </div>

            {/* Output Side */}
            <div className="flex flex-col bg-white border-l border-gray-200">
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Output / Terminal</span>
                </div>
                <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                    {isRunning && <div className="text-gray-400 italic">Running code...</div>}

                    {output && (
                        <div className="space-y-1">
                            {output.map((line, i) => (
                                <div key={i} className="text-gray-800">{line}</div>
                            ))}
                        </div>
                    )}

                    {!isRunning && !output && (
                        <div className="text-gray-400 text-xs mt-4">
                            Click "Run" to execute your code.
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
