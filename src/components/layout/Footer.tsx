import Link from "next/link"
import Image from "next/image"
import { Youtube, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12 relative z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="text-center md:text-left">
                        <div className="relative w-32 h-8 sm:w-48 sm:h-12 md:w-64 md:h-16 mx-auto md:mx-0 mb-4">
                            <Image
                                src="/logo-main.png"
                                alt="Hello World Classes"
                                fill
                                className="object-contain object-center md:object-left"
                            />
                        </div>
                        <p className="text-sm text-slate-400 mt-2 font-mono max-w-xs">
                            Hello World Classes is an online learning platform focused on coding education, Python tutorials, programming tools, and career-oriented tech skills for Indian students.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="https://www.youtube.com/@HelloWorldClasses" target="_blank" className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors group">
                            <span className="p-2 bg-white/5 rounded-full group-hover:bg-red-500/10 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </span>
                            <span className="font-bold uppercase tracking-wider text-xs">Youtube Channel</span>
                        </Link>

                        <div className="flex flex-col gap-2 mt-2">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Contact</h4>
                            <a href="mailto:info@helloworldclasses.com" className="text-sm text-slate-400 hover:text-white transition-colors font-mono">
                                info@helloworldclasses.com
                            </a>
                            <a href="tel:+918383045956" className="text-sm text-slate-400 hover:text-white transition-colors font-mono">
                                +91 8383045956
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-sm text-slate-400 font-mono text-right">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-slate-400 font-mono">
                    &copy; {new Date().getFullYear()} Hello World Classes. <span className="text-primary font-bold">System Active.</span> All rights reserved.
                </div>
            </div>
        </footer>
    )
}
