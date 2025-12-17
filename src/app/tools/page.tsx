import { AlertTriangle, Terminal, RefreshCw, Wand2, SplitSquareHorizontal, Calculator, BookOpen, Code2, RotateCcw, FileQuestion, Database, Sparkles, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { CodePlayground } from "@/components/tools/CodePlayground"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import Link from "next/link"

const tools = [
    {
        icon: <AlertTriangle className="h-8 w-8 text-black" />,
        title: "Error Explainer",
        desc: "Paste your cryptic Python errors. Get simple Hinglish explanations and instant fixes.",
        href: "/tools/python-error-explainer",
        gradient: "from-red-500 to-orange-500",
        shadow: "shadow-[0_0_15px_rgba(239,68,68,0.4)]"
    },
    {
        icon: <Terminal className="h-8 w-8 text-black" />,
        title: "Code Output Predictor",
        desc: "Challenge yourself. Can you guess the output of these tricky snippets before running them?",
        href: "/tools/code-output",
        gradient: "from-gray-200 to-white",
        shadow: "shadow-[0_0_15px_rgba(255,255,255,0.3)]"
    },
    {
        icon: <RefreshCw className="h-8 w-8 text-black" />,
        title: "Loop Visualizer",
        desc: "Watch loops run step-by-step. See exactly how 'i' changes and 'while' logic works.",
        href: "/tools/loop-visualizer",
        gradient: "from-cyan-400 to-blue-500",
        shadow: "shadow-[0_0_15px_rgba(6,182,212,0.4)]"
    },
    {
        icon: <Wand2 className="h-8 w-8 text-black" />,
        title: "One-Liner Converter",
        desc: "Transform messy 5-line loops into elegant, professional Python one-liners.",
        href: "/tools/python-one-liner",
        gradient: "from-purple-500 to-pink-500",
        shadow: "shadow-[0_0_15px_rgba(168,85,247,0.4)]"
    },
    {
        icon: <SplitSquareHorizontal className="h-8 w-8 text-black" />,
        title: "Method Difference",
        desc: "Clear up confusion: append vs extend, pop vs remove, sort vs sorted.",
        href: "/tools/method-difference",
        gradient: "from-indigo-500 to-violet-500",
        shadow: "shadow-[0_0_15px_rgba(99,102,241,0.4)]"
    },
    {
        icon: <Calculator className="h-8 w-8 text-black" />,
        title: "Number Logic Solver",
        desc: "See the math behind Prime, Armstrong, and Palindrome checks with visual steps.",
        href: "/tools/number-logic",
        gradient: "from-emerald-400 to-green-500",
        shadow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]"
    },
    {
        icon: <BookOpen className="h-8 w-8 text-black" />,
        title: "Practice Generator",
        desc: "Never run out of problems. Generate unlimited practice questions by topic.",
        href: "/tools/practice-generator",
        gradient: "from-orange-500 to-yellow-500",
        shadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]"
    }
]

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/20 text-foreground relative">
            <ParticleBackground />
            <Navbar />

            {/* Header Section */}
            <div className="relative pt-32 pb-20 overflow-hidden text-center z-10">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 animate-fade-in-up border border-primary/40 box-glow">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-glow">Supercharge Learning</span>
                    </div>
                    <div className="text-center mb-16 relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 tracking-tight">
                            <span className="block text-white drop-shadow-md">DEVELOPER</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 glitch-text" data-text="TOOLKIT">TOOLKIT</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-mono mb-8">
                            Free online tools built for students to <span className="text-primary font-bold">practice faster</span>, <span className="text-purple-400 font-bold">debug smarter</span>, and learn better — without installing anything.
                        </p>
                        <p className="text-sm text-slate-500 max-w-4xl mx-auto font-mono leading-relaxed bg-black/40 p-4 border border-white/5 rounded-none backdrop-blur-sm">
                            Hello World Classes provides free coding tools like online Python compiler, SQL playground, error explainer, and coding practice questions to help beginners learn programming easily.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="container mx-auto px-4 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-24">
                    {tools.map((tool, idx) => (
                        <Link key={idx} href={tool.href} className="group relative">
                            <div className={`h-full bg-black/50 backdrop-blur-md rounded-none p-[1px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] border border-white/10 group-hover:border-primary/50`}>
                                <div className="h-full bg-black/80 rounded-none p-6 relative overflow-hidden group-hover:bg-black/60 transition-colors">

                                    {/* Icon Background Blob */}
                                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tool.gradient} opacity-20 group-hover:opacity-40 transition-opacity blur-2xl`}></div>

                                    <div className={`w-14 h-14 rounded-none bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 clip-path-polygon`}>
                                        {tool.icon}
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-3 transition-colors font-heading tracking-wide group-hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                        {tool.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed mb-6 font-mono text-sm">
                                        {tool.desc}
                                    </p>

                                    <div className="flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                                        INITIALIZE_TOOL <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Code Playground Section */}
                <section id="code-playground" className="max-w-6xl mx-auto mb-24 relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-none blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="bg-black/90 rounded-none p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 relative">
                        <div className="bg-[#050505] rounded-none overflow-hidden">
                            <div className="p-8 md:p-12 text-center md:text-left md:flex items-center justify-between gap-8 border-b border-white/5 bg-white/5">
                                <div>
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                        <div className="p-2 bg-green-500/20 rounded-none text-green-400 border border-green-500/30">
                                            <Code2 className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white tracking-tight">QUICK CODE RUNNER</h2>
                                    </div>
                                    <p className="text-slate-400 text-lg max-w-lg font-mono">
                                        Need to test a snippet fast? No setup required. Just write, run, and see the magic efficiently.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 md:p-6 bg-black">
                                <CodePlayground />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Coming Soon Section */}
                <section className="max-w-5xl mx-auto text-center">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-10 border-b border-white/10 pb-4 inline-block">System Roadmap / In Functions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        {[
                            { title: "Regex Builder", icon: RotateCcw, desc: "Visual Regex construction" },
                            { title: "SQL Playground", icon: Database, desc: "Practice Queries safely" },
                            { title: "Interview Prep", icon: FileQuestion, desc: "Mock coding interviews" },
                        ].map((tool, i) => (
                            <div key={i} className="group border border-dashed border-slate-700 hover:border-primary/60 rounded-none p-8 bg-black/40 hover:bg-primary/5 transition-all">
                                <div className="mx-auto mb-5 w-12 h-12 flex items-center justify-center bg-slate-800 text-slate-400 transition-colors shadow-sm rounded-none clip-path-polygon group-hover:bg-primary/20 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                                    <tool.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg text-white mb-1 font-heading">{tool.title}</h3>
                                <p className="text-xs text-slate-400 font-mono">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
