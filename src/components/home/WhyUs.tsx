import { Smile, DollarSign, Globe, Briefcase, Zap } from "lucide-react"

const features = [
    {
        icon: Smile,
        title: "Simple Explanations",
        desc: "No jargon. We explain complex topics in plain English (and Hindi/Hinglish).",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        shadow: "shadow-[0_0_15px_rgba(250,204,21,0.3)]",
        hoverText: "group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
    },
    {
        icon: Briefcase,
        title: "Career Focused",
        desc: "Learn what companies actually ask for in interviews.",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
        shadow: "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
        hoverText: "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
    },
    {
        icon: Globe,
        title: "Hindi-Friendly",
        desc: "Content designed for Indian students to learn comfortably.",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        shadow: "shadow-[0_0_15px_rgba(74,222,128,0.3)]",
        hoverText: "group-hover:text-green-400 group-hover:drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"
    },
    {
        icon: DollarSign,
        title: "Free & Affordable",
        desc: "High-quality education shouldn't cost a fortune.",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "border-pink-400/20",
        shadow: "shadow-[0_0_15px_rgba(244,114,182,0.3)]",
        hoverText: "group-hover:text-pink-400 group-hover:drop-shadow-[0_0_5px_rgba(244,114,182,0.8)]"
    }
]

export function WhyUs() {
    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 -translate-y-1/2"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        <div className="flex items-center gap-2 mb-4 text-primary font-bold tracking-widest uppercase text-xs justify-center lg:justify-start">
                            <Zap className="h-4 w-4" /> The Hello World Advantage
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 text-white leading-tight">
                            WHY LEARN AT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F3FF] to-green-400 glitch-text" data-text="HELLO WORLD?">HELLO WORLD?</span>
                        </h2>
                        <p className="text-slate-400 mb-8 text-lg font-mono leading-relaxed">
                            We are not another corporate ed-tech giant. We are a <span className="text-white font-bold">community built by teachers</span> who care about your growth.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className={`flex gap-4 p-4 border bg-white/5 hover:bg-white/10 transition-colors rounded-none group ${feature.border} hover:border-opacity-50`}>
                                    <div className="mt-1">
                                        <div className={`p-2 rounded-none border transition-all duration-300 group-hover:scale-110 ${feature.bg} ${feature.color} ${feature.border} ${feature.shadow}`}>
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className={`font-bold mb-2 text-white font-heading tracking-wide uppercase transition-colors ${feature.hoverText}`}>{feature.title}</h3>
                                        <p className="text-sm text-slate-400 font-mono leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-none rotate-3 opacity-20 blur-lg transition-transform duration-500 group-hover:rotate-6 group-hover:opacity-30"></div>
                        <div className="relative bg-black border border-primary/30 p-8 rounded-none shadow-[0_0_40px_rgba(0,243,255,0.15)]">
                            <div className="space-y-4">
                                <div className="h-4 w-3/4 bg-white/10 rounded-sm animate-pulse"></div>
                                <div className="h-4 w-1/2 bg-white/10 rounded-sm animate-pulse delay-75"></div>
                                <div className="h-4 w-5/6 bg-white/10 rounded-sm animate-pulse delay-150"></div>
                                <div className="h-auto w-full group-hover:scale-[1.02] transition-transform duration-500 rounded-none shadow-2xl overflow-hidden border border-white/5">
                                    <CodeBlock />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-500 border border-white/20"></div>
                                <div>
                                    <div className="h-3 w-24 bg-white/20 rounded-sm mb-2"></div>
                                    <div className="h-3 w-16 bg-white/10 rounded-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function CodeBlock() {
    return (
        <div className="w-full h-full bg-[#0d0d0d] p-4 font-mono text-xs overflow-hidden relative border border-white/5">
            {/* VS Code styling */}
            <div className="flex h-full">
                {/* Line Numbers */}
                <div className="flex flex-col text-right text-slate-600 pr-4 select-none border-r border-white/5 mr-4 leading-6">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
                {/* Code Content */}
                <div className="flex flex-col text-slate-300 leading-6">
                    <div className="whitespace-nowrap"><span className="text-purple-400">def</span> <span className="text-yellow-400">master_coding</span>():</div>
                    <div className="whitespace-nowrap pl-4">skills = [<span className="text-green-400">"Python"</span>, <span className="text-green-400">"Logic"</span>]</div>
                    <div className="whitespace-nowrap pl-4"><span className="text-purple-400">while</span> <span className="text-blue-400">True</span>:</div>
                    <div className="whitespace-nowrap pl-8">skills.append(<span className="text-green-400">"Success"</span>)</div>
                    <div className="whitespace-nowrap pl-8"><span className="text-yellow-400">print</span>(<span className="text-green-400">"You are hired!"</span>)</div>
                </div>
            </div>
            {/* Blinking Cursor Effect */}
            <div className="absolute bottom-4 left-64 w-2 h-4 bg-primary animate-pulse"></div>
        </div>
    )
}
