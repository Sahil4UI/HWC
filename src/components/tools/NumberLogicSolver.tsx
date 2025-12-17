"use client"

import { useState } from "react"
import { Calculator, Play } from "lucide-react"
import { Button } from "@/components/ui/Button"

type ProblemType = "prime" | "palindrome" | "armstrong" | "reverse"

const problemTypes: { id: ProblemType; label: string; desc: string }[] = [
    { id: "prime", label: "Prime Number", desc: "Is it divisble only by 1 and itself?" },
    { id: "palindrome", label: "Palindrome", desc: "Does it read the same backwards?" },
    { id: "armstrong", label: "Armstrong Number", desc: "Sum of cubes of digits equals the number?" },
    { id: "reverse", label: "Reverse Number", desc: "Flip the digits around." },
]

export function NumberLogicSolver() {
    const [num, setNum] = useState<string>("")
    const [type, setType] = useState<ProblemType>("prime")
    const [result, setResult] = useState<{ answer: string; steps: string[]; code: string } | null>(null)
    const [error, setError] = useState<string | null>(null)

    const solve = () => {
        setError(null)
        setResult(null)

        if (!num) {
            setError("Please enter a number first.")
            return
        }

        const n = parseInt(num)
        if (isNaN(n)) {
            setError("That doesn't look like a valid number.")
            return
        }

        let answer = ""
        let steps: string[] = []
        let code = ""

        if (type === "prime") {
            code = `is_prime = True\nif n < 2:\n    is_prime = False\nfor i in range(2, int(n**0.5) + 1):\n    if n % i == 0:\n        is_prime = False\n        break`
            if (n < 2) {
                answer = "Not Prime"
                steps = [`${n} is less than 2, so it's not prime.`]
            } else {
                let isPrime = true
                for (let i = 2; i <= Math.sqrt(n); i++) {
                    if (n % i === 0) {
                        isPrime = false
                        steps.push(`Checking divisibility by ${i}: Yes (${n} % ${i} == 0). Found a factor!`)
                        break
                    } else {
                        steps.push(`Checking divisibility by ${i}: No.`)
                    }
                }
                answer = isPrime ? "Prime Number" : "Not Prime"
                if (isPrime) steps.push("No factors found up to square root. It is Prime!")
            }
        }
        else if (type === "palindrome") {
            const s = n.toString()
            const rev = s.split('').reverse().join('')
            code = `s = str(n)\nif s == s[::-1]:\n    print("Palindrome")`
            steps = [
                `Original number: ${s}`,
                `Reversed string: ${rev}`,
                `Match: ${s === rev ? "Yes" : "No"}`
            ]
            answer = s === rev ? "It is a Palindrome" : "Not a Palindrome"
        }
        else if (type === "reverse") {
            const s = n.toString()
            const rev = s.split('').reverse().join('')
            code = `reversed_num = int(str(n)[::-1])`
            steps = [
                `Convert to string: "${s}"`,
                `Reverse string: "${rev}"`,
                `Convert back to int: ${parseInt(rev)}`
            ]
            answer = rev
        }
        else if (type === "armstrong") {
            const s = n.toString()
            const digits = s.split('').map(Number)
            const power = digits.length
            const sum = digits.reduce((acc, val) => acc + Math.pow(val, power), 0)

            code = `sum = 0\ntemp = n\nwhile temp > 0:\n    digit = temp % 10\n    sum += digit ** ${power}\n    temp //= 10`

            steps = digits.map(d => `${d}^${power} = ${Math.pow(d, power)}`)
            steps.push(`Sum: ${steps.join(' + ')} = ${sum}`)
            steps.push(`Does ${sum} == ${n}? ${sum === n ? "Yes" : "No"}`)

            answer = sum === n ? "Armstrong Number" : "Not Armstrong"
        }

        setResult({ answer, steps, code })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">1. Choose Problem Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        {problemTypes.map(t => (
                            <button
                                key={t.id}
                                onClick={() => { setType(t.id); setResult(null); }}
                                className={`p-3 rounded-lg text-left text-sm border transition-all ${type === t.id
                                    ? "bg-primary text-white border-primary shadow-md"
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="font-bold">{t.label}</div>
                                <div className="text-[10px] opacity-80 leading-tight mt-1">{t.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">2. Enter a Number</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={num}
                            onChange={(e) => setNum(e.target.value)}
                            placeholder="e.g. 121"
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                        <Button onClick={solve} className="bg-green-600 hover:bg-green-700 text-white w-32">
                            <Play className="mr-2 h-4 w-4" /> Solve
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 min-h-[300px]">
                {result ? (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="text-center">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Result</h3>
                            <div className="text-3xl font-bold text-primary">{result.answer}</div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <h4 className="font-bold text-gray-700 mb-2 text-sm flex items-center gap-2">
                                <Calculator className="h-4 w-4" /> Logic Steps:
                            </h4>
                            <ul className="space-y-2">
                                {result.steps.map((step, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                                        <span className="font-mono text-xs text-gray-400 mt-1">{i + 1}.</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-400 mb-2 text-xs uppercase">Python Code</h4>
                            <div className="bg-gray-900 p-4 rounded-xl text-gray-300 font-mono text-xs whitespace-pre-wrap">
                                {result.code}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        {error ? (
                            <div className="text-red-500 animate-pulse">
                                <p className="font-bold text-lg mb-2">⚠️ Oops!</p>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <>
                                <Calculator className="h-12 w-12 mb-4 text-gray-300" />
                                <p className="text-sm text-gray-400">Enter a number to see<br />the logic breakdown.</p>
                            </>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}
