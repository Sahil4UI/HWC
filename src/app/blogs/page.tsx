import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { Construction } from "lucide-react"

export const metadata = {
    title: "Blogs | Hello World Classes",
    description: "Read our latest articles on Python, Coding, and Tech.",
}

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col">
            <ParticleBackground />
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 text-center">
                <div className="border border-primary/30 bg-primary/5 p-8 md:p-12 rounded-2xl backdrop-blur-md max-w-2xl w-full shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden group">

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"></div>
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-black border border-primary/50 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,243,255,0.3)] animate-pulse">
                            <Construction className="h-10 w-10 text-primary" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black font-heading mb-4 tracking-tighter text-white">
                            COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 glitch-text" data-text="SOON">SOON</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 font-mono mb-8 max-w-lg">
                            Our team is crafting high-quality coding articles, roadmaps, and tutorials for you. Stay tuned!
                        </p>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-500">
                            <span>Expected Launch:</span>
                            <span className="text-primary font-bold">Soon™</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
