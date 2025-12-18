"use client"

import { CodePlayground } from "@/components/tools/CodePlayground"
import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"

export default function CodePlaygroundPage() {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/20 text-foreground relative">
            <ParticleBackground />
            <Navbar />
            <div className="pt-24 pb-12 container mx-auto px-4 relative z-10">
                <CodePlayground />
            </div>
        </div>
    )
}
