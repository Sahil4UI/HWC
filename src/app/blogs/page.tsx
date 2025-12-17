import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { Sparkles, Terminal } from "lucide-react"

export const metadata = {
    title: "Blogs | Hello World Classes",
    description: "Read our latest articles on Python, Coding, and Tech.",
}

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticleBackground />
            <Navbar />
            <div className="container mx-auto px-4 py-32 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-primary/30 box-glow">
                        <Terminal className="h-3 w-3" />
                        <span className="text-glow">System Logs</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-heading mb-6 tracking-tighter">
                        LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-500 glitch-text" data-text="ARTICLES">ARTICLES</span>
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-none p-12 text-center text-slate-400 relative overflow-hidden group hover:border-primary/50 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                        <h3 className="text-xl font-bold text-white mb-2 font-heading uppercase tracking-widest">Incoming Transmission</h3>
                        <p className="font-mono text-sm">New articles coming soon. Stay tuned!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
