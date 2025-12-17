import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { SkillsGrid } from "@/components/home/SkillsGrid"

export default function SkillsPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticleBackground />
            <Navbar />
            <div className="pt-20">
                <SkillsGrid />
            </div>
        </div>
    )
}
