import Link from "next/link"
import { ArrowLeft, Youtube, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadges } from "@/components/retention/TrustBadges"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

interface ToolLayoutProps {
    title: string
    subtitle: string
    children: React.ReactNode
    videoLink?: string
    toolId?: string // useful for analytics later
    fullWidth?: boolean
}

export function ToolLayout({ title, subtitle, children, videoLink, fullWidth = false }: ToolLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20 relative">

            {/* Cyberpunk Grid */}
            <ParticleBackground />

            {/* Top Navigation */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-primary/30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/tools" className="text-sm font-bold text-slate-400 hover:text-primary flex items-center gap-2 transition-colors group font-mono">
                        <div className="p-1.5 bg-black/50 group-hover:bg-primary/20 rounded-none transition-colors border border-primary/30 group-hover:border-primary">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        BACK_TO_TOOLS
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/10 backdrop-blur-sm px-3 py-1.5 rounded-none border border-primary/50 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                        <ShieldCheck className="h-3 w-3" /> Teacher-Built
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative pt-16 pb-12">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-purple-900/30 text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-6 border border-purple-500/50 box-glow">
                        <Sparkles className="h-3 w-3" /> Interactive Module
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading mb-4 text-white tracking-tighter glitch-text" data-text={title}>
                        {title}
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-mono">
                        <span className="text-primary">&gt;</span> {subtitle}
                    </p>
                </div>
            </div>

            {/* Main Tool Content Card */}
            <div className={`container mx-auto px-4 relative z-10 ${fullWidth ? 'max-w-[95%]' : ''}`}>
                <div className="bg-black/60 backdrop-blur-md rounded-none shadow-[0_0_30px_rgba(0,243,255,0.1)] border border-primary/30 overflow-hidden min-h-[500px] p-1">
                    <div className="bg-black/40 p-6 md:p-10 rounded-none h-full border-t border-white/5">
                        {children}
                    </div>
                </div>
            </div>

            {/* Educational Integration footer */}
            <div className="container mx-auto px-4 text-center max-w-2xl mt-16">
                <div className="relative group overflow-hidden p-8 bg-gradient-to-br from-black to-slate-900 rounded-none border border-primary/30 shadow-2xl text-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse"></div>

                    <h3 className="text-xl font-bold mb-3 relative z-10 font-heading tracking-wide">STUCK ON THIS CONCEPT?</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto relative z-10 font-mono">
                        Visualizing is great, but a deep dive explains *why*. Check the full lesson in our course.
                    </p>

                    {videoLink ? (
                        <Link href={videoLink} target="_blank" className="relative z-10">
                            <Button className="bg-primary text-white hover:bg-white hover:text-black hover:scale-105 transition-all font-bold rounded-none shadow-[0_0_15px_rgba(0,243,255,0.4)] border-0 h-12 px-8 uppercase tracking-widest clip-path-polygon group">
                                <Youtube className="mr-2 h-4 w-4 text-white group-hover:text-black" /> Watch Lesson
                            </Button>
                        </Link>
                    ) : (
                        <Link href="https://www.youtube.com/@HelloWorldClasses" target="_blank" className="relative z-10">
                            <Button className="bg-primary text-white hover:bg-white hover:text-black hover:scale-105 transition-all font-bold rounded-none shadow-[0_0_15px_rgba(0,243,255,0.4)] border-0 h-12 px-8 uppercase tracking-widest clip-path-polygon group">
                                <Youtube className="mr-2 h-4 w-4 text-white group-hover:text-black" /> Watch Python Course
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="mt-20 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500">
                <TrustBadges />
            </div>

        </div>
    )
}
