"use client"

import { useState, useRef, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/Button"
import { Download, Monitor, Smartphone, FileIcon, Settings, RefreshCw, FileText, ZoomIn, ZoomOut, Maximize } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const DEFAULT_HTML = `<!-- Invoice Template -->
<div style="font-family: 'Inter', sans-serif; padding: 50px; color: #1f2937; height: 100%; box-sizing: border-box;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 50px; align-items: center;">
        <div>
             <h1 style="color: #4f46e5; margin: 0; font-size: 32px; letter-spacing: -1px;">INVOICE</h1>
             <p style="margin: 5px 0 0; color: #6b7280;">#INV-2025-001</p>
        </div>
        <div style="text-align: right;">
            <p style="margin: 0; font-weight: bold; font-size: 18px;">TechNova Solutions</p>
            <p style="margin: 0; color: #6b7280;">December 18, 2025</p>
        </div>
    </div>

    <div style="display: flex; gap: 40px; margin-bottom: 50px;">
        <div style="flex: 1;">
            <p style="text-transform: uppercase; font-size: 12px; font-weight: bold; color: #9ca3af; margin-bottom: 8px;">Bill To</p>
            <p style="margin: 0; font-weight: 600;">Sarah Connor</p>
            <p style="margin: 0; color: #4b5563;">Cyberdyne Systems</p>
            <p style="margin: 0; color: #4b5563;">Los Angeles, CA</p>
        </div>
         <div style="flex: 1;">
            <p style="text-transform: uppercase; font-size: 12px; font-weight: bold; color: #9ca3af; margin-bottom: 8px;">Payment Details</p>
            <p style="margin: 0; color: #4b5563;">Bank: Silicon Valley Bank</p>
            <p style="margin: 0; color: #4b5563;">Account: **** 4321</p>
        </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
        <thead>
            <tr style="background: #f9fafb;">
                <th style="padding: 16px; text-align: left; border-bottom: 2px solid #e5e7eb; color: #374151;">Description</th>
                <th style="padding: 16px; text-align: right; border-bottom: 2px solid #e5e7eb; color: #374151;">Quantity</th>
                <th style="padding: 16px; text-align: right; border-bottom: 2px solid #e5e7eb; color: #374151;">Price</th>
                <th style="padding: 16px; text-align: right; border-bottom: 2px solid #e5e7eb; color: #374151;">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #f3f4f6;">Frontend Architecture</td>
                <td style="padding: 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">1</td>
                <td style="padding: 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">$2,500.00</td>
                <td style="padding: 16px; text-align: right; border-bottom: 1px solid #f3f4f6; font-weight: 600;">$2,500.00</td>
            </tr>
            <tr>
                <td style="padding: 16px; border-bottom: 1px solid #f3f4f6;">UI/UX Design</td>
                <td style="padding: 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">10 hrs</td>
                <td style="padding: 16px; text-align: right; border-bottom: 1px solid #f3f4f6;">$120.00</td>
                <td style="padding: 16px; text-align: right; border-bottom: 1px solid #f3f4f6; font-weight: 600;">$1,200.00</td>
            </tr>
        </tbody>
    </table>

    <div style="text-align: right; border-top: 2px solid #e5e7eb; padding-top: 30px;">
        <div style="display: inline-block; min-width: 200px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                 <span style="color: #6b7280;">Subtotal:</span>
                 <span style="font-weight: 600;">$3,700.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                 <span style="color: #6b7280;">Tax (10%):</span>
                 <span style="font-weight: 600;">$370.00</span>
            </div>
             <div style="display: flex; justify-content: space-between; font-size: 24px; font-weight: bold; color: #4f46e5;">
                 <span>Total:</span>
                 <span>$4,070.00</span>
            </div>
        </div>
    </div>
    
    <div style="position: absolute; bottom: 40px; left: 50px; right: 50px; text-align: center; color: #9ca3af; font-size: 12px;">
        Thank you for your business! | www.technova.com
    </div>
</div>`

type PageSize = 'a4' | 'letter'

const PAGE_SIZES: Record<PageSize, { width: number; height: number; name: string; ratio: number }> = {
    a4: { width: 794, height: 1123, name: 'A4', ratio: 794 / 1123 }, // 210mm x 297mm approx at 96 DPI
    letter: { width: 816, height: 1056, name: 'Letter', ratio: 816 / 1056 }, // 8.5in x 11in
}

export function HtmlPdfTool() {
    const [code, setCode] = useState(DEFAULT_HTML)
    const [pageSize, setPageSize] = useState<PageSize>('a4')
    const [zoom, setZoom] = useState(100) // Percentage
    const [scale, setScale] = useState(1)
    const [isGenerating, setIsGenerating] = useState(false)
    const [viewMode, setViewMode] = useState<'fit' | '100%'>('fit')

    const previewContainerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Auto-calculate scale to fit container
    useEffect(() => {
        if (!previewContainerRef.current || viewMode !== 'fit') return

        const updateScale = () => {
            if (!previewContainerRef.current) return
            const containerWidth = previewContainerRef.current.clientWidth - 80 // Padding
            const containerHeight = previewContainerRef.current.clientHeight - 80

            const targetWidth = PAGE_SIZES[pageSize].width
            const targetHeight = PAGE_SIZES[pageSize].height

            const scaleW = containerWidth / targetWidth
            const scaleH = containerHeight / targetHeight

            const newScale = Math.min(scaleW, scaleH, 1.2) // Max 1.2x zoom
            setScale(newScale)
            setZoom(Math.round(newScale * 100))
        }

        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [pageSize, viewMode])

    // Handle Manual Zoom
    useEffect(() => {
        if (viewMode === '100%') {
            setScale(zoom / 100)
        }
    }, [zoom, viewMode])

    // Generate PDF
    const handleDownload = async () => {
        if (!contentRef.current) return
        setIsGenerating(true)

        try {
            // 1. Create a high-res canvas
            // Scale: 3 ensures crisp text (approx 300 DPI equivalent)
            const canvas = await html2canvas(contentRef.current, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: PAGE_SIZES[pageSize].width,
                windowHeight: PAGE_SIZES[pageSize].height
            } as any)

            const imgData = canvas.toDataURL('image/jpeg', 1.0) // JPEG best quality

            // 2. Create PDF
            // Dimensions in mm
            const pdfWidth = pageSize === 'a4' ? 210 : 215.9
            const pdfHeight = pageSize === 'a4' ? 297 : 279.4

            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            })

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
            pdf.save(`document_${Date.now()}.pdf`)

        } catch (error) {
            console.error(error)
            alert("Error generating PDF")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-black/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl relative">

            {/* Top Bar for Editor & Preview Controls */}
            <div className="h-14 bg-[#16161a] border-b border-white/10 px-4 flex items-center justify-between shrink-0 z-20">

                {/* Left: Branding */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <FileText className="h-4 w-4 text-indigo-400" />
                        PDF Editor
                    </div>
                </div>

                {/* Center: Viewer Controls */}
                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setViewMode('fit')}
                        className={`p-1.5 rounded text-xs font-bold transition-colors ${viewMode === 'fit' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        Fit to Screen
                    </button>
                    <div className="h-4 w-px bg-white/10"></div>
                    <button
                        onClick={() => { setViewMode('100%'); setZoom(prev => Math.max(25, prev - 10)); }}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                        <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-mono text-slate-300 w-12 text-center">{zoom}%</span>
                    <button
                        onClick={() => { setViewMode('100%'); setZoom(prev => Math.min(200, prev + 10)); }}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                        <ZoomIn className="h-4 w-4" />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value as PageSize)}
                        className="bg-black/40 border border-white/20 text-slate-300 text-xs rounded px-2 py-1.5 focus:border-indigo-500 outline-none"
                    >
                        <option value="a4">A4 (210x297mm)</option>
                        <option value="letter">Letter (8.5x11in)</option>
                    </select>

                    <Button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20"
                    >
                        {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                        {isGenerating ? "Exporting..." : "Download PDF"}
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">

                {/* Editor Pane (Left) */}
                <div className="w-1/2 flex flex-col border-r border-white/10 bg-[#1e1e24] relative group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <Editor
                        height="100%"
                        defaultLanguage="html"
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
                            padding: { top: 20 },
                            fontFamily: 'JetBrains Mono, monospace',
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                        }}
                    />
                </div>

                {/* Preview Pane (Right) */}
                <div
                    ref={previewContainerRef}
                    className="w-1/2 bg-[#525659] flex items-start justify-center overflow-auto relative p-10 custom-scrollbar shadow-inner"
                >
                    {/* The Scale Wrapper */}
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
                        }}
                        className="shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    >
                        {/* The Actual A4 Paper content */}
                        <div
                            ref={contentRef}
                            style={{
                                width: `${PAGE_SIZES[pageSize].width}px`,
                                height: `${PAGE_SIZES[pageSize].height}px`,
                                backgroundColor: 'white',
                                color: 'black',
                                overflow: 'hidden', // Ensure no spillover
                            }}
                            dangerouslySetInnerHTML={{ __html: code }}
                        />
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] mobile:hidden pointer-events-none text-slate-400 flex items-center gap-2">
                        <Monitor className="h-3 w-3" />
                        Resolution: {PAGE_SIZES[pageSize].width} x {PAGE_SIZES[pageSize].height}px
                    </div>
                </div>

            </div>
        </div>
    )
}
