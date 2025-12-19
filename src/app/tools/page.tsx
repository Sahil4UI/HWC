"use client"

import { useState } from "react"
import { AlertTriangle, Terminal, RefreshCw, Wand2, SplitSquareHorizontal, Calculator, BookOpen, Code2, RotateCcw, FileQuestion, Database, Sparkles, ArrowRight, FileSpreadsheet, FileText, Mic, Calendar, Keyboard, Search, Grid, Layers, GraduationCap, Gamepad2 } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import Link from "next/link"

// Define Categories
type Category = "All" | "AI Power" | "Dev Tools" | "Students" | "Utilities" | "Typing Games"

const tools = [
    // AI Power
    {
        icon: <Wand2 className="h-8 w-8 text-black" />,
        title: "AI Text Cleaner",
        desc: "Fix grammar, remove emojis, rephrase professionally. Powered by Gemini AI.",
        href: "/tools/text-cleaner",
        gradient: "from-pink-500 to-rose-500",
        category: "AI Power"
    },
    // Students

    {
        icon: <Mic className="h-8 w-8 text-black" />,
        title: "Text to Speech",
        desc: "Listen to text in natural Hindi/English voices. Free TTS converter.",
        href: "/tools/text-to-speech",
        gradient: "from-purple-500 to-pink-500",
        category: "AI Power"
    },
    {
        icon: <Wand2 className="h-8 w-8 text-black" />,
        title: "One-Liner Converter",
        desc: "Transform messy 5-line loops into elegant, professional Python one-liners.",
        href: "/tools/python-one-liner",
        gradient: "from-purple-500 to-pink-500",
        category: "AI Power"
    },

    // Dev Tools
    {
        icon: <FileText className="h-8 w-8 text-black" />,
        title: "HTML to PDF",
        desc: "Convert HTML/CSS code to PDF with live preview. A4, Letter & Invoice support.",
        href: "/tools/html-to-pdf",
        gradient: "from-indigo-500 to-blue-600",
        category: "Dev Tools"
    },
    {
        icon: <Keyboard className="h-8 w-8 text-black" />,
        title: "Typing Speed Test",
        desc: "Professional WPM test. Plain and simple. Focus on accuracy and speed.",
        href: "/tools/typing-test",
        gradient: "from-yellow-400 to-orange-500",
        category: "Typing Games"
    },
    {
        icon: <Gamepad2 className="h-8 w-8 text-black" />,
        title: "Typing Arcade",
        desc: "5+ Games: Cyber Defense, Neon Rush, Bit Boss. Fun way to type fast.",
        href: "/tools/typing-arcade",
        gradient: "from-purple-500 to-cyan-500",
        category: "Typing Games"
    },
    {
        icon: <Terminal className="h-8 w-8 text-black" />,
        title: "Code Playground",
        desc: "Run Python, JS, C++ code instantly. Multi-language online compiler.",
        href: "/tools/code-playground",
        gradient: "from-slate-800 to-slate-600",
        category: "Dev Tools"
    },
    {
        icon: <Code2 className="h-8 w-8 text-black" />,
        title: "Web Playground",
        desc: "Write HTML, CSS, & JS with live preview. The best online frontend editor.",
        href: "/tools/html-playground",
        gradient: "from-orange-500 to-red-500",
        category: "Dev Tools"
    },
    {
        icon: <Database className="h-8 w-8 text-black" />,
        title: "SQL Beautifier",
        desc: "Format complex SQL queries instantly. Turn unreadable code into clean, professional syntax.",
        href: "/tools/sql-beautifier",
        gradient: "from-blue-600 to-cyan-500",
        category: "Dev Tools"
    },
    {
        icon: <FileSpreadsheet className="h-8 w-8 text-black" />,
        title: "CSV Merger",
        desc: "Merge multiple CSV files into one master file effortlessly. 100% Free & Secure.",
        href: "/tools/csv-merger",
        gradient: "from-green-500 to-emerald-400",
        category: "Dev Tools"
    },

    // Students
    {
        icon: <RefreshCw className="h-8 w-8 text-black" />,
        title: "Loop Visualizer",
        desc: "Watch loops run step-by-step. See exactly how 'i' changes and 'while' logic works.",
        href: "/tools/loop-visualizer",
        gradient: "from-cyan-400 to-blue-500",
        category: "Students"
    },
    {
        icon: <Terminal className="h-8 w-8 text-black" />,
        title: "Code Output Predictor",
        desc: "Challenge yourself. Can you guess the output of these tricky snippets before running them?",
        href: "/tools/code-output",
        gradient: "from-gray-200 to-white",
        category: "Students"
    },
    {
        icon: <BookOpen className="h-8 w-8 text-black" />,
        title: "Colab to PDF Guide",
        desc: "Learn the best ways to export Google Colab notebooks to PDF securely.",
        href: "/tools/colab-to-pdf",
        gradient: "from-orange-500 to-yellow-500",
        category: "Students"
    },

    // Utilities (Calculators)
    {
        icon: <Calculator className="h-8 w-8 text-black" />,
        title: "Percentage Calculator",
        desc: "Solve simple percentage, percentage change, and 'what %' problems instantly.",
        href: "/tools/percentage-calculator",
        gradient: "from-cyan-400 to-blue-500",
        category: "Utilities"
    },
    {
        icon: <Calendar className="h-8 w-8 text-black" />,
        title: "Age Calculator",
        desc: "Calculate your exact age and see days remaining until your next birthday.",
        href: "/tools/age-calculator",
        gradient: "from-indigo-500 to-purple-500",
        category: "Utilities"
    }
]

