import Link from "next/link"
import { Code2, Bug, FileQuestion, Database, FileText, ArrowRight, Zap } from "lucide-react"
import { Card } from "@/components/ui/Card"

const tools = [
    {
        title: "Online Code Runner",
        icon: Code2,
        desc: "Run Python, JS, and SQL directly in your browser."
    },
    {
        title: "Error Explainer",
        icon: Bug,
        desc: "Paste your error and get simple explanations."
    },
    {
        title: "Practice Questions",
        icon: FileQuestion,
        desc: "Generate quizzes to test your knowledge."
    },
    {
        title: "SQL Playground",
        icon: Database,
        desc: "Practice queries without installing anything."
    },
    {
        title: "Cheat Sheets",
        icon: FileText,
        desc: "Quick references for syntax and commands."
    }
]

export function ToolsPreview() {
    return (
        <section className="py-24 bg-black relative">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-none bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4 border border-secondary/30 box-glow">
                        Free Tools for Students
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tighter">
                        Code Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-purple-500 glitch-text" data-text="POWERFUL TOOLS">Powerful Tools</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-mono">
                        Everything you need to practice, debug, and learn faster — completely <span className="text-secondary font-bold">FREE</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <Card key={index} className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-secondary/50 transition-all duration-300 group rounded-none hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <div className="p-6 flex items-start gap-4">
                                <div className="p-3 bg-secondary/10 rounded-none border border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <tool.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-white font-heading tracking-wide group-hover:text-secondary transition-colors">{tool.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-mono">{tool.desc}</p>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* CTA Card */}
                    <Card className="bg-secondary text-black border-secondary flex flex-col justify-center items-center text-center p-8 hover:bg-white hover:text-black transition-colors duration-300 rounded-none shadow-[0_0_30px_rgba(168,85,247,0.4)] group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <h3 className="font-black text-2xl mb-2 relative z-10 font-heading">EXPLORE ALL TOOLS</h3>
                        <p className="text-black/70 text-sm mb-6 relative z-10 font-mono font-bold">See what else we have built for you.</p>
                        <Link href="/tools" className="inline-flex items-center font-black bg-black text-secondary px-6 py-3 rounded-none text-sm hover:bg-purple-600 hover:text-white transition-all border border-black relative z-10 tracking-widest uppercase clip-path-polygon">
                            View Tools <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Card>
                </div>

            </div>
        </section>
    )
}
