import { NotesSignup } from "@/components/retention/NotesSignup"
import { TrustBadges } from "@/components/retention/TrustBadges"

export default function NotesPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold font-heading mb-4">Study Material</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                Download our hand-crafted notes, cheat sheets, and project files. Perfect for revision before interviews.
            </p>

            <div className="max-w-2xl mx-auto">
                <NotesSignup />
            </div>

            <div className="mt-16">
                <TrustBadges />
            </div>
        </div>
    )
}
