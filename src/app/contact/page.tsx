import { Navbar } from "@/components/layout/Navbar"
import { Mail, Phone, Youtube, Sparkles } from "lucide-react"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

export const metadata = {
    title: "Contact Us | Hello World Classes",
    description: "Get in touch with us.",
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticleBackground />
            <Navbar />
            <div className="container mx-auto px-4 py-32 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-primary/30 box-glow">
                            <Sparkles className="h-3 w-3" />
                            <span className="text-glow">System Communication</span>
                        </div>
                        <h1 className="text-5xl font-black font-heading mb-6 tracking-tighter">
                            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00F3FF] to-purple-500 glitch-text" data-text="TOUCH">TOUCH</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-mono">
                            Have questions? Stuck on a bug? Or just want to say hi? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: Mail, title: "Email", value: "info@helloworldclasses.com", link: "mailto:info@helloworldclasses.com" },
                            { icon: Phone, title: "Phone", value: "+91 8383045956", link: "tel:+918383045956" },
                            { icon: Youtube, title: "YouTube", value: "@HelloWorldClasses", link: "https://www.youtube.com/@HelloWorldClasses" }
                        ].map((item, i) => (
                            <a href={item.link} key={i} target={i === 2 ? "_blank" : undefined} className="bg-white/5 p-6 rounded-none text-center border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group block">
                                <div className="bg-black w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary border border-primary/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold mb-1 text-white font-heading tracking-wide uppercase">{item.title}</h3>
                                <p className="text-xs text-slate-400 font-mono break-words w-full">{item.value}</p>
                            </a>
                        ))}
                    </div>

                    <form className="space-y-6 bg-black/40 backdrop-blur-md p-8 rounded-none border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"></div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary uppercase tracking-widest">Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-none focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-mono text-sm placeholder:text-slate-600" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary uppercase tracking-widest">Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-none focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-mono text-sm placeholder:text-slate-600" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-widest">Message</label>
                            <textarea className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-none focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-mono text-sm min-h-[150px] placeholder:text-slate-600" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-primary text-black font-black py-4 rounded-none hover:bg-white transition-colors border border-primary hover:border-white shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] uppercase tracking-widest clip-path-polygon transform hover:-translate-y-1 duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
