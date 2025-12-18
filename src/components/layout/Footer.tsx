import Link from "next/link"
import Image from "next/image"
import { Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="relative w-40 h-10">
                            <Image
                                src="/logo-main.png"
                                alt="Hello World Classes"
                                fill
                                sizes="200px"
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm text-slate-400 font-mono leading-relaxed">
                            Empowering Indian students with free, high-quality coding education. Master Python, Web Dev, and C++ with us.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Platform</h3>
                        <ul className="space-y-3 text-sm text-slate-400 font-mono">
                            <li><Link href="/tools" className="hover:text-primary transition-colors">Practice Arena</Link></li>
                            <li><Link href="/courses" className="hover:text-primary transition-colors">Python Course</Link></li>
                            <li><Link href="/notes" className="hover:text-primary transition-colors">Lecture Notes</Link></li>
                            <li><Link href="/typing" className="hover:text-primary transition-colors">Typing Test</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contact</h3>
                        <ul className="space-y-4 text-sm text-slate-400 font-mono">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <a href="mailto:info@helloworldclasses.com" className="hover:text-white transition-colors break-all">info@helloworldclasses.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary shrink-0" />
                                <a href="tel:+918383045956" className="hover:text-white transition-colors">+91 8383045956</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <span>New Delhi, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Connect / Social */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Community</h3>
                        <div className="space-y-4">
                            <Link href="https://www.youtube.com/@HelloWorldClasses" target="_blank">
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-0 rounded-none clip-path-polygon flex items-center justify-center gap-2 group">
                                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span>YouTube Channel</span>
                                </Button>
                            </Link>
                            <p className="text-xs text-slate-500">
                                Join 50k+ students learning for free.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
                    <div>
                        &copy; {new Date().getFullYear()} Hello World Classes. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
