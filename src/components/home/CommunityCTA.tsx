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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F3FF] to-purple-400 text-glow">YOUTUBE COMMUNITY</span>
                </h2>
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-mono">
                    Our YouTube channel helps students learn programming concepts through shorts, real examples, memes, and practical tutorials — making coding fun and easy to remember.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="https://www.youtube.com/@HelloWorldClasses" target="_blank">
                        <Button size="lg" className="h-14 px-8 text-lg bg-red-600 hover:bg-red-700 text-white border-0 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-105 transition-all duration-300 rounded-none clip-path-polygon group">
                            LEARN FREE ON YOUTUBE
                            <Youtube className="ml-2 h-6 w-6 text-white" />
                        </Button>
                    </Link>
                    <Link href="#">
                        <Button size="lg" className="bg-white text-black border-0 w-full sm:w-auto h-14 px-8 text-lg font-black uppercase tracking-widest clip-path-polygon rounded-none shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:scale-105 transition-all">
                            <Users className="mr-2 h-6 w-6" />
                            JOIN COMMUNITY
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
