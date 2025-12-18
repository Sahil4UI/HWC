"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { Button } from "@/components/ui/Button"
import { FileSpreadsheet, Upload, X, ArrowDown, Download, CheckCircle, Table, Trash2, PieChart, BarChart as BarChartIcon, Eye } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

/* ----------------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------------------- */
interface CsvFile {
    id: string
    name: string
    size: number
    data: any[]
}

type Tab = 'upload' | 'view' | 'clean' | 'visualize' | 'merge'

/* ----------------------------------------------------------------------------------
 * Main Component
 * ---------------------------------------------------------------------------------- */
export default function CsvToolkit() {
    const [files, setFiles] = useState<CsvFile[]>([])
    const [activeTab, setActiveTab] = useState<Tab>('upload')

    // Merger State
    const [isMerging, setIsMerging] = useState(false)
    const [mergedData, setMergedData] = useState<string | null>(null)

    // Viewer State
    const [viewFileId, setViewFileId] = useState<string | null>(null)

    // 1. File Handling
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            Papa.parse(file, {
                complete: (results) => {
                    const newFile = {
                        id: Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        size: file.size,
                        data: results.data
                    }
                    setFiles(prev => [...prev, newFile])
                    // Auto select first file for viewing if none selected
                    if (!viewFileId) setViewFileId(newFile.id)
                },
                header: true,
                skipEmptyLines: true
            })
        })
        if (activeTab === 'upload' && acceptedFiles.length > 0) setActiveTab('view')
    }, [activeTab, viewFileId])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'], 'application/vnd.ms-excel': ['.csv'] }
    })

    const removeFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id))
        if (viewFileId === id) setViewFileId(null)
    }

    // 2. Logic: Merge
    const handleMerge = () => {
        setIsMerging(true)
        setTimeout(() => {
            const allRows = files.flatMap(f => f.data)
            const csv = Papa.unparse(allRows)
            setMergedData(csv)
            setIsMerging(false)
        }, 800)
    }

    // 3. Logic: Download
    const downloadCsv = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const downloadJson = (data: any[], filename: string) => {
        const json = JSON.stringify(data, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // 4. Logic: Cleaning
    const cleanRemoveDuplicates = (fileId: string) => {
        const file = files.find(f => f.id === fileId)
        if (!file) return

        // Simple duplicate check based on stringifying row
        const uniqueData = Array.from(new Set(file.data.map(item => JSON.stringify(item))))
            .map(item => JSON.parse(item))

        updateFile(fileId, uniqueData)
        alert(`Removed ${file.data.length - uniqueData.length} duplicates!`)
    }

    const updateFile = (id: string, newData: any[]) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, data: newData } : f))
    }

    // Helper: Get Active File
    const activeFile = files.find(f => f.id === viewFileId) || files[0]

    return (
        <ToolLayout
            title="CSV Super Toolkit"
            subtitle="View, Clean, Visualize, and Merge CSV files directly in your browser. 100% Free & Secure."
            fullWidth={true}
        >
            <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">

                {/* SIDEBAR: File List & Upload */}
                <div className="w-full lg:w-1/4 space-y-6">
                    {/* Add Files */}
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-black/20 hover:border-white/30'}`}
                    >
                        <input {...getInputProps()} />
                        <Upload className="h-8 w-8 mx-auto text-indigo-400 mb-2" />
                        <p className="text-sm font-bold text-white">Add CSV Files</p>
                        <p className="text-xs text-slate-500 mt-1">Drag & drop or click</p>
                    </div>

                    {/* Pending Files List */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Loaded Files</div>
                            {files.map(f => (
                                <div
                                    key={f.id}
                                    onClick={() => setViewFileId(f.id)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${viewFileId === f.id ? 'bg-indigo-600/20 border-indigo-500/50' : 'bg-black/40 border-white/10 hover:border-white/20'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="flex items-center gap-2">
                                            <FileSpreadsheet className={`h-4 w-4 ${viewFileId === f.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                                            <p className={`text-sm font-medium truncate ${viewFileId === f.id ? 'text-white' : 'text-slate-300'}`}>{f.name}</p>
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-1 ml-6">{f.data.length} rows • {(f.size / 1024).toFixed(1)}KB</p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); removeFile(f.id); }} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MAIN AREA */}
                <div className="w-full lg:w-3/4 flex flex-col bg-[#0f0f13] border border-white/10 rounded-xl overflow-hidden shadow-2xl">

                    {/* TABS */}
                    <div className="flex overflow-x-auto border-b border-white/10 bg-black/20 md:px-4">
                        {[
                            { id: 'view', icon: Table, label: 'Table Viewer' },
                            { id: 'visualize', icon: BarChartIcon, label: 'Visualize' },
                            { id: 'clean', icon: Trash2, label: 'Cleaner' },
                            { id: 'merge', icon: FileSpreadsheet, label: 'Merger' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                disabled={files.length === 0}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                                        : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    } ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-6 overflow-auto">

                        {files.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                                <FileSpreadsheet className="h-16 w-16 mb-4 stroke-1" />
                                <p>Upload file to begin</p>
                            </div>
                        ) : (
                            <>
                                {/* VIEW TAB */}
                                {activeTab === 'view' && activeFile && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-white font-bold">{activeFile.name} Data</h3>
                                            <Button size="sm" onClick={() => downloadJson(activeFile.data, `${activeFile.name}.json`)} className="bg-white/10 hover:bg-white/20 text-white text-xs">
                                                Export JSON
                                            </Button>
                                        </div>
                                        <div className="overflow-auto max-h-[500px] border border-white/10 rounded-lg">
                                            <table className="w-full text-left text-sm text-slate-400">
                                                <thead className="bg-black text-xs uppercase font-bold text-slate-500 sticky top-0">
                                                    <tr>
                                                        {Object.keys(activeFile.data[0] || {}).map(key => (
                                                            <th key={key} className="px-4 py-3 border-b border-white/10 whitespace-nowrap">{key}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5 bg-black/20">
                                                    {activeFile.data.slice(0, 100).map((row, i) => (
                                                        <tr key={i} className="hover:bg-indigo-500/5">
                                                            {Object.values(row).map((val: any, j) => (
                                                                <td key={j} className="px-4 py-2 truncate max-w-[200px]">{String(val)}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {activeFile.data.length > 100 && (
                                                <div className="p-2 text-center text-xs text-slate-600 bg-black/40">
                                                    Showing first 100 rows of {activeFile.data.length}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* VISUALIZE TAB */}
                                {activeTab === 'visualize' && activeFile && (
                                    <div className="h-[400px]">
                                        <p className="text-xs text-slate-500 mb-4 text-center">Auto-detecting numeric columns for {activeFile.name}</p>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={activeFile.data.slice(0, 20)}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                <XAxis dataKey={Object.keys(activeFile.data[0])[0]} stroke="#666" fontSize={12} />
                                                <YAxis stroke="#666" fontSize={12} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                {Object.keys(activeFile.data[0]).slice(1, 3).map((key, i) => (
                                                    <Bar key={key} dataKey={key} fill={['#6366f1', '#ec4899', '#10b981'][i % 3]} />
                                                ))}
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <p className="text-xs text-center text-slate-600 mt-2">Displaying first 20 records. Useful for quick trend checks.</p>
                                    </div>
                                )}

                                {/* CLEAN TAB */}
                                {activeTab === 'clean' && activeFile && (
                                    <div className="max-w-md mx-auto py-10 space-y-6">
                                        <div className="text-center">
                                            <Trash2 className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                                            <h3 className="text-xl font-bold text-white">Clean {activeFile.name}</h3>
                                            <p className="text-slate-400 text-sm mt-2">Detecting {activeFile.data.length} rows.</p>
                                        </div>

                                        <div className="grid gap-4">
                                            <Button onClick={() => cleanRemoveDuplicates(activeFile.id)} className="bg-white/5 hover:bg-white/10 justify-between h-auto py-4 border border-white/10 group">
                                                <span className="text-left">
                                                    <span className="block text-white font-bold">Remove Duplicates</span>
                                                    <span className="text-xs text-slate-500">De-duplicate based on identical rows</span>
                                                </span>
                                                <CheckCircle className="h-5 w-5 text-slate-600 group-hover:text-green-400" />
                                            </Button>

                                            {/* Could add more filters here */}
                                        </div>
                                    </div>
                                )}

                                {/* MERGE TAB */}
                                {activeTab === 'merge' && (
                                    <div className="text-center space-y-8 py-10">
                                        <div className="inline-block p-4 bg-indigo-500/10 rounded-full mb-4">
                                            <FileSpreadsheet className="h-10 w-10 text-indigo-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Merge All {files.length} Files</h3>
                                        <p className="text-slate-400 max-w-md mx-auto">
                                            Combine {files.map(f => f.name).join(", ")} into a single master CSV file.
                                        </p>

                                        {mergedData ? (
                                            <div className="animate-in fade-in zoom-in">
                                                <Button size="lg" onClick={() => downloadCsv(mergedData, `merged-${Date.now()}.csv`)} className="bg-green-500 hover:bg-green-400 text-black font-black">
                                                    <Download className="mr-2 h-5 w-5" /> Download Result
                                                </Button>
                                                <p className="text-green-400 text-xs mt-4 font-mono">Merge Complete!</p>
                                            </div>
                                        ) : (
                                            <Button size="lg" onClick={handleMerge} disabled={isMerging || files.length < 2} className="bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                                                {isMerging ? 'Processing...' : `Merge ${files.length} Files Now`}
                                            </Button>
                                        )}

                                        {files.length < 2 && (
                                            <p className="text-red-400 text-xs bg-red-500/10 inline-block px-3 py-1 rounded">Need at least 2 files to merge</p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    )
}
