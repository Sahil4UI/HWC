import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { BlogPost } from "@/types/blog"

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blogs/${post.slug}`} className="group relative block h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-none blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

            <div className="relative h-full bg-black/40 border border-white/10 group-hover:border-primary/50 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col">

                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag.id} className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 ${tag.color}`}>
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 font-heading leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            {/* Avatar placeholder if needed, using logo for now based on data */}
                            <div className="h-6 w-6 rounded-full bg-white/10 overflow-hidden relative border border-white/20">
                                <Image src="/logo-main.png" alt="Author" fill className="object-contain" />
                            </div>
                            <span className="text-xs font-bold text-slate-300">{post.author.name}</span>
                        </div>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read Article <ArrowRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
