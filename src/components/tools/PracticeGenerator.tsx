"use client"

import { useState } from "react"
import { RefreshCcw, Check, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"

const topics = ["Loops", "Strings", "Lists", "Conditions", "Functions"]
const difficulties = ["Easy", "Medium", "Hard"]

const questionsBank = [
    { id: 1, topic: "Loops", difficulty: "Easy", question: "Write a loop to print numbers from 1 to 10." },
    { id: 2, topic: "Loops", difficulty: "Medium", question: "Write a loop to calculate the factorial of 5." },
    { id: 3, topic: "Strings", difficulty: "Easy", question: "Convert 'hello' to uppercase." },
    { id: 4, topic: "Strings", difficulty: "Medium", question: "Count how many times 'a' appears in 'banana'." },
    { id: 5, topic: "Lists", difficulty: "Easy", question: "Create a list with 3 fruits and print the second one." },
    { id: 6, topic: "Lists", difficulty: "Hard", question: "Write a list comprehension to filter only even numbers from [1, 5, 8, 10]." },
    { id: 7, topic: "Functions", difficulty: "Easy", question: "Define a function that says 'Hello World'." },
    { id: 8, topic: "Functions", difficulty: "Medium", question: "Write a function that accepts a name and returns 'Hello [name]'." },
    { id: 9, topic: "Conditions", difficulty: "Easy", question: "Write an if-statement to check if 10 is greater than 5." },
    { id: 10, topic: "Loops", difficulty: "Hard", question: "Create a nested loop pattern to print a pyramid of stars." },
]

export function PracticeGenerator() {
    const [selectedTopic, setSelectedTopic] = useState("Loops")
    const [selectedDiff, setSelectedDiff] = useState("Easy")
    const [generatedQuestions, setGeneratedQuestions] = useState<typeof questionsBank>([])

    const generate = () => {
        // Filter logic
        let filtered = questionsBank.filter(q => q.topic === selectedTopic && q.difficulty === selectedDiff)

        // Fallback for demo if no questions match
        if (filtered.length === 0) {
            filtered = [{ id: 99, topic: selectedTopic, difficulty: selectedDiff, question: `Coming soon: More ${selectedDiff} questions for ${selectedTopic}!` }]
        }

        setGeneratedQuestions(filtered)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Filters */}
            <div className="md:col-span-1 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
                    <div className="flex flex-col gap-2">
                        {topics.map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTopic(t)}
                                className={`px-4 py-2 rounded-lg text-left text-sm transition-colors ${selectedTopic === t ? "bg-primary text-white font-bold" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                    <div className="flex flex-col gap-2">
                        {difficulties.map(d => (
                            <button
                                key={d}
                                onClick={() => setSelectedDiff(d)}
                                className={`px-4 py-2 rounded-lg text-left text-sm transition-colors ${selectedDiff === d ? "bg-gray-800 text-white font-bold" : "bg-white border text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <Button onClick={generate} className="w-full">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Generate
                </Button>
            </div>

            {/* Questions Grid */}
            <div className="md:col-span-3">
                <div className="mb-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
                    {generatedQuestions.length > 0 ? "Your Practice Set" : "Select options to generate questions"}
                </div>

                {generatedQuestions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {generatedQuestions.map((q) => (
                            <div key={q.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4 animate-in slide-in-from-bottom-2">
                                <div className="bg-blue-50 p-3 rounded-full hidden sm:block">
                                    <BookOpen className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-500">{q.topic}</span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${q.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                                q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                            }`}>{q.difficulty}</span>
                                    </div>
                                    <p className="text-gray-800 font-medium">{q.question}</p>
                                </div>
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-600">
                                    <Check className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                        <RefreshCcw className="h-10 w-10 mb-4 opacity-20" />
                        <p>Ready to practice?</p>
                    </div>
                )}
            </div>

        </div>
    )
}
