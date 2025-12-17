import Link from "next/link"
import { ArrowRight, Terminal, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">

            {/* Cyberpunk Particles */}
            <ParticleBackground />

            {/* Cyberpunk Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                {/* Main Heading */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter mb-8 animate-fade-in-up delay-100 leading-none drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                    <span className="block text-white mb-2 dropdown-shadow-[0_2px_10px_black]">MASTER THE FUTURE OF</span>
                    <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 pb-2 glitch-text" data-text="CODING & TECH SKILLS">
                        CODING & TECH SKILLS
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-3xl text-cyan-50/90 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-medium bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 inline-block shadow-2xl">
                    Learn <span className="text-primary font-bold">Python, Web Development, Full Stack & Data Analytics</span> with beginner-friendly explanations — in <span className="text-white border-b-2 border-primary pb-1 font-bold">Hindi & Hinglish</span>.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-300 mb-10">
                    <Link href="/skills/python">
                        <Button size="lg" className="h-16 px-10 text-xl bg-primary text-black font-black rounded-none border border-primary shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] hover:scale-105 transition-all duration-300 hover:bg-white clip-path-polygon">
                            INITIALIZE_SEQUENCE
                            <Terminal className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                    <Link href="/tools">
                        <Button size="lg" className="h-16 px-10 text-xl bg-transparent text-white font-bold rounded-none border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 hover:bg-purple-500/20">
                            ACCESS_TOOLS
                            <Zap className="ml-2 h-5 w-5 fill-current" />
                        </Button>
                    </Link>
                </div>

                {/* Trust Indicators */}
                <p className="text-sm text-gray-500 font-medium animate-fade-in-up delay-500">
                    Trusted by thousands of students for <span className="text-primary font-bold">Job-Ready Skills</span> without the jargon.
                </p>

            </div>
        </section>
    )
}
