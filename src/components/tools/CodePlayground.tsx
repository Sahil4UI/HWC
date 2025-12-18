"use client"

import { useState } from "react"
import { Play, RotateCcw, AlertTriangle, Terminal, Layers } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Editor from "@monaco-editor/react"

// Language Configuration
const LANGUAGES = [
    { id: "python", name: "Python 3", version: "3.10.0", file: "main.py" },
    { id: "javascript", name: "JavaScript (Node)", version: "18.15.0", file: "main.js" },
    { id: "typescript", name: "TypeScript", version: "5.0.3", file: "main.ts" },
    { id: "c", name: "C (GCC)", version: "10.2.0", file: "main.c" },
    { id: "cpp", name: "C++ (GCC)", version: "10.2.0", file: "main.cpp" },
    { id: "java", name: "Java (OpenJDK)", version: "15.0.2", file: "Main.java" },
    { id: "go", name: "Go (Golang)", version: "1.16.2", file: "main.go" },
    { id: "csharp", name: "C# (Mono)", version: "6.12.0", file: "main.cs" },
    { id: "rust", name: "Rust", version: "1.68.2", file: "main.rs" },
    { id: "php", name: "PHP", version: "8.2.3", file: "main.php" },
    { id: "dart", name: "Dart", version: "2.19.6", file: "main.dart" },
]

const BOILERPLATE: Record<string, string> = {
    python: `print("Hello from Python!")\n# Write your code here`,
    javascript: `console.log("Hello from Node.js!");`,
    typescript: `console.log("Hello from TypeScript!");`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}`,
    cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
    go: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
    csharp: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from C#!");\n    }\n}`,
    rust: `fn main() {\n    println!("Hello from Rust!");\n}`,
    php: `<?php\necho "Hello from PHP!";\n?>`,
    dart: `void main() {\n  print('Hello from Dart!');\n}`,
}

export function CodePlayground() {
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])
    const [code, setCode] = useState(BOILERPLATE[LANGUAGES[0].id])
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleLanguageChange = (id: string) => {
        const lang = LANGUAGES.find(l => l.id === id) || LANGUAGES[0]
        setSelectedLang(lang)
        setCode(BOILERPLATE[lang.id] || "")
        setOutput("")
        setIsError(false)
    }

    const runCode = async () => {
        setIsRunning(true)
        setOutput("")
        setIsError(false)

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: selectedLang.id,
                    version: selectedLang.version,
                    files: [
                        {
                            name: selectedLang.file,
                            content: code
                        }
                    ]
                })
            })

            const data = await response.json()

            if (data.run) {
                const combinedOutput = data.run.stdout + data.run.stderr
                setOutput(combinedOutput || "Program finished with no output.")
                if (data.run.stderr) setIsError(true)
            } else {
                setOutput("Error: Failed to execute code. API might be down.")
                setIsError(true)
            }
        } catch (error) {
            setOutput("Network Error: Could not reach execution server.")
            setIsError(true)
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200 rounded-xl overflow-hidden shadow-lg h-[600px] bg-[#1e1e24] text-white">

            {/* Editor Side */}
            <div className="flex flex-col border-r border-gray-700">
                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d35] border-b border-gray-700">

                    {/* Language Selector */}
                    <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-blue-400" />
                        <select
                            value={selectedLang.id}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="bg-[#1e1e24] text-xs font-bold text-gray-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.id} value={lang.id}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCode(BOILERPLATE[selectedLang.id])}
                            className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                            title="Reset Code"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                        <Button
                            size="sm"
                            onClick={runCode}
                            disabled={isRunning}
                            className={`h-7 px-4 font-bold tracking-wide border-none ${isRunning ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                        >
                            {isRunning ? "Running..." : <><Play className="mr-2 h-3 w-3 fill-current" /> RUN</>}
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <Editor
                        height="100%"
                        language={selectedLang.id === 'c' || selectedLang.id === 'cpp' ? 'cpp' : selectedLang.id}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 4,
                        }}
                    />
                </div>

                <div className="px-4 py-1 text-[10px] text-gray-600 font-mono bg-[#25252c] border-t border-gray-800">
                    File: {selectedLang.file} | Monaco Editor Active
                </div>
            </div>

            {/* Output Side */}
            <div className="flex flex-col bg-[#16161a]">
                <div className="px-4 py-2 bg-[#202025] border-b border-gray-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Terminal className="h-4 w-4" /> Output
                    </span>
                    {isError && (
                        <span className="text-xs font-bold text-red-500 flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="h-3 w-3" /> Error Detected
                        </span>
                    )}
                </div>

                <div className="flex-1 p-4 font-mono text-sm overflow-auto text-gray-300 whitespace-pre-wrap">
                    {isRunning ? (
                        <div className="flex items-center gap-2 text-blue-400">
                            <span className="animate-spin h-3 w-3 border-2 border-blue-400 border-t-transparent rounded-full"></span>
                            Compiling & Executing on Remote Server...
                        </div>
                    ) : output ? (
                        <span className={isError ? "text-red-400" : "text-green-400"}>
                            {output}
                        </span>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                            <Play className="h-10 w-10 mb-4" />
                            <p className="text-sm">Click RUN to execute your code.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
