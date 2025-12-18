"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowLeft, Printer, FileText, Code2, Copy, Check, Info } from "lucide-react"

export default function ColabPdfGuide() {
    return (
        <ToolLayout
            title="Google Colab to PDF Guide"
            subtitle="The definitive guide to exporting your Python notebooks as high-quality PDF documents. Solved for 2025."
        >
            <div className="max-w-4xl mx-auto space-y-12 text-slate-300 leading-relaxed pb-20">

                {/* Intro */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-400 shrink-0 mt-1" />
                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">Why is this so hard?</h3>
                        <p className="text-sm">
                            Google Colab is a dynamic web app, not a static document. When you try to print it,
                            browsers often cut off long code blocks or get confused by the scrollbars.
                            We have compiled the 2 best methods to fix this.
                        </p>
                    </div>
                </div>

                {/* Method 1 */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400">
                            <Printer className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Method 1: The Print Trick (Easiest)</h2>
                            <p className="text-slate-400">Best for: Short assignments, fast results.</p>
                        </div>
                    </div>

                    <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-8 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 bg-white/5 rounded-bl-2xl text-xs font-mono text-slate-500">
                            NO CODE REQUIRED
                        </div>

                        <ol className="list-decimal list-inside space-y-4 marker:text-pink-500 marker:font-bold">
                            <li className="pl-2">
                                <span className="text-white font-medium">Open your Colab Notebook.</span>
                            </li>
                            <li className="pl-2">
                                <span className="text-white font-medium">Press <kbd className="bg-white/10 px-2 py-1 rounded text-white text-sm font-mono border border-white/20">Ctrl + P</kbd> (or Cmd + P).</span>
                                <p className="mt-1 text-sm text-slate-500 ml-6">Do NOT use the File {'>'} Download menu yet. Use the browser print.</p>
                            </li>
                            <li className="pl-2">
                                <span className="text-white font-medium">Change Destination to "Save as PDF".</span>
                            </li>
                            <li className="pl-2 border-l-2 border-yellow-500 pl-4 py-2 bg-yellow-500/5 rounded-r ml-6">
                                <span className="text-yellow-400 font-bold block text-sm mb-1">CRITICAL STEP</span>
                                In <strong>More Settings</strong>, verify that option <strong>Background Graphics</strong> is <span className="text-green-400 font-bold">CHECKED</span>.
                                <br />Without this, your code syntax highlighting will disappear.
                            </li>
                            <li className="pl-2">
                                <span className="text-white font-medium">Click Save.</span>
                            </li>
                        </ol>
                    </div>
                </section>

                <hr className="border-white/5" />

                {/* Method 2 */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                            <Code2 className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Method 2: The "Pro" Python Way</h2>
                            <p className="text-slate-400">Best for: Professional reports, long code, fixing cut-off text.</p>
                        </div>
                    </div>

                    <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-8 space-y-6">
                        <p>
                            If Method 1 cuts off your code, use this. We will install a tool called <code>nbconvert</code>
                            directly inside the notebook to convert it properly.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Step 1: Install Dependencies</span>
                            </div>
                            <CopyBlock code={`!apt-get install texlive-xetex texlive-fonts-recommended texlive-plain-generic`} />

                            <p className="text-sm text-slate-500">
                                Run this in a new code cell exactly as shown. It installs the necessary PDF fonts on the Google server.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Step 2: Convert to PDF</span>
                            </div>
                            <CopyBlock code={`!jupyter nbconvert --to pdf "Your_Notebook_Name.ipynb"`} />

                            <p className="text-sm text-slate-500">
                                Replace <code>Your_Notebook_Name.ipynb</code> with your actual file name (check the top left of Colab).
                                <br />After running, refresh the file browser on the left to see your new PDF.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ / CTA */}
                <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5 rounded-2xl p-8 text-center space-y-6">
                    <h3 className="text-2xl font-bold text-white">Need to create a PDF from scratch?</h3>
                    <p>
                        If you have raw HTML code or a report you want to convert, don't use Colab.
                        Use our specialized tool.
                    </p>
                    <Link href="/tools/html-to-pdf">
                        <Button className="bg-white text-black hover:bg-slate-200 font-bold px-8 py-6 rounded-full text-lg shadow-xl shadow-white/10">
                            Open HTML to PDF Tool
                        </Button>
                    </Link>
                </section>

            </div>
        </ToolLayout>
    )
}

// Helper Component for Copy Code
function CopyBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative group">
            <pre className="bg-black/50 border border-white/10 rounded-xl p-4 overflow-x-auto font-mono text-sm text-green-300">
                {code}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Copy Code"
            >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </button>
        </div>
    )
}
