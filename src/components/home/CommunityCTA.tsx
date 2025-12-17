import Link from "next/link"
import { Users, Youtube } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function CommunityCTA() {
    return (
        <section className="py-24 relative overflow-hidden bg-black border-y border-white/5">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 text-white tracking-tighter leading-none">
                    Learn with Our <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-400 text-glow">YOUTUBE COMMUNITY</span>
                </h2>
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-mono">
                    Our YouTube channel helps students learn programming concepts through shorts, real examples, memes, and practical tutorials — making coding fun and easy to remember.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="https://youtube.com" target="_blank">
                        <Button size="lg" className="bg-[#FF0000] text-white hover:bg-[#CC0000] border-2 border-transparent hover:border-white shadow-[0_0_20px_rgba(255,0,0,0.4)] clip-path-polygon rounded-none h-14 px-8 text-lg font-black uppercase tracking-widest flex items-center gap-3 transition-all transform hover:scale-105">
                            <Youtube className="w-6 h-6 fill-white" />
                            LEARN FREE ON YOUTUBE
                        </Button>
                    </Link>
                    <Link href="#">
                        <Button size="lg" className="bg-white text-black hover:bg-purple-600 hover:text-white border-0 w-full sm:w-auto h-14 px-8 text-lg font-black uppercase tracking-widest clip-path-polygon rounded-none shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 transition-all">
                            <Users className="mr-2 h-6 w-6" />
                            JOIN COMMUNITY
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
