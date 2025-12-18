import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { ShieldCheck } from "lucide-react"

export const metadata = {
    title: "Privacy Policy | Hello World Classes",
    description: "Privacy Policy and Data Protection guidelines for Hello World Classes.",
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticleBackground />
            <Navbar />

            <div className="container mx-auto px-4 py-32 relative z-10 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tighter text-white">
                        PRIVACY <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">POLICY</span>
                    </h1>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md space-y-8 text-slate-300 font-mono leading-relaxed">

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 1. Introduction
                        </h2>
                        <p>
                            Welcome to Hello World Classes. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (helloworldclasses.com) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 2. Data We Collect
                        </h2>
                        <p className="mb-2">We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 3. How We Use Your Data
                        </h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>To provide our educational services and tools to you.</li>
                            <li>To improve our website and content based on user behavior.</li>
                            <li>To communicate with you about updates or support queries.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 4. Cookies and Google AdSense
                        </h2>
                        <p>
                            Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                        </p>
                        <p className="mt-4">
                            <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google uses cookies (such as the DoubleClick cookie) to serve ads based on your visit to our site and other sites on the Internet. You may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Ads Settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary block"></span> 5. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                            <a href="mailto:info@helloworldclasses.com" className="text-primary hover:underline ml-1">info@helloworldclasses.com</a>
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
