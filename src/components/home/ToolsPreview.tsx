import Link from "next/link"
import { Code2, Bug, FileQuestion, Database, FileText, ArrowRight, Zap } from "lucide-react"
import { Card } from "@/components/ui/Card"

const tools = [
    {
        title: "Online Code Runner",
        icon: Code2,
        desc: "Run Python, JS, and SQL directly in your browser.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        shadow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
    },
    {
        title: "Error Explainer",
        icon: Bug,
        desc: "Paste your error and get simple explanations.",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        shadow: "group-hover:shadow-[0_0_20px_rgba(251,113,133,0.4)]"
    },
    {
        title: "Practice Questions",
        icon: FileQuestion,
        desc: "Generate quizzes to test your knowledge.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        shadow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
    },
    {
        title: "SQL Playground",
        icon: Database,
        desc: "Practice queries without installing anything.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        shadow: "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]"
    },
    {
        title: "Cheat Sheets",
        icon: FileText,
        desc: "Quick references for syntax and commands.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        shadow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
    }
]

export function ToolsPreview() {
    return (
        <section className="py-24 bg-black relative">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4 border border-primary/30 box-glow">
                        Free Tools for Students
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tighter">
                        Code Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-500 glitch-text" data-text="POWERFUL TOOLS">Powerful Tools</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-mono">
                        Everything you need to practice, debug, and learn faster — completely <span className="text-primary font-bold">FREE</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <Card key={index} className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group rounded-none hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                            <div className="p-6 flex items-start gap-4 h-full">
                                <div className={`p-3 rounded-none border transition-all duration-300 group-hover:scale-110 flex-shrink-0 ${tool.bg} ${tool.border} ${tool.color} ${tool.shadow} shadow-lg`}>
                                    <tool.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-white font-heading tracking-wide transition-colors group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">{tool.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-mono">{tool.desc}</p>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* CTA Card - Redesigned for Visibility */}
                    <Link href="/tools" className="group">
                        <Card className="h-full bg-white text-black border-2 border-white flex flex-col justify-center items-center text-center p-8 hover:bg-black hover:border-primary transition-all duration-300 rounded-none shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.5)] cursor-pointer relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:opacity-0 transition-opacity"></div>

                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex p-3 rounded-full bg-black text-white group-hover:bg-primary group-hover:text-black transition-colors mb-2 shadow-xl">
                                    <Zap className="h-8 w-8 fill-current" />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl mb-1 font-heading uppercase tracking-tighter group-hover:text-white transition-colors">EXPLORE ALL TOOLS</h3>
                                    <p className="text-gray-600 font-bold font-mono text-xs group-hover:text-slate-400 transition-colors">See what else we have built.</p>
                                </div>
                                <div className="inline-flex items-center font-black text-sm uppercase tracking-widest border-b-2 border-black group-hover:border-primary pb-1 group-hover:text-primary transition-colors">
                                    View Library <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>

            </div>
        </section>
    )
}
