import Link from "next/link"
import { ArrowRight, Terminal, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">

            {/* Cyberpunk Grid & Particles */}
            <ParticleBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                {/* Content Overlay - Accessibility Fix */}
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 sm:p-12 border border-white/5 shadow-2xl relative overflow-hidden inline-block max-w-5xl">

                    {/* Main Heading - Glitch Effect & Shadow */}
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter mb-8 animate-fade-in-up delay-100 leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                        <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">MASTER THE FUTURE OF</span>
                        <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-500 glitch-text" data-text="CODING & TECH SKILLS">
                            CODING & TECH SKILLS
                        </span>
                    </h1>

                    {/* Subheading - Enhanced Visibility */}
                    <p className="text-xl md:text-3xl text-cyan-50 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-mono font-medium drop-shadow-md">
                        Learn <span className="text-primary font-bold">Python, Web Development, Full Stack & Data Analytics</span> with beginner-friendly explanations — in <span className="text-white border-b-2 border-primary pb-1">Hindi & Hinglish</span>.
                    </p>

                    {/* Actions - Vivid Solid Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300 mb-10">
                        <Link href="/skills/python">
                            <Button size="lg" className="h-16 px-10 text-xl bg-primary text-black font-black rounded-sm border-2 border-primary shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] focus:ring-4 focus:ring-primary/50 transition-all duration-300 clip-path-polygon transform hover:-translate-y-1">
                                INITIALIZE_SEQUENCE
                                <Terminal className="ml-2 h-6 w-6" />
                            </Button>
                        </Link>
                        <Link href="/tools">
                            <Button size="lg" className="h-16 px-10 text-xl bg-purple-600 text-white font-bold rounded-sm border-2 border-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:bg-purple-500 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                ACCESS_TOOLS
                                <Zap className="ml-2 h-5 w-5 fill-white" />
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Indicators (SEO optimized but subtle) */}
                    <p className="text-sm text-slate-400 font-mono animate-fade-in-up delay-500">
                        Trusted by thousands of students for <span className="text-white">Job-Ready Skills</span> without the jargon.
                    </p>
                </div>

            </div>

            {/* Bottom Fade to Black */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none"></div>
        </section>
    )
}
