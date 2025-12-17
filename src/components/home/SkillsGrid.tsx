import Link from "next/link"
import { Code, Globe, Database, Brain, ArrowRight, Layout, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/Card"

const skills = [
    {
        title: "Python Programming",
        description: "The most versatile language for beginners. Start your coding journey here.",
        icon: Code,
        href: "/skills/python",
        color: "text-yellow-400",
        glow: "shadow-[0_0_20px_rgba(250,204,21,0.3)]",
        badge: "Beginner Friendly"
    },
    {
        title: "Web Development",
        description: "Build modern websites with HTML, CSS, JavaScript, and React.",
        icon: Globe,
        href: "/skills/web-dev",
        color: "text-blue-400",
        glow: "shadow-[0_0_20px_rgba(96,165,250,0.3)]",
        badge: "Popular"
    },
    {
        title: "Full-Stack Dev",
        description: "Master both frontend and backend to build complete applications.",
        icon: Layout,
        href: "/skills/full-stack",
        color: "text-purple-400",
        glow: "shadow-[0_0_20px_rgba(192,132,252,0.3)]",
        badge: "Career Ready"
    },
    {
        title: "Data Analytics",
        description: "Turn data into insights with SQL, Pandas, and Visualization tools.",
        icon: Database,
        href: "/skills/data-analytics",
        color: "text-green-400",
        glow: "shadow-[0_0_20px_rgba(74,222,128,0.3)]",
        badge: null
    },
    {
        title: "AI & Automation",
        description: "Learn to build smart bots and automate boring tasks.",
        icon: Brain,
        href: "#",
        color: "text-pink-400",
        glow: "shadow-[0_0_20px_rgba(244,114,182,0.3)]",
        badge: "Coming Soon"
    }
]

export function SkillsGrid() {
    return (
        <section className="py-24 bg-black/90 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-primary/30 box-glow">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-glow">Level Up Your Arsenal</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tighter">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-500 glitch-text" data-text="IN-DEMAND SKILLS">In-Demand Skills</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-mono">
                        Choose a learning path designed to take you from <span className="text-white font-bold">Hello World</span> to <span className="text-primary font-bold">Industry Ready</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <Link key={index} href={skill.href} className={skill.href === "#" ? "pointer-events-none opacity-60" : "group"}>
                            <Card className={`h-full flex flex-col justify-between relative overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10 group-hover:border-primary/50 transition-all duration-300 rounded-none p-1 ${skill.href !== "#" ? "hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]" : ""}`}>
                                <div className="p-6 h-full flex flex-col bg-black/40">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-3 rounded-none bg-black border border-white/10 ${skill.color} ${skill.glow} group-hover:scale-110 transition-transform duration-300`}>
                                            <skill.icon className="h-8 w-8" />
                                        </div>
                                        {skill.badge && (
                                            <span className="px-2 py-1 bg-white/5 text-white text-[10px] font-bold tracking-widest uppercase border border-white/10">
                                                {skill.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-black mb-3 text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] transition-colors font-heading tracking-wide">
                                        {skill.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed font-mono">
                                        {skill.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center text-primary font-bold text-sm opacity-60 group-hover:opacity-100 transition-all tracking-widest uppercase">
                                        {skill.href !== "#" ? "INITIALIZE_COURSE" : "SYSTEM_LOCKED"}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}
