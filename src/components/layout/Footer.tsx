import Link from "next/link"
import { Youtube, Instagram, Twitter, Terminal } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12 relative z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="text-center md:text-left">
                        <h3 className="font-heading text-xl font-black text-white flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-primary" />
                            HELLO WORLD CLASSES
                        </h3>
                        <p className="text-sm text-slate-400 mt-2 font-mono max-w-xs">
                            Hello World Classes is an online learning platform focused on coding education, Python tutorials, programming tools, and career-oriented tech skills for Indian students.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <Link href="#" className="p-2 bg-white/5 rounded-none text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/50">
                            <Youtube className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="p-2 bg-white/5 rounded-none text-slate-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all border border-transparent hover:border-pink-500/50">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="p-2 bg-white/5 rounded-none text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all border border-transparent hover:border-blue-400/50">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="flex gap-6 text-sm text-slate-400 font-mono">
                        <Link href="/privacy" className="hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all uppercase tracking-wider">Privacy Protocol</Link>
                        <Link href="/terms" className="hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all uppercase tracking-wider">Terms of Service</Link>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
                    &copy; {new Date().getFullYear()} Hello World Classes. <span className="text-primary/50">System Active.</span> All rights reserved.
                </div>
            </div>
        </footer>
    )
}
