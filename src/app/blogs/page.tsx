import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { Terminal } from "lucide-react"
import { BLOGS } from "@/data/blogs"
import { BlogCard } from "@/components/blogs/BlogCard"

export const metadata = {
    title: "Blogs | Hello World Classes",
    description: "Read our latest articles on Python, Coding, and Tech.",
}

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <ParticleBackground />
            <Navbar />
            <div className="container mx-auto px-4 py-32 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-primary/30 box-glow">
                        <Terminal className="h-3 w-3" />
                        <span className="text-glow">System Logs</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-heading mb-6 tracking-tighter">
                        LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F3FF] to-purple-500 glitch-text" data-text="ARTICLES">ARTICLES</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {BLOGS.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
