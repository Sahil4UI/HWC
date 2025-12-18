import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { FileText } from "lucide-react"

export const metadata = {
    title: "Terms of Service | Hello World Classes",
    description: "Terms and conditions for using Hello World Classes.",
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticleBackground />
            <Navbar />

            <div className="container mx-auto px-4 py-32 relative z-10 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <FileText className="h-10 w-10 text-primary" />
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tighter text-white">
                        TERMS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">SERVICE</span>
                    </h1>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md space-y-8 text-slate-300 font-mono leading-relaxed">

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 1. Agreement to Terms
                        </h2>
                        <p>
                            By accessing our website at helloworldclasses.com, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 2. Use License
                        </h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Hello World Classes' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                            <li>attempt to decompile or reverse engineer any software contained on Hello World Classes' website;</li>
                            <li>remove any copyright or other proprietary notations from the materials;</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 3. Disclaimer
                        </h2>
                        <p>
                            The materials on Hello World Classes' website are provided on an 'as is' basis. Hello World Classes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 4. Limitations
                        </h2>
                        <p>
                            In no event shall Hello World Classes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Hello World Classes' website.
                        </p>
                    </section>

                    <div className="text-xs text-slate-500 border-t border-white/10 pt-4 mt-8">
                        Last Updated: December 2024
                    </div>
                </div>
            </div>
        </div>
    )
}
