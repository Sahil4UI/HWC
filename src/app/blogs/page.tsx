import { Navbar } from "@/components/layout/Navbar"


export const metadata = {
    title: "Blogs | Hello World Classes",
    description: "Read our latest articles on Python, Coding, and Tech.",
}

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold font-heading mb-6 text-center">Latest <span className="text-primary">Articles</span></h1>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center text-gray-500">
                        <p>New articles coming soon. Stay tuned!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
