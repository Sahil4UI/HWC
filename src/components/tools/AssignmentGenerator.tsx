"use client"

import { useState, useRef } from "react"
import { RefreshCcw, Printer, FileText, CheckCircle, BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { generateAssignmentAction } from "@/app/actions/gemini"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const subjects = [
    { id: 'python', name: 'Python', topics: ['Loops', 'Strings', 'Lists', 'Functions', 'Pandas', 'Dictionaries', 'OOP'] },
    { id: 'excel', name: 'Excel', topics: ['Formulas', 'Pivot Tables', 'VLOOKUP', 'Charts', 'Data Cleaning', 'Text Functions', 'Date & Time', 'Conditional Formatting', 'Logical Functions'] },
    { id: 'sql', name: 'SQL', topics: ['SELECT Basics', 'Joins', 'Aggregates', 'Subqueries', 'Indexes', 'Window Functions', 'Constraints'] }
]

const difficulties = ["Beginner", "Intermediate", "Advanced"]

export function AssignmentGenerator() {
    const [selectedSubject, setSelectedSubject] = useState(subjects[0])
    const [selectedTopic, setSelectedTopic] = useState(subjects[0].topics[0])
    const [difficulty, setDifficulty] = useState("Beginner")
    const [assignment, setAssignment] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [answersVisible, setAnswersVisible] = useState(false)

    const printRef = useRef<HTMLDivElement>(null)

    const handleGenerate = async () => {
        setIsLoading(true)
        setAssignment(null)
        const res = await generateAssignmentAction(selectedSubject.name, selectedTopic, difficulty)
        if (res.success) {
            setAssignment(res.data)
        } else {
            alert("Error: " + res.error)
        }
        setIsLoading(false)
    }

    const downloadPDF = async () => {
        if (!printRef.current) return
        try {
            const canvas = await html2canvas(printRef.current, { scale: 2, backgroundColor: '#ffffff' } as any)
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')
            const pdfWidth = 210
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save(`${selectedSubject.name}-${selectedTopic}-Worksheet.pdf`)
        } catch (e) {
            console.error(e)
            alert("PDF Export failed")
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-8">

                {/* Subject */}
                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Subject</label>
                    <div className="flex flex-wrap gap-2">
                        {subjects.map(s => (
                            <button
                                key={s.id}
                                onClick={() => { setSelectedSubject(s); setSelectedTopic(s.topics[0]); }}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedSubject.id === s.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'bg-black/40 border border-white/10 text-slate-400 hover:border-white/30'}`}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Topic */}
                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Topic</label>
                    <div className="flex flex-col gap-2">
                        {selectedSubject.topics.map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTopic(t)}
                                className={`px-4 py-3 rounded-lg text-left text-sm transition-all border ${selectedTopic === t
                                    ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400 font-bold'
                                    : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Level</label>
                    <div className="flex gap-2">
                        {difficulties.map(d => (
                            <button
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={`flex-1 py-2 rounded text-xs transition-colors border ${difficulty === d
                                    ? 'bg-white text-black font-bold border-white'
                                    : 'border-white/10 text-slate-500 hover:border-white/30'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full h-12 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                    {isLoading ? <RefreshCcw className="h-4 w-4 animate-spin mr-2" /> : <BookOpen className="h-4 w-4 mr-2" />}
                    {isLoading ? "Creating..." : "Generate Worksheet"}
                </Button>

            </div>

            {/* Worksheet Preview */}
            <div className="lg:col-span-3">
                {assignment ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                        {/* Actions */}
                        <div className="flex justify-end gap-3 mb-4">
                            <Button size="sm" onClick={() => setAnswersVisible(!answersVisible)} variant="outline" className="border-white/20 text-slate-300">
                                {answersVisible ? "Hide Answers" : "Show Answers"}
                            </Button>
                            <Button size="sm" onClick={downloadPDF} className="bg-white text-black font-bold hover:bg-slate-200">
                                <Download className="h-4 w-4 mr-2" /> Download PDF
                            </Button>
                        </div>

                        {/* Paper */}
                        <div className="bg-white text-black p-8 md:p-12 rounded shadow-2xl min-h-[800px] relative" ref={printRef}>

                            {/* Header */}
                            <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{selectedSubject.name} Worksheet</h1>
                                    <p className="text-slate-500 font-medium">Topic: {selectedTopic} • Level: {difficulty}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-400 uppercase">Score</p>
                                    <div className="w-20 h-10 border-2 border-slate-300 mt-1"></div>
                                </div>
                            </div>

                            {/* Questions */}
                            <div className="space-y-8">
                                {assignment.questions.map((q: any, i: number) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-black text-white font-bold rounded-full text-sm">
                                                {i + 1}
                                            </span>
                                            <div className="flex-1">
                                                <p className="font-bold text-lg mb-3">{q.question}</p>

                                                {/* MCQ Options */}
                                                {q.type === 'mcq' && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                                                        {q.options.map((opt: string, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-3">
                                                                <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                                                                <span className="text-slate-700">{opt}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Short Answer Lines */}
                                                {q.type === 'short' && (
                                                    <div className="mt-4 space-y-3">
                                                        <div className="h-px bg-slate-300 w-full"></div>
                                                        <div className="h-px bg-slate-300 w-full"></div>
                                                    </div>
                                                )}

                                                {/* Code Box */}
                                                {q.type === 'code' && (
                                                    <div className="mt-4 p-4 border-2 border-slate-200 rounded-lg bg-slate-50 h-32 font-mono text-sm text-slate-400">
                                                        Write your code here...
                                                    </div>
                                                )}

                                                {/* Answer Key (Hidden by default) */}
                                                {answersVisible && q.answer && (
                                                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-sm font-medium border border-green-200 inline-block">
                                                        Answer: {q.answer}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-400 text-xs uppercase tracking-widest">
                                Generated by Hello World Classes • Practice Makes Perfect
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="h-full min-h-[500px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <FileText className="h-10 w-10 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Create Your First Worksheet</h3>
                        <p className="text-slate-400 max-w-sm">
                            Select a subject and topic to generate a professional, printable assignment instantly.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