export default function ToolsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState<Category>("All")

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.desc.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = activeCategory === "All" || tool.category === activeCategory
        return matchesSearch && matchesCategory
    })

    const categories: Category[] = ["All", "AI Power", "Dev Tools", "Students", "Utilities", "Typing Games"]

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/20 text-foreground relative">
            <ParticleBackground />
            <Navbar />

            {/* Header Section */}
            <div className="relative pt-32 pb-16 overflow-hidden text-center z-10">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 animate-fade-in-up border border-primary/40 box-glow">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-glow">Supercharge Learning</span>
                    </div>
                    <div className="text-center mb-10 relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 tracking-tight">
                            <span className="block text-white drop-shadow-md">DEVELOPER</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00F3FF] to-purple-500 glitch-text" data-text="TOOLKIT">TOOLKIT</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-mono mb-8">
                            A complete suite of <span className="text-white font-bold">15+ tools</span> for developers and students.
                        </p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="max-w-2xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-2 flex flex-col md:flex-row gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search tools (e.g. 'PDF', 'Python', 'Calc')..."
                                className="w-full bg-transparent border-none outline-none text-white pl-12 pr-4 h-12 font-medium placeholder:text-slate-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                                    : 'bg-black/40 text-slate-500 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="container mx-auto px-4 pb-24 relative z-10">

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        {filteredTools.map((tool, idx) => (
                            <Link key={idx} href={tool.href} className="group relative">
                                <div className={`h-full bg-black/50 backdrop-blur-md rounded-none p-[1px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] border border-white/10 group-hover:border-primary/50`}>
                                    <div className="h-full bg-black/80 rounded-none p-6 relative overflow-hidden group-hover:bg-black/60 transition-colors flex flex-col">

                                        {/* Category Tag */}
                                        <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest border border-white/5 bg-black/40 px-2 py-1 rounded">
                                            {tool.category}
                                        </div>

                                        {/* Icon Background Blob */}
                                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tool.gradient} opacity-20 group-hover:opacity-40 transition-opacity blur-2xl`}></div>

                                        <div className={`w-14 h-14 rounded-none bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 clip-path-polygon flex-shrink-0`}>
                                            {tool.icon}
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-3 transition-colors font-heading tracking-wide group-hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                            {tool.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed mb-6 font-mono text-sm flex-1">
                                            {tool.desc}
                                        </p>

                                        <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest mt-auto">
                                            INITIALIZE_TOOL <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-8 w-8 text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No tools found</h3>
                        <p className="text-slate-400">Try searching for something else like "PDF" or "Python".</p>
                        <button
                            onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                            className="mt-6 text-primary font-bold hover:underline uppercase tracking-wider text-sm"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Coming Soon Section */}
                <section className="max-w-5xl mx-auto text-center border-t border-white/10 pt-16">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-10 pb-4 inline-block">Roadmap / Encrypted Functions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500 text-left">
                        {[
                            { title: "Regex Builder", icon: RotateCcw, desc: "Visual Regex construction" },
                            { title: "Interview Prep", icon: FileQuestion, desc: "Mock coding interviews" },
                            { title: "API Tester", icon: Terminal, desc: "Test REST endpoints instantly" },
                        ].map((tool, i) => (
                            <div key={i} className="group border border-dashed border-slate-700 hover:border-primary/60 rounded-none p-6 bg-black/40 hover:bg-primary/5 transition-all">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-400 transition-colors shadow-sm rounded-none clip-path-polygon group-hover:bg-primary/20 group-hover:text-primary">
                                        <tool.icon className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-bold text-lg text-white font-heading">{tool.title}</h3>
                                </div>
                                <p className="text-xs text-slate-400 font-mono ml-12">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
