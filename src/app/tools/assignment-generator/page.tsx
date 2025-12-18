"use client"

import { PracticeEngine } from "@/components/tools/PracticeEngine"
import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

export default function AssignmentGeneratorPage() {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/20 text-foreground relative">
            <ParticleBackground />
            <Navbar />
            <div className="pt-24 pb-12 container mx-auto px-4 relative z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
                        Practice Arena
                    </h1>
                    <p className="text-slate-400">Master Python & Excel with hands-on coding challenges.</p>
                </div>
                <PracticeEngine />
            </div>
        </div>
    )
}
