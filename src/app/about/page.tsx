import { Rocket, Sparkles, Brain, Users } from "lucide-react"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-20 overflow-hidden relative">

            <ParticleBackground />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">

                {/* Hero Header */}
                <div className="text-center mb-24 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-primary/50 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-widest mb-6 box-glow mx-auto shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                        <Rocket className="h-4 w-4" /> Mission Control
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold font-heading mb-6 tracking-tight text-center w-full flex flex-col md:block items-center justify-center">
                        <span className="text-white mr-0 md:mr-4">ABOUT</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F3FF] to-purple-500 glitch-text inline-block" data-text="HELLO WORLD">HELLO WORLD</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-mono mb-8 text-center px-4">
                        Hello World Classes was created with one simple goal — <span className="text-white font-bold">Make coding simple, practical, and accessible for every student.</span>
                    </p>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-none text-left max-w-4xl mx-auto backdrop-blur-sm">
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            We believe learning should not feel scary or boring. Most students struggle not because coding is hard, but because it is taught in a complicated way.
                        </p>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Here, we teach Python, web development, full-stack, and data skills using:
                        </p>
                        <ul className="list-disc list-inside text-cyan-400 font-bold space-y-2 mb-6 font-mono">
                            <li><span className="text-slate-200">Simple language</span></li>
                            <li><span className="text-slate-200">Real examples</span></li>
                            <li><span className="text-slate-200">Hindi & Hinglish explanations</span></li>
                            <li><span className="text-slate-200">Concepts that companies actually expect</span></li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed">
                            Whether you are a beginner, college student, or career switcher — <span className="text-white font-bold">Hello World Classes is built for you.</span>
                        </p>
                    </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { icon: Sparkles, label: "Interactive Tools", value: "7+" },
                        { icon: Users, label: "Students Helped", value: "10k+" },
                        { icon: Brain, label: "Free Lessons", value: "100%" },
                    ].map((stat, i) => (
                        <div key={i} className="group p-8 rounded-none bg-black/50 border border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300 text-center backdrop-blur-md relative overflow-hidden flex flex-col items-center">
                            <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                            <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">{stat.label}</p>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/50"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/50"></div>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="relative p-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary box-glow">
                    <div className="bg-black rounded-none p-8 md:p-12 relative overflow-hidden">

                        <h2 className="text-3xl font-bold text-white mb-6 font-heading uppercase tracking-wider">Our Origin Story</h2>
                        <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-mono">
                            <p>
                                Hello World Classes started with a simple observation: <strong className="text-primary">Programming tutorials are boring.</strong>
                            </p>
                            <p>
                                We wanted to change that. Instead of static text and sleepy videos, we built a platform where code comes alive.
                                Where you don't just read about loops, you <span className="text-white bg-primary/20 px-1">see them run</span>.
                            </p>
                            <p>
                                Our philosophy is simple: <strong>Build first, learn theory later.</strong>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
