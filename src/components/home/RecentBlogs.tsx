import Link from "next/link"
import { Terminal, ArrowRight } from "lucide-react"
import { BLOGS } from "@/data/blogs"
import { BlogCard } from "@/components/blogs/BlogCard"

export function RecentBlogs() {
    // Get latest 3 blogs
    const recentPosts = BLOGS.slice(0, 3);

    return (
        <section className="py-24 bg-black relative border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-primary/30 box-glow">
                            <Terminal className="h-3 w-3" />
                            <span className="text-glow">System Logs</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tighter">
                            LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F3FF] to-purple-500 glitch-text" data-text="UPDATES">UPDATES</span>
                        </h2>
                    </div>

                    <Link href="/blogs" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-white transition-colors">
                        View Application Logs <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

            </div>
        </section>
    )
}
