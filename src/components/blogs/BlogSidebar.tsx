import Link from "next/link"
import { Search, Tag, ArrowRight, TrendingUp, Mail } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { BLOGS } from "@/data/blogs"

export function BlogSidebar() {
    // Get unique tags/categories
    const categories = Array.from(new Set(BLOGS.flatMap(post => post.tags.map(t => t.name))));

    // Get popular/recent posts (excluding current one logic handled by parent usually, but here just showing list)
    const popularPosts = BLOGS.slice(0, 3); // Just taking first 3 as mock popular

    return (
        <div className="space-y-8 sticky top-24">

            {/* Search Widget */}
            <div className="bg-black/40 border border-white/10 p-6 backdrop-blur-sm relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                <div className="relative">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Search className="h-4 w-4 text-primary" /> Search
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Find an article..."
                            className="w-full bg-black/50 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-slate-600"
                        />
                        <Search className="absolute right-3 top-3 h-4 w-4 text-slate-500" />
                    </div>
                </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-black/40 border border-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" /> Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category, idx) => (
                        <Link key={idx} href={`/blogs?category=${category}`} className="text-xs font-mono text-slate-400 border border-white/10 px-3 py-1 hover:border-primary hover:text-primary transition-colors">
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Trending/Popular Widget */}
            <div className="bg-black/40 border border-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Popular Reads
                </h3>
                <div className="space-y-4">
                    {popularPosts.map(post => (
                        <Link key={post.id} href={`/blogs/${post.slug}`} className="block group">
                            <h4 className="text-sm font-bold text-slate-300 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                                {post.title}
                            </h4>
                            <span className="text-[10px] text-slate-600 font-mono uppercase">
                                {post.readTime} • {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter CTA Widget */}
            <div className="relative p-6 bg-gradient-to-br from-primary/10 to-purple-900/10 border border-primary/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10"></div>
                <h3 className="text-lg font-black font-heading text-white mb-2 relative z-10">
                    JOIN THE CODE SQUAD
                </h3>
                <p className="text-xs text-slate-400 mb-4 relative z-10">
                    Get weekly coding challenges and roadmap updates directly to your inbox.
                </p>
                <Link href="https://youtube.com/@HelloWorldClasses" target="_blank" className="relative z-10">
                    <Button className="w-full bg-primary text-black hover:bg-white border-0 font-bold uppercase tracking-widest text-xs h-10 rounded-none shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                        Subscribe <Mail className="ml-2 h-3 w-3" />
                    </Button>
                </Link>
            </div>

        </div>
    )
}
