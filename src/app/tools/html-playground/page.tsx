"use client"

import { useState, useEffect } from "react"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { Button } from "@/components/ui/Button"
import { Code2, Play, Download, LayoutTemplate } from "lucide-react"

export default function HtmlPlayground() {
    const [html, setHtml] = useState("<h1>Hello World</h1>\n<p>Start coding!</p>")
    const [css, setCss] = useState("body {\n  font-family: sans-serif;\n  background: #111;\n  color: #fff;\n  padding: 2rem;\n}\n\nh1 {\n  color: #00F3FF;\n}")
    const [js, setJs] = useState("console.log('Hello from JS');")
    const [srcDoc, setSrcDoc] = useState("")

    // Debounce rendering
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                         <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>${js}</script>
                    </body>
                </html>
            `)
        }, 500)

        return () => clearTimeout(timeout)
    }, [html, css, js])

    const handleDownload = () => {
        const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>HWC Playground Export</title>
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`

        const blob = new Blob([fullHtml], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = "playground_export.html"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <ToolLayout
            title="Web Playground"
            subtitle="Write code and see results instantly. A lightweight frontend editor for rapid prototyping."
        >
            <div className="h-[80vh] flex flex-col md:flex-row gap-4">

                {/* Editor Column */}
                <div className="flex-1 flex flex-col gap-4 h-full">
                    {/* HTML */}
                    <div className="flex-1 flex flex-col border border-white/10 bg-[#0a0a0a]">
                        <div className="bg-white/5 px-3 py-1 flex justify-between items-center border-b border-white/10">
                            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                                <Code2 className="h-3 w-3" /> HTML
                            </span>
                        </div>
                        <textarea
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            className="flex-1 bg-transparent p-3 text-sm font-mono text-slate-300 resize-none focus:outline-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* CSS */}
                    <div className="flex-1 flex flex-col border border-white/10 bg-[#0a0a0a]">
                        <div className="bg-white/5 px-3 py-1 flex justify-between items-center border-b border-white/10">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                <LayoutTemplate className="h-3 w-3" /> CSS
                            </span>
                        </div>
                        <textarea
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            className="flex-1 bg-transparent p-3 text-sm font-mono text-slate-300 resize-none focus:outline-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* JS */}
                    <div className="flex-1 flex flex-col border border-white/10 bg-[#0a0a0a]">
                        <div className="bg-white/5 px-3 py-1 flex justify-between items-center border-b border-white/10">
                            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                                <Code2 className="h-3 w-3" /> JS
                            </span>
                        </div>
                        <textarea
                            value={js}
                            onChange={(e) => setJs(e.target.value)}
                            className="flex-1 bg-transparent p-3 text-sm font-mono text-slate-300 resize-none focus:outline-none"
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Preview Column */}
                <div className="flex-1 border border-white/10 bg-white flex flex-col relative group">
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        className="flex-1 bg-white"
                    />
                    <Button
                        onClick={handleDownload}
                        size="sm"
                        className="absolute bottom-4 right-4 bg-black/80 text-white hover:bg-black font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity border border-white/20"
                    >
                        <Download className="mr-2 h-4 w-4" /> Export File
                    </Button>
                </div>

            </div>
        </ToolLayout>
    )
}
