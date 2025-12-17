import { ShieldCheck, Heart, UserCheck } from "lucide-react"

export function TrustBadges() {
    return (
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-8 opacity-80">
            <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-600">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Teacher-Built Platform</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-600">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Beginner-First Approach</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-gray-600">
                <UserCheck className="h-5 w-5 text-green-600" />
                <span>No Shortcuts, Just Learning</span>
            </div>
        </div>
    )
}
